// @flow

export async function makeGetRequest<T>(apiUrl: string): Promise<T> {
  const response = await fetch(apiUrl, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true'
    }
  });
  if (!response.ok) {
    console.log('Failed to make secure GET call');
    throw new Error('Error making GET call!');
  }

  return response.json();
}

export async function validateAuth() {
  try {
    const response = await fetch('http://v9_website.ngrok.io/api/auth/validateAuth', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true'
      }
    });
    console.log(response);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const json = await response.json();
    return { username: json.user.username };
  } catch (e) {
    console.log(e);
    return { username: null };
  }
}
