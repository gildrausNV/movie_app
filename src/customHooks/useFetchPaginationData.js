import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchPaginationData = (initialUrl, initialParams) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(initialUrl);
  const [params, setParams] = useState(initialParams);
  const [cancelToken, setCancelToken] = useState(null);
  const [totalPages, setTotalPages] = useState();

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const source = axios.CancelToken.source();
      setCancelToken(source);
      const response = await axios.get(url, { params, headers, cancelToken: source.token });
      setData(response.data.content);
      setTotalPages(response.data.totalPages);
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
  }, [url, params]);

  const updateParams = async (newParams, callback) => {
    setParams(newParams);
    if (callback && typeof callback === 'function') {
      callback();
    }
    fetchData();
  };

  const refetchData = () => {
    fetchData();
  };

  return { data, loading, error, refetchData, setUrl, updateParams, totalPages };
};

export default useFetchPaginationData;
