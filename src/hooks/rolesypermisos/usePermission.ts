import { useAuth } from "../../contexts/AuthContext";



export const usePermission = (requiredPermission: string) => {
  const { user } = useAuth();
  
  return user?.permisos?.includes(requiredPermission) || false;
};