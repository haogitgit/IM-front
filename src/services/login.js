import request from '../utils/request';

export function login(str) {
  return request('/api/login', str);
}

export function register(str) {
  return request('/api/register', str);
}
