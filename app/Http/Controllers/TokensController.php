<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use Laravel\Sanctum\NewAccessToken;

class TokensController extends Controller
{
    public function create(LoginRequest $request)
    {
        $request->authenticate();

        /** @var NewAccessToken */
        $token = $request->user()->createToken('ipa_token', ['*'], now()->addMinutes(config('sanctum.expiration')));

        return [
            'token' => $token->plainTextToken,
            'expiration' => $token->accessToken->expires_at->timestamp
        ];
    }
}
