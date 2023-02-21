<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Permission;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Permission::factory()->create([
            'name' => 'admin',
        ]);
        Permission::factory()->create([
            'name' => 'user',
        ]);
        Permission::factory()->create([
            'name' => 'premium',
        ]);
        
        \App\Models\Image::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
