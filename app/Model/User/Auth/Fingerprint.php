<?php

namespace App\Model\User\Auth;

use Illuminate\Database\Eloquent\Model;

class Fingerprint extends Model
{
    protected $table = 'nyvemrdatabase.user_auth_fingerprint';
    protected $primaryKey = 'id';

    protected $fillable = [];
    const UPDATED_AT = null;

    protected $attributes = array();

    protected $casts = [
        'user_id' => 'int',
        'created_at' => 'timestamp',
        'expire_at' => 'timestamp',
        'hash_data' => 'string',
    ];
}