import React, { FormEvent, useState } from 'react';
import './App.css';

type Category = {
  id: number;
  catname: string;
}

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
  const [mantraName, setMantraName] = useState("");
  const [mantraContent, setMantraContent] = useState("");
  const [mantraCat, setMantraCat] = useState("");
  const [selectedCat, setSelectedCat] = useState<Category | null>(null);

  const handleAddMantra = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Name:", mantraName);
    console.log("Category:", mantraCat);
    console.log(mantraContent);
    setMantraName("");
    setMantraContent("");
  }

  const handleCatSelection = (catId:Number) => {
     const selectedCategory = categories.filter(cat => cat.id === catId)[0];
      console.log("Selected category:", selectedCategory.catname);
     setSelectedCat(selectedCategory);
  }

  if (selectedCat) {
    return (
     <div className='mantras-for-cat'>
      <h2>{selectedCat.catname}</h2>
     </div>
    );
  }
  
  else

  return (
    <React.Fragment>
    <div className="app-container">
      <form className='add-mantra-form' onSubmit={handleAddMantra}>
        <input required
        value={mantraName}
        onChange={(event) => setMantraName(event.target.value)}
        name='mantra-name'
        type='text'
        placeholder='Mantra name'
        />
        <select required
        name='mantra-cat'
        value={mantraCat}
        onChange={(event) => setMantraCat(event.target.value)}>
        {categories.map((category) => (
          <option value={category.id}>
          {category.catname}
          </option>
        ))}
        </select>
      
        <textarea required
        name='mantra-content'
        value={mantraContent}
        onChange={(event) => setMantraContent(event.target.value)}
        rows={10}
        placeholder='Mantra'
        />
        <button type='submit'>Add mantra</button>
      </form>
    <div className='categories'>
      {categories.map((category) => (
       <div className='category' onClick={() => handleCatSelection(category.id)}>
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
