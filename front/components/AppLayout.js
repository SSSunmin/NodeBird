import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";
import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";
import styled from "styled-components";

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const items = [
  {
    label: (
      <Link href="/">
        <a>노드버드</a>
      </Link>
    ),
    key: "menu_1",
  },
  {
    label: (
      <Link href="/profile">
        <a>프로필</a>
      </Link>
    ),
    key: "menu_2",
  },
  {
    label: <SearchInput enterButton />,
    key: "menu_3",
  },
  {
    label: (
      <Link href="/signup">
        <a>회원가입</a>
      </Link>
    ),
    key: "menu_4",
  },
];

const AppLayout = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <div>
      <Menu mode="horizontal" items={items} />
      <Row gutter={10}>
        <Col xs={24} md={6}>
          {isLoggedIn ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://github.com/SSSunmin"
            target="_blank"
            rel="noreferrer noopener"
          >
            Made by sunmin
          </a>
        </Col>
      </Row>
    </div>
  );
};

// npm i prop-types
AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
