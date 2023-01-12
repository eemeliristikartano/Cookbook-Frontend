import './App.css';
import Recipelist from './components/Recipelist';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import Instructions from './components/Instructions';
import UserRecipes from './components/UserRecipes';
import Grid2 from '@mui/material/Unstable_Grid2';
import ControlButtons from './components/ControlButtons';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // For navigation.
  const [value, setValue] = useState<number>(0);
  // Handles tab changes.
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => setValue(newValue);
  // Set isAuthenticated true.
  const handleIsAuthenticated = () => setIsAuthenticated(!isAuthenticated);
  const handleLogOut = () => {
    // Remove token from session storage.
    sessionStorage.removeItem('jwt-token');
    // Set isAuthenticated false.
    setIsAuthenticated(!isAuthenticated);
  }

  // It the user is on 'MY RECIPES' tab and logs out --> move to the 'RECIPES' tab.
  if (sessionStorage.getItem('jwt-token') === null && value === 1) setValue(0);

  return (
    <div className="App">
      {/* If the user is not authenticated there is Log in-button and Register-button. Else, there is Log out- button */}
      <Tabs value={value} onChange={handleTabChange} variant='fullWidth' >
        <Tab value={0} label='Recipes' />
        <Tab value={1} label="My recipes" disabled={sessionStorage.getItem('jwt-token') === null} />
        <Tab value={2} label="Instructions" />
      </Tabs>
      <Grid2 container margin={3}   >
        {value === 0 && <Recipelist />}
        {value === 1 && <UserRecipes />}
        {value === 2 && <Instructions />}
      </Grid2>
      {/* Buttons for logging in, register and logging out.  */}
      <ControlButtons handleIsAuthenticated={handleIsAuthenticated} handleLogOut={handleLogOut} />
    </div>
  );
}

export default App;
