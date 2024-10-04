<?php

namespace App\Http\Controllers;

use App\Model\Lead;
use App\Model\Order;
use App\Queries\LeadQuery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LeadController extends Controller
{

    public function details(Request $request, $location = 'ny')
    {

        ini_set('max_execution_time', '180');
        ini_set('memory_limit', '6144M');
        $request->session()->forget([
            'location', 'locations', 'page', 'coordinator', 'date-from', 'date-to', 'time-from', 'time-to', 'type', 'source', 'patient_name'
        ]);

        $dateFrom = date("Y-m-01 00:00:00");
        $dateTo = date("Y-m-d H:i:s");
        $request->session()->put([
            'date-from' => date("Y-m-01"),
            'date-to' => date("Y-m-d"),
            'time-from' => 0,
            'time-to' => 24
        ]);
        $perPage = 25;
        $locations = [$location];
        $leadsToView = [];
        $max = 0;
        foreach ($locations as $loc) {
            $query = Lead::query();
            $query->whereBetween('mo.order_date', [$dateFrom, $dateTo]);
            $leads = LeadQuery::details($query, $loc, $dateFrom, $dateTo, true, false);

            $total = $leads->count('leads.id');

            $page = $request->get('page', 1);

            $pages = [
                'prev' => $page - 1 ?: 1,
                'next' => $page + 1,
                'current' => $page,
                'total' => ceil($total / $perPage)
            ];

            //$leads = $leads->limit($perPage)->offset($perPage * ($page - 1))->get();
            $leads = $leads->get();
            foreach ($leads as $lead) {
                $leadsToView[] = $lead;
            }
            $max = max($max, $leads->max('count_orders'));
        }
        $leadsToView = collect($leadsToView)->sortByDesc('date');
        //dd($leadsToView->sortBy('date'));
        return view('internal.leads.details', [
            'leads' => $leadsToView,
            'pages' => $pages,
            'location' => $location,
            'locations' => $locations,
            'dateFrom' => $dateFrom,
            'dateTo' => $dateTo,
            'max' => $max
        ]);
    }

    public function detailsFilter(Request $request, $location = 'ny')
    {
        ini_set('max_execution_time', '120');
        ini_set('memory_limit', '2048M');

        $webForms = ['Home Page', 'Contact Page', 'Quiz'];
        //dd(session()->all());
        $perPage = 25;

        $from = $request->get('from');
        if ($from == 'form') {
            $this->validate($request, [
                'location' => 'array',
                'p' => 'integer',
                'coordinator' => 'nullable|string',
                'date-from' => 'date_format:Y-m-d',
                'date-to' => 'date_format:Y-m-d',
                'time-from' => 'integer|min:0|max:24',
                'time-to' => 'integer|min:0|max:24',
                'type' => 'nullable|string',
                'source' => 'nullable|string',
                'patient_name' => 'nullable|string',
            ]);
            $data = $request->only([
                'location', 'locations', 'p', 'coordinator', 'date-from', 'date-to', 'time-from', 'time-to', 'type', 'source', 'patient_name'
            ]);
            $request->session()->put($data);
        } else {
            $data = $request->session()->all();
            $data['p'] = $request->get('p', 1);
        }
        $max = 0;

        if (count($data['locations']) == 1 && $data['locations'][0] == 'all') {
            $data['locations'] = [
                'ny', 'la', 'miami', 'renew'
            ];
        }
        $leadsToView = [];
        foreach ($data['locations'] as $loc) {

            $where = [];
            $query = Lead::query();

            // filter by coordinator
            if (isset($data['coordinator'])) {
                $coordinator = $data['coordinator'];
                $where[] = ['leads.user', '=', $coordinator];
            }

            // Filter by date interval
            $dateFrom = $dateTo = null;
            if (isset($data['date-from']) && isset($data['date-to'])) {
                $dateFrom = sprintf("%s %s:00:00",
                    $data['date-from'],
                    str_pad($data['time-from'], 2, "0"));
                $dateTo = sprintf("%s %s:59:59",
                    $data['date-to'],
                    $data['time-to'] >= 24 ? 23 : str_pad($data['time-to'], 2, "0"));

                $query->whereBetween('mo.order_date', [$dateFrom, $dateTo]);
            }

            // Filter by Type
            if (isset($data['type'])) {
                if ($data['type'] == 'web_forms') {
                    $query->whereIn('leads.form_id', $webForms);
                } else {
                    $where[] = ['leads.form_id', '=', $data['type']];
                }
            }

            // Filter by Source
            if (isset($data['source'])) {
                $where[] = ['leads.utm_source', '=', $data['source']];
            }

            // Search by patient name
            if (isset($data['patient_name'])) {
                $query->where(function ($w) {
                    $data['patient_name'] = \request('patient_name');
                    $w->whereRaw(sprintf("AES_DECRYPT(p.firstName, '%s') like '%%%s%%'", config('app.legacy_encryption_key'), $data['patient_name']));
                    $w->orWhereRaw(sprintf("AES_DECRYPT(p.lastName, '%s') like '%%%s%%'", config('app.legacy_encryption_key'), $data['patient_name']));
                });

            }

            $leads = LeadQuery::details($query, $loc, $dateFrom, $dateTo, true, $where);

            $page = $request->get('page', 1);
            $total = ceil($leads->count('leads.id') / $perPage);

            $prev = $page - 1 ?: 1;
            $next = ($page + 1) > $total ? $total : $page + 1;

            //$leads = $leads->limit($perPage)->offset($perPage * ($page - 1))->get();
            $leads = $leads->get();


            foreach ($leads as $lead) {
                $leadsToView[] = $lead;
            }

            $max = max($max, $leads->max('count_orders'));
        }

        $leadsToView = collect($leadsToView)->sortByDesc('date');

        return view('internal.leads.details', [
            'leads' => $leadsToView,
            'pages' => [
                'prev' => $prev,
                'next' => $next,
                'current' => $page,
                'total' => $total
            ],
            'dateFrom' => $dateFrom,
            'dateTo' => $dateTo,
            'location' => $location,
            'locations' => $data['locations'],
            'max' => $max
        ]);
    }
}
