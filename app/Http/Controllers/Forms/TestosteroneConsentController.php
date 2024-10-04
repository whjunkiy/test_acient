<?php

namespace App\Http\Controllers\Forms;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TestosteroneConsentController extends FormsController
{
    protected $form = 'testosterone-consent';
    protected $formName = 'Testosterone Consent';
    protected $routePrefix = 'formTestosterone';


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
