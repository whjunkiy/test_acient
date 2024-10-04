<?php

namespace App\Http\Requests\LabsOrder;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class OrderDataRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'order_items.*.type' => 'required|integer',
            'order_items.*.comment' => 'string|max:65|nullable',
            'order_items.*.patient' => 'required|integer',
            'order_items.*.date' => 'required|date',
            'order_items.*.codes' => 'required|array',
            'order_items.*.codes.*' => [
                'required',
                'integer',
                Rule::exists('labs_codes_list', 'id')
            ],
        ];
    }

    public function attributes()
    {
        return [
            'order_items.*.type' => 'Type',
            'order_items.*.comment' => 'Comment',
            'order_items.*.date' => 'Date',
            'order_items.*.codes' => 'Codes',
            'order_items.*.codes.*' => 'Code ID',
        ];
    }
}
