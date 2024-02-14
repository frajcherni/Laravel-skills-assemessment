<?php

// app/Http/Controllers/CommandeController.php

namespace App\Http\Controllers;

use App\Models\Commande;
use Illuminate\Http\Request;

class CommandeController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required',
            'total' => 'required',

            
            'products' => 'required|array',
        ]);

        $user_id = $request->input('user_id');
        $total= $request->input('total');

        $products = $request->input('products');

        foreach ($products as $product) {
            Commande::create([
                'user_id' => $user_id,
                'nom' => $product['nom'],
                'prix' => $product['prix'],
                'quantite' => $product['quantite'],
                'categorie_nom' => $product['categorie_nom'],

                'total' => $total,
                



            ]);
        }

        return response()->json(['message' => 'Orders created successfully'], 201);
    }

    public function getUserCommandes($user_id)
    {
        // No need to validate, as $user_id is coming from the route parameter
    
        $userCommandes = Commande::where('user_id', $user_id)->get();
    
        return response()->json(['user_commandes' => $userCommandes], 200);
    }

    
    public function getAllCommands()
    {
        $allCommands = Commande::all();
        return response()->json(['all_commands' => $allCommands], 200);
    }
}
