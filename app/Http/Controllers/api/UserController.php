<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserCollection;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index(Request $request){
        try{
            $users =  User::with('roles');
            // search 
            if($request->keyword){
                $users->Search($request->keyword);
            }
            $users = $users->paginate(10);
            return new UserCollection($users);
        }catch(Exception $e){
            failure($e->getMessage());
        }
    }


    public function store(UserRequest $request){
        try{
            $role = Role::where('name',$request->role)->first();
            $user  = User::create([
                'name'=>$request->name,
                'email'=>$request->email,
                'password'=>Hash::make($request->password)
            ]);

            $user->syncRoles($role);

            return success('User created successfully ', $user);
        }catch(Exception $e){
            failure($e->getMessage());
        }
    }


    public function update(UserUpdateRequest $request, $id){
        try{
            $role = Role::where('name',$request->role)->first();

            $user = User::findOrFail($id);
            $user->update([
                'name'=>$request->name,
                'email'=>$request->email,
            ]);
            $user->syncRoles($role);
            return success('User updated successfully ', $user);
        }catch(Exception $e){
            failure($e->getMessage());
        }
    }


    public function changePassword(Request $request, $id){

        $this->validate($request,[
            'password'=>'required|confirmed',
        ]);

        try{    
            $user = User::findOrFail($id);
            $user = $user->update([
                'password'=>Hash::make($request->password)
            ]);
            return success('Password changes successfully!');
        }catch(Exception $e){
            failure($e->getMessage());
        }

    }


    public function show($id){
        try{
            $user =  User::with('roles')->findOrfail($id);
            return success('user data',$user);
        }catch(Exception $e){
            failure($e->getMessage());
        }

    }


    public function destroy($id){
        try{
            $user = User::findOrFail($id);
            $user->forceDelete();
            return success('user was deleted');
        }catch(Exception $e){
            failure($e->getMessage());
        }  
    }
}
