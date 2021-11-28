import { useRouter } from "next/router";
import { useNhostAuth } from "@nhost/react-auth";

export default function PrivateRoute({ children }) {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useNhostAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  return children;
}
