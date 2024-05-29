export const useLocalStorage = (key: string) => {
  const setData = (value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const getData = () => {
    try {
      const data = window.localStorage.getItem(key);
      return data ? JSON.parse(data) : undefined;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    setData,
    getData,
  };
};
