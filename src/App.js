import React from 'react';
import './App.css';
import GoogleAuth from './components/GoogleAuth';

function App() {
  return (
    <div className="App">
      <h2>Google Auth</h2>
      <div className="hero-section">
        <GoogleAuth />
      </div>
    </div>
  );
}

export default App;
