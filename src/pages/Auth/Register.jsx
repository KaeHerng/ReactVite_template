import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../styles/auth.css";

export default function Register({ setUser }) {
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        if (email && password) {
            // 模拟注册
            setUser({ email });
            navigate("/"); // 注册完成直接跳转 Dashboard
        } else {
            alert("请输入邮箱和密码");
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleRegister}>
                <h2 style={{ color: "black" }}>{t("auth.register")}</h2>
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
                <button type="submit">{t("auth.register")}</button>
                <p style={{ color: "black" }}>
                    {t("auth.alreadyHaveAccount")} <Link to="/login">{t("auth.login")}</Link>
                </p>
            </form>
        </div>
    );
}
