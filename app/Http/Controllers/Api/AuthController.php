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
  public function signup(SignupRequest $request){
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
  
  public function login(LoginRequest $request){
    $credentials = $request->validated();
    if (!Auth::attempt($credentials)) {
      return response([
        'message' => 'Provided email address and password is incorrect'
      ], 422);
    }
    /** @var $user */
    $user = Auth::user();
    $token = $user->createToken('main')->plainTextToken;
    return response(compact('user', 'token'));
  }
  
  public function logout(Request $request){
    /** @var $user */
        $user = request()->user();
        $user->currentAccessToken()->delete();
        return response("", 204);
      }
      
      public function reset(Request $request){
        $email = $request->email;

        $password = User::where('email', $email)->first()->password;

        require '../vendor/autoload.php';
        $mj = new \Mailjet\Client('b946868388a80c3596f6cfd72a669fa8', '7707c820d239b0cf7d2bec8c4ba04b48', true, ['version' => 'v3.1']);
        $body = [
          'Messages' => [
            [
              'From' => [
                'Email' => "simon.myrvold@elev.ga.ntig.se",
                'Name' => "Simon"
              ],
              'To' => [
                [
                  'Email' => $email,
                  'Name' => "User"
                ]
              ],
              'Subject' => "Reset password",
              'TextPart' => "",
              'HTMLPart' => "<h3>Hello USER</h3><br />Your password is" . $password . "<br />Be so kind and change it to something more secure.<br />Best regards, MasOnline!",
              'CustomID' => "AppGettingStartedTest"
            ]
          ]
        ];
        $response = $mj->post(Resources::$Email, ['body' => $body]);
        $response->success() && var_dump($response->getData());
    }
}
