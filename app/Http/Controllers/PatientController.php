<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class PatientController extends Controller
{
    public function getPatient(Request $request, $location, $patient_id)
    {
        return view('internal.patient.view');
    }

}
