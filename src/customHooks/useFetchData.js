import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = (initialUrl) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(initialUrl);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.get(url, { headers });
      setData(response.data);
      // console.log(response);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  const refetchData = () => {
    fetchData();
  };

  return { data, loading, error, refetchData, setUrl };
};

export default useFetchData;
