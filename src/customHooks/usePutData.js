import { useState } from 'react';
import axios from 'axios';

const usePutData = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateData = async (url, postData) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.put(url, postData, { headers });
      setResponse(response.data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  return { response, loading, error, updateData };
};

export default usePutData;
