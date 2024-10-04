<?php

namespace App\Http\Controllers;

use App\Exports\LeadDetailsExport;
use App\Model\Lead;
use App\Model\Order;
use App\Queries\LeadQuery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\App;
use Maatwebsite\Excel\Facades\Excel;

class ExcelController extends Controller
{

    public function export(Request $request, $location)
    {
        ini_set('max_execution_time', '180');
        ini_set('memory_limit', '6144M');
        return Excel::download(new LeadDetailsExport, 'text.xls', \Maatwebsite\Excel\Excel::XLS);
    }
}
