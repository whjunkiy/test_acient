<?php

namespace App\Http\Controllers\Forms;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class IdentificationController extends FormsController
{
    protected $form = 'id-card';
    protected $formName = 'Identification';
    protected $routePrefix = 'formIdentification';


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
