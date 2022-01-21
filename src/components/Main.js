import React, { useRef } from 'react';
import tether from '../tether.png';
import web3 from 'web3';

const Main = ({
  stakingBalance,
  rwdBalance,
  tetherBalance,
  stakeTokens,
  unStakeTokens,
}) => {
  const ref = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    let amount;
    amount = ref.current.value.toString();
    amount = web3.utils.toWei(amount);
    stakeTokens(amount);
  };

  return (
    <div id='content' className='mt-3'>
      <table className='table text-muted text-center'>
        <thead>
          <tr style={{ color: 'black' }}>
            <th scope='col'>Staking Balance</th>
            <th scope='col'>Reward Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ color: 'black' }}>
            <td>{web3.utils.fromWei(stakingBalance)} USDT</td>
            <td>{web3.utils.fromWei(rwdBalance)} RWD</td>
          </tr>
        </tbody>
      </table>
      <div className='card mb-2' style={{ opacity: '0.9' }}>
        <form className='mb-3' onSubmit={handleSubmit}>
          <div>
            <label className='float-left'>
              <b>Stake Tokens</b>
            </label>
            <span className='float-right text-muted'>
              Balance: {web3.utils.fromWei(tetherBalance)}
            </span>
          </div>
          <div className='input-group mb-4'>
            <input
              type='text'
              ref={ref}
              className='form-control form-control-lg'
              placeholder='0'
              required
            />
            <div className='input-group-append'>
              <div className='input-group-text'>
                <img src={tether} height='32' alt='' />
                &nbsp;&nbsp;&nbsp; USDT
              </div>
            </div>
          </div>
          <button type='submit' className='btn btn-primary btn-block btn-lg'>
            Deposit
          </button>
        </form>
        <button
          type='submit'
          className='btn btn-primary btn-lg btn-block'
          onClick={unStakeTokens}
        >
          Withdraw
        </button>
        <div className='card-body text-center' style={{ color: 'blue' }}>
          Airdrop
        </div>
      </div>
    </div>
  );
};

export default Main;
