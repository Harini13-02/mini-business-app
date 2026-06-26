const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function handleResponse(response) {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Request failed");
  }

  return data;
}

export async function getSalesOrders() {
  const response = await fetch(
    `${API_BASE_URL}/api/sales-orders`
  );

  return handleResponse(response);
}

export async function getSalesOrder(id) {
  const response = await fetch(
    `${API_BASE_URL}/api/sales-orders/${id}`
  );

  return handleResponse(response);
}

export async function createSalesOrder(orderData) {
  const response = await fetch(
    `${API_BASE_URL}/api/sales-orders`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    }
  );

  return handleResponse(response);
}

export async function confirmSalesOrder(id) {
  const response = await fetch(
    `${API_BASE_URL}/api/sales-orders/${id}/confirm`,
    {
      method: "POST",
    }
  );

  return handleResponse(response);
}