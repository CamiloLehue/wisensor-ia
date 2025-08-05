import { useAuth } from "../../contexts/AuthContext";

export const useRole = (requiredRole: string) => {
  const { user } = useAuth();
  
  return user?.roles?.includes(requiredRole) || false;
};