export const fetchIndexesData = async () => {
  try {
    const response = await fetch('https://financialmodelingprep.com/api/v3/quotes/index?apikey=demo');
    if (!response.ok) {
      throw new Error('Failed to fetch indexes data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching indexes data:', error);
    return [];
  }
};