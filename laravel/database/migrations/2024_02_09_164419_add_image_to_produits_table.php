<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddImageToProduitsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('produits', function (Blueprint $table) {
            $table->string('image')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('produits', function (Blueprint $table) {
            $table->dropColumn('image');
        });
    }
    
}
