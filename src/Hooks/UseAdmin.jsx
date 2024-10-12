import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "./UseAxiosSecure";
import { AuthContext } from "../Providers/AuthProvider";

const UseAdmin = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();

  const { data: isAdmin, isLoading: isAdminLoading, error } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    queryFn: async () => {
      try {
        if (!user?.email) return false; // If no user email, return false
        const res = await axiosSecure.get(`/members/admin/${user.email}`); // Updated to members endpoint
        return res.data?.admin; // Return the 'admin' status
      } catch (error) {
        console.error("Error checking admin status:", error);
        return false; // Return false if there was an error
      }
    },
    enabled: !!user?.email, // Only run the query if user email is available
    staleTime: 5 * 60 * 1000, // Optional: stale time for caching (5 minutes)
  });

  return [isAdmin, isAdminLoading];
};

export default UseAdmin;
