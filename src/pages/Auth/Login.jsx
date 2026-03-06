import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { login } from "../../redux/userSlice";
import "../../styles/auth.css";

export default function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("请输入邮箱和密码");
      return;
    }

    const userData = {
      email,
      name: "Obama, Trump",
      role: "admin",
    };

    dispatch(login(userData));
    navigate("/");
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2 style={{ color: "black" }}>{t("auth.login")}</h2>

        <input
          type="email"
          placeholder={t("auth.email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder={t("auth.password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">{t("auth.login")}</button>

        <p style={{ color: "black" }}>
          {t("auth.donthaveaccount")}{" "}
          <Link to="/register">{t("auth.register")}</Link>
        </p>
      </form>
    </div>
  );
}
