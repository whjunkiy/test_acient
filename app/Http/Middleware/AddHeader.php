<?php namespace App\Http\Middleware;

use Closure;

class AddHeader
{
    public function handle($request, Closure $next)
    {
        $response = $next($request);
        $response->header('App-Env', config('app.env'));
        $response->header('App-Name', config('app.name'));

        return $response;
    }
}