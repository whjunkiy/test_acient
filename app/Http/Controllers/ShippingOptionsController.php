<?php

namespace App\Http\Controllers;

use App\Model\ShippingOption;
use Illuminate\Http\Request;

class ShippingOptionsController extends Controller
{
    public function index($location)
    {
        $optionsList = ShippingOption::withTrashed()->get();
        view()->share('location', $location);
        return view('internal.shipping_options.index', [ 'options' => $optionsList ] );
    }

    public function edit( ShippingOption $option, $location)
    {
        view()->share('location', $location);
        return view('internal.shipping_options.edit', [ 'option' => $option ] );
    }
}
