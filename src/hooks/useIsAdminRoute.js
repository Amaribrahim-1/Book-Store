import { useLocation } from "react-router-dom";

function useIsAdminRoute() {
  const { pathname } = useLocation();
  return pathname.startsWith("/admin");
}
export default useIsAdminRoute;
