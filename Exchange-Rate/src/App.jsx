import { useState } from 'react';
import './App.css';
import Currency from './components/Currency';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Currency />
    </div>
  );
}

export default App;
