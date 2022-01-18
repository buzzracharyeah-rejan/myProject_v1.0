import axiosInstance from '../configs/axios';

const utils = {
  fetchData: async (page = 0, limit = 0) => {
    const {
      data: { data },
    } = await axiosInstance.get(`/api/property?page=${page}&limit=${limit}`);
    return data;
  },
};

export { utils };
