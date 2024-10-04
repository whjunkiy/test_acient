<?php

namespace App\Http\ViewComposers;

use App\Model\Lead;
use App\Model\User;
use Illuminate\View\View;

class FilterComposer
{

    public function leadsDetails(View $view)
    {
        $location = request('location', request()->session()->get('location', 'ny'));
        $dateFrom = request('date-from', request()->session()->get('date-from', date("Y-m-01")));
        $dateTo = request('date-to', request()->session()->get('date-to', date("Y-m-d")));
        $timeFrom = request('time-from', request()->session()->get('time-from', 0));
        $timeTo = request('time-to', request()->session()->get('time-to', 24));

        $doctors = User::where('user_role', '=', 'coordinator')
            ->orderBy('drname')
            ->get(['username', 'drname']);

        $types = Lead::distinct()
            ->select(['leads.form_id'])
            ->whereIn('leads.form_id', ['', '1'], 'and', true)
            ->orderBy('leads.form_id')
            ->get();

        $sources = Lead::distinct()
            ->select(['leads.utm_source'])
            ->whereIn('leads.utm_source', ['', '1'], 'and', true)
            ->orderBy('leads.utm_source')
            ->get();

        $coordinator = request('coordinator', request()->session()->get('coordinator', ''));
        $type = request('type', request()->session()->get('type', ''));
        $source = request('source', request()->session()->get('source', ''));
        $patientName = request('patient_name', request()->session()->get('patient_name', ''));

        $params = [
            'doctors' => $doctors,
            'doctorSelected' => $coordinator,
            'dateFrom' => $dateFrom,
            'dateTo' => $dateTo,
            'timeFrom' => $timeFrom,
            'timeTo' => min($timeTo, 24),
            'types' => $types,
            'typeSelected' => $type,
            'sources' => $sources,
            'sourceSelected' => $source,
            'patientName' => $patientName
        ];
        view()->share('location', $location);
        return $view->with($params);
    }
}