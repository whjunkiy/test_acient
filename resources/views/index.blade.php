@extends('layouts.default')

@section('content')
    <p>
        @if (Auth::guest())
            User is guest
        @else
            {{ Auth::user()->username }}
            @if (Auth::user()->isAdmin())

            @endif
        @endif
    </p>
@stop