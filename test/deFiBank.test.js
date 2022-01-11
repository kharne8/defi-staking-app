const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DeFiBank = artifacts.require('DeFiBank');

require('chai')
  .use(require('chai-as-promised'))
  .should();

contract('DeFiBank', ([owner, customer]) => {
  let tether, rwd, deFiBank;

  function tokens(amount) {
    return web3.utils.toWei(amount, 'ether');
  }

  before(async () => {
    tether = await Tether.new();
    rwd = await RWD.new();
    deFiBank = await DeFiBank.new(rwd.address, tether.address);

    await rwd.transfer(deFiBank.address, tokens('1000000'));

    await tether.transfer(customer, tokens('100'), { from: owner });
  });

  describe('Mock Tether Deployment', async () => {
    it('matches names succesfully', async () => {
      const name = await tether.name();
      assert.equal(name, 'Mock Tether token');
    });
  });

  describe('Reward Token Deployment', async () => {
    it('matches names succesfully', async () => {
      const name = await rwd.name();
      assert.equal(name, 'Reward Token');
    });
  });

  describe('DeFiBank Deployment', async () => {
    it('matches names succesfully', async () => {
      const name = await deFiBank.name();
      assert.equal(name, 'DeFi Banking System');
    });

    it('contract has tokens', async () => {
      let balance = await rwd.balanceOf(deFiBank.address);

      assert.equal(balance, tokens('1000000'));
    });
  });

  describe('Yield Farming', async () => {
    it('rewards tokens for staking', async () => {
      let result;

      result = await tether.balanceOf(customer);

      assert.equal(
        result.toString(),
        tokens('100'),
        'customer mock tether balance before staking'
      );

      await tether.approve(deFiBank.address, tokens('100'), { from: customer });
      await deFiBank.depositTokens(tokens('100'), { from: customer });

      result = await tether.balanceOf(customer);
      assert.equal(
        result.toString(),
        tokens('0'),
        'customer mock wallet balance after staking'
      );

      result = await tether.balanceOf(deFiBank.address);
      assert.equal(
        result.toString(),
        tokens('100'),
        'DeFi Bank mock wallet balance after staking from customer'
      );

      result = await deFiBank.isStaked(customer);
      assert.equal(result.toString(), 'true', 'customer status after staking');

      await deFiBank.issueTokens({ from: owner });

      await deFiBank.issueTokens({ from: customer }).should.be.rejected;

      await deFiBank.unStake({ from: customer });

      //check for unstaking update
      result = await tether.balanceOf(customer);
      assert.equal(
        result.toString(),
        tokens('100'),
        'customer mock wallet balance after unstaking'
      );

      result = await tether.balanceOf(deFiBank.address);
      assert.equal(
        result.toString(),
        tokens('0'),
        'DeFi Bank mock wallet balance after staking from customer'
      );

      result = await deFiBank.isStaked(customer);
      assert.equal(
        result.toString(),
        'false',
        'customer status after unstaking'
      );
    });
  });
});
