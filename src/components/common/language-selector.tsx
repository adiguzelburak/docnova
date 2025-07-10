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
      className="w-full min-w-[120px] sm:min-w-[140px] md:min-w-[163px]"
      suffixIcon={<GlobalOutlined />}
      size="middle"
    >
      <Option className="flex items-center gap-2" value="en">
        <div className="flex items-center gap-2">
          <img className="w-3 h-3 sm:w-4 sm:h-4" src={en} alt="English" />
          <span className="text-xs sm:text-sm">{t("english")}</span>
        </div>
      </Option>
      <Option className="flex items-center gap-2" value="tr">
        <div className="flex items-center gap-2">
          <img className="w-3 h-3 sm:w-4 sm:h-4" src={tr} alt="Turkish" />
          <span className="text-xs sm:text-sm">{t("turkish")}</span>
        </div>
      </Option>
    </Select>
  );
}
