import axiosInstance from '../configs/axios';

const utils = {
  fetchData: async (url) => {
    const {
      data: { data },
    } = await axiosInstance.get(url);
    return data;
  },
};

export { utils };
