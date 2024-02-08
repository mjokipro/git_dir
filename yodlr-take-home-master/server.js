"use strict";

const app = require("./index");
var logger = require('./lib/logger');
var log = logger(app);

app.set('port', +process.env.PORT || 3001);

var server = app.listen(app.get('port'), function() {
  log.info(
    'Express server listening on http://localhost:%d',
    server.address().port
  );
});