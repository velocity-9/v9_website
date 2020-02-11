const validateAuth = async () => {
  try {
    const response = await fetch('http://v9_website.ngrok.io/api/auth/validateAuth', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true
      }
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const json = await response.json();
    return { isAuthenticated: true, username: json.user.username };
  } catch (e) {
    console.log(e);
    return { isAuthenticated: false };
  }
};

export default validateAuth;
