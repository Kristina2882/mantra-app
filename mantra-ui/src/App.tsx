import React, { FormEvent, useEffect, useState } from 'react';
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
  const [updateMantra, setUpdateMantra] = useState(false);

  useEffect(() => {
   const fetchMantras = async () => {
    try {
     const response = await fetch('http://localhost:5000');
     const mantras: Mantra[] = await response.json();
     setMantras(mantras);
    }
    catch(e) {
      console.log(e);
    }
   }
   fetchMantras();
  }, []);

  const handleAddMantra = (event: React.FormEvent) => {
    event.preventDefault();
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

  const handleCatSelection = (catId:number) => {
     const selectedCategory = categories.filter(cat => cat.id === catId)[0];
      console.log("Selected category:", selectedCategory.catname);
     setSelectedCat(selectedCategory);
  }

  const handleBackClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedCat(null);
    setSelectedMantra(null);
  }
  
  const showMantra = (mantraId: number) => {
    const selectedMantra = mantras.filter(mantra => mantra.id === mantraId)[0];
    setSelectedMantra(selectedMantra);
  }

  function getRandomIntInclusive(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); 
  }

  const handleRandom = () => {
    const randomId = getRandomIntInclusive(1, mantras.length+1);
    showMantra(randomId);
  }

  const handleMantraClick = (mantra: Mantra) => {
    setMantraName(mantra.mantraName);
    setMantraCat(mantra.mantraCat.toString());
    setMantraContent(mantra.mantraContent);
    setUpdateMantra(true);
  }

  const handleMantraUpdate = (event:React.FormEvent) => {
    event.preventDefault();

    if (!selectedMantra) {
      return;
    }

    const updatedMantra:Mantra = {
      id: selectedMantra.id,
      mantraName: mantraName,
      mantraCat: parseInt(mantraCat),
      mantraContent: mantraContent
    }

    const updatedMantrasList = mantras.map((mantra) => (mantra.id === selectedMantra.id ? updatedMantra : mantra));
    setMantras(updatedMantrasList);

    setSelectedCat(null);
    setSelectedMantra(null);
    setUpdateMantra(false);
    setMantraName("");
    setMantraContent("");
  }

  if (updateMantra === true) {
   return (
    <React.Fragment>
    <div className="app-container">
      <form className='upd-mantra-form' onSubmit={handleMantraUpdate}>
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
        <button type='submit'>Save changes</button>
      </form>
      </div>
      </React.Fragment>
   );
  }

 else if (selectedMantra) {
    return (
      <React.Fragment>
      <div className="app-container">
      <div className='mantra-item' onClick={() => {handleMantraClick(selectedMantra)}}>
      <h3>{selectedMantra.mantraName}</h3>
      <h4>{selectedMantra.mantraCat}</h4>
      <h3>{selectedMantra.mantraContent}</h3>
      <div className='back-btn-div'>
      <button className="back-btn" onClick={handleBackClick}>Back</button>
      </div>
      </div> 
      </div>
      </React.Fragment>
    );
  }

  else if (selectedCat) {
    const matrasForCat = mantras.filter(mantra => mantra.mantraCat === selectedCat.id);

    return (
      <React.Fragment>
      <div className='cat-name'>
      <h2>{selectedCat.catname}</h2>
      </div>
      <div className="app-container">
      <div className='mantras-for-cat'>
      {
        matrasForCat.map((mantra) => (
          <div  className='cat-mantra-item' onClick={() => showMantra(mantra.id)}>
          <h2>{mantra.mantraName}</h2>
          </div>
        ))
      }
      <div className='back-btn-div'>
       <button className="back-btn" onClick={handleBackClick}>Back</button>
       </div>
      </div>
      </div>
     </React.Fragment>
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
    <button className='random-btn' onClick={handleRandom}>Show random!</button>
    <div className='show-random' >

    </div>
    </div>
    </div>
    </React.Fragment>
  );
}

export default App;
