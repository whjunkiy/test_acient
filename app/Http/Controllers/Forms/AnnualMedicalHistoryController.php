<?php

namespace App\Http\Controllers\Forms;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AnnualMedicalHistoryController extends FormsController
{
    protected $form = 'annual-medical';
    protected $formName = 'Annual Medical History Review';
    protected $routePrefix = 'formAnnualMedicalHistory';


    public function show(Request $request, string $location, int $patientId, string $formId)
    {
        $this->form .= '-review';
        return parent::show($request, $location, $patientId, $formId);
    }

    public function parentPage(Request $request, string $location, int $patientId, string $formId)
    {
        $this->form .= '-review';
        return parent::parentPage($request, $location, $patientId, $formId);
    }
}
