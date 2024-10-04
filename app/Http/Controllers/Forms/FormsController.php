<?php

namespace App\Http\Controllers\Forms;

use App\Http\Controllers\Controller;
use App\Mail\Forms\LinkSend;
use App\Model\Patient\Profile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class FormsController extends Controller
{

    protected $form = '';
    protected $formName = '';
    protected $routePrefix = '';


    public function show(Request $request, string $location, int $patientId, string $formId)
    {
        Profile::connection($location);
        $patient = Profile::find($patientId);
        $url = sprintf(
            "%s/%s.php?location=%s&pid=%d&fid=%s&owneremail=%s&owner2email=%s",
            config('app.url_legacy'),
            $this->form,
            $location,
            $patientId,
            $formId,
            $patient->user->email ?? 'noemail@noemail.com',
            $patient->user2->email ?? 'noemail@noemail.com'
        );

        return redirect($url);
    }

    public function parentPage(Request $request, string $location, int $patientId, string $formId)
    {
        Profile::connection($location);
        $patient = Profile::find($patientId);
        $url = sprintf(
            "%s/%s.php?location=%s&pid=%d&fid=%s&owneremail=%s&owner2email=%s&mode=dev&parent=true",
            config('app.url_legacy'),
            $this->form,
            $location,
            $patientId,
            $formId,
            $patient->user->email ?? 'noemail@noemail.com',
            $patient->user2->email ?? 'noemail@noemail.com'
        );

        return redirect($url);
    }

    /**
     * @param Request $request
     * @param $loc
     * @param $to
     * @param $patientId
     * @return RedirectResponse
     */
    protected function sendLink(Request $request, $loc, $to, $patientId): RedirectResponse
    {
        $this->sendFormLink($loc, $to, $patientId);

        return redirect()->route('patientProfile',
            ['location' => $loc, 'patientId' => $patientId]
        );
    }

    public function sendFormLink($loc, $to, $patientId)
    {
        Profile::connection($loc);
        $patient = Profile::find($patientId);
        $emailTo = $patient->email;
        $formTo = 'your';
        $toName = $patient->firstName;
        $isParent = false;

        if ($to == 'parent') {
            $parent = $patient->patientParent;
            $emailTo = $parent->email_parent;
            $formTo = 'Parent';
            $toName = $parent->name_parent;
            $isParent = '/parent';
            $this->routePrefix .= 'Parent';
        } else {
            $this->routePrefix .= 'Show';
            $patient->chartNote()->create([
                'entered' => date('m/d/Y'),
                'note_data' => $this->formName . ' was sent to patient.',
                'note_owner' => $patient->user->username,
                'note_category' => 'Chart Notes',
                'note_stamp' => now()
            ]);
        }

        $formId = $patient->medical_form_id;
        $params = [
            'patientName' => $toName,
            'form' => $this->form,
            'formTo' => $formTo,
            'formName' => $this->formName . ($to == 'parent' ? ' Parent' : ''),
            'location' => $loc,
            'patientId' => $patientId,
            'formId' => $formId,
            'isParent' => $isParent,
            'routeName' => $this->routePrefix,
            'replyTo' => [
                'email' => $patient->user->email,
                'name' => $patient->user->drname
            ]
        ];

        Mail::to($emailTo)
            ->queue(new LinkSend($params));
        $patient->formsSent()->create([
            'name' => $this->formName,
            'dt' => date('Y-m-d H:i:s')
        ]);
    }

    protected function sendParentLink($loc, $patientId, $formId)
    {

    }
}
