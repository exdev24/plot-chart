import Papa from 'papaparse';

async function fetchCsv(fileName) {
  const response = await fetch(fileName);
  const reader = response.body.getReader();
  const result = await reader.read();
  const decoder = new TextDecoder('utf-8');
  const csv = await decoder.decode(result.value);
  return csv;
}

async function getCsvData(fileName) {
  const data = Papa.parse(await fetchCsv(fileName));
  return data;
}

function formatCsvData(data) {
  if (data && data.data && data.data.length > 0) {
    return data.data.slice(1, data.data.length - 1).map(row => {
      const date = new Date(row[0]);
      return {
        x: `${date.toLocaleString('en-us', { month: 'short' })} ${date.getFullYear()}`,
        y: row[1] !== 'NaN' ? parseFloat(row[1]) : null,
        y0: row[2] !== 'Nan' ? parseFloat(row[2]) : null,
      };
    });
  }

  return [];
}

export { getCsvData, formatCsvData };