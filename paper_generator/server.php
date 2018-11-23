<?PHP

  // single server script for handling both:
  // POSTing data to the server AND GETting all data from the server

  // directory where all data are stored
  // security: locate directory of files outside of WWW folders:
  $dir = "../logs/";

  /**
   * finish php script and send message to client
   * in AJAX calls e.g. fetch requests
   * e.g. JSONP requests
   * @param $msg message
   */
  function response( $msg )
  {
    // encode message to JSON
    $msg = json_encode( $msg, JSON_UNESCAPED_UNICODE );

    // filter received dynamic function name (jsonp)
    $callback = filter_input( INPUT_GET, 'callback', FILTER_SANITIZE_STRING );

    // is cross domain request?
    if ( isset( $callback ) )
    {
      // padding message in function call (jsonp)
      $msg = $callback.'('.$msg.');';
    }

    // send message to client
    die( $msg );
  }

  // Allow cross origin = CORS
  if (isset($_SERVER['HTTP_ORIGIN'])) {
     header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
     header('Access-Control-Allow-Credentials: true');
     header('Access-Control-Max-Age: 86400');    // cache for 1 day
  }
  // Access-Control headers are received during OPTIONS requests
  if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

     if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
         header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

     if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
         header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

  } else if ($_SERVER['REQUEST_METHOD'] == 'POST') { // HTTP POST request
      // security: prevent uploading PHP files or other executable scripts
      // by filtering JSON and nothing else but JSON
      // by using json_decode() and json_encode()

      // get raw POST data string
      $raw_data = file_get_contents('php://input');

      // decode string into PHP array for security reasons
      $json_data = json_decode( $raw_data, true, 512, JSON_UNESCAPED_UNICODE );

      // add server data
      if ( isset( $_SERVER['HTTP_REFERER'] )){
        $json_data["HTTP_REFERER"] = $_SERVER['HTTP_REFERER'];
      }

      // add server date
      $json_data["server_time"] = date("Y-m-d H:i:s");

      // unique filename with time stamp and unique ID
      $filename = $dir . time() . '_' . uniqid() . ".json";

      // write JSON code to the new file
      file_put_contents( $filename, json_encode( $json_data, JSON_UNESCAPED_UNICODE ) );

    } else if ($_SERVER['REQUEST_METHOD'] == 'GET') { // HTTP GET request

      // collect all files from directory
      // decode JSON into PHP arrays

      // collect all files in the directory "$dir" except '.', '..'
      $files = array_diff( scandir($dir), array('.', '..') );

      // push all of them into a single large array "$all"
      $all = array();
      foreach( $files as $file ){
        // array push
        $all[] = json_decode( file_get_contents( $dir . $file ), false, 512, JSON_UNESCAPED_UNICODE );
      }

      // encode the large array and send it back to the client
      response( $all );

    }

?>