import './App.css';
import Recipelist from './components/Recipelist';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import Instructions from './components/Instructions';
import Login from './components/Login';
import { Button } from "@mui/material";
import UserRecipes from './components/UserRecipes';
import Register from './components/Register';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // For navigation.
  const [value, setValue] = useState<number>(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => setValue(newValue);
  const handleIsAuthenticated = () => setIsAuthenticated(!isAuthenticated);

  return (
    <div className="App">
      {/* If the user is not authenticated there is Log in- button. Else, there is Log out- button */}
      {!isAuthenticated ? <div style={{ display: 'flex', flexDirection: 'row' }} > <Login handleIsAuthenticated={handleIsAuthenticated} /> <Register /> </div> : <Button variant="contained" sx={{ display: 'flex' }} onClick={handleIsAuthenticated} >Log out</Button>}
      <Tabs value={value} onChange={handleTabChange}>
        <Tab value={0} label='Recipes' />
        <Tab value={1} label="My recipes" disabled={!isAuthenticated} />
        <Tab value={2} label="Instructions" />
      </Tabs>
      {value === 0 && <Recipelist isAuthenticated={isAuthenticated} />}
      {value === 1 && <UserRecipes isAuthenticated={isAuthenticated} />}
      {value === 2 && <Instructions />}
    </div>
  );
}

export default App;
