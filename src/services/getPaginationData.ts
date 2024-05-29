export const getAllData = async (url: string, type: 'starships' | 'people') => {
  const response = await fetch(url);
  const data = await response.json();
  const totalPages = Math.ceil(data.count / 10);
  let allData = data.results;

  for (let i = 2; i <= totalPages; i++) {
    const response = await fetch(`https://swapi.dev/api/${type}/?page=${i}`);
    const data = await response.json();
    allData = allData.concat(data.results);
  }

  return allData;
};
