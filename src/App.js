import { useEffect, useState } from 'react';
import Chat from './component/chat';
import { formatCsvData, getCsvData } from './utils/getCsvData';
import './App.css';

function App() {
  const [pastData, setPastData] = useState([]);
  const [futureData, setFutureData] = useState([]);

  const loadData = async () => {
    const data = await getCsvData('Past.csv');
    const data1 = await getCsvData('Future.csv');

    setPastData(formatCsvData(data));
    setFutureData(formatCsvData(data1));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="App">
      {/* We can customize width and height */}
      <Chat width={800} height={500} pastData={pastData} futureData={futureData} />
    </div>
  );
}

export default App;
