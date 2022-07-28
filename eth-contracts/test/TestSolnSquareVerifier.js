const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const ZokratesProof = require("../../zokrates/code/square/proof.json");

contract('TestSolnSquareVerifier', accounts => {
    describe('Exercise SolnSquareVerifier', function(){
        beforeEach(async function() {
            this.contract = await SolnSquareVerifier.new();
        });

        // Test if a new solution can be added for contract - SolnSquareVerifier
        it('should add new solutions', async function(){
            let proofs = Object.values(ZokratesProof.proof);
            let inputs = ZokratesProof.inputs;
            let tx = await this.contract.addSolution(accounts[1], 1, ...proofs, inputs, {from: accounts[0]});
            let verified_event = tx.logs[0].event;
            let added_event = tx.logs[1].event;
            assert.equal(verified_event, 'Verified', 'Invalid event emitted');
            assert.equal(added_event, 'SolutionAdded', 'Invalid event emitted'); 
        });
        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        it('should mint tokens for contract', async function(){
            await this.contract.addSolution(accounts[1], 1, ...Object.values(ZokratesProof.proof), ZokratesProof.inputs, {from: accounts[0]});
            let tx = await this.contract.mint(accounts[1], 1, {from: accounts[0]});
            let tokenTransferredEvent = tx.logs[0].event; //transferred == minted
            assert.equal(tokenTransferredEvent, 'Transfer', 'Invalid event emitted');
        });
    });
})

// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier
