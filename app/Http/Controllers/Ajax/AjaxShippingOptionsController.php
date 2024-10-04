<?php

namespace App\Http\Controllers\Ajax;

use App\Model\ShippingOption;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AjaxShippingOptionsController extends Controller
{

    public function ShippingOptionsAjaxList()
    {
        $optionsList = ShippingOption::withTrashed()->get();
        return Response::json(['success' => true, 'options' => $optionsList]);

    }
    public function getList()
    {
        $optionsList = ShippingOption::withTrashed()->get();
        $html = view('internal.shipping_options.options-list', ['options' => $optionsList])->render();
        return Response::json(['success' => true, 'html' => $html]);
    }

    public function optionDelete(Request $request) {
        $data = $request->only(['id']);
        try {
            $option = ShippingOption::findOrFail($data['id']);
            $option->delete();
            $result = [
                'success' => true,
            ];
        } catch (\Exception $e) {
            $result['success'] = false;
            $result['trace'] = $e->getTrace();
            $result['exception'] = $e->getMessage();
        }
        return Response::json($result);
    }

    public function optionRestore(Request $request) {
        $data = $request->only(['id']);
        try {
            ShippingOption::onlyTrashed()->where('id', $data['id'])->restore();
            $result = [
                'success' => true,
            ];
        } catch (\Exception $e) {
            $result['success'] = false;
            $result['trace'] = $e->getTrace();
            $result['exception'] = $e->getMessage();
        }
        return Response::json($result);
    }

    public function getOption($id)
    {
        try {
            $option = ShippingOption::findOrFail($id);
            if (!$option) {
                throw new \Exception('Unknown option id');
            }
            $result = [];
            $result['success'] = true;
            $result['option'] = $option;
        } catch (\Exception $e) {
            $result['success'] = false;
            $result['trace'] = $e->getTrace();
            $result['exception'] = $e->getMessage();
        }

        return Response::json($result);
    }

    public function addOption(Request $request)
    {
        $data = $request->only(['shipping_option', 'price', 'default_pharmacy', 'cold_shipping']);
        $code = ShippingOption::create([
            'shipping_option' => $data['shipping_option'],
            'price' => $data['price'],
            'default_pharmacy' => $data['default_pharmacy'],
            'cold_shipping' => $data['cold_shipping']
        ]);
        if ($code) {
            $result = [
                'success' => true,
                'data' => $code
            ];
        }
        return Response::json($result);
    }

    public function editOption(Request $request, ShippingOption $option)
    {
        $data = $request->only(['shipping_option', 'price', 'default_pharmacy', 'cold_shipping']);
        $option->fill($data);
        $option->save();
        $result = [
            'data' => $data,
            'success' => true
        ];
        return Response::json($result);
    }
}
