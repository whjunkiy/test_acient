<?php

namespace App\Http\Controllers\Forms;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MedicalHistoryController extends FormsController
{
    protected $form = 'medical-history';
    protected $formName = 'Medical History';
    protected $routePrefix = 'formMedicalHistory';


    public function show(Request $request, string $location, int $patientId, string $formId)
    {
        $this->form = $location . '-vitality-' . $this->form . '-form';
        return parent::show($request, $location, $patientId, $formId);
    }

    public function parentPage(Request $request, string $location, int $patientId, string $formId)
    {
        $this->form = $location . '-vitality-' . $this->form . '-form';
        return parent::parentPage($request, $location, $patientId, $formId);
    }
}
