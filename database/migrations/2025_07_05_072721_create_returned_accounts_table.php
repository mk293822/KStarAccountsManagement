<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('returned_accounts', function (Blueprint $table) {
            $table->id();
            $table->string('name')->index();
            $table->foreignId('account_id')->index()->constrained('accounts')->cascadeOnDelete();
            $table->unsignedBigInteger('return_price');
            $table->unsignedBigInteger('sold_price');
            $table->boolean('is_password_changed')->default(false);
            $table->date('returned_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('returned_accounts');
    }
};
