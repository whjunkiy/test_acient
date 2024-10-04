<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\MyRequest;
use App\Model\Clas;
use App\Model\Lecture;
use App\Services\MyServicer;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class ApiLectureController extends Controller
{
    public function all(MyRequest $request) : JsonResponse
    {
        return Response::json( (new MyServicer( new Lecture() ))->showAll() );
    }

    public function getone(MyRequest $request) : JsonResponse
    {
        $lecture = Lecture::findOrFail($request->id);
        $response = [
            'theme' => $lecture->theme,
            'description' => $lecture->description,
            'completedbystudents' => $lecture->getStudentsCompleted()
        ];
        return Response::json( $response );
    }

    public function makeNew(MyRequest $request) : JsonResponse
    {
        $data = $request->isValid(MyRequest::$validationRules['lecture']['create']);
        if (!empty($data['is_valid'])) {
            return Response::json( $data['is_valid'] );
        }

        try {
            $resp = Lecture::makeNew($data['data']['theme'], $data['data']['description']);
        } catch (\ErrorException $ex) {
            throw new \Exception($ex->getMessage(), $ex->getCode(), $ex->getPrevious());
        }

        return Response::json( $resp );
    }

    public function updateInfo(MyRequest $request) : JsonResponse
    {
        $data = $request->isValid(MyRequest::$validationRules['lecture']['update']);
        if (!empty($data['is_valid'])) {
            return Response::json( $data['is_valid'] );
        }

        try {
            $lecture = Lecture::findOrFail($data['data']['id']);
            $resp = $lecture->updateMe($data['data']['theme'], $data['data']['description']);
        } catch (\ErrorException $ex) {
            throw new \Exception($ex->getMessage(), $ex->getCode(), $ex->getPrevious());
        }

        return Response::json( $resp );
    }

    public function delete(MyRequest $request) : JsonResponse
    {
        $data = $request->isValid(MyRequest::$validationRules['lecture']['delete']);
        if (!empty($data['is_valid'])) {
            return Response::json( $data['is_valid'] );
        }

        try {
            $lecture = Lecture::findOrFail($data['data']['id']);
            $lecture->delete();
        } catch (\ErrorException $ex) {
            throw new \Exception($ex->getMessage(), $ex->getCode(), $ex->getPrevious());
        }

        return Response::json( ['success' => 1] );
    }

}