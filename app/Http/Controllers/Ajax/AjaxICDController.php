<?php

namespace App\Http\Controllers\Ajax;

use App\Http\Requests\ICDCodeRequest;
use App\Model\ICDCode;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AjaxICDController extends Controller
{

    public function getAjaxList()
    {
        $codeList = ICDCode::all()->sortBy('com_dx_name');
        return Response::json(['success' => true, 'codes' => $codeList]);

    }
    public function getList()
    {
        $codeList = ICDCode::all()->sortBy('com_dx_name');
        $html = view('internal.icd10codes.code-list', ['codes' => $codeList])->render();
        return Response::json(['success' => true, 'html' => $html]);
    }

    public function getCode(ICDCode $code)
    {
        try {
            if (!$code) {
                throw new \Exception('Unknown code');
            } else {
                if (!$code->com_dx_code_old) {
                    $code->com_dx_code_old = $code->com_dx_code;
                }
                if (!$code->com_dx_name_old) {
                    $code->com_dx_name_old = $code->com_dx_name;
                }
            }
            $result = [];
            $result['success'] = true;
            $result['code'] = $code;
        } catch (\Exception $e) {
            $result['success'] = false;
            $result['trace'] = $e->getTrace();
            $result['exception'] = $e->getMessage();
        }

        return Response::json($result);
    }

    public function addCode(ICDCodeRequest $request)
    {
        $data = $request->only(['com_dx_code', 'com_dx_name']);
        $code = ICDCode::create([
            'com_dx_code' => $data['com_dx_code'],
            'com_dx_name' => $data['com_dx_name']
        ]);
        if ($code) {
            $result = [
                'success' => true,
                'data' => $code
            ];
        }
        return Response::json($result);
    }

    public function editCode(ICDCodeRequest $request, ICDCode $code)
    {
        $data = $request->only(['com_dx_code', 'com_dx_name', 'com_dx_code_old', 'com_dx_name_old']);
        $code->fill($data);
        $code->save();
        $result = [
            'data' => $data,
            'success' => true
        ];
        return Response::json($result);
    }
}
