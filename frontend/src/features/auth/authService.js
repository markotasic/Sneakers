const registerUser = async (values) => {
  const response = await fetch('http://localhost:5000/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: values.name,
      email: values.email,
      password: values.password,
    }),
  });

  const data = await response.json();

  if (data) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  return data;
};

const loginUser = async (loginValues) => {
  const response = await fetch('http://localhost:5000/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: loginValues.email,
      password: loginValues.password,
    }),
  });

  const data = await response.json();

  if (data) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  return data;
};

const authService = {
  registerUser,
  loginUser,
};

export default authService;
