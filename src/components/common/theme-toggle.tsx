import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTheme } from "../../contexts/theme-context";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme}>
      {isDark ? <MoonOutlined /> : <SunOutlined />}
    </Button>
  );
}
