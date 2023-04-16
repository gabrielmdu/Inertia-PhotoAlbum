<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Response;
use Laravel\Sanctum\NewAccessToken;

class TokensController extends Controller
{
    public function store(LoginRequest $request)
    {
        $request->authenticate();

        /** @var NewAccessToken */
        $token = $request
            ->user()
            ->createToken('ipa_token', ['*'], now()->addMinutes(config('sanctum.expiration')));

        return response([
            'token' => $token->plainTextToken,
            'expiration' => $token->accessToken->expires_at->timestamp
        ], Response::HTTP_CREATED);
    }
}
