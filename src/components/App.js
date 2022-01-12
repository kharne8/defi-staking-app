import React, { Component } from 'react';
import Navbar from './Navbar';
import Web3 from 'web3';

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
    console.log(account);
  }

  constructor(props) {
    super(props);
    this.state = {
      account: '0x0',
    };
  }

  render() {
    return (
      <div className='container'>
        <Navbar account={this.state.account} />
      </div>
    );
  }
}

export default App;
