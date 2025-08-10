import React from 'react';
import Search from './components/Search';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="bg-gray-800 text-white py-4">
        <h1 className="text-2xl font-bold text-center">GitHub User Search</h1>
      </header>
      <main className="container mx-auto py-8">
        <Search />
      </main>
    </div>
  );
}

export default App;
