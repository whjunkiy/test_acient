<?php

namespace App\Http\Controllers\Forms;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class VitalsController extends FormsController
{
    protected $form = 'vitals';
    protected $formName = 'Vitals';
    protected $routePrefix = 'formVitals';


    public function show(Request $request, string $location, int $patientId, string $formId)
    {
        $this->form .= '-form';
        return parent::show($request, $location, $patientId, $formId);
    }

    public function parentPage(Request $request, string $location, int $patientId, string $formId)
    {
        $this->form .= '-form-dev';
        return parent::parentPage($request, $location, $patientId, $formId);
    }
}
