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
        Schema::create('accounts', function (Blueprint $table) {
            $table->id();
            $table->string('account_name');
            $table->string('account_email')->unique();
            $table->string('seller_name')->index();
            $table->string('buyer_name')->index()->nullable();
            // integers
            $table->unsignedTinyInteger('th_level', false)->index();
            $table->unsignedBigInteger('bought_price');
            $table->unsignedBigInteger('sold_price')->default(0);
            $table->unsignedBigInteger('profit')->default(0);
            $table->unsignedBigInteger('loss')->default(0);
            // booleans
            $table->boolean('is_acc_protection_changed')->index()->default(true);
            $table->boolean('is_sold')->index()->default(false);
            $table->boolean('is_email_changed')->index()->default(true);
            $table->boolean('is_email_disabled')->index()->default(false);
            $table->boolean('is_returned')->index()->default(false);
            $table->boolean('is_deposit')->index()->default(false);
            // admins
            $table->foreignId('sold_by')->index()->nullable()->constrained('users')->noActionOnDelete();
            $table->foreignId('bought_by')->index()->constrained('users')->noActionOnDelete();
            // dates
            $table->timestamp('bought_date');
            $table->timestamp('sold_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounts');
    }
};
