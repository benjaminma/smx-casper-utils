// Casper/PhantomJS helper library

// Exit and logging helper function
var exit = function(code, message, level) {
  code = code || 0;

  // Optional error message
  if (!!message) {
    if (code > 0) {
      level = level || 'error';
    }
    casper.log(message, level);
  }

  casper.log('Exiting with code (' + code + ')...');
  phantom.exit(code);
  
  if (phantom.kill) {
    phantom.kill();
  }
};

// Map casper.cli args array to object
// e.g. ['-key1', 'val1', '-key2', 'val2'...]
var getArgv = function(arr) {
  var argv = [];
  var k;
  var v;

  // Map by key, value pairs
  while (arr.length > 1) {
    v = arr.pop();
    k = arr.pop();
    if ((k.length > 1) && (k.charAt(0) === '-')) {
      k = k.slice(1);
      argv[k] = v;
    }
  }

  return argv;
};

exports.exit = exit;
exports.getArgv = getArgv;
