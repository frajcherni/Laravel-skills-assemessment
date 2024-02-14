<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Produit extends Model
{
    protected $fillable = ['nom', 'prix', 'categorie_nom', 'quantite', 'image'];

    public function categorie()
    {
        return $this->belongsTo(Categorie::class, 'categorie_nom', 'nom');
    }
    public function getImageUrlAttribute()
{
    return asset('storage/' . $this->attributes['image']);
}
}
