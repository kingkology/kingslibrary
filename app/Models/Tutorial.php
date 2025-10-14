<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tutorial extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'title',
        'slug',
        'description',
        'content',
        'category',
        'difficulty',
        'order',
        'status',
        'estimated_time',
        'prerequisites'
    ];
    
    protected $casts = [
        'prerequisites' => 'array'
    ];
    
    public function snippets()
    {
        return $this->hasMany(Snippet::class);
    }
    
    public function getRouteKeyName()
    {
        return 'slug';
    }
}