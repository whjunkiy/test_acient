<?php

namespace App\Http\Requests\Forms;

use Illuminate\Foundation\Http\FormRequest;

class FinacialRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'patient_id' => 'required|integer',
            'form_id' => 'required|string|max:64',
            'patient_name' => 'required|string|max:128',
            'patient' => 'required|string|max:128',
            'patient_signature' => 'required|string|max:128',
            'signed_date' => 'required|date',
        ];
    }
}
