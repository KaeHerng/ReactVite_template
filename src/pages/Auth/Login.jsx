import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { loginFNC } from "../../api";
import { login } from "../../redux/userSlice";
import "../../styles/auth.css";

export default function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginFNC(email, password);

      if (!res.data) {
        alert(res.message || "Login failed");
        return;
      }

      const { token, admin } = res.data;

      console.log("token", token);

      const userData = {
        email: admin.username,
        name: admin.name,
        role: admin.role_name,
      };

      dispatch(login(userData));
      navigate("/");

    } catch (err) {
      alert(err.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2 className="largeText" style={{ color: "black" }}>{t("auth.login")}</h2>

        <input
          type="email"
          className="paragraph"
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

        <button className="buttonText" type="submit">{t("auth.login")}</button>

        <p className="smallText" style={{ color: "black" }}>
          {'View Page'}{" "}
          <Link to="/stickOnScroll">{'Home Page'}</Link>
        </p>

        <p className="smallText" style={{ color: "black" }}>
          {t("auth.donthaveaccount")}{" "}
          <Link to="/register">{t("auth.register")}</Link>
        </p>
      </form>
    </div>
  );
}
