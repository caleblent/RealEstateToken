const SolnSquareVerifier = artifacts.require("SolnSquareVerifier")
// const zokratesProof = require("../../zokrates/code/square/proof.json");
const zokratesProof =
  // {
  //   proof: {
  //     a: [
  //       "0x26e88aa03d5186566bb4540b33d1704f05fe3851910d8fc27c89f997e64e76e2",
  //       "0x038184db45429363a35b5808b22ca36a07b57a9a729b9469abeb24dea22b19fd",
  //     ],
  //     b: [
  //       [
  //         "0x174dfee9a4ad743d736c08d59e63f65ce003f3bc6a53f163a72cf5a92dfc4df5",
  //         "0x20d437a8db149ac2f33dbffe57221e842a545d55d5b8b3ea8401f6dd4cbcdd22",
  //       ],
  //       [
  //         "0x1748a7e7bf4e20b95c488f6cd22b97e1a4a3b97e6d8567faf3e9f2dd56568216",
  //         "0x2830a5ce78e0bbcf4b4063124f64aadabb0cd12c3c0392adb90e80d70d33fe22",
  //       ],
  //     ],
  //     c: [
  //       "0x0acb35f554bbd3cc8f6655ceca48cadb63f4e60f99f455b43cf6b03ba3652c18",
  //       "0x2dd58f707316c16349c047f5d8517c336d73faad0ba2517e1e5dfc7d6445ffdb",
  //     ],
  //   },
  //   inputs: [
  //     "0x0000000000000000000000000000000000000000000000000000000000000009",
  //     "0x0000000000000000000000000000000000000000000000000000000000000003",
  //   ],
  // }
  {
    proof: {
      a: [
        "0x1735777a49c41709ce0af37fbef3563498d5a53c9efed907488ef811cff988d3",
        "0x11c40a6c5978a2bab2d2e6f85f38746955c72c9d538c2faa1b9f14e9d276a61f",
      ],
      b: [
        [
          "0x1f358d8cd37c09129a0bc097afd369bcac72c7461bb0da3259c9bf32884a0a60",
          "0x046819ae5a0b750f8930e380be9628f8bba34a67262ddd0afbcd6a960b9a1d80",
        ],
        [
          "0x1bcc2a57a4d1bb3a0073bee33007b06edbf601cd169c5a326d2a97c0d7ea1d91",
          "0x0a6c7b06c27e13439d67dc35651c80a6f9b9acc58ed7e8f3a1457995d2e8cf76",
        ],
      ],
      c: [
        "0x302cd553a23c362a8fe3464fa5f51760363ac7180015a9343e7ddc2e3fb26043",
        "0x06b6c987dde2257c29ff27ae04d777176ff0b1515781a28eb42e89f269cbb1ac",
      ],
    },
    inputs: [
      "0x0000000000000000000000000000000000000000000000000000000000000009",
      "0x0000000000000000000000000000000000000000000000000000000000000001",
    ],
  }

contract("TestSolnSquareVerifier", (accounts) => {
  describe("Exercise SolnSquareVerifier", function () {
    beforeEach(async function () {
      this.contract = await SolnSquareVerifier.new()
    })

    // Test if a new solution can be added for contract - SolnSquareVerifier
    it("should add new solutions", async function () {
      let proofs = Object.values(zokratesProof.proof)
      let tx = await this.contract.addSolution(accounts[1], 1, ...proofs, zokratesProof.inputs, {
        from: accounts[0],
      })
      let verified_event = tx.logs[0].event
      let added_event = tx.logs[1].event
      assert.equal(verified_event, "Verified", "Invalid event emitted")
      assert.equal(added_event, "SolutionAdded", "Invalid event emitted")
    })
    // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
    it("should mint tokens for contract", async function () {
      await this.contract.addSolution(
        accounts[1],
        1,
        ...Object.values(zokratesProof.proof),
        zokratesProof.inputs,
        { from: accounts[0] }
      )
      let tx = await this.contract.mint(accounts[1], 1, { from: accounts[0] })
      let tokenTransferredEvent = tx.logs[0].event //transferred == minted
      assert.equal(tokenTransferredEvent, "Transfer", "Invalid event emitted")
    })
  })
})
