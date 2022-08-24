const Fireaf = artifacts.require("Fireaf");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Fireaf", function (/* accounts */) {
  it("should assert true", async function () {
    await Fireaf.deployed();
    return assert.isTrue(true);
  });
});
