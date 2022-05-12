import FormData from "form-data";
import api from "./api";

interface IUser {
  name: string;
  email?: string;
  phone: string;
  color: string;
  nationality: string;
  token?: string | null;
}

class UserService {
  async getUser({ email, token }: IUser) {
    try {
      const response = await api.get(`/user/getuser?email=${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      console.log("getUser", error.response.data);
      return false;
    }
  }

  async updateUser({ name, phone, color, nationality }: IUser) {
    const body = { name, phone, color, nationality };
    try {
      const response = await api.put("/user", body);

      return response.data;
    } catch (error: any) {
      console.log("updateUser", error.response.data);

      return false;
    }
  }

  async updatePhoto({ file }: any) {
    const formData = new FormData();
    formData.append("file", {
      file,
      name: "user.jpg",
      type: "image/jpeg",
    });
    try {
      const response = await api.put("/user/update-photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "multipart/form-data",
        },
      });

      return response.data;
    } catch (error: any) {
      console.log("updatePhoto", error.response.data);

      return false;
    }
  }

  async logoutUser() {
    try {
      const response = await api.post("/auth/logout");

      return response.data;
    } catch (error: any) {
      console.log("logoutUser", error.response.data);

      return false;
    }
  }
}
export default new UserService();
