// src/layouts/MainLayout.tsx
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Layout, Menu, Spin, Button } from "antd";
import { useAuth } from "../context/auth-context";

const { Header, Content, Sider } = Layout;

const MainLayout: React.FC = () => {
  const { isUser, loading, logout } = useAuth();
  const navigate = useNavigate();

  if (loading) return <Spin tip="Loading..." style={{ marginTop: 100 }} />;

  if (!isUser) {
    navigate("/");
    return null;
  }

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <Menu theme="dark" defaultSelectedKeys={["dashboard"]} mode="inline">
          <Menu.Item key="dashboard" onClick={() => navigate("/dashboard")}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="logout">
            <Button
              type="link"
              onClick={handleLogout}
              style={{ color: "white" }}
            >
              Logout
            </Button>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }}>CSV Panel</Header>
        <Content style={{ margin: "16px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
