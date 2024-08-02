const URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const tasksApi = async (method, endpoint, body) => {
  const options = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };

  const response = await fetch(`${URL}${endpoint}`, options);
  const data = await response.json();

  return {
    status: response.status,
    data,
  };
};

export default tasksApi;
