<?php

namespace App\Providers;

use App\Auth\LegacyUserProvider;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
//        'App\Model' => 'App\Policies\ModelPolicy',
    ];

    public function boot() {
        $this->registerPolicies();
        Auth::provider('legacy', function () {
            return new LegacyUserProvider();
        });
    }
}
