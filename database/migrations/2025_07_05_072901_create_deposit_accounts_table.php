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
        Schema::create('deposit_accounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('account_id')->index()->constrained('accounts')->cascadeOnDelete();
            $table->string('name')->index();
            $table->unsignedBigInteger('deposit_amount');
            $table->boolean('gave_account')->default(false);
            $table->date('deposit_date');
            $table->date('cancelled_date')->nullable();
			$table->boolean('cancelled')->default(false);
            $table->unsignedBigInteger('return_deposit_amount')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deposit_accounts');
    }
};
