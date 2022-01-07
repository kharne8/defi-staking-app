const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DeFiBank = artifacts.require('DeFiBank');

require('chai')
  .use(require('chai-as-promised'))
  .should();

contract('DeFiBank', (accounts) => {
  let tether, rwd deFiBank;

  before(async () => {
    tether = await Tether.new();
    rwd = await RWD.new();
    deFiBank = await DeFiBank.new();
  });

  describe('Mock Tether Deployment', async () => {
    it('matches names succesfully', async () => {
      const name = await tether.name();
      assert.equal(name, 'Mock Tether token');
    });
  });

  describe('Reward Tether Deployment', async () => {
    it('matches names succesfully', async () => {
      const name = await rwd.name();
      assert.equal(name, 'Reward Token');
    });
  });
});
