import React from "react";
import { useNavigate } from "react-router-dom";
import LoginService from "../../services/LoginService";
import styles from "./styles.module.css";
import Loading from "../../components/Loading";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState<string>("enzo@gmail.com");
  const [password, setPassword] = React.useState<string>("123456");
  const [color, setColor] = React.useState<string>("");
  const [photo, setPhoto] = React.useState<string>("");

  const handleUpdateUser = React.useCallback(async () => {
    try {
      const resultUpdate = await LoginService.getDataUser({
        email,
        color,
        photo,
      });

      if (!resultUpdate) {
        return false;
      }

      setColor(resultUpdate.color);
      setPhoto(resultUpdate.photo);
    } catch (error: any) {
      console.log("handleUpdateUser", error.response.data);
      return false;
    }
  }, [color, email, photo]);

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

  React.useEffect(() => {
    handleUpdateUser();
  }, []);

  return (
    <div className={styles.container}>
      <div
        className={styles.containerHeader}
        style={{ backgroundColor: color }}
      >
        <div className={styles.circleLogo}>
          {!photo ? (
            <div className={styles.loading}>
              <Loading color={color} />
            </div>
          ) : (
            <img src={photo} className={styles.logo} alt="logo" />
          )}
        </div>
      </div>

      <div className={styles.form}>
        <div className={styles.containerInput}>
          <label className={styles.label}>
            Email
            <input
              className={styles.input}
              type="email"
              placeholder="Digite seu Email"
              value={email.replace(/\s/g, "")}
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
      </div>
      <input
        disabled={!email || !password}
        style={{ backgroundColor: color, color: "#fff" }}
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
