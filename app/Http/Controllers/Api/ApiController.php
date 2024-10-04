<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Model\Student;
use App\Services\MyServicer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Http\Requests\MyRequest;

class ApiController extends Controller
{
    public function all(MyRequest $request) : JsonResponse
    {
        return Response::json( (new MyServicer( new Student() ))->showAll() );
    }

    public function getone(MyRequest $request) : JsonResponse
    {
        // \DB::enableQueryLog();
        //$student = Student::with(['lecturesCompleted'])->where('id', $request->sid)->first();
        $student = Student::findOrFail($request->id);
        //dd($student->lecturesCompleted);
        $response = [
            'name' => $student->name,
            'email' => $student->email,
            'class' => $student->clas()->first()->name,
            'lecturesCompleted' => $student->getLecturesCompleted()
        ];
        //dd(\DB::getQueryLog());
        return Response::json( $response );
    }

    public function newstudent(MyRequest $request) : JsonResponse
    {
        $data = $request->isValid(MyRequest::$validationRules['students']['create']);
        if (!empty($data['is_valid'])) {
            return Response::json( $data['is_valid'] );
        }

        try {
            $resp = Student::newStudent($data['data']['name'], $data['data']['email'], $data['data']['name']['clas_id']);
        } catch (\ErrorException $ex) {
            throw new \Exception($ex->getMessage(), $ex->getCode(), $ex->getPrevious());
        }
        return Response::json( $resp );
    }

    public function updateInfo(MyRequest $request) : JsonResponse
    {
        $data = $request->isValid(MyRequest::$validationRules['students']['update']);
        if (!empty($data['is_valid'])) {
            return Response::json( $data['is_valid'] );
        }

        try {
            $student = Student::findOrFail($data['data']['id']);
            $resp = $student->updateMe($data['data']['name'], $data['data']['clas_id']);
        } catch (\ErrorException $ex) {
            throw new \Exception($ex->getMessage(), $ex->getCode(), $ex->getPrevious());
        }

        return Response::json( $resp );
    }

    public function delete(MyRequest $request) : JsonResponse
    {
        $data = $request->isValid(MyRequest::$validationRules['students']['delete']);
        if (!empty($data['is_valid'])) {
            return Response::json( $data['is_valid'] );
        }

        try {
            $student = Student::findOrFail($data['data']['id']);
            $student->delete();
        } catch (\ErrorException $ex) {
            throw new \Exception($ex->getMessage(), $ex->getCode(), $ex->getPrevious());
        }

        return Response::json( ['success' => 1] );
    }

    public function send_post_create(MyRequest $request)
    {
//        $student = Student::findOrFail(4);
//        $student->delete();

        $url = 'http://testalef/api/tasks/create';

        $data = [
            'title' => 't4',
            'description' => 't4',
            'status' => 1,
            'deadline' => '19.07.2024 12:00:00'
        ];

//        $data = $request->isValid(MyRequest::$validationRules['tasks']['create']);
//        die('sdfsdfsdfsdfsdfsdf');

        $postdata = json_encode($data,
            JSON_UNESCAPED_UNICODE);


        $opts = array('http' =>
            array(
                'method'  => 'POST',
                'header'  => 'Content-type: application/json',
                'content' => $postdata
            )
        );

        $context = stream_context_create($opts);

        try {
            $response = file_get_contents($url, false, $context);
            die($response);
        } catch (\ErrorException $ex) {
            throw new \Exception($ex->getMessage(), $ex->getCode(), $ex->getPrevious());
        }

        if ($response === false) {

            throw new \Exception();
        }

        die($response);
    }

}