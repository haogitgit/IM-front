import request from '../utils/request';

export function fetch(values) {
  return request('/api/user/fetch', {
    method: 'POST',
    headers: {
      "Content-Type":"application/json",
    },
    body: JSON.stringify(values),
    credentials: 'include',
  });
}
