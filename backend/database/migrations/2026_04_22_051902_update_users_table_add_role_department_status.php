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
        Schema::table('users', function (Blueprint $table) {
        // Only add if not already present
        if (!Schema::hasColumn('users', 'role_id')) {
            $table->unsignedBigInteger('role_id')->nullable()->after('id');
        }

        if (!Schema::hasColumn('users', 'department_id')) {
            $table->unsignedBigInteger('department_id')->nullable()->after('role_id');
        }

        if (!Schema::hasColumn('users', 'status')) {
            $table->enum('status', ['active', 'inactive'])->default('active')->after('department_id');
        }

        $table->foreign('role_id')->references('id')->on('roles')->onDelete('set null');
        $table->foreign('department_id')->references('id')->on('departments')->onDelete('set null');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['role_id']);
            $table->dropForeign(['department_id']);
            $table->dropColumn(['role_id', 'department_id', 'status']);            
        });
    }
};
