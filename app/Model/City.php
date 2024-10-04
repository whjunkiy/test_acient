<?php

namespace App\Model;

use App\Helpers\AllHelper;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Http;

class City extends Model
{
    protected $table = 'cities';
    protected $hidden = ['pivot'];
    protected $fillable = ['name'];

    public static function getCities(){
        $link = 'https://api.hh.ru/areas';
        try {
            $response = Http::withoutVerifying()->get($link);
            $data = json_decode($response->body(), 1);
            $cities = [];
            foreach ($data[0]['areas'] as $area) {
                foreach ($area['areas'] as $city) {
                    $cities[] = [
                        'name' => $city['name'],
                        'slug' => AllHelper::trans($city['name']),
                    ];
                }
            }
            City::insert($cities);
        } catch (\Exception $exception) {
            return ['status' => 0, 'msg' => 'not ok'];
        }
        return ['status' => 1, 'msg' => 'ok'];
    }
}