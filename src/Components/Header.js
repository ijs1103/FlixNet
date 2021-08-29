import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  font-size: 1rem;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(3, 0, 0);
  z-index: 10;
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.5);
`;
const MenuDiv = styled.div`
  margin-left: 10%;
`;
const List = styled.ul`
  display: flex;
`;
const Item = styled.li`
  width: 80px;
  height: 50px;
  text-align: center;
  color:
  ${props => (props.current ? "red" : "white")};
  transition: border-bottom 0.5s ease-in-out;
`;
const SLink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SearchDiv = styled.div`
  margin-right: 10%;
`;
const SearchLogo = styled.div`
  width: 32px;
  height: 32px;
  position: absolute;
  top: 22%;
  opacity: ${props => props.current ? 0 : 1};
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMy44ODE5IDUuMzMzMjVDOS4xNjA2IDUuMzMzMjUgNS4zMzMyNSA5LjE2MDYgNS4zMzMyNSAxMy44ODE5QzUuMzMzMjUgMTguNjAzMiA5LjE2MDYgMjIuNDMwNSAxMy44ODE5IDIyLjQzMDVDMTUuNzc2IDIyLjQzMDUgMTcuNTI3MSAyMS44MTQgMTguOTQ0MyAyMC43NzFMMjMuMTI4MSAyNC45NTQ5QzIzLjYzMjYgMjUuNDU5NCAyNC40NTA1IDI1LjQ1OTQgMjQuOTU0OSAyNC45NTQ5QzI1LjQ1OTQgMjQuNDUwNSAyNS40NTk0IDIzLjYzMjYgMjQuOTU0OSAyMy4xMjgxTDIwLjc3MSAxOC45NDQzQzIxLjgxNCAxNy41MjcxIDIyLjQzMDUgMTUuNzc2IDIyLjQzMDUgMTMuODgxOUMyMi40MzA1IDkuMTYwNiAxOC42MDMyIDUuMzMzMjUgMTMuODgxOSA1LjMzMzI1Wk03LjkxNjcxIDEzLjg4MTlDNy45MTY3MSAxMC41ODc0IDEwLjU4NzQgNy45MTY3MSAxMy44ODE5IDcuOTE2NzFDMTcuMTc2NCA3LjkxNjcxIDE5Ljg0NyAxMC41ODc0IDE5Ljg0NyAxMy44ODE5QzE5Ljg0NyAxNS40OTM4IDE5LjIwODIgMTYuOTU1OCAxOC4xNjkgMTguMDI5NkMxOC4xNDQyIDE4LjA1MDkgMTguMTIwMSAxOC4wNzMzIDE4LjA5NjcgMTguMDk2N0MxOC4wNzMzIDE4LjEyMDEgMTguMDUwOSAxOC4xNDQyIDE4LjAyOTYgMTguMTY5QzE2Ljk1NTggMTkuMjA4MiAxNS40OTM4IDE5Ljg0NyAxMy44ODE5IDE5Ljg0N0MxMC41ODc0IDE5Ljg0NyA3LjkxNjcxIDE3LjE3NjQgNy45MTY3MSAxMy44ODE5WiIgZmlsbD0iIzg2OEU5NiIvPgo8L3N2Zz4K);
`;
const Search = styled.input`
  all: unset;
  height: 35px;
  font-size: 1rem;
  padding-left: 40px;
  color: rgb(133, 142, 150);
  background-color: rgb(32, 37, 40, 0.7);
  border-radius: 7px;
  opacity: ${props => props.current ? 0 : 1};
  :disabled{
    ${props => props.current ? true : false};
  }
`;

export default withRouter(({ location: { pathname } }) => (
  <Header>
    <MenuDiv>
      <List>
        <Item current={pathname === "/"}>
          <SLink to="/">영화</SLink>
        </Item>
        <Item current={pathname === "/tv"}>
          <SLink to="/tv">드라마</SLink>
        </Item>
      </List>
    </MenuDiv>
    <SearchDiv>
        <Link to="/search"><SearchLogo current={pathname === "/search"}/><Search current={pathname === "/search"} placeholder="검색 ..." /></Link>
    </SearchDiv>
  </Header>
));
