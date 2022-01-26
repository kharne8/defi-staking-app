import React, { Component } from 'react';
import Particles from 'react-tsparticles';

class ParticleSettings extends Component {
  render() {
    return (
      <div>
        <Particles
          height='100vh'
          width='100vw'
          top='0'
          left='0'
          id='tsparticles'
          options={{
            background: {
              color: {
                value: '#0d47a1',
              },
            },
            fpsLimit: 60,
            interactivity: {
              detect_on: 'canvas',
              events: {
                onClick: {
                  enable: TextTrackCueList,
                  mode: 'push',
                },
                onHover: {
                  enable: false,
                  mode: 'repulse',
                },
                resize: true,
              },
              modes: {
                bubble: {
                  distance: 400,
                  duration: 2,
                  opacity: 0.8,
                  size: 40,
                },
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: '#ffffff',
              },
              links: {
                color: '#ffffff',
                distace: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              collision: {
                enable: true,
              },
              move: {
                direction: 'none',
                enable: true,
                outMode: 'bounce',
                random: false,
                speed: 3,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  value_area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: 'circle',
              },
              size: {
                random: true,
                value: 5,
              },
            },
          }}
        />
      </div>
    );
  }
}

export default ParticleSettings;
