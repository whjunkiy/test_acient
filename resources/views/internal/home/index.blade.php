@extends('layouts.default')

@section('title', 'Index')
@section('content')
    <div>
        Header: <span id="cur_city"></span>
    </div>
    <br/>
    <h2>Content:</h2>
    <div>
        <ul class="cityul">
            @foreach($cities as $city)
                <li data-slug="{{$city->slug}}">{{ $city->name }}</li>
            @endforeach
        </ul>
    </div>
@stop