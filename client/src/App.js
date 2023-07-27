import { useContext, useEffect } from 'react';
import './App.css';
import Banner from './Components/Banner/Banner';
import Navbar from './Components/Navbar/Navbar';
import DriveContext from './Context/DriveContext';

function App() {
  const context = useContext(DriveContext);
  const { loadProvider } = context;

  useEffect(() => {
    loadProvider();
  }, [])

  return (
    <div className="App">
      <Navbar />
      <Banner />
    </div>
  );
}

export default App;
