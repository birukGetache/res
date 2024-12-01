import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './component/Home';
import Until from './component/Until';
import ItemPage from './component/ItemPage';
import store from './store';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import Admin from './component/Admin';

function App() {
  const [isHomeReady, setIsHomeReady] = useState(false);

  useEffect(() => {
    // Simulate an async operation, like data fetching or some initialization
    const timer = setTimeout(() => {
      setIsHomeReady(true);
    }, 3000); // Adjust the time as needed

    return () => clearTimeout(timer); // Clean up the timer if the component unmounts
  }, []);

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  return (
    <>
      <Provider store={store}>
        <Routes>
          {isMobile ? (
            <>
              <Route path="/" element={isHomeReady ? <Home /> : <Until />} />
              <Route path="/item/:name" element={<ItemPage />} />
              <Route path="/AdminEtalem" element={<Admin />} />
            </>
          ) : (
            <>
           
            <Route path="/AdminEtalem" element={<Admin />} />
            <Route path="/" element={<div style={{height:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}><h1 style={{color:"black" , textAlign:"center", fontFamily:"cursive"}}>Not Allowed on Desktop and Tablet</h1></div>} />
            </>
          )}
        </Routes>
      </Provider>
    </>
  );
}

export default App;
