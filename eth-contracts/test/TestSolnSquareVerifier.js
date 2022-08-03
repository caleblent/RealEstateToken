const SolnSquareVerifier = artifacts.require("SolnSquareVerifier")
const zokratesProof = require("../../zokrates/code/square/proof.json")
// const zokratesProof = {
//   proof: {
//     a: [
//       "0x0a6443ebf4a43abb27aedfbfe85e15fcd8c584e8f98c365062718ec000b1bb87",
//       "0x1846f9e106cf63a0cf6cf01cce48e834a4e54bf1c22e82cd92b7dd3fb80fd185",
//     ],
//     b: [
//       [
//         "0x069559dab516dcad73fc5281f8be6f51abdbbeef0a4d87852ea2d18a9dec70a6",
//         "0x1bf8da35145352ad98ba3dff7930e4190764809da982165c017aa77c36412ebf",
//       ],
//       [
//         "0x060438a7c56acd273cef29c850290a4b8f91dc9ea959a70c757d133713a2bc62",
//         "0x144acd610553d714935a8067858f17a9107d282a7bba9e017c325b25895853ce",
//       ],
//     ],
//     c: [
//       "0x072c7ea4803653064fca84ddd93e78c03263ea1e973d577cb68b27f645156ad0",
//       "0x1f9c85723c15888240e80b696b10271ce6175291de6d5cef516b39129037993e",
//     ],
//   },
//   inputs: [
//     "0x0000000000000000000000000000000000000000000000000000000000000004",
//     "0x0000000000000000000000000000000000000000000000000000000000000002",
//   ],
// }
//   {
//     proof: {
//       a: [
//         "0x1735777a49c41709ce0af37fbef3563498d5a53c9efed907488ef811cff988d3",
//         "0x11c40a6c5978a2bab2d2e6f85f38746955c72c9d538c2faa1b9f14e9d276a61f",
//       ],
//       b: [
//         [
//           "0x1f358d8cd37c09129a0bc097afd369bcac72c7461bb0da3259c9bf32884a0a60",
//           "0x046819ae5a0b750f8930e380be9628f8bba34a67262ddd0afbcd6a960b9a1d80",
//         ],
//         [
//           "0x1bcc2a57a4d1bb3a0073bee33007b06edbf601cd169c5a326d2a97c0d7ea1d91",
//           "0x0a6c7b06c27e13439d67dc35651c80a6f9b9acc58ed7e8f3a1457995d2e8cf76",
//         ],
//       ],
//       c: [
//         "0x302cd553a23c362a8fe3464fa5f51760363ac7180015a9343e7ddc2e3fb26043",
//         "0x06b6c987dde2257c29ff27ae04d777176ff0b1515781a28eb42e89f269cbb1ac",
//       ],
//     },
//     inputs: [
//       "0x0000000000000000000000000000000000000000000000000000000000000009",
//       "0x0000000000000000000000000000000000000000000000000000000000000001",
//     ],
//   }

contract("TestSolnSquareVerifier", (accounts) => {
  describe("Exercise SolnSquareVerifier", function () {
    beforeEach(async function () {
      this.contract = await SolnSquareVerifier.new()
    })

    // Test if a new solution can be added for contract - SolnSquareVerifier
    it("should add new solutions", async function () {
      let result = await this.contract.addSolution(
        accounts[1],
        1,
        zokratesProof.proof.A,
        zokratesProof.proof.B,
        zokratesProof.proof.C,
        zokratesProof.inputs,
        {
          from: accounts[0],
        }
      )
      console.log(result)
    })
    // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
    it("should mint tokens for contract", async function () {
      await this.contract.addSolution(
        accounts[1],
        1,
        zokratesProof.A,
        zokratesProof.B,
        zokratesProof.C,
        zokratesProof.inputs,
        {
          from: accounts[0],
        }
      )
      let result = await this.contract.mint(accounts[1], 1, { from: accounts[0] })
      // console.log(result)
    })
  })
})
