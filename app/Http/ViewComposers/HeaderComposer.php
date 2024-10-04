<?php

namespace App\Http\ViewComposers;

use App\Model\User;
use Illuminate\Support\Facades\Route;
use Illuminate\View\View;

class HeaderComposer
{
    public function compose(View $view)
    {
        //dd(request('location'));
        $location = Route::current()->parameters()['location'] ?? request('location') ?? 'ny';
        $physicianQuery = User::select(['drname', 'deactivated_at'])
            ->whereIn('user_role', [
                'provider +', 'provider', 'mid-level'
            ])
            ->where('location', '=', $location)
            ->whereNull('deleted_at')
            ->orderBy('deactivated_at')
            ->orderBy('drname');
        $physicianList = $physicianQuery->get();

        $params = [
            'location'=> $location,
            'user' => auth()->user(),
            'physicianList' => $physicianList
        ];
        return $view->with($params);

    }
}