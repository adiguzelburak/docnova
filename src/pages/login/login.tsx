import { Button, Input, message, Spin } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useTheme } from "../../contexts/theme-context";
import { login } from "../../features/auth/authSlice";
import type { AppDispatch, RootState } from "../../store";

export default function LoginPage() {
  const { isDark } = useTheme();
  const [messageApi, contextHolder] = message.useMessage();
  const { loading } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      email: "devmelauser@yopmail.com",
      password: "Work123???",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(
        login({
          data: values,
          onSuccess: () => {
            messageApi.success("Login successful");
            navigate("/");
          },
          onError: (error) => {
            messageApi.error("Login failed " + error.errorMessage);
          },
        })
      );
    },
  });

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      navigate("/");
    } else {
      setIsCheckingToken(false);
    }
  }, [navigate]);

  if (isCheckingToken) {
    return (
      <div
        className="flex justify-center items-center h-screen"
        style={{ background: isDark ? "black" : "#f0f0f0" }}
      >
        <Spin />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex justify-center items-center px-4 py-8"
      style={{ background: isDark ? "black" : "#f0f0f0" }}
    >
      {contextHolder}
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 p-6 md:p-8 rounded-md w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
        style={{
          background: isDark ? "#141414" : "#fff",
        }}
      >
        <div className="flex items-center gap-2 md:gap-4 mb-4 justify-center">
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
              ></path>
            </g>
          </svg>
          <h1
            className="text-xl md:text-2xl font-bold text-center font-mono"
            style={{ color: isDark ? "#fff" : "#111010" }}
          >
            DocNova
          </h1>
        </div>

        <div>
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            type="email"
            name="email"
            placeholder={t("email")}
            size="large"
          />
          {formik.errors.email && (
            <div className="text-red-500 text-sm font-semibold p-1">
              {formik.errors.email}
            </div>
          )}
        </div>
        <div>
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            type="password"
            name="password"
            placeholder={t("password")}
            size="large"
          />
          {formik.errors.password && (
            <div className="text-red-500 text-sm font-semibold p-1">
              {formik.errors.password}
            </div>
          )}
        </div>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          disabled={loading}
          icon={<LoginOutlined />}
          size="large"
          className="mt-2"
        >
          {loading ? t("loggingIn") : t("login")}
        </Button>
      </form>
    </div>
  );
}
