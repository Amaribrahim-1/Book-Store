import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Main from "../components/Main";
import AdminNavBar from "../components/AdminNavBar";

function AdminLayout() {
  return (
    <>
      <Header>
        <AdminNavBar />
      </Header>
      <Main>
        <Outlet />
      </Main>
    </>
  );
}

export default AdminLayout;
