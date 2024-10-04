@extends('layouts.default')

@section('title', $city->name)
@section('content')
    <div>
        Header: <span>{{$city->name}}</span>
    </div>
    <br/>
    <h2>Content:</h2>
    <div>
        lorem text.
    </div>
@stop