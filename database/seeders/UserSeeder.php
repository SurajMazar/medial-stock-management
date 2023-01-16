<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'name'=>'Aradhana',
            'email'=>'info.ahealthcare@gmail.com',
            'password'=>Hash::make('info@ahealthcare')
        ]);

        $user->assignRole('admin');
    }
}
