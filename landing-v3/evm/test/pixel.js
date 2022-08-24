const Pixel = artifacts.require("Pixel");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Pixel", function (/* accounts */) {
  it("should assert true", async function () {
    await Pixel.deployed();
    return assert.isTrue(true);
  });
});
