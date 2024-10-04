<?php

namespace App\Http\Controllers;

use App\Model\ICDCode;
use Illuminate\Http\Request;

class ICDController extends Controller
{
    public function index($location)
    {
        $codeList = ICDCode::all()->sortBy('com_dx_name');
        view()->share('location', $location);
        return view('internal.icd10codes.index',['codes'=>$codeList]);
    }

    public function edit( ICDCode $code, $location)
    {
        view()->share('location', $location);

        return view('internal.icd10codes.edit',['code'=>$code]);
    }
}
