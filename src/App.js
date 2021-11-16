import { useEffect, useState } from 'react';
import Chat from './component/chat';
import { formatCsvData, getCsvData } from './utils/getCsvData';
import './App.css';

function App() {
  const [pastData, setPastData] = useState(null);
  const [futureData, setFutureData] = useState(null);

  const loadData = async () => {
    const data = await getCsvData('Past.csv');
    const data1 = await getCsvData('Future.csv');

    setPastData(formatCsvData(data));
    setFutureData(formatCsvData(data1));
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!pastData || !futureData) {
    return <div>
      Failed to load CSV data. Please use the correct CSV file name on your public folder.
    </div>
  }

  return (
    <div className="App">
      {/* We can customize width and height */}
      <Chat width={800} height={500} pastData={pastData} futureData={futureData} />
    </div>
  );
}

export default App;
