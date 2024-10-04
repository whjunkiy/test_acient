<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Validator;


class MyRequest extends FormRequest
{
    public static $validationRules = [
        'tasks' => [
            'create' => [
                'title' => 'required|max:128',
                'status' => 'digits_between:0,2',
                'deadline' => 'date_format:d.m.Y H:i:s'
            ],
            'delete' => [
                'id' => 'required|digits_between:1,20'
            ],
            'update' => [
                'title' => 'string|max:128',
                'status' => 'digits_between:0,2',
                'deadline' => 'date_format:d.m.Y H:i:s',
                'id' => 'required|digits_between:1,20'
            ],
        ],
        'students' => [
            'create' => [
                'name' => 'required|max:128',
                'email' => 'required|unique:students,email|max:128',
                'clas_id' => 'required|digits_between:1,20'
            ],
            'update' => [
                'name' => 'max:128',
                'clas_id' => 'digits_between:1,20'
            ],
            'delete' => [
                'id' => 'required|digits_between:1,20'
            ],
        ],
        'clas' => [
            'delete' => [
                'id' => 'required|digits_between:1,20'
            ],
            'setPlan' => [
                'id' => 'required|digits_between:1,20',
                'lectures' => 'required|array'
            ],
            'create' => [
                'name' => 'required|max:128|unique:clases,name',
            ],
            'update' => [
                'name' => 'required|max:128|unique:clases,name',
                'id' => 'required|digits_between:1,20'
            ],
        ],
        'lecture' => [
            'create' => [
                'theme' => 'required|max:128|unique:lectures,theme',
            ],
            'update' => [
                'theme' => 'required|max:128|unique:clases,name',
                'id' => 'required|digits_between:1,20'
            ],
            'delete' => [
                'id' => 'required|digits_between:1,20'
            ],
        ]
    ];

    public function isValid(array $rules) : array
    {
        $resp = [
            'is_valid' => [],
            'data' => [],
        ];
        $resp['data'] = json_decode($this->getContent(), true);

       /*$data = [
            'title' => 't3',
            'description' => 't3',
            'status' => 2,
            'deadline' => '19.07.2024 12:00:00'
        ];
        $resp['data'] = $data;*/

        $validator = Validator::make($resp['data'], $rules);

        if ($validator->fails()) {
            $resp['is_valid'] = $validator->errors()->all();
        }
        return $resp;
    }
}