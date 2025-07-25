describe("getHealthStatus", () => {
  test("calls backend health endpoint and returns data", async () => {
    process.env.REACT_APP_API_URL = "http://localhost:8000";
    jest.resetModules();
    const { getHealthStatus } = require("../health");
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ status: "ok" }),
      }),
    );
    const data = await getHealthStatus();
    expect(fetch).toHaveBeenCalledWith("http://localhost:8000/health/");
    expect(data).toEqual({ status: "ok" });
  });
});
