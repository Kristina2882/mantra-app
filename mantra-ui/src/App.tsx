import React from 'react';
import './App.css';

function App() {
  return (
    <React.Fragment>
    <div className="AppContainer">
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
        <button type='submit' className='add-btn'>Add mantra</button>
      </form>

    </div>
    </React.Fragment>
  );
}

export default App;
