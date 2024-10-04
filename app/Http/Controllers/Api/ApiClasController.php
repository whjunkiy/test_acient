<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Model\Clas;
use App\Http\Requests\MyRequest;
use App\Services\MyServicer;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class ApiClasController extends Controller
{
    public function all(MyRequest $request) : JsonResponse
    {
        return Response::json( (new MyServicer( new Clas() ))->showAll() );
    }

    public function getone(MyRequest $request) : JsonResponse
    {
        // \DB::enableQueryLog();
        //$student = Student::with(['lecturesCompleted'])->where('id', $request->sid)->first();
        $clas = Clas::findOrFail($request->id);
        //dd($student->lecturesCompleted);
        $response = [
            'name' => $clas->name,
            'students' => $clas->getStudents()
        ];
        //dd(\DB::getQueryLog());
        return Response::json( $response );
    }

    public function getPlan(MyRequest $request) : JsonResponse
    {
        // \DB::enableQueryLog();
        //$student = Student::with(['lecturesCompleted'])->where('id', $request->sid)->first();
        $clas = Clas::findOrFail($request->id);
        //dd($student->lecturesCompleted);
        $response = [
            'name' => $clas->name,
            'lectures' => $clas->getLectures()
        ];
        //dd(\DB::getQueryLog());
        return Response::json( $response );
    }

    public function setPlan(MyRequest $request) : JsonResponse
    {
        $data = $request->isValid(MyRequest::$validationRules['clas']['setPlan']);
        if (!empty($data['is_valid'])) {
            return Response::json( $data['is_valid'] );
        }
        try {
            $clas = Clas::findOrFail( $data['data']['id'] );
            $clas->setPlan( $data['data']['lectures'] );
        } catch (\ErrorException $ex) {
            die($ex->getMessage());
            throw new \Exception($ex->getMessage(), $ex->getCode(), $ex->getPrevious());
        }

        return Response::json( ['success' => 1] );
    }

    public function newclas(MyRequest $request) : JsonResponse
    {
        $data = $request->isValid(MyRequest::$validationRules['clas']['create']);
        if (!empty($data['is_valid'])) {
            return Response::json( $data['is_valid'] );
        }

        try {
            $resp = Clas::newClas($data['data']['name']);
        } catch (\ErrorException $ex) {
            throw new \Exception($ex->getMessage(), $ex->getCode(), $ex->getPrevious());
        }

        return Response::json( $resp );
    }

    public function updateInfo(MyRequest $request) : JsonResponse
    {
        $data = $request->isValid(MyRequest::$validationRules['clas']['update']);
        if (!empty($data['is_valid'])) {
            return Response::json( $data['is_valid'] );
        }

        try {
            $clas = Clas::findOrFail($data['data']['id']);
            $resp = $clas->updateMe($data['data']['name']);
        } catch (\ErrorException $ex) {
            throw new \Exception($ex->getMessage(), $ex->getCode(), $ex->getPrevious());
        }

        return Response::json( $resp );
    }

    public function delete(MyRequest $request) : JsonResponse
    {
        $data = $request->isValid(MyRequest::$validationRules['clas']['delete']);
        if (!empty($data['is_valid'])) {
            return Response::json( $data['is_valid'] );
        }

        try {
            $clas = Clas::findOrFail($data['data']['id']);
            $clas->delete();
        } catch (\ErrorException $ex) {
            throw new \Exception($ex->getMessage(), $ex->getCode(), $ex->getPrevious());
        }

        return Response::json( ['success' => 1] );
    }
}