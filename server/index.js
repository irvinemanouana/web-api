"use strict";

var express = require('express'),
    app     = express();

(function init(){
    require('./configs')(app);
    require('./actions')(app);
    require('./models')(app);
    require('./routes')(app);
}());

(function start() {
    app.listen(app.configs.server.port, app.configs.server.adress);
    console.log('Server listening on port :port'.replace(':port', app.configs.server.port));
}());