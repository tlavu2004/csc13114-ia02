import { fetchWithTimeout } from "./http";

const BASE_URL = "https://picsum.photos/v2";
const IMAGE_BASE_URL = "https://picsum.photos";

export const fetchPicsumImageList = (page = 1, limit = 10) =>
    fetchWithTimeout(`${BASE_URL}/list?page=${page}&limit=${limit}`);

export const fetchPicsumImageDetail = (id) =>
    fetchWithTimeout(`${IMAGE_BASE_URL}/id/${id}/info`);

export const fetchPicsumImage = (id, width = 200, height = 200) =>
    `${IMAGE_BASE_URL}/id/${id}/${width}/${height}`;

export const PicsumAPI = {
    list: fetchPicsumImageList,
    detail: fetchPicsumImageDetail,
    image: fetchPicsumImage,
};