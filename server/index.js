var express = require('express'),
    app     = express();

(function init(){
    
}());

(function start() {
    app.listen(8080, '0.0.0.0');
    console.log('Server listening on port :port'.replace(':port', 8080));
}());