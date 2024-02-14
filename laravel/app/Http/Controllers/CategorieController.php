<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categorie;

class CategorieController extends Controller
{
    // Display a listing of the categories
    public function index()
    {
        return Categorie::all();
    }

    // Store a newly created category in the database
    public function store(Request $request)
    {
        return Categorie::create($request->all());
    }

    // Display the specified category
    public function show(Categorie $categorie)
    {
        return $categorie;
    }

    // Update the specified category in the database
    public function update(Request $request, Categorie $categorie)
    {
        $categorie->update($request->all());
        return $categorie;
    }

    // Remove the specified category from the database
    public function destroy(Categorie $categorie)
    {
        $categorie->delete();
        return ['message' => 'Category deleted successfully'];
    }
}
