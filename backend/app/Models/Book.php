<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $table = 'books';

    protected $fillable = [
        'title',
        'user_id',
        'cover_image',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id'); 
    }
}
