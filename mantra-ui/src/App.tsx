import React from 'react';
import './App.css';

function App() {
  const categories = [
    {
      "id": 1,
      "catname": "About Myzdrii",
    },
    {
      "id": 2,
      "catname": "About other powers",
    },
    {
      "id": 3,
      "catname": "Help at work",
    },
    {
      "id": 4,
      "catname": "Help in sex",
    },
    {
      "id": 5,
      "catname": "About dendriy and nikisha",
    },
    {
      "id": 6,
      "catname": "Name mantras",
    },
  ];
  return (
    <React.Fragment>
    <div className="app-container">
      <form className='add-mantra-form'>
        <input required
        name='mantra-name'
        type='text'
        placeholder='Mantra name'
        />
        <select required
        name='mantra-cat'>
        {categories.map((category) => (
          <option value={category.id}>
          {category.catname}
          </option>
        ))}
        </select>
      
        <textarea required
        name='mantra-content'
        rows={10}
        placeholder='Mantra'
        />
        <button type='submit'>Add mantra</button>
      </form>
    <div className='categories'>
      {categories.map((category) => (
       <div className='category'>
       <h2>{category.catname}</h2>
     </div>
      ))}
   
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
