import axios from 'axios';

// dotenv.config({ path: path.join(__dirname, '.env') });

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 1000,
});

export default axiosInstance;
