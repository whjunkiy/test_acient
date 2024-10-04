<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ICDCodeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'com_dx_code'=>'required|string|max:255',
            'com_dx_name'=>'required|string',
            'com_dx_code_old'=>'nullable|string',
            'com_dx_name_old'=>'nullable|string'
        ];
    }


    public function attributes()
    {
        return [
            'com_dx_code'=>'DX Code',
            'com_dx_name'=>'Description',
        ];
    }
}
