<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\Simple;
use App\Model\User;
use App\Model\User\Auth\_2FA as _2FA;
use App\Queries\User\Auth\_2FAQuery;
use App\Queries\User\Auth\FingerprintQuery;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;


class LoginController extends Controller
{
    use AuthenticatesUsers;

    protected $redirectTo = '/';
    protected $urlLegacy;

    public function __construct()
    {
        $this->middleware('guest')->except('logout');
        $this->urlLegacy = config('app.url_legacy');
    }


    public function index() {
        return view('pages.log-in');
    }


    protected function legacyFor2FA($uKey, $authKey){
        $ch = curl_init();

        curl_setopt($ch,  CURLOPT_URL,  $this->urlLegacy.'process.php');
        curl_setopt($ch,  CURLOPT_RETURNTRANSFER,  1);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
        curl_setopt($ch,  CURLOPT_HEADER,  1);
        curl_setopt($ch,  CURLOPT_SSL_VERIFYPEER,  true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, ['u_key' => $uKey , 'ua_u_key' => $authKey, ]);

        $result = curl_exec($ch);
        $responseCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        if(200 !== $responseCode){
            return null;
        }
        preg_match_all('/^Set-Cookie:\s*([^;]*)/mi', $result,  $match_found);

        $cookies = array();
        foreach($match_found[1] as $item) {
            parse_str($item,  $cookie);
            $cookies = array_merge($cookies,  $cookie);
        }
        curl_close($ch);
        return $cookies;
    }

    protected function legacyAdvanced($credentials){

        $ch = curl_init();

        curl_setopt($ch,  CURLOPT_URL,  $this->urlLegacy.'process.php');
        curl_setopt($ch,  CURLOPT_RETURNTRANSFER,  1);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
        curl_setopt($ch,  CURLOPT_HEADER,  1);
        curl_setopt($ch,  CURLOPT_SSL_VERIFYPEER,  true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $user = $credentials['username'];
        $password = $credentials['password'];

        curl_setopt($ch, CURLOPT_POSTFIELDS, ['user' => $user , 'pass' => $password, 'sublogin' => 1,]);

        $result = curl_exec($ch);
        preg_match_all('/^Set-Cookie:\s*([^;]*)/mi', $result,  $match_found);
        error_log($result);
        $cookies = array();
        foreach($match_found[1] as $item) {
            parse_str($item,  $cookie);
            $cookies = array_merge($cookies,  $cookie);
        }
        curl_close($ch);

        foreach ($cookies as $k => $v){
            setcookie($k, $v, 0, '/');
        }
        return $cookies;
    }

    public function auth(Request $request){

        $credentials = $request->only('login', 'password');
        $credentials = array('username' => $credentials['login'], 'password' =>  $credentials['password'],);

        if(config('app.use_2fa')){

            if(Auth::once($credentials)){

                $user = Auth::user();

                if(config('app.use_fingerprint')){
                    $data = array($request->userAgent(), $request->getClientIp());
                    if(FingerprintQuery::validate($user->id, $data)) {
                        Auth::login($user);
                        $this->legacyAdvanced($credentials);

                        return redirect($this->urlLegacy);
                    }
                }

                # Continue if fingerprint has not been found/expired or option is disable

                $live2FArecord = _2FAQuery::nextValid($user->id);
                $request->session()->put('userId',$user->id );
                if($live2FArecord) {
                    $uKey = $live2FArecord->u_key;
                }else{
                    _2FAQuery::invalidateAll($user->id);
                    $uKey = Str::random(128);
                    $secureCode = sprintf('%06d', mt_rand(1, 999999));
                    $record = new _2FA();
                    $record->user_id = $user->id;
                    $record->u_key = $uKey;
                    $record->secure_code = $secureCode;
                    $record->save();
                    $simpleMail = new Simple([
                        'message' => 'Secure code: '.$secureCode,
                        'subject' => '2FA Secure code'
                    ]);
                    Mail::to($user->email)->send($simpleMail);
                }
                return redirect()->route('auth_2fa' , ['authKey' => $uKey,]);
            }
        }else{
            if(Auth::attempt($credentials)){
                $this->legacyAdvanced($credentials);
                return redirect($this->urlLegacy);
            }
        }

        return redirect()->back()
            ->withInput(['login' => $credentials['username'],])
            ->withErrors('Invalid username or password');
    }


    public function auth_2fa(Request $request, $authKey){
        return view('pages.auth-2fa', ['authKey' => $authKey,]);
    }

    public function auth_2fa_validate(Request $request, $authKey){

        $this->validate($request, [
            'secure_code' => 'required|numeric'
        ]);

        $values = $request->only('secure_code');

        $userId = (int)$request->session()->get('userId');
        $params = [$values['secure_code'], $authKey, $userId];
        if($secureCodeRecord = _2FAQuery::validate(...$params)){
            $secureCodeRecord->expire_at = DB::raw('NOW()');
            $secureCodeRecord->save();

            $user = User::find($userId);
            if(!$user){
                return redirect()->route('log_in')
                    ->withErrors('2FA session expired or invalid');
            }
            Auth::login($user);

            $legacyCookies = $this->legacyFor2FA($user->u_key, $authKey);
            if(!$legacyCookies){
                return redirect()->back()->withErrors('Auth process interrupted');
            }

            foreach ($legacyCookies as $k => $v){
                setcookie($k, $v, 0, '/');
            }

            if(config('app.use_fingerprint')){
                $data = array($request->userAgent(), $request->getClientIp());
                error_log(implode('|||', $data), 3, '/var/www/dev/emr/v2/error.log');
                FingerprintQuery::add($user->id, $data);
            }

            return redirect($this->urlLegacy);

        }
        return redirect()->back()->withErrors('Invalid secure code');
    }


    public function logout(Request $request) {
        Auth::logout();
        $request->session()->flush();
        setcookie('PHPSESSID', null, 1);
        return redirect($this->urlLegacy);
    }
}
