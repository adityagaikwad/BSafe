<?php
$r = file_get_contents('php://input');
$_POST = json_decode($r, true);
if (isset($_POST["url"]) && !empty($_POST["url"]))
  { //Checks if action value exists
    $url = $_POST['url'];
}
else{
   $url = " http://www.ixxi.com.mx/pp/log-in/customer_center/customer-IDPP00C877/myaccount/signin/ ";
    // $url = "https://www.google.co.in";
} 

// var_dump($_POST);
// var_dump();

$url = trim($url);
$debug = false;
$url = strtolower($url);
// $url = urlencode($url);

$url_parsed = parse_url($url);
// print_r($url_parsed);
$url = $url_parsed['host']; 
if (isset($url_parsed['path'])) $url .= $url_parsed['path'];
if (isset($url_parsed['query'])) $url .= $url_parsed['query'];
$url = urldecode($url); //remove hex encodings
$url = preg_replace('/^\.*/','', $url); //remove leading dots
$url = preg_replace('/\.*$/','', $url); //remove trailing dots
$url = preg_replace('/\.+/','.', $url); //replace consecutive dots
$url = preg_replace('/\/+/','/', $url); //replace consecutive slashes
// echo $url;
$url = iconv(mb_detect_encoding($url, mb_detect_order(), true), "UTF-8", $url);
$url = urlencode($url);
// print_r($url);
$has_resource = false;
if (isset($url_parsed['path'])) {
    $path = $url_parsed['path'];
    $path_array = split('/',$path);
    $target = $path_array[count($path_array)-1];
    if (! strpos($target,'.') && substr($target,-1)!='/') $url .= '/';
    else $has_resource = true;
}


if ($debug){ echo "<p>URL: $url</p>";}

    if ($debug){ echo "<p>Path: ".$url_parsed['path']."</p>";}

        $API_KEY = "AIzaSyBj1Ay3kGn2DeTIgGNeznf0hjaP9tGa6Ws";
        $url_final = "https://sb-ssl.google.com/safebrowsing/api/lookup?client=helloworld&key=" . $API_KEY . "&appver=1.5.2&pver=3.1&url=" . $url;
        $ch = curl_init();
        // echo $url_final;
        $timeout = 5;
        curl_setopt($ch,CURLOPT_URL,$url_final);
        curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
        curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,$timeout);
        $data = curl_exec($ch);
        $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        // echo 'HTTP code: ' . $httpcode;
        if ($httpcode != 200){
            $data = "ok";
        }
        echo json_encode(array( 'result' => $data));
        ?>
