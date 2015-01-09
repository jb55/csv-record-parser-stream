
var through = require('through');
var recordParser = require('csv-record-parser');

/**
 * through stream for csv-record-parser
 */

module.exports = function(parse, parser){
  if (parser == null) parser = recordParser();
  var first = true;

  return through(function(row){
    if (first) {
      parser.header(row);
      first = false;
      return;
    }

    parser.row(row);
    result = parse(parser)
    if(!result) return;
    this.queue(result)
  });
}
