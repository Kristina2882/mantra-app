import React, { FormEvent, useState } from 'react';
import './App.css';

type Category = {
  id: number;
  catname: string;
}

type Mantra = {
  id: number;
  mantraName: string;
  mantraCat: number;
  mantraContent: string;
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
  const [mantras, setMantras] = useState<Mantra[]>([]);
  const [selectedMantra, setSelectedMantra] = useState<Mantra | null>(null);

  const handleAddMantra = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Name:", mantraName);
    console.log("Category:", mantraCat);
    console.log(mantraContent);
    const newMantra = {
      id: mantras.length + 1,
      mantraName: mantraName,
      mantraContent: mantraContent,
      mantraCat: parseInt(mantraCat)
    }
    mantras.push(newMantra);
    setMantras(mantras);
    setMantraName("");
    setMantraContent("");
  }

  const handleCatSelection = (catId:Number) => {
     const selectedCategory = categories.filter(cat => cat.id === catId)[0];
      console.log("Selected category:", selectedCategory.catname);
     setSelectedCat(selectedCategory);
  }

  const handleBackClick = () => {
    setSelectedCat(null);
    setSelectedMantra(null);
  }
  
  const showMantra = (mantraId: Number) => {
    const selectedMantra = mantras.filter(mantra => mantra.id === mantraId)[0];
    setSelectedMantra(selectedMantra);
  }

  if (selectedMantra) {
    return (
      <React.Fragment>
      <div className='mantra-item'>
      <h3>{selectedMantra.mantraName}</h3>
      <h4>{selectedMantra.mantraCat}</h4>
      <h3>{selectedMantra.mantraContent}</h3>
      <button className="back-btn" onClick={handleBackClick}>Back</button>
      </div> 
      </React.Fragment>
    );
  }

  else if (selectedCat) {
    const matrasForCat = mantras.filter(mantra => mantra.mantraCat === selectedCat.id);

    return (
     <div className='mantras-for-cat'>
      <h2>{selectedCat.catname}</h2>
      {
        matrasForCat.map((mantra) => (
          <div onClick={() => showMantra(mantra.id)}>
          <h3>{mantra.mantraName}</h3>
          </div>
        ))
      }
      <button className="back-btn" onClick={handleBackClick}>Back</button>
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
