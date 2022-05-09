import React from "react";
import { useDropzone } from "react-dropzone";
import UserService from "../../services/UserService";
import styles from "./styles.module.css";
import logo from "../../assets/logo.png";
import Switch from "react-switch";
import { MdModeEdit } from "react-icons/md";

interface IColors {
  colors: string;
  fontColor: string;
  index: number;
}

function Users() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [name, setName] = React.useState<string>("");
  const [color, setColor] = React.useState<string>("");
  const [fontColor, setFontColor] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("enzo@gmail.com");
  const [phone, setPhone] = React.useState<string>("");
  const [nationality, setNationality] = React.useState<string>("");
  const [isValid, setIsValid] = React.useState<boolean>(false);
  // const [file, setFile] = React.useState<JSX.Element[]>(files);

  const [checked, setChecked] = React.useState<boolean>(false);
  const handleChange = (nextChecked: any) => {
    setChecked(nextChecked);
  };

  const files = acceptedFiles.map((file) => (
    <img src={URL.createObjectURL(file)} alt="logo" />
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

  const handleUpdatePhoto = React.useCallback(async () => {
    try {
      const resultUpdatePhoto = await UserService.updatePhoto({
        file: files,
      });

      console.log("file", files);

      if (!resultUpdatePhoto) {
        return false;
      }

      return console.log("resultUpdatePhoto", resultUpdatePhoto);
    } catch (error: any) {
      console.log("updatePhoto", error.response.data);
      return false;
    }
  }, [files]);

  React.useEffect(() => {
    handleUser();
  }, []);

  const colors: IColors[] = [
    { colors: "#42c1c7", fontColor: "#fff", index: 0 },
    { colors: "#fefe33", fontColor: "#000", index: 1 },
    { colors: "#fabc02", fontColor: "#fff", index: 2 },
    { colors: "#fb9902", fontColor: "#fff", index: 3 },
    { colors: "#fd5308", fontColor: "#fff", index: 4 },
    { colors: "#fe2712", fontColor: "#fff", index: 5 },
    { colors: "#a7194b", fontColor: "#fff", index: 6 },
    { colors: "#8601af", fontColor: "#fff", index: 7 },
    { colors: "#3d01a4", fontColor: "#fff", index: 8 },
    { colors: "#0247fe", fontColor: "#fff", index: 9 },
    { colors: "#0392ce", fontColor: "#fff", index: 10 },
    { colors: "#66b032", fontColor: "#fff", index: 11 },
    { colors: "#d0ea2b", fontColor: "#000", index: 12 },
  ];

  return (
    <div className={styles.mainContainer}>
      <div
        className={
          checked
            ? styles.colorContainer
            : `${styles.hideCircle} ${styles.hideContainer}`
        }
      >
        {colors.map((color: IColors) => (
          <div
            key={color.index}
            className={
              checked
                ? styles.colorCircle
                : `${styles.hideCircle} ${styles.hideContainer}`
            }
            style={{ backgroundColor: color.colors }}
            onClick={() => {
              setColor(color.colors);
              setFontColor(color.fontColor);
            }}
          ></div>
        ))}
      </div>

      <div className={checked ? styles.container : styles.containerEdit}>
        <div
          className={styles.containerHeader}
          style={{ backgroundColor: color }}
        >
          {checked ? (
            <div {...getRootProps()} className={styles.circleActive}>
              <input {...getInputProps()} />
              <div className={styles.circleLogo}>
                <img src={logo} className={styles.logo} alt="logo" />
                <div
                  className={styles.circleEdit}
                  style={{ border: `${color} solid 1px` }}
                >
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
              onColor={color}
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
                setIsValid(false);
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
              value={phone
                .replace(/\D/g, "")
                .replace(/(\d{2})(\d)/, "($1) $2 ")
                .replace(/(\d{4})(\d)/, "$1-$2")
                .replace(/(\d{4})(\d)/, "$1-$2")}
              onChange={(e) => {
                setPhone(e.target.value);
                setIsValid(false);
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
                setIsValid(false);
                setEmail(e.target.value);
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
                setIsValid(false);
                setNationality(e.target.value);
              }}
            />
          </label>
        </div>
        <input
          disabled={!checked}
          style={{ backgroundColor: color, color: fontColor }}
          className={checked ? styles.button : styles.buttonDisabled}
          onClick={() => {
            handleUpdatePhoto();
          }}
          type="submit"
          value="Editar"
        />
      </div>
    </div>
  );
}

export default Users;
