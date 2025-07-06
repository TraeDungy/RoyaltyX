import useFetch from "../../global/hooks/useFetch";

// Admin Dashboard Stats Hook
export const useAdminDashboardStats = () => {
  const { data, loading, error, refetch } = useFetch("/admin-panel/dashboard/stats/");
  
  return {
    stats: data,
    loading,
    error,
    refetch
  };
};

// Users Stats Hook
export const useUsersStats = () => {
  const { data, loading, error, refetch } = useFetch("/admin-panel/users/stats/");
  
  return {
    usersStats: data,
    loading,
    error,
    refetch
  };
};

// Projects Stats Hook
export const useProjectsStats = () => {
  const { data, loading, error, refetch } = useFetch("/admin-panel/projects/stats/");
  
  return {
    projectsStats: data,
    loading,
    error,
    refetch
  };
};

// Sources Stats Hook
export const useSourcesStats = () => {
  const { data, loading, error, refetch } = useFetch("/admin-panel/sources/stats/");
  
  return {
    sourcesStats: data,
    loading,
    error,
    refetch
  };
};

// Users List Hook (with pagination)
export const useUsersList = (page = 1, pageSize = 20) => {
  const { data, loading, error, refetch } = useFetch(`/admin-panel/users/?page=${page}&page_size=${pageSize}`);
  
  return {
    users: data?.results || [],
    totalCount: data?.count || 0,
    totalPages: data?.count ? Math.ceil(data.count / pageSize) : 0,
    currentPage: page,
    hasNext: !!data?.next,
    hasPrevious: !!data?.previous,
    loading,
    error,
    refetch
  };
};
