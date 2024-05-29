import React from 'react';
import './App.css';

function App() {
  return (
    <React.Fragment>
    <div className="app-container">
      <form className='add-mantra-form'>
        <input required
        name='mantra-name'
        type='text'
        placeholder='Mantra name'
        />
        <input required
        name='mantra-cat'
        type='text'
        placeholder='Mantra category'
        />
        <input required
        name='mantra-content'
        type='textarea'
        placeholder='Mantra'
        />
        <button type='submit'>Add mantra</button>
      </form>
    <div className='categories' >
    <div className='category'>
      <h2>Category name</h2>
    </div>
    </div>

    <div className='random'>
    <button className='random-btn'>Show random!</button>
    <div className='show-random' >

    </div>
    </div>
    </div>
    </React.Fragment>
  );
}

export default App;
