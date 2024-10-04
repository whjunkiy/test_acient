<?php

namespace App\Http\Controllers\Api\PBI;

use App\Http\Controllers\Api\ApiController;
use App\Model\ChartNote;
use App\Model\StatusHistory;
use App\Model\User;
use App\Queries\Leads\LeadsStatisticQuery;
use App\Queries\Leads\PBILeadsQuery;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class ApiPBIController extends ApiController
{
    //
    public function index(Request $request)
    {
        ini_set('max_execution_time', '180');
        ini_set('memory_limit', '6144M');
        $mode = $request->get('mode', false);
        $type = $request->get('type');
        $dateFrom = $request->get('dateFrom');
        $dateTo = $request->get('dateTo');
        $traffic = $request->get('traffic');
        $total = $request->get('total', false);
        $leadOnly = $request->get('leadOnly', false);

        $q = new PBILeadsQuery();
        $locs = ['ny', 'la', 'miami', 'renew'];
        $outArray = [];
        $totals = [
            'total_leads' => 0,
            'total_docs' => 0,
            'total_cost' => 0,
            'total_fee' => 0,
        ];
        foreach ($locs as $loc) {

            if ($mode !== false && in_array($mode, ['orders', 'labs', 'appts'])) {
                $leads = [];
                switch ($mode) {
                    case 'orders':
                        $leads = $q->getLeadsByOrder($loc, $type ?: 1, $dateFrom, $dateTo, 0, 24, $traffic, '', 'all', $total, $leadOnly);
                        break;
                    case 'labs':
                        $leads = $q->getLeadsByLabs($loc, $type ?: 1, $dateFrom, $dateTo, 0, 24, $traffic, '', 'all', $total, $leadOnly);
                        break;
                    case 'appts':
                        $leads = $q->getLeadsByAppointment($loc, $type ?: 1, $dateFrom, $dateTo, 0, 24, $traffic, '', 'all', $total, $leadOnly);
                        break;
                }
                if ($total) {
                    $totals['total_leads'] += $leads['total_leads'];
                    $totals['total_docs'] += $leads['total_docs'];
                    $totals['total_cost'] += round($leads['total_cost'], 2);
                    $totals['total_fee'] += $leads['total_fee'];
                } else {
                    $outArray = array_merge($outArray, $leads);
                }

            } else {
                $summary = $q->getLeadsSummary($loc, $type ?: 1, $dateFrom, $dateTo, 0, 24, $traffic, '', 'all', $total, $leadOnly);
                if ($total) {
                    $totals['total_leads'] += $summary['total_leads'];
                    $totals['total_docs'] += $summary['total_docs'];
                    $totals['total_cost'] += round($summary['total_cost'], 2);
                    $totals['total_fee'] += $summary['total_fee'];
                } else {
                    $outArray = array_merge($outArray, $summary);
                }
            }
        }
        if ($total) {
            $outArray = [
                'total_leads' => $totals['total_leads'],
                'total_docs' => $totals['total_docs'],
                'total_cost' => round($totals['total_cost'], 2),
                'total_fee' => $totals['total_fee']
            ];
        }
        return Response::json($outArray);
    }

    public function statuses(Request $request)
    {

        ini_set('max_execution_time', '180');
        ini_set('memory_limit', '6144M');

        $dateFrom = $request->get('dateFrom', date('Y-m-d', strtotime('now - 6 month')));
        $dateTo = $request->get('dateTo', date('Y-m-d'));
        $traffic = $request->get('traffic', 'all');

        $q = new PBILeadsQuery();
        $locs = ['ny', 'miami', 'renew', 'la'];
        $outArray = [];
        foreach ($locs as $loc) {
            $leads = $q->getLeadsStatuses($loc, $dateFrom, $dateTo, $traffic);
            foreach ($leads as $lead) {
                $lead->patient_name = sprintf("%s, %s", $lead->lastName, $lead->firstName);
                $lead->profile_link = sprintf("https://renewvitalityemr.com/details.php?id=%d&location=%s", $lead->patient_id, $loc);
                $lead->lead_assigned = strtotime($lead->user_assign_date) <= 0 ? $lead->created_date_time : $lead->user_assign_date;
                $outArray[] = $lead;
            }
        }
        return Response::json($outArray);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function details(Request $request): JsonResponse
    {

        ini_set('max_execution_time', '180');
        ini_set('memory_limit', '6144M');

        $result = [];
        $dateFrom = $request->get('dateFrom', date('Y-m-d',strtotime('now - 3 month')));
        $dateTo = $request->get('dateTo', date('Y-m-d'));
        $stats = new PBILeadsQuery();
        $location = ['ny','la','miami','renew'];
        foreach ($location as  $loc){
            $details = $stats->getLeadDetails($loc,$dateFrom,$dateTo);
            $result = array_merge($result,$details);
        }

        return Response::json($result);
    }

}