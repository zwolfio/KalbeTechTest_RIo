import api from "@/utils/axios";


export const getTracker = async (params) => {
  const token = localStorage.getItem("token");
  const res = await api.get(`/feature/trackers`, {
    headers: {
      "X-Paging-Limit": params?.limit || 25,
      "X-Paging-Offset": params?.offset || 0,
      "X-Paging-SortBy": params?.sortBy || "created_on",
      "X-Paging-SortOrder": params?.sortOrder || "DESC",
      "X-Paging-Search": params?.search || "",
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
  });
  return res.data;
};
export const getTrackerbyid = async (id) => {
  const token = localStorage.getItem("token");
  const res = await api.get(`/feature/trackers/${id}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(token)}`,
    },
  });
  return res.data;
};
export const addTracker = async (payload) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No access token, cannot logout");
  }
  console.log(token)
  const res = await api.post(
    "/feature/trackers",
    payload,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`, 
      },
    }
  );
  return res.data;
};
export const updateTracker = async (payload) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No access token, cannot logout");
  }
  console.log(token)
  const res = await api.put(
    "/feature/trackers", payload,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`, 
      },
    }
  );
  return res.data;
};
export const deleteTracker = async (payload) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No access token, cannot delete");
  }
  console.log("ini token : ",token)
  const res = await api.delete(
    "/feature/trackers", 
    {
      data: payload,
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`, 
      },
    }
  );
  return res;
};