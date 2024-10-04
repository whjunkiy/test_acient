<?php

namespace App\Auth;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Support\Arr;
use App\Model\User;

class LegacyUserProvider implements UserProvider
{
    public function retrieveById($identifier)
    {
        return User::query()->find($identifier);
    }

    public function retrieveByToken($identifier, $token)
    {
        return null;
    }

    public function updateRememberToken(Authenticatable $user, $token){}

    public function retrieveByCredentials(array $credentials)
    {
        if (Arr::has($credentials, 'username')) {
            return User::query()
                ->where('username', $credentials['username'])
                ->first();
        }


        if (Arr::has($credentials, 'login')) {
            return User::query()
                ->where('username', $credentials['login'])
                ->first();
        }

        return null;
    }

    public function validateCredentials(Authenticatable $user, array $credentials)
    {
        $plain = $credentials['password'];
        $hash = \hash('sha1', $user->usersalt . $plain);
        return \hash_equals($user->getAuthPassword(), $hash);
    }
}