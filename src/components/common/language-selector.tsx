import { Select } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import tr from "../../assets/flags/tr.png";
import en from "../../assets/flags/en.png";

const { Option } = Select;

export default function LanguageSelector() {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  };

  return (
    <Select
      value={i18n.language}
      onChange={handleLanguageChange}
      style={{ minWidth: 163, width: "100%" }}
      suffixIcon={<GlobalOutlined />}
    >
      <Option className="flex items-center gap-2" value="en">
        <div className="flex items-center gap-2">
          <img className="w-4 h-4" src={en} alt="English" />{" "}
          <div>{t("english")}</div>
        </div>
      </Option>
      <Option className="flex items-center gap-2" value="tr">
        <div className="flex items-center gap-2">
          <img className="w-4 h-4" src={tr} alt="Turkish" />{" "}
          <div>{t("turkish")}</div>
        </div>
      </Option>
    </Select>
  );
}
