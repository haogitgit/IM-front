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

export function searchContact(values) {
  return request('/api/user/searchContact', {
    method: 'POST',
    headers: {
      "Content-Type":"application/json",
    },
    body: JSON.stringify(values),
    credentials: 'include',
  });
}
