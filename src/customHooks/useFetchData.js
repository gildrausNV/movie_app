import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = (initialUrl) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(initialUrl);
  const [cancelToken, setCancelToken] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const source = axios.CancelToken.source();
      setCancelToken(source);
      const response = await axios.get(url, { headers, cancelToken: source.token });
      setData(response.data);
    } catch (error) {
      if (!axios.isCancel(error)) {
        setError(error);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    return () => {
      if (cancelToken) {
        cancelToken.cancel("Request canceled by cleanup");
      }
    };
  }, [url]);


  const refetchData = () => {
    fetchData();
  };

  return { data, loading, error, refetchData, setUrl };
};

export default useFetchData;
