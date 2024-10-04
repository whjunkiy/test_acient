<?php

namespace App\Http\Controllers;

use App\Mail\OrdersSend;
use App\Queries\OrdersQuery;
use App\Queries\PatientQuery;
use App\Services\Patient\PatientPaymentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB as DB;
use Illuminate\Support\Facades\Mail;

class OrdersController extends Controller
{
    public function sendMail(Request $request, $location = 'ny')
    {
        $db = DB::connection($location);

        $this->validate($request, [
            'fromemail' => 'required|email',
            'subjemail' => 'required|string:256',
            "ntextemail" => "required|string",
            "patient_id" => "required|integer",
            "med_id" => "required|integer",
            "ef_la" => "nullable|string",
            "addfile" => "sometimes|file",
        ]);

        $order = new OrdersSend([
            'message' => $request->get('ntextemail'),
            'subject' => $request->get('subjemail'),
        ]);
        Mail::to('ae.berdyugin@yandex.kz')
            ->send($order);

        return redirect()->route('orders', ['location' => $location]);
    }

    public function getList(Request $request, $location)
    {
        view()->share('location', $location);
        $user = Auth::user();
        $username = $user->username;
        $patientBalancesResults = PatientQuery::getPatientBalances($location, $username);
        $patientPaymentsResults = PatientQuery::getPatientPayments($location, $username);

        $location = $request->get('location', 'ny');
        $db = DB::connection($location);

        $physician = session('physician');

        $pharmacy_list = $db->table('pharmacy')->orderBy('id', 'asc')->get();

        $current_user = $db->table('users')->where('username', $username)->first();
        $company_signature = $db->table('users')->where('username', 'company')->first()->signature;
        $complex = [];

        foreach ($pharmacy_list as $pharmacy) {
            $label = $pharmacy->label;
            $orders = OrdersQuery::getOrdersByPharmacy($db->table('patientprofiles as p'), $pharmacy->tmp_code);
            //dd($orders, $pharmacy);
            if (!count($orders)) {
                //dd($orders, $pharmacy);
                $complex[] = ['orders' => [], 'label' => $label,];
                continue;
            }
            $complex[] = ['orders' => $orders, 'label' => $label,];
        }

        return view('internal.orders.index', [
            'pharmacy_list' => (object)$complex,
            'current_user' => $current_user,
            'company_signature' => $company_signature,
            'physician' => $physician,
            'patientBalancesResults' => $patientBalancesResults,
            'patientPaymentsResults' => $patientPaymentsResults,
        ]);
    }
}
