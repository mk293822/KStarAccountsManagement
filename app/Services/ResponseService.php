<?php

namespace App\Services;

use Illuminate\Http\JsonResponse;

class ResponseService
{
	public static function success(string $message = 'Success', $data = [], int $code = 200): JsonResponse
	{
		return response()->json([
			'message' => $message,
			'data' => $data,
		], $code);
	}

	public static function error(string $message = 'Error', $error = [], int $code = 500): JsonResponse
	{
		return response()->json([
			'message' => $message,
			'error' => $error,
		], $code);
	}

	public static function validationError($error = []): JsonResponse
	{
		return self::error('Validation failed.', $error, 422);
	}

	public static function serviceError($e, int $code = 500): array
	{
		return [
			"data" => $e,
			"status" => $code
		];
	}
}
