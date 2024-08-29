import React from 'react';
import Header from './components/headers/Header';
import Pages from './components/mainpages/Pages';
import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from './GlobalState';
import Footer from './components/footer/Footer';

const App = () => {
  return (
    
    <DataProvider>
      <Router>
        <div className='App'>
          <Header />
          <Pages />
        </div>
      </Router>
      <Footer />
    </DataProvider>
  );
};

export default App;
