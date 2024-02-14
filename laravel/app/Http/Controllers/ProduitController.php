<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Produit;

class ProduitController extends Controller
{
    public function index()
    {
        return response()->json(Produit::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'prix' => 'required|numeric',
            'quantite' => 'required|integer',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Handle image upload
        $path = $request->file('image')->store('product_images', 'public');

        $produit = Produit::create([
            'nom' => $request->nom,
            'prix' => $request->prix,
            'categorie_nom' => $request->categorie_nom,
            'quantite' => $request->quantite,
            'image' => $path, // Save the image path in the 'image' field
        ]);

        return response()->json($produit, 201);
    }

    public function show(Produit $produit)
    {
        // Access the image_url property directly
        $produit->image_url = $produit->image_url;

        return response()->json($produit);
    }

    public function update(Request $request, Produit $produit)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'prix' => 'required|numeric',
            'categorie_id' => 'required|exists:categories,id',
            'quantite' => 'required|integer',
        ]);

        $produit->update($request->all());

        return response()->json($produit, 200);
    }

    public function destroy(Produit $produit)
    {
        $produit->delete();

        return response()->json(null, 204);
    }

    public function updateQuantity($productId, Request $request)
    {
        $request->validate([
            'quantite' => 'required|integer|min:0',
        ]);
    
        $produit = Produit::find($productId);
    
        if (!$produit) {
            return response()->json(['error' => 'Product not found'], 404);
        }
    
        $produit->quantite = $request->input('quantite');
        $produit->save();
    
        return response()->json(['success' => true]);
    }
}
