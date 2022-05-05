import React from "react";
import { useNavigate } from "react-router-dom";
import LoginService from "../services/LoginService";
import Logo from "../assets/logo.png";
import styles from "./styles.module.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState<string>("enzo@gmail.com");
  const [password, setPassword] = React.useState<string>("123456");

  const handleLogin = React.useCallback(async () => {
    try {
      const result = await LoginService.login({
        email,
        password,
      });

      if (!result) {
        return false;
      }

      return navigate("/user");
    } catch (erro: any) {
      console.log("LoginService", erro.response.data);
      return false;
    }
  }, [email, navigate, password]);

  return (
    <div className={styles.container}>
      <div className={styles.containerHeader}>
        <div className={styles.circleLogo}>
          <img src={Logo} className={styles.logo} alt="logo" />
        </div>
      </div>

      <div className={styles.form}>
        <label className={styles.label}>
          Email
          <input
            className={styles.input}
            type="email"
            placeholder="Digite seu Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>

        <label className={styles.label}>
          Senha
          <input
            className={styles.input}
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
      </div>
      <input
        disabled={!email || !password}
        className={styles.button}
        onClick={() => {
          handleLogin();
        }}
        type="submit"
        value="Login"
      />
    </div>
  );
}

export default Login;
