<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\MyRequest;
use App\Model\City;
use App\Services\MyServicer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Carbon\Carbon;

class ApiTasksController extends Controller
{

    public function add(MyRequest $request) : JsonResponse
    {
        try {
            $city = new City();
            $city->name = $request->get('name');
            $city->slug = $request->get('slug');
            $city->save();
        } catch (\ErrorException $ex) {
            throw new \Exception($ex->getMessage(), $ex->getCode(), $ex->getPrevious());
        }
        return Response::json( ['success' => 1] );
    }

    public function delete(MyRequest $request) : JsonResponse
    {
        try {
            $city = City::findOrFail($request->get('id'));
            $city->delete();
        } catch (\ErrorException $ex) {
            throw new \Exception($ex->getMessage(), $ex->getCode(), $ex->getPrevious());
        }
        return Response::json( ['success' => 1] );
    }
}