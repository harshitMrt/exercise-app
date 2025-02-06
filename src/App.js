import './App.css';
import React, {useState } from 'react';
import { AppContextProvider} from './context/context';
import AddLevelBtn from './components/button'
import ProgressBar from './components/ProgressBar';
import LevelList from './components/LevelList';

function App() {

  const [showForm, setShowForm] =useState(false);
  const [indexClicked, setIndexClicked]=useState(0);

  return (
    <AppContextProvider>
      <div className='level_btn'>
        <LevelList showForm={showForm} setShowForm={setShowForm} indexClicked={indexClicked} setIndexClicked={setIndexClicked}/>
      </div>
      <div >
      <button  onClick={()=>{setShowForm((prev) => !prev )}} className='showFormBtn'>
        {showForm ? "Show Progress" : "Add Level"}
      </button>
      </div>

      {showForm ? <AddLevelBtn/> : <ProgressBar index={indexClicked}/>}
    </AppContextProvider>
  );
}

export default App;