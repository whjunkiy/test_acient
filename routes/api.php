<?php

use App\Http\Controllers\Api\ApiController;
use \App\Http\Controllers\Api\ApiLectureController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\Api\ApiClasController;
use \App\Http\Controllers\Api\ApiTasksController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::put('/add', [ApiTasksController::class, 'add']);
Route::delete('/delete', [ApiTasksController::class, 'delete']);

