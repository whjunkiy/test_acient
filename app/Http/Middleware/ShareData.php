<?php namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\View;

class ShareData
{
    public function handle($request, Closure $next)
    {
        View::share('location', $request->location);
        View::share('patient_id', $request->patient_id);

        return $next($request);
    }
}