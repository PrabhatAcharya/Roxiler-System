
import {useState} from 'react'
import './App.css';
import Transactions from './components/Transactions';
import SearchSelect from './components/SearchSelect';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';

function App() {
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("March");
  return (
    <div className="App">
      <h1 className='DashBoardlogo'>
        Transaction <br />
        Dashboard
      </h1>
      <SearchSelect {...{ search, setSearch, month, setMonth }} />
      <Transactions search={search} month={month} />
      <Statistics month={month} />
      {/* <BarChart month={month} /> */}
    </div>
  );
}

export default App;
