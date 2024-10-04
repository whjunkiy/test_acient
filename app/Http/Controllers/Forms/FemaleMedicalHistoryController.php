<?php

namespace App\Http\Controllers\Forms;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FemaleMedicalHistoryController extends FormsController
{
    protected $form = 'female-medical';
    protected $formName = 'Female Medical History';
    protected $routePrefix = 'formFemaleMedicalHistory';


    public function show(Request $request, string $location, int $patientId, string $formId)
    {
        $this->form = 'female-addendum-to-medical-history';
        return parent::show($request, $location, $patientId, $formId);
    }

    public function parentPage(Request $request, string $location, int $patientId, string $formId)
    {
        $this->form = 'female-addendum-to-medical-history';
        return parent::parentPage($request, $location, $patientId, $formId);
    }
}
