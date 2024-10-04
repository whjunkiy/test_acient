<?php

use App\Http\Controllers\Ajax\Leads\AjaxLeadsStatisticController;
use App\Http\Controllers\Ajax\AjaxPatientController;
use App\Http\Controllers\Forms\AnnualMedicalHistoryController;
use App\Http\Controllers\Forms\FemaleMedicalHistoryController;
use App\Http\Controllers\Forms\FinancialController;
use App\Http\Controllers\Forms\IdentificationController;
use App\Http\Controllers\Forms\MedicalHistoryController;
use App\Http\Controllers\Forms\SemaglutideController;
use App\Http\Controllers\Forms\SermorelinConsentController;
use App\Http\Controllers\Forms\TestosteroneConsentController;
use App\Http\Controllers\Forms\TirzepatideController;
use App\Http\Controllers\Forms\VitalsController;
use App\Http\Controllers\SupplyExpirationController;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;


Route::get('/', ['uses' => 'HomeController@index', 'as' => 'home',]);
Route::get('/get_cities', ['uses' => 'HomeController@getCities', 'as' => 'get_cities',]);
Route::get('/{slug}/', ['uses' => 'HomeController@city', 'as' => 'city']);
Route::get('/{slug}/news', ['uses' => 'HomeController@news', 'as' => 'news']);
Route::get('/{slug}/about', ['uses' => 'HomeController@about', 'as' => 'about']);