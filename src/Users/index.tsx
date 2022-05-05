import React from "react";
import { useDropzone } from "react-dropzone";
import UserService from "../services/UserService";
import styles from "./styles.module.css";
import logo from "../assets/logo.png";
import Switch from "react-switch";
import { MdModeEdit } from "react-icons/md";

function Users() {
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("enzo@gmail.com");
  const [phone, setPhone] = React.useState<string>("");
  const [color, setColor] = React.useState<string>("");
  const [nationality, setNationality] = React.useState<string>("");
  const [photo, setPhoto] = React.useState<string>("");
  const [checked, setChecked] = React.useState<boolean>(false);

  const handleChange = (nextChecked: any) => {
    setChecked(nextChecked);
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  const handleUser = React.useCallback(async () => {
    try {
      const result = await UserService.getUser({
        email,
        name,
        phone,
        color,
        nationality,
      });

      if (!result) {
        return false;
      }

      setName(result.name);
      setPhone(result.phone);
      setColor(result.color);
      setNationality(result.nationality);
      setEmail(result.email);
      setPhoto(result.photo);
    } catch (error: any) {
      console.log("UserService", error.response.data);
      return false;
    }
  }, [color, email, name, nationality, phone]);

  const handleUpdateUser = React.useCallback(async () => {
    try {
      const resultUpdate = await UserService.updateUser({
        email,
        name,
        phone,
        color,
        nationality,
      });

      if (!resultUpdate) {
        return false;
      }

      console.log("resultUpdate", resultUpdate);
      return handleUser();
    } catch (error: any) {
      console.log("UserService", error.response.data);
      return false;
    }
  }, [color, email, handleUser, name, nationality, phone]);

  React.useEffect(() => {
    handleUser();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerHeader}>
          {checked ? (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className={styles.circleLogo}>
                <img src={logo} className={styles.logo} alt="logo" />
                <div className={styles.circleEdit}>
                  <MdModeEdit className={styles.iconEdit} />
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.circleLogo}>
              <img src={logo} className={styles.logo} alt="logo" />
            </div>
          )}
        </div>

        <div className={styles.form}>
          <div className={styles.toggle}>
            <Switch
              onColor={"#00BFFF"}
              offColor={"#e0e0e0"}
              uncheckedIcon={false}
              checkedIcon={false}
              onChange={handleChange}
              checked={checked}
              className="react-switch"
            />
            <label>Modo editor</label>
          </div>

          <label className={styles.label}>
            Nome
            <input
              disabled={!checked}
              className={styles.input}
              type="text"
              placeholder="Digite seu email"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </label>

          <label className={styles.label}>
            Telefone
            <input
              disabled={!checked}
              className={styles.input}
              type="text"
              placeholder="Digite seu telefone"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </label>

          <label className={styles.label}>
            Email
            <input
              disabled={true}
              className={styles.input}
              type="email"
              placeholder="Digite sua senha"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>

          <label className={styles.label}>
            Cor
            <input
              disabled={!checked}
              className={styles.input}
              type="text"
              placeholder="Digite sua cor"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
              }}
            />
          </label>

          <label className={styles.label}>
            Nacionalidade
            <input
              disabled={!checked}
              className={styles.input}
              type="text"
              placeholder="Digite sua nacionalidade"
              value={nationality}
              onChange={(e) => {
                setNationality(e.target.value);
              }}
            />
          </label>
        </div>
        <input
          disabled={!checked}
          className={checked ? styles.button : styles.buttonDisabled}
          onClick={() => {
            handleUpdateUser();
          }}
          type="submit"
          value="Editar"
        />
      </div>
    </>
  );
}

export default Users;
