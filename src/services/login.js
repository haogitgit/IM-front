import request from '../utils/request';

export function login(values) {
  return request('/api/login', {
    method: 'POST',
    headers: {
      "Content-Type":"application/json",
    },
    body: JSON.stringify(values),
    credentials: 'include',
  });
}

export function logout(id) {
  return request(`/api/logout/${id}`, {
    method: 'POST',
    credentials: 'include',
  });
}
