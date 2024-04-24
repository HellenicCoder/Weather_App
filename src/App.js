// src/App.js
import React from 'react';
import './App.css';
import Weather from './components/Weather';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1><span><a href='https://github.com/HellenicCoder'>HellenicCoder</a></span> Weather App</h1>
      </header>
      <main>
        <Weather />
      </main>
    </div>
  );
}

export default App;
