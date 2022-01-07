const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DeFiBank = artifacts.require('DeFiBank');

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(Tether);
  const tether = await Tether.deployed();

  await deployer.deploy(RWD);
  const rwd = await RWD.deployed();

  await deployer.deploy(DeFiBank, rwd.address, tether.address);
  const deFiBank = await DeFiBank.deployed();

  await rwd.transfer(deFiBank.address, '1000000000000000000000000');

  await tether.transfer(accounts[1], '1000000000000000000');
};
