import axios from "axios";
import React, { useState } from "react";
import RegisterModal from "../componets/RegisterModal";
import styles from "./Login.module.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      // Redirecionar para a página principal ou para a página de lista de compras
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <div className={styles.inputGroup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className={styles.button} onClick={handleLogin}>
        Login
      </button>
      <button
        className={styles.button}
        onClick={() => setIsRegisterModalOpen(true)}
      >
        Create an account
      </button>
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onRequestClose={() => setIsRegisterModalOpen(false)}
      />
    </div>
  );
};

export default Login;
