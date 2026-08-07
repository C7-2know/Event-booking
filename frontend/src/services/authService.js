import client from "../api/client";
const pause = (data) =>
  new Promise((resolve) => setTimeout(() => resolve(data), 350));
const makeUser = (data) => ({
  id: "usr-01",
  name: data.name,
  email: data.email,
  role: data.role,
  joined: "July 2026",
  avatar: data.name
    .split(" ")
    .map((x) => x[0])
    .join(""),
});
export const authService = {
  login: async (data) => {
    try {
      const response = await client.post("/auth/login", data);
      return response.data;
    } catch (error) {
      if (error.response) throw error;
    }
  },
  register: async (data) => {
    try {
      const response = await client.post("/auth/register", data);
      return response.data;
    } catch (error) {
      if (error.response) throw error;
    }
  },
  updateProfile: async (data) => pause(data),
  logout: async () => pause(true),
};
