<?php

namespace App\Model\User\Auth;

use Illuminate\Database\Eloquent\Model;

class _2FA extends Model
{
    protected $table = 'nyvemrdatabase.user_auth_2fa';
    protected $primaryKey = 'id';

    protected $fillable = [];
    const UPDATED_AT = null;

    protected $attributes = array();

    protected $casts = [
        'created_at' => 'timestamp',
        'expire_at' => 'timestamp',
        'deleted_at' => 'timestamp',
        'u_key' => 'string',
        'user_id' => 'int',
        'secure_code' => 'string'
    ];
}
