<?php

namespace App\Exports;

use App\Model\Lead;
use App\Model\Order;
use App\Queries\LeadQuery;
use Illuminate\Support\Collection;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Route;
use Maatwebsite\Excel\Concerns\FromView;

class LeadDetailsExport implements FromView
{
    /**
     * @return View
     */
    public function view(): View
    {
        $webForms = ['Home Page', 'Contact Page', 'Quiz'];
        $request = request();
//        $this->validate($request, [
//            'location' => 'string',
//            'p' => 'integer',
//            'coordinator' => 'nullable|string',
//            'date-from' => 'date_format:Y-m-d',
//            'date-to' => 'date_format:Y-m-d',
//            'time-from' => 'integer|min:0|max:24',
//            'time-to' => 'integer|min:0|max:24',
//            'type' => 'nullable|string',
//            'source' => 'nullable|string',
//            'patient_name' => 'nullable|string',
//        ]);
        $data = $request->only([
            'location', 'locations', 'p', 'coordinator', 'date-from', 'date-to', 'time-from', 'time-to', 'type', 'source', 'patient_name'
        ]);

        $leadsData = $leadsToView =[];
        $max = 0;
        $d = [];
        foreach ($data['locations'] as $loc) {


            $query = Lead::query();
            $where = [];

            if (isset($data['coordinator'])) {
                $coordinator = $data['coordinator'];
                $where[] = ['leads.user', '=', $coordinator];
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
            $leads = LeadQuery::details($query, $loc, $dateFrom, $dateTo, true, $where)->get();

            //dd($leads->get());
            $d[$loc] = $leads;
            foreach ($leads as $lead) {
                $leadsToView[] = $lead;
                $orders = Order::orderList($lead->patient_id, $lead->patient_location, $dateFrom, $dateTo);
                $first = $last = '';
                $cost = $numbers = $paid = 0;
                if ($orders->isNotEmpty()) {
                    $first = date('m/d/Y', strtotime($orders->first()->order_date));
                    $last = date('m/d/Y', strtotime($orders->last()->order_date));
                }
                $callbacks = $lead->callbacks()->where('location', $lead->patient_location)->orderBy('cbdate')->get()->last();
                $lastCallback = $callbacks
                    ? $lastCallback = $callbacks->cbdate
                    : '';

                $ordersData = [];
                foreach ($orders as $order) {
                    $ordersData[] = [
                        'date' => $order->order_date
                    ];
                    $numbers++;
                    if ($order->paid > 0) {
                        $cost += $order->order_cost;
                        $paid++;
                    }
                }


                $leadsData[$lead->id] = [
                    'first' => $first,
                    'last' => $last,
                    'lastCallback' => $lastCallback,
                    'orders' => $ordersData,
                    'numbers' => $numbers,
                    'paid' => $paid,
                    'cost' => $cost
                ];
                $max = max($max, $numbers);
            }
        }
        //dd($d, $leadsData);
        $leadsToView = collect($leadsToView)->sortByDesc('date');

        return view('internal.excel.leads.details', [
            'leads' => $leadsToView,
            'dateFrom' => $dateFrom,
            'dateTo' => $dateTo,
            'leadsData' => $leadsData,
            'max' => $max
        ]);
    }
}
