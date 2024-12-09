import { useState } from "react";
import "@/assets/scss/App.scss";

interface PasswordInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange, placeholder = "Password" }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="password-container">
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <i
        className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"}
        onClick={() => setShowPassword(!showPassword)}
        style={{ cursor: "pointer" }}
      ></i>
    </div>
  );
};

export default PasswordInput;
