
var assert = require('better-assert')
var csv = require('csv-parse')
var fs = require('fs');
var through = require('through');
var parser = require('csv-record-parser')
var record = require('..')
var join = require('path').join;

var file = join(__dirname, "test.csv");

function person(csv) {
  return { 
    name: csv.col('name'),
    age: +csv.col('age')
  }
}


describe('csv-record-parser-stream', function(){
  it('works', function(done){
    var rec = 0;

    fs.createReadStream(file)
    .pipe(csv())
    .pipe(record(person, parser()))
    .pipe(through(function(person){
      switch(++rec) {
        case 1:
          assert(person.name === "Bill");
          assert(person.age === 25);
          break;
        case 2:
          assert(person.name === "John");
          assert(person.age === 24);
          done();
          break;
      }
    }));
  });

  it('works with default parser', function(done){
    var rec = 0;

    fs.createReadStream(file)
    .pipe(csv())
    .pipe(record(person))
    .pipe(through(function(person){
      switch(++rec) {
        case 1:
          assert(person.name === "Bill");
          assert(person.age === 25);
          break;
        case 2:
          assert(person.name === "John");
          assert(person.age === 24);
          done();
          break;
      }
    }));
  });
});
