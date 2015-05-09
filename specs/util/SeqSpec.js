var chai = require("chai");

import Seq from "../../src/util/Seq.js";

describe('A basic test', function (){
  it('Should have one passing spec',function(){
    //expect(true).toBeTruthy();
      chai.assert.equal(-1, [1,2,3].indexOf(5));
  });
});