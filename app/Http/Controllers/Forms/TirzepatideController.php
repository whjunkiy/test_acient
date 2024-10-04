<?php

namespace App\Http\Controllers\Forms;

use Illuminate\Http\Request;

class TirzepatideController extends FormsController
{
    protected $form = 'tirzepatide';
    protected $formName = 'Tirzepatide Consent';
    protected $routePrefix = 'formTirzepatide';


    public function show(Request $request, string $location, int $patientId, string $formId)
    {
        $this->form .= '-form';
        return parent::show($request, $location, $patientId, $formId);
    }

    public function parentPage(Request $request, string $location, int $patientId, string $formId)
    {
        $this->form .= '-form';
        return parent::parentPage($request, $location, $patientId, $formId);
    }
}
