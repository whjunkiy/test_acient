<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PatientsController extends Controller
{
    public function getPatients(Request $request, $location)
    {
        return view('internal.patients.view');
    }
}
