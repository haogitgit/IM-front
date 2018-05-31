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

export function deleteContact(values) {
  return request('/api/user/deleteContact', {
    method: 'POST',
    headers: {
      "Content-Type":"application/json",
    },
    body: JSON.stringify(values),
    credentials: 'include',
  });
}

export function updateRemark(values) {
  return request('/api/user/updateRemark', {
    method: 'POST',
    headers: {
      "Content-Type":"application/json",
    },
    body: JSON.stringify(values),
    credentials: 'include',
  });
}

export function updateInfo(values) {
  return request('/api/user/updateInfo', {
    method: 'POST',
    headers: {
      "Content-Type":"application/json",
    },
    body: JSON.stringify(values),
    credentials: 'include',
  });
}
