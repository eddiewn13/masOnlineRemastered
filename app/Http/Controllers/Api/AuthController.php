<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Mailjet\Resources;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();
        /** @var $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'permission_id' => $data['permission_id'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response(
                [
                    'message' => 'Provided email address and password is incorrect',
                ],
                422,
            );
        }
        /** @var $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        user::where('email', $user->email)->update(['reset_code' => null]);
        return response(compact('user', 'token'));
    }

    public function logout(Request $request)
    {
        /** @var $user */
        $user = request()->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }

    public function reset(Request $request)
    {
        $email = $request->email;
        $resetCode = rand(100000, 999999);
        while (user::where('reset_code', $resetCode)->exists()) {
            $resetCode = rand(100000, 999999);
        }
        user::where('email', $email)->update(['reset_code' => $resetCode]);

        require '../vendor/autoload.php';
        $mj = new \Mailjet\Client('b946868388a80c3596f6cfd72a669fa8', '7707c820d239b0cf7d2bec8c4ba04b48', true, ['version' => 'v3.1']);
        $body = [
            'Messages' => [
                [
                    'From' => [
                        'Email' => 'simon.myrvold@elev.ga.ntig.se',
                        'Name' => 'Simon',
                    ],
                    'To' => [
                        [
                            'Email' => $email,
                            'Name' => 'User',
                        ],
                    ],
                    'Subject' => 'Reset password',
                    'TextPart' => '',
                    'HTMLPart' => '<h3>Hello, </h3><br />Your reset code is: ' . $resetCode . '<br />Be so kind and change your password to something secure<br />Best regards, MasOnline!',
                    'CustomID' => 'AppGettingStartedTest',
                ],
            ],
        ];
        $response = $mj->post(Resources::$Email, ['body' => $body]);
        $response->success() && var_dump($response->getData());
    }

    public function code(Request $request)
    {
        $user = User::where('reset_code', $request->code)->first();
        if ($user) {
            return response()->json(['user' => $user], 200);
        } else {
            return response()->json(['error' => 'Invalid reset code'], 400);
        }
    }

    public function newpassword(Request $request){
        $user = User::where('id', $request->userid)->first();
        if ($user) {
            $user->password = bcrypt($request->password);
            $user->reset_code = null;
            $user->save();
            return response()->json(['user' => $user], 200);
        } else {
            return response()->json(['error' => 'Invalid reset code'], 400);
        }
    }
}
