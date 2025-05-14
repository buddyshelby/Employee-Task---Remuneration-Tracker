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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id('task_id');
            $table->string('employee_name');
            $table->text('task_description');
            $table->date('date');
            $table->integer('hours_spent');
            $table->integer('hourly_rate');
            $table->integer('additional_charges')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks'); // delete table jika diperlukan (?)
    }
};
