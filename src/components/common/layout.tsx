import {
  LogoutOutlined,
  ProfileOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Layout as AntLayout,
  Button,
  Flex,
  Menu,
  Space,
  Typography,
  Drawer,
} from "antd";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/theme-context";
import LanguageSelector from "./language-selector";
import ThemeToggle from "./theme-toggle";

type MenuItem = Required<MenuProps>["items"][number];

const { Sider, Content } = AntLayout;
const { Title } = Typography;

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const items: MenuItem[] = [
    { key: "1", icon: <ProfileOutlined />, label: t("invoiceList") },
  ];

  const SidebarContent = () => (
    <Flex vertical style={{ height: "100%" }}>
      <div className="p-4 text-center">
        <Title
          level={3}
          className="font-mono mt-6 flex items-center justify-center gap-2 md:gap-4"
          style={{
            color: isDark ? "#fff" : "#000",
          }}
        >
          <svg
            preserveAspectRatio="xMidYMid meet"
            data-bbox="23.5 23.5 153 153"
            viewBox="23.5 23.5 153 153"
            height="40"
            width="40"
            xmlns="http://www.w3.org/2000/svg"
            data-type="color"
            role="img"
            aria-label="Homepage"
            fill="white"
            className="md:h-[50px] md:w-[50px]"
          >
            <g>
              <path
                d="M158.026 23.5H41.974C31.771 23.5 23.5 31.771 23.5 41.974v116.052c0 10.203 8.271 18.474 18.474 18.474h116.052c10.203 0 18.474-8.271 18.474-18.474V41.974c0-10.203-8.271-18.474-18.474-18.474zM62.37 125.347c-8.382 1.206-16.154-4.611-17.36-12.992s4.611-16.154 12.992-17.36c8.382-1.206 16.154 4.611 17.36 12.992s-4.61 16.154-12.992 17.36zm89.787-43.89-47.193 63.061a14.978 14.978 0 0 1-12.021 6.014c-3.127 0-6.279-.974-8.976-2.992-6.633-4.964-7.985-14.364-3.022-20.997l47.193-63.061c4.964-6.633 14.363-7.985 20.997-3.022 6.632 4.964 7.985 14.365 3.022 20.997z"
                fill={isDark ? "#fff" : "#111010"}
                data-color="1"
                className="transition-all duration-300"
              ></path>
            </g>
          </svg>
          <span className="text-lg md:text-xl lg:text-2xl">DocNova</span>
        </Title>
      </div>

      <div className="flex-1 pt-4 md:pt-12">
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme={isDark ? "dark" : "light"}
          items={items}
          className="h-full"
        />
      </div>

      <div
        className="p-4 border-t"
        style={{
          borderColor: isDark ? "#303030" : "#f0f0f0",
        }}
      >
        <Space direction="vertical" className="w-full" size="small">
          <div className="flex flex-col sm:flex-row gap-2">
            <ThemeToggle />
            <LanguageSelector />
          </div>
          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            className="w-full"
            onClick={() => {
              Cookies.remove("token");
              navigate("/login");
            }}
          >
            {t("logout")}
          </Button>
        </Space>
      </div>
    </Flex>
  );

  return (
    <AntLayout className="h-screen">
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          type="primary"
          icon={<MenuOutlined />}
          onClick={() => setMobileMenuOpen(true)}
          className="shadow-lg"
        />
      </div>

      <Drawer
        placement="left"
        closable={true}
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={280}
        className="md:hidden"
        styles={{
          body: { padding: 0 },
          header: { display: "none" },
        }}
      >
        <div
          style={{
            background: isDark ? "#001529" : "#fff",
            height: "100%",
          }}
        >
          <SidebarContent />
        </div>
      </Drawer>

      <Sider
        width={250}
        breakpoint="md"
        collapsedWidth={0}
        theme={isDark ? "dark" : "light"}
        className="hidden md:block h-screen"
        style={{ height: "100vh" }}
      >
        <SidebarContent />
      </Sider>

      <AntLayout className="h-screen overflow-hidden">
        <Content
          className="m-3 md:m-6 p-3 md:p-6 rounded-md overflow-y-auto"
          style={{
            background: isDark ? "#141414" : "#fff",
            height: "calc(100vh - 24px)",
          }}
        >
          {children}
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
