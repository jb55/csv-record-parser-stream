
var through = require('through');

/**
 * through stream for csv-record-parser
 */

module.exports = function(parser, parse){
  var first = true;

  return through(function(row){
    if (first) {
      parser.header(row);
      first = false;
      return;
    }

    parser.row(row);
    this.queue(parse(parser))
  });
}
