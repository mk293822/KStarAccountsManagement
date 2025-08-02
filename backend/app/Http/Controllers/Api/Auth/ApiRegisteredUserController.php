<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;

class ApiRegisteredUserController extends Controller
{

	public function getUser(Request $request): JsonResponse
	{
		return response()->json([
			'data' => [
				'user' => $request->user(),
			]
		]);
	}

	/**
	 * Handle an incoming registration request.
	 *
	 * @throws \Illuminate\Validation\ValidationException
	 */
	public function store(Request $request): JsonResponse
	{
		try{
			$request->validate([
				'name' => 'required|string|max:255',
				'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
				'password' => ['required', 'confirmed', Rules\Password::defaults()],
			]);

			$user = User::create([
				'name' => $request->name,
				'email' => $request->email,
				'password' => Hash::make($request->password),
			]);

			event(new Registered($user));

			Auth::login($user);

			$token = $user->createToken("auth-token")->plainTextToken;

			return response()->json([
				'message' => 'User registered successfully',
				'data' => [
					'user' => [
						'id' => $user->id,
						'name' => $user->name,
						'email' => $user->email,
						'created_at' => $user->created_at,
					],
					'token' => $token
				]
			], 201);
		} catch (ValidationException $e) {
			return response()->json([
				'message' => 'Validation failed',
				'errors' => $e->errors()
			], 422);
		} catch (\Exception $e) {
			return response()->json([
				'message' => 'Registration failed',
				'error' => 'An unexpected error occurred'
			], 500);
		}

	}
}
