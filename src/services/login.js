import request from '../utils/request';

export function login(values) {
  return request('/api/login', {
    method: 'POST',
    headers: {
      "Content-Type":"application/json",
    },
    body: JSON.stringify(values),
  });
}

