<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Passport\HasApiTokens;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'User registered successfully'], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');


        if (auth()->attempt($credentials)) {
            $user = auth()->user();
            if ($user->status === 'inactive') {
                return response()->json(['error' => 'Your account is deactivated. Please contact the administrator.'], 403);
            }
            $token = $user->createToken('Personal Access Token')->accessToken;
            $role = $user->role;

            return response()->json(['token' => $token,'role' => $role], 200);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }

    public function getUser(Request $request)
    {
        \Log::info('getUser method was called.');
        return response()->json($request->user());
    }
    public function logout(Request $request)
    {
        Auth::guard('api')->user()->token()->revoke();

        return response()->json(['message' => 'User logged out successfully.']);
    }
}
