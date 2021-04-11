import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out these EPIC Dance Lessons!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/passion-8.jpg'
              text='Explore the explosive passion of salsa'
              label='Salsa'
              path='/services'
            />
            <CardItem
              src='images/passion-2.jpg'
              text='Feel the smoothness of kizomba'
              label='Bachata'
              path='/'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/passion-6.jpg'
              text='Explore the hidden passion of bachata'
              label='Kizomba'
              path='/services'
            />
             <CardItem
              src='images/shoes-1.jpg'
              text='Feel the comfort of our dance shoes'
              label='Dance shoes'
              path='/shop'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;