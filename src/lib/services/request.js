import api from "@/utils/axios";


export const getRequest = async (params) => {
  const token = localStorage.getItem("token");
  const res = await api.get(`/feature/requests/paging`, {
    headers: {
      "X-PAGING-Limit": params?.limit || 10,
      "X-PAGING-Offset": params?.offset || 0,
      "X-PAGING-SortBy": params?.sortBy || "created_on",
      "X-PAGING-SortOrder": params?.sortOrder || "ASC",
      "X-PAGING-Search": params?.search || "",
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
  });
  return res.data;
};
export const getRequestbyid = async (id) => {
  const token = localStorage.getItem("token");
  const res = await api.get(`/feature/requests/${id}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
  });
  return res.data;
};
export const addRequest = async (payload) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No access token, cannot logout");
  }
  console.log(token)
  const res = await api.post(
    "/feature/requests",
    payload,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`, 
      },
    }
  );
  return res.data;
};
export const updateRequest = async (payload) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No access token, cannot logout");
  }
  console.log(token)
  const res = await api.put(
    "/feature/requests", payload,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`, 
      },
    }
  );
  return res.data;
};
export const deleteRequest = async (payload) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No access token, cannot delete");
  }
  console.log("ini token : ",token)
  const res = await api.delete(
    "/feature/requests", 
    {
      data: payload,
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`, 
      },
    }
  );
  return res;
};