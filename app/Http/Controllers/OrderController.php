<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function getOrder(Request $request, $location, $order_id)
    {
        return view('internal.order.view');
    }
}
