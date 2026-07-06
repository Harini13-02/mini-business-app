import { handleResponse, getAuthHeaders } from './httpClient';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getProducts() {
  const response = await fetch(`${API_BASE_URL}/products`, {
    headers: getAuthHeaders(),
  });

  return handleResponse(response);
}

export async function getProductById(id) {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    headers: getAuthHeaders(),
  });

  return handleResponse(response);
}

export async function createProduct(product) {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(product),
  });

  return handleResponse(response);
}

export async function updateProduct(id, product) {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(product),
  });

  return handleResponse(response);
}

export async function deleteProduct(id) {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  return handleResponse(response);
}