import { fetchWithTimeout } from "./http";

const BASE_URL = "https://picsum.photos/v2";
const PHOTO_BASE_URL = "https://picsum.photos";

export const fetchPicsumPhotoList = (page = 1, limit = 10) =>
	fetchWithTimeout(`${BASE_URL}/list?page=${page}&limit=${limit}`);

export const fetchPicsumPhotoDetail = (id) =>
	fetchWithTimeout(`${PHOTO_BASE_URL}/id/${id}/info`);

export const fetchPicsumPhoto = (id, width = 200, height = 200) =>
	`${PHOTO_BASE_URL}/id/${id}/${width}/${height}`;

export const PicsumAPI = {
	list: fetchPicsumPhotoList,
	detail: fetchPicsumPhotoDetail,
	photo: fetchPicsumPhoto,
};