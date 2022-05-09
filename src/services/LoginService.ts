import api from "./api";

interface ILogin {
  email: string;
  password: string;
}

interface IToken {
  access_token: string;
}

class LoginService {
  async login({ email, password }: ILogin) {
    const body = { email, password };

    try {
      const response = await api.post("/auth/login", body);
      const { access_token }: IToken = response.data;

      api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

      localStorage.setItem("access_token", access_token);

      return response.data;
    } catch (error: any) {
      console.log("login", error);
      return false;
    }
  }
}
export default new LoginService();
