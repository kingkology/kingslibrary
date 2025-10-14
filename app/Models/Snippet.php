<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Snippet extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'tutorial_id',
        'title',
        'description',
        'code',
        'language',
        'category',
        'tags',
        'is_featured',
        'order'
    ];
    
    protected $casts = [
        'tags' => 'array',
        'is_featured' => 'boolean'
    ];
    
    public function tutorial()
    {
        return $this->belongsTo(Tutorial::class);
    }
}