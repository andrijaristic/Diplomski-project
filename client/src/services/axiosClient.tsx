import axios from "axios";

type AxiosType = {
  headers: object;
};

const createAxiosClient = (options: AxiosType) => {
  const client = axios.create(options);

  client.interceptors.request.use(
    (config: any) => {
      if (config.authorization !== false) {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return client;
};

export const axiosClient = createAxiosClient({
  headers: {},
});
