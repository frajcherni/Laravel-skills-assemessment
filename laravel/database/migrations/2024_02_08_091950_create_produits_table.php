<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProduitsTable extends Migration
{
    public function up()
    {
        Schema::create('produits', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->decimal('prix', 8, 2);
            $table->string('categorie_nom'); 
            $table->integer('quantite');
            $table->timestamps();

            $table->foreign('categorie_nom')->references('nom')->on('categories');
        });
    }

    public function down()
    {
        Schema::dropIfExists('produits');
    }
}

