import './App.css';
import Recipelist from './components/Recipelist';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import Instructions from './components/Instructions';

function App() {
  const [value, setValue] = useState<number>(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => setValue(newValue);


  return (
    <div className="App">
      <Tabs value={value} onChange={handleTabChange}>
        <Tab value={0} label='Recipes' />
        <Tab value={1} label='Instructions' />
      </Tabs>
      {value === 0 && <Recipelist />}
      {value === 1 && <Instructions />}
    </div>
  );
}

export default App;
