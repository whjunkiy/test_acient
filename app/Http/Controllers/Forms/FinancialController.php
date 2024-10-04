<?php

namespace App\Http\Controllers\Forms;

use App\Http\Requests\Forms\FinacialRequest;
use App\Jobs\FinancialEmailJob;
use App\Jobs\RemoveAttachmentJob;
use App\Mail\Forms\LinkCoordinator;
use App\Model\Forms\Financial;
use App\Model\Patient\Profile;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Mail;
use function App\Helpers\patientAge;

class FinancialController extends FormsController
{
    protected $form = 'financial';
    protected $formName = 'Financial Form';
    protected $routePrefix = 'formFinancial';

    public function show(Request $request, string $location, int $patientId, string $formId)
    {
        Profile::connection($location);
        $patient = Profile::find($patientId);
        if ($formId != $patient->medical_form_id) abort('404');
        $form = $patient->financialForm()->orderByDesc('created_at')->limit(1)->get()->first();
        if ($form) return redirect()->route('formThanks');
        view()->share('patientId', $patientId);
        view()->share('formId', $formId);
        view()->share('location', $location);
        $info = $form->info ?? null;

        return view('internal.forms.financial.form', [
            'isParent' => false,
            'siteTitle' => 'Financial Form',
            'patientName' => sprintf('%s, %s', $patient->lastName, $patient->firstName),
            'info' => $info ?? null,
        ]);
    }

    public function save(FinacialRequest $request, string $location)
    {

        $data = $request->only([
            'patient_id', 'form_id', 'patient_name', 'patient', 'patient_signature', 'signed_date'
        ]);
        Profile::connection($location);
        $patient = Profile::find($data['patient_id']);
        if ($data['form_id'] != $patient->medical_form_id) abort('404');
        view()->share('patientId', $data['patient_id']);
        view()->share('location', $location);

        $age = patientAge($patient->dob);
        $form = $patient->financialForm()->create([
            'info' => $data,
            'ip_address' => $request->server('REMOTE_ADDR'),
            'signed_date' => $data['signed_date'],
            'signed_time' => date("H:i:s"),
            'form_id' => $data['form_id']
        ]);

        if ($form) {
            $user = $patient->user;
            $user2 = $patient->user2;
            $mail = Mail::to($user->email);
            if ($user2) {
                $mail->cc($user2->mail);
            }
            $params = [
                'routeName' => 'patientProfile',
                'name' => sprintf("%s, %s", $patient->lastName, $patient->firstName),
                'location' => $location,
                'patientId' => $data['patient_id']
            ];
            $mail->queue(new LinkCoordinator($params, $this->formName));

            if ($age < 18) {
                $parent = $patient->patientParent;
                if ($parent) {
                    $this->sendFormLink($location, "parent", $data['patient_id']);
                }
            }

            $pdf = PDF::loadView('internal.pdf.forms.financial', ['info' => (object)$data]);

            $pdfName = base_path() . '/storage/app/pdf/financial-form-' . $data['form_id'] . '.pdf';
            $pdf->save($pdfName);

            Bus::chain([
                new FinancialEmailJob($patient->email, ['pdf' => $pdfName]),
                new RemoveAttachmentJob('pdf/financial-form-' . $data['form_id'] . '.pdf')
            ])->dispatch();

        }
        return redirect()->route('formThanks');
    }

    public function pdf(Request $request, string $location, int $patientId, string $formId)
    {
        Profile::connection($location);
        $patient = Profile::find($patientId);
        if ($formId != $patient->medical_form_id) abort('404');
        $form = $patient->financialForm()->orderByDesc('created_at')->limit(1)->get()->first();
        $info = $form->info;
        $pdf = PDF::loadView('internal.pdf.forms.financial', ['info' => $info]);
        return $pdf->stream('financial-forms.pdf');
    }

    public function preview(Request $request, string $location, int $patientId, string $formId)
    {
        Profile::connection($location);
        $patient = Profile::find($patientId);
        if ($formId != $patient->medical_form_id) abort('404');
        $form = $patient->financialForm()->orderByDesc('created_at')->limit(1)->get()->first();
        $info = $form->info;
        //dd($info);
        view()->share('patientId', $patientId);
        view()->share('formId', $formId);
        view()->share('location', $location);
        return view('internal.forms.financial.form', [
            'isParent' => isset($info->parent_signature),
            'isPreview' => true,
            'siteTitle' => 'Financial Form',
            'patientName' => sprintf('%s, %s', $patient->lastName, $patient->firstName),
            'info' => $info ?? null,
            'id' => $form->id,
        ]);
    }

    public function thanks()
    {
        return 'Thanks';
    }

    public function parentPage(Request $request, string $location, int $patientId, string $formId)
    {
        Profile::connection($location);
        $patient = Profile::find($patientId);
        if ($formId != $patient->medical_form_id) abort('404');
        $form = $patient->financialForm()->orderByDesc('created_at')->limit(1)->get()->first();
        view()->share('patientId', $patientId);
        view()->share('formId', $formId);
        view()->share('location', $location);

        $info = $form->info;
        $info->parent_signed_date = date("Y-m-d");
        return view('internal.forms.financial.form', [
            'isParent' => true,
            'isPreview' => false,
            'siteTitle' => 'Financial Form',
            'patientName' => sprintf('%s, %s', $patient->lastName, $patient->firstName),
            'id' => $form->id,
            'info' => $info,
        ]);
    }

    /**
     * @param Request $request
     * @param string $location
     * @return \Illuminate\Http\RedirectResponse
     */
    public function parentSave(Request $request, string $location)
    {
        $data = $request->only([
            'id', 'patient_id', 'form_id', 'parent_name', 'parent_signature', 'parent_signed_date'
        ]);
        Profile::connection($location);
        $patient = Profile::find($data['patient_id']);
        if ($data['form_id'] != $patient->medical_form_id) abort('404');

        $form = Financial::find($data['id']);
        $info = $form->info;

        $info->parent_name = $data['parent_name'];
        $info->parent_signature = $data['parent_signature'];
        $info->parent_sign_date = $data['parent_signed_date'];

        $form->info = $info;
        $form->parent_ip_address = $request->server('REMOTE_ADDR');
        $form->parent_signed_date = $data['parent_signed_date'];
        $form->save();

        $pdf = PDF::loadView('internal.pdf.forms.financial', ['info' => $info]);
        $pdfName = base_path() . '/storage/app/pdf/financial-form-' . $data['form_id'] . '.pdf';

        $pdf->save($pdfName);

        Bus::chain([
            new FinancialEmailJob($patient->email, ['pdf' => $pdfName, 'parent' => true]),
            new RemoveAttachmentJob('pdf/financial-form-' . $data['form_id'] . '.pdf')
        ])->dispatch();

        return redirect()->route('formThanks');
    }

    public function delete(Request $request, string $location, int $patientId, string $formId)
    {
        Profile::connection($location);
        $patient = Profile::find($patientId);
        if ($formId != $patient->medical_form_id) abort('404');
        $forms = $patient->financialForm;
        if ($forms) {
            foreach ($forms as $form) {
                $form->deleted_by = Auth::user()->username;
                $form->save();
                $form->delete();
            }
        }

        return redirect()->route('patientProfile',
            ['location' => $location, 'patientId' => $patientId]
        );
    }

}
