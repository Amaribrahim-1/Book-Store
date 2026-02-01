import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Main from "../components/Main";
import NavBar from "../components/NavBar";

function UserLayout() {
  return (
    <>
      <Header>
        <NavBar />
      </Header>
      <Main>
        <Outlet />
      </Main>
    </>
  );
}

export default UserLayout;
