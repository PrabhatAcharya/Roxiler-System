
import {useState} from 'react'
import './App.css';
import Transactions from './components/Transactions';
import SearchSelect from './components/SearchSelect';
import Statistics from './components/Statistics';

function App() {
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("March");
  return (
    <div className="App">
      <SearchSelect {...{ search, setSearch, month, setMonth }} />
      <Transactions search={search} month={month} />
      <Statistics month={month}/>
    </div>
  );
}

export default App;
