import axios from "axios";
import { BASE_URL } from "Config";

export const HttpService = axios.create({
  baseURL: BASE_URL,
  timeout: 80000,
});

//---------------------------------------------------interceptors--------------------------------------------------------
let sent = false;

HttpService.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("access_token");
    if (authToken !== undefined) {
      config.headers.token = authToken;
      config.timeout = 800000;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

HttpService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const {
      response: { status },
      config,
    } = error;

    if (status === 401 && config.url !== "/auth/refresh-token" && !sent) {
      if (config.url.startsWith("/products") && config.method === "get") {
        localStorage.removeItem("access_token");
        config.headers.token = undefined;

        HttpService.defaults.headers.refreshToken =
          localStorage.getItem("refresh_token");

        HttpService.post("/auth/refresh-token").then(({ data }) => {
          const { accessToken } = data;
          localStorage.setItem("access_token", accessToken);
          window.location.reload();
        });

        return HttpService(config);
      }
      sent = true;
      localStorage.removeItem("access_token");

      HttpService.defaults.headers.refreshToken =
        localStorage.getItem("refresh_token");

      HttpService.post("/auth/refresh-token").then(({ data }) => {
        const { accessToken } = data;
        localStorage.setItem("access_token", accessToken);
        window.location.reload();
      });
    } else if (config.url === "/auth/refresh-token") {
      if (window.location.href.includes("admin")) {
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
      }
    } else if (status === 404 || status === 500) {
      window.location.href = "/*";
    } else {
      return Promise.reject(error);
    }
  }
);