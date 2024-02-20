import { useState } from 'react';
import axios from 'axios';

const usePostData = (token = null) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (url, postData) => {
    setLoading(true);
    try {
      // const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.post(url, postData, { headers });
      setResponse(response.data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  return { response, loading, error, postData };
};

export default usePostData;
