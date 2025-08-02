<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class ApiAuthenticatedSessionController extends Controller
{
	/**
	 * Handle an incoming authentication request.
	 */
	public function store(LoginRequest $request): JsonResponse
	{
		try{

			if (!Auth::attempt($request->validated())) {
				return response()->json([
					'message' => 'Invalid credentials'
				], 401);
			}

			$user = Auth::user();
			$token = $user->createToken("auth-token")->plainTextToken;

			return response()->json([
				'message' => 'Login successful',
				'data' => [
					'user' => [
						'id' => $user->id,
						'name' => $user->name,
						'email' => $user->email,
					],
					'token' => $token
				]
			]);
		} catch (ValidationException $e) {
			return response()->json([
				'message' => 'Validation failed',
				'errors' => $e->errors()
			], 422);
		} catch (\Exception $e) {
			return response()->json([
				'message' => 'Login failed',
				'error' => 'An unexpected error occurred'
			], 500);
		}
	}

	/**
	 * Destroy an authenticated session.
	 */
	public function destroy(Request $request): JsonResponse
	{
		try {
			$request->user()->currentAccessToken()->delete();

			return response()->json([
				'message' => 'Logged out successfully'
			]);
		} catch (\Exception $e) {
			return response()->json([
				'message' => 'Logout failed',
				'error' => 'An unexpected error occurred'
			], 500);
		}
	}
}
