import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const current = i18n.language || "en";

    const changeLang = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("lang", lang);
    };

    const containerStyle = { display: "flex", gap: 4, padding: 4, background: "#f3f4f6", borderRadius: 999 };
    const buttonStyle = { border: "none", background: "transparent", padding: "6px 12px", fontSize: 13, fontWeight: 600, borderRadius: 999, cursor: "pointer", color: "#374151", transition: "all 0.2s ease" };
    const activeStyle = { background: "#111827", color: "#ffffff", boxShadow: "0 2px 6px rgba(0,0,0,0.15)" };

    return (
        <div style={containerStyle}>
            <button
                onClick={() => changeLang("en")}
                style={{ ...buttonStyle, ...(current.startsWith("en") ? activeStyle : {}) }}>
                EN
            </button>

            <button
                onClick={() => changeLang("zh")}
                style={{ ...buttonStyle, ...(current.startsWith("zh") ? activeStyle : {}) }}>
                中文
            </button>
        </div>
    );
}
