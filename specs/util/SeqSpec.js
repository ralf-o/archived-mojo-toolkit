var chai = require("chai");

var Seq = require("../../src/util/Seq.js");

describe('A basic test', function (){
  it('Should have one passing spec',function(){
    //expect(true).toBeTruthy();
      chai.expect(Seq.of(1,2,4).toArray()).to.eql([1,2,4]);
  });
});