var ERC721MintableComplete = artifacts.require('RealEstateToken');

contract('TestERC721Mintable', accounts => {

    const owner = accounts[0];

    const account1 = accounts[5];
    const account2 = accounts[6];

    const a1count = 2;
    const a2count = 10;

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: owner});

            // mint multiple tokens

            // first try
            // for(let i = 0; i < a1count; i++) {
            //     await this.contract.mint(account1, i + a1count);
            // }
            // for(let i = 0; i < a2count; i++) {
            //     await this.contract.mint(account2, i + a2count);
            // }

            // second try
            for(let i = 0; i < a1count; i++) {
                await this.contract.mint(account1, a1count+i);
                console.log("acc1::"+i+"::balance::"+this.contract.balanceOf(account1));
            }

        })

        it('should return total supply', async function () { 
            let totalSupply = await this.contract.totalSupply.call({from: account1});
            assert.equal(totalSupply, a1count, "Does not match supposed total supply");
        })

        it('should get token balance', async function () { 
            let bal1 = await this.contract.balanceOf.call(account1);
            let bal2 = await this.contract.balanceOf.call(account2);
            assert.equal(bal1, a1count, "Does not match account 1 balance");
            assert.equal(bal2, a1count, "Does not match account 2 balance");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenId = 3;
            let baseTokenURI = await this.contract.getBaseTokenURI.call({from: owner});
            let tokenURI = await this.contract.tokenURI.call(tokenId, {from: owner});
            assert.equal(
                tokenURI,
                "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/" + tokenId,
                "Does not match expected tokenURI");
        })

        it('should transfer token from one owner to another', async function () { 
            let tokenId = 3;
            await this.contract.safeTransferFrom(account1, account2, tokenId, {from: account1});
            let owner = await this.contract.ownerOf(tokenId);
            assert.equal(owner, account2, "Token did not transfer");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: owner});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let err = false;
            try {
                await this.contract.mint(account2, 3, {from: account1});
            } catch { err = true; }
            assert.equal(err, true, "Only contract owner should be able to mint");
        })

        it('should return contract owner', async function () { 
            let response = await this.contract.getOwner.call();
            assert.equal(owner, response, "Contract owner not returned");
        })

    });
})