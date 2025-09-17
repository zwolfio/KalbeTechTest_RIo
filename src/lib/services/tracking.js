import api from "@/utils/axios";


export const getTracking = async (params) => {
  const token = localStorage.getItem("token");
  const res = await api.get(`/feature/trackings`, {
    headers: {
      "X-PAGING-Limit": params?.limit || 25,
      "X-PAGING-Offset": params?.offset || 0,
      "X-PAGING-SortBy": params?.sortBy || "created_on",
      "X-PAGING-SortOrder": params?.sortOrder || "DESC",
      "X-PAGING-Search": params?.search || "",
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
  });
  return res.data;
};
export const getTrackingbyid = async (id) => {
  const token = localStorage.getItem("token");
  const res = await api.get(`/feature/trackings/${id}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
  });
  return res.data;
};
export const addTracking = async (payload) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No access token, cannot logout");
  }
  console.log(token)
  const res = await api.post(
    "/feature/trackings",
    payload,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`, 
      },
    }
  );
  return res.data;
};
export const updateTracking = async (payload) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No access token, cannot logout");
  }
  console.log(token)
  const res = await api.put(
    "/feature/trackings", payload,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`, 
      },
    }
  );
  return res.data;
};
export const deleteTracking = async (payload) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No access token, cannot delete");
  }
  console.log("ini token : ",token)
  const res = await api.delete(
    "/feature/trackings", 
    {
      data: payload,
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`, 
      },
    }
  );
  return res;
};