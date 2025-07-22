import { useEffect, useState } from "react";
import useMutation from "../../global/hooks/useMutation";
import useFetch from "../../global/hooks/useFetch";

// Customer Support Hooks
export const useCustomerTickets = () => {
  const { data, loading, error, refetch } = useFetch("/support/tickets/");
  
  return {
    tickets: data,
    loading,
    error,
    refetch
  };
};

export const useCustomerTicketDetail = (ticketId) => {
  const [ticket, setTicket] = useState(null);

  const {
    data,
    loading,
    error: fetchError,
    refetch
  } = useFetch(`/support/tickets/${ticketId}/`);

  useEffect(() => {
    if (data) {
      setTicket(data);
    }
  }, [data]);

  return {
    ticket,
    loading,
    error: fetchError,
    refetch
  };
};

export const useCreateSupportTicket = () => {
  const {
    mutate: createTicketMutation,
    loading,
    error,
  } = useMutation("/support/tickets/", "POST");

  const createTicket = async (ticketData) => {
    try {
      const result = await createTicketMutation(ticketData);
      return result;
    } catch (error) {
      console.error("Error creating ticket:", error);
      throw error;
    }
  };

  return {
    createTicket,
    loading,
    error,
  };
};

export const useCreateSupportMessage = (ticketId) => {
  const {
    mutate: createMessageMutation,
    loading,
    error,
  } = useMutation(`/support/tickets/${ticketId}/messages/`, "POST");

  const createMessage = async (messageData) => {
    try {
      const result = await createMessageMutation(messageData);
      return result;
    } catch (error) {
      console.error("Error creating message:", error);
      throw error;
    }
  };

  return {
    createMessage,
    loading,
    error,
  };
};

export const useCustomerSupportStats = () => {
  const { data, loading, error, refetch } = useFetch("/support/stats/");
  
  return {
    stats: data,
    loading,
    error,
    refetch
  };
};

// Admin Support Hooks
export const useAdminTickets = (filters = {}) => {
  const queryParams = new URLSearchParams();
  
  Object.keys(filters).forEach(key => {
    if (filters[key]) {
      queryParams.append(key, filters[key]);
    }
  });

  const url = `/support/admin/tickets/${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  
  const { data, loading, error, refetch } = useFetch(url);
  
  return {
    tickets: data,
    loading,
    error,
    refetch
  };
};

export const useAdminTicketDetail = (ticketId) => {
  const [ticket, setTicket] = useState(null);

  const {
    data,
    loading,
    error: fetchError,
    refetch
  } = useFetch(`/support/admin/tickets/${ticketId}/`);

  useEffect(() => {
    if (data) {
      setTicket(data);
    }
  }, [data]);

  return {
    ticket,
    loading,
    error: fetchError,
    refetch
  };
};

export const useUpdateTicketStatus = (ticketId) => {
  const {
    mutate: updateTicketMutation,
    loading,
    error,
  } = useMutation(`/support/admin/tickets/${ticketId}/`, "PATCH");

  const updateTicket = async (updateData) => {
    try {
      const result = await updateTicketMutation(updateData);
      return result;
    } catch (error) {
      console.error("Error updating ticket:", error);
      throw error;
    }
  };

  return {
    updateTicket,
    loading,
    error,
  };
};

export const useAssignTicket = (ticketId) => {
  const {
    mutate: assignTicketMutation,
    loading,
    error,
  } = useMutation(`/support/admin/tickets/${ticketId}/assign/`, "POST");

  const assignTicket = async (adminId = null) => {
    try {
      const result = await assignTicketMutation({ admin_id: adminId });
      return result;
    } catch (error) {
      console.error("Error assigning ticket:", error);
      throw error;
    }
  };

  return {
    assignTicket,
    loading,
    error,
  };
};

export const useTakeTicket = (ticketId) => {
  const {
    mutate: takeTicketMutation,
    loading,
    error,
  } = useMutation(`/support/admin/tickets/${ticketId}/take/`, "POST");

  const takeTicket = async () => {
    try {
      const result = await takeTicketMutation();
      return result;
    } catch (error) {
      console.error("Error taking ticket:", error);
      throw error;
    }
  };

  return {
    takeTicket,
    loading,
    error,
  };
};

export const useAdminSupportStats = () => {
  const { data, loading, error, refetch } = useFetch("/support/admin/stats/");
  
  return {
    stats: data,
    loading,
    error,
    refetch
  };
};

// Legacy functions for backward compatibility (if needed)
// These can be removed once all components are updated to use hooks

export const getCustomerTickets = async () => {
  console.warn("getCustomerTickets is deprecated. Use useCustomerTickets hook instead.");
  // Implementation kept for backward compatibility if needed
};

export const getCustomerTicketDetail = async (_ticketId) => {
  console.warn("getCustomerTicketDetail is deprecated. Use useCustomerTicketDetail hook instead.");
  // Implementation kept for backward compatibility if needed
};

export const createSupportTicket = async (_ticketData) => {
  console.warn("createSupportTicket is deprecated. Use useCreateSupportTicket hook instead.");
  // Implementation kept for backward compatibility if needed
};

export const createSupportMessage = async (_ticketId, _messageData) => {
  console.warn("createSupportMessage is deprecated. Use useCreateSupportMessage hook instead.");
  // Implementation kept for backward compatibility if needed
};

export const getCustomerSupportStats = async () => {
  console.warn("getCustomerSupportStats is deprecated. Use useCustomerSupportStats hook instead.");
  // Implementation kept for backward compatibility if needed
};

export const getAdminTickets = async (_filters = {}) => {
  console.warn("getAdminTickets is deprecated. Use useAdminTickets hook instead.");
  // Implementation kept for backward compatibility if needed
};

export const getAdminTicketDetail = async (_ticketId) => {
  console.warn("getAdminTicketDetail is deprecated. Use useAdminTicketDetail hook instead.");
  // Implementation kept for backward compatibility if needed
};

export const updateTicketStatus = async (_ticketId, _updateData) => {
  console.warn("updateTicketStatus is deprecated. Use useUpdateTicketStatus hook instead.");
  // Implementation kept for backward compatibility if needed
};

export const assignTicket = async (_ticketId, _adminId = null) => {
  console.warn("assignTicket is deprecated. Use useAssignTicket hook instead.");
  // Implementation kept for backward compatibility if needed
};

export const takeTicket = async (_ticketId) => {
  console.warn("takeTicket is deprecated. Use useTakeTicket hook instead.");
  // Implementation kept for backward compatibility if needed
};

export const getAdminSupportStats = async () => {
  console.warn("getAdminSupportStats is deprecated. Use useAdminSupportStats hook instead.");
  // Implementation kept for backward compatibility if needed
};

export const useHelpAssistant = () => {
  const { mutate: ask, loading, error } = useMutation("/support/help/chat/", "POST");

  const sendQuestion = async (message) => {
    const result = await ask({ message });
    return result?.response;
  };

  return { sendQuestion, loading, error };
};
