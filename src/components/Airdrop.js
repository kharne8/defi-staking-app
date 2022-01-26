import React, { Component } from 'react';

class Airdrop extends Component {
  constructor() {
    super();
    this.state = {
      time: {},
      seconds: 20,
    };
    this.timer = 0;
    this.startTime = this.startTime.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  startTime() {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    let seconds = this.state.seconds - 1;

    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    if (seconds === 0) {
      clearInterval(this.timer);
    }
  }

  secondsToTime(secs) {
    let hours, minutes, seconds;
    hours = Math.floor(secs / (60 * 60));

    let devMin = secs % (60 * 60);
    minutes = Math.floor(devMin / 60);

    let devSec = devMin % 60;
    seconds = Math.ceil(devSec);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };

    return obj;
  }

  componentDidMount() {
    let timeLeft = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeft });
  }

  airDropReward() {
    let stakingBalance = this.props.stakingBalance;
    if (stakingBalance >= '50000000000000000000') {
      this.startTime();
    }
  }

  render() {
    this.airDropReward();
    return (
      <div style={{ color: 'black' }}>
        {this.state.time.m}:{this.state.time.s}
      </div>
    );
  }
}

export default Airdrop;
