import api from "@/utils/axios";

export const loginService = async (payload) => {
  const res = await api.post("/authentication/auth/login", payload);
  return res.data;
};
export const logoutService = async (payload) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No access token, cannot logout");
  }
  console.log(token)
  const res = await api.post(
    "/authentication/auth/logout",
    payload,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`, 
      },
    }
  );
  return res.data;
};
export const moduleRole = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No access token, cannot logout");
  }
  console.log(token)
  const res = await api.get(
    "/authentication/auth/authorization?nested=true",
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`, 
      },
    }
  );
  return res.data;
};