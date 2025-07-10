import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, Button, message } from "antd";
import { login } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";

export default function LoginPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const { loading } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();
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
          },
          onError: (error) => {
            messageApi.error("Login failed " + error.errorMessage);
          },
        })
      );
    },
  });

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {contextHolder}
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 bg-white p-4 rounded-md w-96"
      >
        <div className="flex items-center gap-4 justify-center my-6">
          <svg
            preserveAspectRatio="xMidYMid meet"
            data-bbox="23.5 23.5 153 153"
            viewBox="23.5 23.5 153 153"
            height="50"
            width="50"
            xmlns="http://www.w3.org/2000/svg"
            data-type="color"
            role="img"
            aria-label="Homepage"
            fill="white"
          >
            <g>
              <path
                d="M158.026 23.5H41.974C31.771 23.5 23.5 31.771 23.5 41.974v116.052c0 10.203 8.271 18.474 18.474 18.474h116.052c10.203 0 18.474-8.271 18.474-18.474V41.974c0-10.203-8.271-18.474-18.474-18.474zM62.37 125.347c-8.382 1.206-16.154-4.611-17.36-12.992s4.611-16.154 12.992-17.36c8.382-1.206 16.154 4.611 17.36 12.992s-4.61 16.154-12.992 17.36zm89.787-43.89-47.193 63.061a14.978 14.978 0 0 1-12.021 6.014c-3.127 0-6.279-.974-8.976-2.992-6.633-4.964-7.985-14.364-3.022-20.997l47.193-63.061c4.964-6.633 14.363-7.985 20.997-3.022 6.632 4.964 7.985 14.365 3.022 20.997z"
                fill="#111010"
                data-color="1"
              ></path>
            </g>
          </svg>
          <h1 className="text-2xl font-bold text-center font-mono">DocNova</h1>
        </div>

        <div>
          <Input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            type="email"
            name="email"
            placeholder="Email"
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
            placeholder="Password"
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
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
