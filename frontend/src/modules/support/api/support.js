import { apiUrl } from "../../common/api/config";

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Customer Support API
export const getCustomerTickets = async () => {
  try {
    const response = await fetch(`${apiUrl}/support/tickets/`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch tickets");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCustomerTicketDetail = async (ticketId) => {
  try {
    const response = await fetch(`${apiUrl}/support/tickets/${ticketId}/`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch ticket details");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createSupportTicket = async (ticketData) => {
  try {
    const response = await fetch(`${apiUrl}/support/tickets/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(ticketData),
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create ticket");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createSupportMessage = async (ticketId, messageData) => {
  try {
    const response = await fetch(`${apiUrl}/support/tickets/${ticketId}/messages/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(messageData),
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to send message");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCustomerSupportStats = async () => {
  try {
    const response = await fetch(`${apiUrl}/support/stats/`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch support stats");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// Admin Support API
export const getAdminTickets = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        queryParams.append(key, filters[key]);
      }
    });

    const url = `${apiUrl}/support/admin/tickets/${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    const response = await fetch(url, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch admin tickets");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAdminTicketDetail = async (ticketId) => {
  try {
    const response = await fetch(`${apiUrl}/support/admin/tickets/${ticketId}/`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch admin ticket details");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateTicketStatus = async (ticketId, updateData) => {
  try {
    const response = await fetch(`${apiUrl}/support/admin/tickets/${ticketId}/`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify(updateData),
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update ticket");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const assignTicket = async (ticketId, adminId = null) => {
  try {
    const response = await fetch(`${apiUrl}/support/admin/tickets/${ticketId}/assign/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ admin_id: adminId }),
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to assign ticket");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const takeTicket = async (ticketId) => {
  try {
    const response = await fetch(`${apiUrl}/support/admin/tickets/${ticketId}/take/`, {
      method: "POST",
      headers: getAuthHeaders(),
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to take ticket");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAdminSupportStats = async () => {
  try {
    const response = await fetch(`${apiUrl}/support/admin/stats/`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch admin support stats");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
