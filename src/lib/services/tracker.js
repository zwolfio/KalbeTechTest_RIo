import api from "@/utils/axios";


export const getTracker = async (params) => {
  const token = localStorage.getItem("token");
  const res = await api.get(`/feature/trackers/paging`, {
    headers: {
      "X-PAGING-Limit": params?.limit || 10,
      "X-PAGING-Offset": params?.offset || 0,
      "X-PAGING-SortBy": params?.sortBy || "code",
      "X-PAGING-SortOrder": params?.sortOrder || "ASC",
      "X-PAGING-Search": params?.search || "%",
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