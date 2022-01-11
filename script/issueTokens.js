const DeFiBank = artifacts.require('DeFiBank');

module.exports = async function issueRewards(callback) {
  let deFiBank = await DeFiBank.deployed();

  await deFiBank.issueTokens();

  console.log('Tokens have been issue successfully!!!');

  callback();
};
