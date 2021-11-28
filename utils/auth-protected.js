import { useRouter } from "next/router";
import { useNhostAuth } from "@nhost/react-auth";

export function authProtected(Comp) {
  return function AuthProtected(props) {
    const router = useRouter();
    const { isLoading, isAuthenticated } = useNhostAuth();

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      router.push("/login");
      return null;
    }

    return <Comp {...props} />;
  };
}
