<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller as Controller;
use App\Model\City;
use Illuminate\Http\Request;

class HomeController extends Controller
{

    public function __construct()
    {

//        $this->middleware('auth');
    }

    public function index()
    {
        if (isset($_COOKIE['curCity']) && $_COOKIE['curCity']) {
            return redirect()->route('city' , ['slug' => $_COOKIE['curCity'],]);
        }
        $cities = City::all()->sortBy('name');
        return view('internal.home.index', [
            'cities' => $cities,
        ]);
    }

    public function city(Request $request, $slug = '')
    {
        City::where('slug', $slug)->firstOrFail();
        setcookie("curCity", $slug);
        $cities = City::all()->sortBy('name');
        return view('internal.home.index', [
            'cities' => $cities,
        ]);
    }

    public function news(Request $request, $slug = '')
    {
        $city = City::where('slug', $slug)->firstOrFail();
        return view('internal.home.news', [
            'city' => $city,
        ]);
    }

    public function about(Request $request, $slug = '')
    {
        $city = City::where('slug', $slug)->firstOrFail();
        return view('internal.home.about', [
            'city' => $city,
        ]);
    }

    public function getCities(Request $request) {
        if (!City::all()->count()) {
            City::getCities();
        }
        return response()->json(['success' => 1, 'msg' => 'All done!']);
    }

}
