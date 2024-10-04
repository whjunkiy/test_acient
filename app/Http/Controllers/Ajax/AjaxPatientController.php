<?php

namespace App\Http\Controllers\Ajax;

use App\Http\Controllers\Controller;
use App\Model\Patient\Profile;
use App\Queries\PatientQuery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;

class AjaxPatientController extends Controller
{
    public function search(Request $request)
    {
        $keyword = $request->input('keyword');
        $results = PatientQuery::searchPatients($keyword, 10);
        return Response::json($results);
    }
}
