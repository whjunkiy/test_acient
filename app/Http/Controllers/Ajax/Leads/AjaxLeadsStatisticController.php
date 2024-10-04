<?php

namespace App\Http\Controllers\Ajax\Leads;

use App\Exports\LeadsStatisticExport;
use App\Http\Controllers\Controller;
use App\Queries\Leads\LeadsStatisticQuery;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class AjaxLeadsStatisticController extends Controller
{
    public function get(Request $request)
    {
        ini_set('max_execution_time', '180');
        ini_set('memory_limit', '6144M');

        $data = $request->only('type_sales', 'traffic', 'datepicker1', 'datepicker2', 'timefrom', 'timeto', 'lead_source', 'tcoordinator');
        $data['supply'] = $request->get('supply', 0);
        $data['provider'] = $request->get('provider', 'all');

        return Excel::download(new LeadsStatisticExport($data), 'leads-statistic.csv');
    }
}
