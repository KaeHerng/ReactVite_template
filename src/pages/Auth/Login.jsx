import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { login } from "../../redux/userSlice";
import "../../styles/auth.css";

export default function Login({ setUser }) {
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (email && password) {
            const userData = {
                email,
                name: 'Obama, Trump',
                role: 'admin'
            }; // 模拟用户信息
            dispatch(login(userData)); // 保存 Redux + localStorage
            setUser(userData);
            navigate("/"); // 跳转 Dashboard
        } else {
            alert("请输入邮箱和密码");
        }
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
                    {t("auth.donthaveaccount")} <Link to="/register">{t("auth.register")}</Link>
                </p>
            </form>
        </div>
    );
}
