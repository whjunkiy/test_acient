<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

class TestController
{
    public function test(Request $request)
    {
        dd($request->get('text'));
    }
}