import React, {useState} from 'react';
import './App.css';
import { getData } from './API/getData';

function App() {
  const [data,setData] = useState<Array<string>>([]);

  const refresh = async () =>{
      const res = await getData(Math.floor(Math.random() * 100));
      if(!res) return setData(['Not have element']);
      setData( [...res]);
  }

  return (
    <div className="App">
      <button onClick={refresh}>Refresh data</button>
      <ul>
        {
          data.map((el,index)=>{
            return(
              <li key={index}>{el}</li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default App;
