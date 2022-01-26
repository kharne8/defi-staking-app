import React, { Component } from 'react';
import Navbar from './Navbar';
import ParticleSettings from './ParticleSettings';
import Main from './Main';
import Web3 from 'web3';
import Tether from '../truffle_abis/Tether.json';
import RWD from '../truffle_abis/RWD.json';
import DeFiBank from '../truffle_abis/DeFiBank.json';

import './App.css';

class App extends Component {
  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockChainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('No ethereum browser detected check your MetaMask!');
    }
  }

  async loadBlockChainData() {
    const web3 = window.web3;
    const account = await web3.eth.getAccounts();

    this.setState({ account: account[0] });

    const networkId = await web3.eth.net.getId();

    //load tether contract
    const tetherData = Tether.networks[networkId];
    if (tetherData) {
      const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
      this.setState({ tether });
      let tetherBalance = await tether.methods
        .balanceOf(this.state.account)
        .call();
      this.setState({ tetherBalance: tetherBalance.toString() });
    } else {
      window.alert('Error tether contract not deployed - no network!');
    }

    const rwdData = RWD.networks[networkId];
    if (rwdData) {
      const rwd = new web3.eth.Contract(RWD.abi, rwdData.address);
      this.setState({ rwd });
      let rwdBalance = await rwd.methods.balanceOf(this.state.account).call();
      this.setState({ rwdBalance: rwdBalance.toString() });
    } else {
      window.alert('Error rwd contract not deployed - no network!');
    }

    const deFiBankData = DeFiBank.networks[networkId];
    if (deFiBankData) {
      const deFiBank = new web3.eth.Contract(
        DeFiBank.abi,
        deFiBankData.address
      );
      this.setState({ deFiBank });
      let stakingBalance = await deFiBank.methods
        .stakingBalance(this.state.account)
        .call();
      this.setState({ stakingBalance: stakingBalance.toString() });
    } else {
      window.alert('Error deFiBank contract not deployed - no network!');
    }
    if (this.state.deFiBank && this.state.rwd && this.state.tether) {
      this.setState({ loading: false });
    }
  }

  //stake func
  stakeTokens = async (amount) => {
    this.setState({ loading: true });

    await this.state.tether.methods
      .approve(this.state.deFiBank._address, amount)
      .send({ from: this.state.account });

    await this.state.deFiBank.methods
      .depositTokens(amount)
      .send({ from: this.state.account });

    this.setState({ loading: false });
    console.log(this.state);
  };

  //unstake tokens
  unStakeTokens = () => {
    this.setState({ loading: true });
    this.state.deFiBank.methods
      .unStake()
      .send({ from: this.state.account })
      .on('transactionHash', (hash) => {
        this.setState({ loading: false });
      });
  };

  constructor(props) {
    super(props);
    this.state = {
      account: '0x0',
      tether: {},
      rwd: {},
      deFiBank: {},
      tetherBalance: '0',
      rwdBalance: '0',
      stakingBalance: '0',
      loading: false,
    };
  }

  render() {
    let content;
    {
      this.state.loading
        ? (content = (
            <p
              id='loader'
              className='text-center'
              style={{ margin: '30px', color: 'white' }}
            >
              Loading Please Wait...
            </p>
          ))
        : (content = (
            <Main
              tetherBalance={this.state.tetherBalance}
              rwdBalance={this.state.rwdBalance}
              stakingBalance={this.state.stakingBalance}
              stakeTokens={this.stakeTokens}
              unStakeTokens={this.unStakeTokens}
            />
          ));
    }
    return (
      <div className='App' style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', backgroundColor: 'black' }}>
          <ParticleSettings />
        </div>

        <Navbar account={this.state.account} />
        <div className='container-fluid mt-5'>
          <div className='row'>
            <main
              role='main'
              className='col-lg-12 ml-auto mr-auto'
              style={{ maxWidth: '600px', minHeight: '100vm' }}
            >
              <div>{content}</div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
