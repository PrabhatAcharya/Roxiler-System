
import {useState} from 'react'
import './App.css';
import Transactions from './components/Transactions';
import SearchSelect from './components/SearchSelect';

function App() {
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("");
  return (
    <div className="App">
      <SearchSelect {...{ search, setSearch, month, setMonth }} />
      <Transactions search={search} month={month} />
    </div>
  );
}

export default App;
