import { handleResponse, getAuthHeaders } from './httpClient';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

export async function getCustomers() {
  const response = await fetch(
    `${API_BASE_URL}/customers`,
    {
      headers: getAuthHeaders(),
    }
  );

  return handleResponse(response);
}

export async function getCustomerById(id) {
  const response = await fetch(
    `${API_BASE_URL}/customers/${id}`,
    {
      headers: getAuthHeaders(),
    }
  );

  return handleResponse(response);
}

export async function createCustomer(customer) {
  const response = await fetch(
    `${API_BASE_URL}/customers`,
    {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(customer),
    }
  );

  return handleResponse(response);
}

export async function updateCustomer(id, customer) {
  const response = await fetch(
    `${API_BASE_URL}/customers/${id}`,
    {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(customer),
    }
  );

  return handleResponse(response);
}

export async function deleteCustomer(id) {
  const response = await fetch(
    `${API_BASE_URL}/customers/${id}`,
    {
      method: 'DELETE',
      headers: getAuthHeaders(),
    }
  );

  return handleResponse(response);
}