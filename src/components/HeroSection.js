import React from 'react';
import '../App.css';
import { Button } from './Button';
import { PreviewButton } from './PreviewButton';
import './HeroSection.css';


function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='../videos/video-1.mp4' autoPlay loop muted />
      <h1>DANCE PASSION</h1>
      <p>Feel the music</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>
        <PreviewButton
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          WATCH TRAILER <i className='far fa-play-circle' />
        </PreviewButton>
      </div>
    </div>
  );
}

export default HeroSection;