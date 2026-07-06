import { handleResponse, getAuthHeaders } from "./httpClient";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getSalesOrders() {
  const response = await fetch(
    `${API_BASE_URL}/sales-orders`,
    {
      headers: getAuthHeaders(),
    }
  );

  return handleResponse(response);
}

export async function getSalesOrder(id) {
  const response = await fetch(
    `${API_BASE_URL}/sales-orders/${id}`,
    {
      headers: getAuthHeaders(),
    }
  );

  return handleResponse(response);
}

export async function createSalesOrder(orderData) {
  const response = await fetch(
    `${API_BASE_URL}/sales-orders`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(orderData),
    }
  );

  return handleResponse(response);
}

export async function confirmSalesOrder(id) {
  const response = await fetch(
    `${API_BASE_URL}/sales-orders/${id}/confirm`,
    {
      method: "POST",
      headers: getAuthHeaders(),
    }
  );

  return handleResponse(response);
}