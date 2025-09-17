
import api from "@/utils/axios";
import { 
  getTracker, 
  getTrackerbyid, 
  addTracker, 
  updateTracker, 
  deleteTracker 
} from "@/lib/services/tracker";

jest.mock("@/utils/axios", () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

beforeEach(() => {
  const store = {};
  global.localStorage = {
    getItem: jest.fn((key) => store[key]),
    setItem: jest.fn((key, value) => (store[key] = value)),
    removeItem: jest.fn((key) => delete store[key]),
    clear: jest.fn(() => Object.keys(store).forEach((k) => delete store[k])),
  };

  localStorage.setItem("token", JSON.stringify("test-token")); 
  jest.clearAllMocks();
});

describe("Tracker API", () => {
  it("should fetch tracker with default params", async () => {
    api.get.mockResolvedValueOnce({ data: { items: [] } });

    const result = await getTracker({});
    expect(api.get).toHaveBeenCalledWith("/feature/trackers/paging", {
      headers: expect.objectContaining({
        "X-PAGING-Limit": 10,
        "X-PAGING-Offset": 0,
        "X-PAGING-SortBy": "code",
        "X-PAGING-SortOrder": "ASC",
        "X-PAGING-Search": "%",
        Authorization: "Bearer test-token",
      }),
    });
    expect(result).toEqual({ items: [] });
  });

  it("should fetch tracker by id", async () => {
    api.get.mockResolvedValueOnce({ data: { id: 1 } });

    const result = await getTrackerbyid(1);
    expect(api.get).toHaveBeenCalledWith("/feature/trackers/1", {
      headers: { Authorization: "Bearer test-token" },
    });
    expect(result).toEqual({ id: 1 });
  });

  it("should add tracker", async () => {
    const payload = { code: "123" };
    api.post.mockResolvedValueOnce({ data: { success: true } });

    const result = await addTracker(payload);
    expect(api.post).toHaveBeenCalledWith("/feature/trackers", payload, {
      headers: { Authorization: "Bearer test-token" },
    });
    expect(result).toEqual({ success: true });
  });

  it("should throw error when adding tracker without token", async () => {
    localStorage.clear();
    await expect(addTracker({})).rejects.toThrow("No access token, cannot logout");
  });

  it("should update tracker", async () => {
    const payload = { id: 1, code: "new" };
    api.put.mockResolvedValueOnce({ data: { success: true } });

    const result = await updateTracker(payload);
    expect(api.put).toHaveBeenCalledWith("/feature/trackers", payload, {
      headers: { Authorization: "Bearer test-token" },
    });
    expect(result).toEqual({ success: true });
  });

  it("should delete tracker", async () => {
    const payload = { id: 1 };
    api.delete.mockResolvedValueOnce({ status: 200 });

    const result = await deleteTracker(payload);
    expect(api.delete).toHaveBeenCalledWith("/feature/trackers", {
      data: payload,
      headers: { Authorization: "Bearer test-token" },
    });
    expect(result).toEqual({ status: 200 });
  });
});
