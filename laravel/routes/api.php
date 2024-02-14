<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use  App\Http\Controllers\AuthController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login',[AuthController::class,'login']);
Route::post('register', [AuthController::class,'register']);
Route::group(['middleware'=>'api'],function(){

    Route::post('logout',[AuthController::class,'logout']);
    Route::post('refresh',[AuthController::class,'refresh']);
    Route::post('me',[AuthController::class,'me']);


});

use App\Http\Controllers\CategorieController;

Route::apiResource('categories', CategorieController::class);

use App\Http\Controllers\ProduitController;

Route::apiResource('produits', ProduitController::class);
Route::put('products/{productId}/updateQuantity', [ProduitController::class, 'updateQuantity']);





// routes/api.php

use App\Http\Controllers\CommandeController;

Route::post('/commandes', [CommandeController::class, 'store']);

Route::get('user-commandes/{user_id}', [CommandeController::class, 'getUserCommandes']);




Route::get('/products', [ProduitController::class, 'index']);


Route::get('/allcommands', [CommandeController::class, 'getAllCommands']);

