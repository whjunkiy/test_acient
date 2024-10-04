<?php

namespace App\Http\Controllers;

use App\Exports\LeadsStatisticExport;
use App\Http\Requests\SupplyRequest;
use App\Model\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class SupplyExpirationController extends Controller
{
    public function index(Request $request)
    {
        $coordinator = $request->get('coordinator', 'all');
        $provider = $request->get('provider', 'all');
        $supplyFrom = $request->get('supply-from', null);
        $supplyTo = $request->get('supply-to', null);
        ini_set('max_execution_time', '180');
        ini_set('memory_limit', '6144M');
        $dateFrom = Carbon::parse(now() . " - 7 month")->format('Y-m-d');
        $dateTo = Carbon::parse(now() . " - 0 month")->format('Y-m-d');

        $supply = new LeadsStatisticExport(['type_sales' => '1', 'traffic' => 'all', 'datepicker1' => $dateFrom,
            'datepicker2' => $dateTo, 'timefrom' => '00', 'timeto' => '24',
            'lead_source' => 'all', 'tcoordinator' => $coordinator, 'supply' => '1', 'provider' => $provider]);

        $coordinators = User::where('user_role', '=', 'coordinator')
            ->whereNull('deleted_at')
            ->whereNull('deactivated_at')
            ->get();
        $providers = User::whereIn('user_role', ['provider', 'provider+'])
            ->whereNull('deleted_at')
            ->whereNull('deactivated_at')
            ->get();

        if ($supplyFrom !== null && $supplyTo !== null) {
            $list = $supply->collection()->whereBetween('days_left', [$supplyFrom, $supplyTo]);
        } else if ($supplyFrom !== null && $supplyTo === null) {
            $list = $supply->collection()->where('days_left', '>=', $supplyFrom);
        } else if ($supplyFrom === null && $supplyTo !== null) {
            $list = $supply->collection()->where('days_left', '<=', $supplyTo);
        } else {
            $list = $supply->collection();
        }
        $list->shift();
        $count = $list->count();
        $list = json_decode($list->toJson());
        return view('internal.supply.index',
            ['list' => $list, 'count' => $count,
                'coordinators' => $coordinators,
                'coordinatorSelected' => $coordinator,
                'providers' => $providers,
                'providerSelected' => $provider,
                'supplyFrom' => $supplyFrom,
                'supplyTo' => $supplyTo,
            ]
        );
    }
}
