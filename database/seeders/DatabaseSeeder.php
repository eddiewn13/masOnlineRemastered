<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Image;
use App\Models\Permission;
use Database\Factories\ImageFactory;
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
        
        // \App\Models\Image::factory(10)->create();

        Image::factory()->create([
            'name' => 'Lion',
            'path' => 'lion.png',
        ]);

        Image::factory()->create([
            'name' => 'Dog',
            'path' => 'dog.png',
        ]);

        Image::factory()->create([
            'name' => 'Anteater',
            'path' => 'anteater.png',
        ]);

        Image::factory()->create([
            'name' => 'Rhionoceros',
            'path' => 'rhinoceros.png',
        ]);

        Image::factory()->create([
            'name' => 'Zebra',
            'path' => 'zebra.png',
        ]);
        
        

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
