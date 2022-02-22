<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role as ModelsRole;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ModelsRole::create([
            'name'=>'admin'
        ]);


        ModelsRole::create([
            'name'=>'lab'
        ]);


        ModelsRole::create([
            'name'=>'sale'
        ]);
    }
}
