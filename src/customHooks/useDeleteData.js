import { useState } from 'react';
import axios from 'axios';

const useDeleteData = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = async (url) => {
    console.log("REMOVE FROM WATCHLIST");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.delete(url, { headers });
      setResponse(response.data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  return { response, loading, error, deleteData };
};

export default useDeleteData;
