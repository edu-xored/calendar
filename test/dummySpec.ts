import mocha = require('mocha');
import chai = require('chai');

function add(x: number, y: number): number {
  return x + y;
}

describe("example spec", () => {
  it("should add numbers", () => {
    chai.expect(add(2, 2)).to.be.eql(4);
  });
});
