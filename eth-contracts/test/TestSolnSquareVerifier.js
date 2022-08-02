var solnSquareContract = artifacts.require('SolnSquareVerifier');
var verifierContract = artifacts.require("Verifier");
var json = require('../../zokrates/code/square/proof.json');

const ZokratesProof = {
  "scheme": "g16",
  "curve": "bn128",
  "proof": {
    "a": [
      "0x2ee90d7206282e3c3cd6b8b62bfbc9d58df26628bef33f20b992f15dadc9d420",
      "0x1c418b7946bea6a0ac1c12a0ed11a0affa4db20dc9cdeeee9dd92aff51226d39"
    ],
    "b": [
      [
        "0x0ecab7bb029b87e2453eca15aafb66f6772d2f98ef1c4431449a281642b7d28c",
        "0x08c9cbaa5ad98c8fda3c2949ef1e7b274a8651b315bc3b5155673d8a981a269f"
      ],
      [
        "0x16a0922466461c7836d330833b6971a4e8e6a1c9204ef0bac6f3848018e2e930",
        "0x27a81e6f7bbf582934e47fad6aa62496b3273f196f2f6744681d4d49a0cde4d7"
      ]
    ],
    "c": [
      "0x0b2af5ef49cf36a641de9cab24c59716a8f047f4afeece0637c6e5b87c2a233f",
      "0x035876fdaa780f59af509784a58b8ce6f54419bcd98a8f0c9521ab70efb33b8d"
    ]
  },
  "inputs": [
    "0x0000000000000000000000000000000000000000000000000000000000000009"
  ]
}


contract('SquareVerifier', accounts => {

    const account_one = accounts[5];
    const account_two = accounts[6];
    const account_three = accounts[7];
    const account_four = accounts[8];
    const symbol = "RET";
    const name = "RealEstateToken";
    const uri = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";

// POSSIBLE SOLUTION
// COPY PASTE the proof.json file into here as an object, and then
// pull from that to verify that it works and whatnot.
// This would give me the ability to tamper with it until it works.

    describe('Test if a new solution can be added for contract - SolnSquareVerifier', function () {
        beforeEach(async function () {
            const verifier = await verifierContract.new({from: account_one});
            this.contract = await solnSquareContract.new(verifier.address, name, symbol, {from: account_one});

        })

        it('add new solution', async function () {
          let tokenId = 5;
          let result = await this.contract.addSolution(account_two,tokenId,json.proof.a,json.proof.b,json.proof.c,json.inputs,);
          assert.equal(result.logs[0].args[1], account_two,"Solution-address doesn't match senders adddress");
          try{
            let second = await this.contract.addSolution(account_two,tokenId,json.proof.a,json.proof.b,json.proof.c,json.inputs);
            throw(second)
          }catch(error){
            assert.equal(error.reason,"Solution exists already","Was able to make two identical solutions");
          }
        });
  });

    describe('Test if an ERC721 token can be minted for contract - SolnSquareVerifier', function () {
        beforeEach(async function () {
          const verifier = await verifierContract.new({from: account_one});
          this.contract = await solnSquareContract.new(verifier.address, name, symbol, {from: account_one});
        })

        it('mintERC721', async function () {

          let result = await this.contract.addSolution(account_one,0,json.proof.a,json.proof.b,json.proof.c,json.inputs);
          assert.equal(result.logs[0].args[1], account_one,"Solution-address doesn't match senders adddress");
          await this.contract.mintNewNFT(json.inputs[0],json.inputs[1],account_three,{from:account_one});
          let balance = await this.contract.balanceOf(account_three);
          assert.equal(parseInt(balance), 1, "Incorrect token balance");

          let uri = await this.contract.tokenURI(0,{from:account_one});
          assert.equal(uri, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/0"," Incorrect uri");


        });
    });

})