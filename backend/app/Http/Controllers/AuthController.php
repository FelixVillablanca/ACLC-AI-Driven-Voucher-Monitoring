<?php

namespace App\Http\Controllers;

// use App\Models\r;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;


class AuthController extends Controller
{

    public function checkIP(Request $request)
    {
        $ipAddress = $request->query('ip', $request->ip());
        $user = User::where('ip_address', $ipAddress)->first();

        if ($user) {
            return response()->json([
                'foundUser' => [
                    'ip_address' => $user->ip_address,
                    'account_auth' => $user->account_auth,
                ]
            ], 200);
        }

        return response()->json([
            'foundUser' => null,
            'message' => 'No user found with this IP'
        ], 404);
    }

    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ], [
            'password.confirmed' => 'The password confirmation does not match.',
            'email.unique' => 'This email is already registered.',
        ]);
        
        $validatedData['password'] = Hash::make($validatedData['password']);
        
        $roleID = null;

        if (str_contains($validatedData['email'], '@admin.aclc.com')) {
            $roleID = DB::table('roles')->where('name', 'admin')->pluck('id')->first();
        } 
        elseif (str_contains($validatedData['email'], '@cashier.aclc.com')) {
            $roleID = DB::table('roles')->where('name', 'cashier')->pluck('id')->first();
        } 
        elseif (str_contains($validatedData['email'], '@student.aclc.com')) {
            $roleID = DB::table('roles')->where('name', 'student')->pluck('id')->first();
        }

        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => $validatedData['password'],
            'role_id' => $roleID,
            'ip_address' => $request->ip(),
            'account_auth' => 'pending',
        ]);

        return response()->json([
                'success' => true,
                'message' => 'User registered successfully', 
                'user' => $user->makeHidden(['password']),
        ], 201);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $r)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $r)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $r)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $r)
    {
        //
    }
}
