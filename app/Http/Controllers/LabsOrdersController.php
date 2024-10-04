<?php

namespace App\Http\Controllers;

use App\Helpers\LabsOrdersHelper;
use App\Http\Requests\LabsOrder\OrderDataRequest;
use App\Model\LabsOrder\LabsCodeGroup;
use App\Model\LabsOrder\LabsCodeList;
use App\Model\LabsOrder\LabsOrder;
use App\Model\LabsOrder\LabsTypeOfVisitItem;
use App\Queries\LabsOrders\CreateLabsOrderQuery;
use App\Queries\PatientQuery;
use Exception;
use Illuminate\Contracts\View\Factory as ViewFactory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\View\View;

class LabsOrdersController extends Controller
{
    protected ViewFactory $view;
    protected LabsOrdersHelper $labsOrderHelper;
    protected CreateLabsOrderQuery $createLabsOrdersQuery;

    public function __construct(
        ViewFactory          $view,
        LabsOrdersHelper     $labsOrderHelper,
        CreateLabsOrderQuery $createLabsOrdersQuery
    )
    {
        $this->view = $view;
        $this->labsOrderHelper = $labsOrderHelper;
        $this->createLabsOrdersQuery = $createLabsOrdersQuery;
    }

    public function index(int $patient_id): View
    {
        $patient = PatientQuery::getPatientProfile($patient_id);
        $profile = $patient->profile;

        $labsOrders = PatientQuery::getPatientLabsOrders($patient);

        return view('internal.labs-order.index',
            compact('profile', 'patient', 'labsOrders'));
    }

    public function view(int $patient_id): View
    {
        $patient = PatientQuery::getPatientProfile($patient_id);
        $profile = $patient->profile;

        return view('internal.labs-order.view',
            compact('patient', 'profile'));
    }

    public function create(): View
    {
        $codesGroups = LabsCodeGroup::with('codes')->get();
        $codesGroupsTransformed = $this->labsOrderHelper->transformCodesGroup($codesGroups);

        $typeOFVisitItems = LabsTypeOfVisitItem::all();

        return view('internal.labs-order.create',
            [
                'codesGroups' => $codesGroupsTransformed,
                'typeOFVisitItems' => $typeOFVisitItems,
            ]);
    }

    public function store(OrderDataRequest $request)
    {
        try {
            $data = $request->validated();
            $result = $this->createLabsOrdersQuery->execute($data);
            return Response::json([
                'status' => 'success',
                'message' => 'Order created successfully',
                'data' => $result,
                'code' => 200
            ]);
        } catch (Exception $e) {
            return
                Response::json([
                    'status' => 'error',
                    'message' => $e->getMessage(),
                    'code' => 500,
                ]);
        }
    }

    public function orders_list()
    {
        LabsOrder::connection('ny');
        $labsOrdersInProgress = LabsOrder::withDetails()
            ->ordersByStatus(config('labs_statuses.statuses.in_progress.id'))
            ->paginate(10, ['*'], 'page_in_progress');

        foreach ($labsOrdersInProgress as $order) {
            $patient = PatientQuery::getPatientProfile($order->patient->id);
            $order->patient->profile = $patient->profile;
            $order->patient->location_label = $patient->location->label;
        }

        LabsOrder::connection('ny');
        $labsOrdersIsReady = LabsOrder::withDetails()
            ->ordersByStatus(config('labs_statuses.statuses.ready.id'))
            ->paginate(10, ['*'], 'page_is_ready');

        foreach ($labsOrdersIsReady as $order) {
            $patient = PatientQuery::getPatientProfile($order->patient->id);
            $order->patient->profile = $patient->profile;
            $order->patient->location_label = $patient->location->label;
        }

        return view('internal.labs-order.list',
            compact(['labsOrdersInProgress', 'labsOrdersIsReady']));
    }
}
