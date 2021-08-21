import axios from 'axios';
import { setAlert } from './alert';
import {
	GET_PHOTOS,
	GET_PHOTO,
	GET_LIKE_STATUS,
	LIKE_PHOTO,
	UNLIKE_PHOTO,
	DELETE_PHOTO,
	ADD_PHOTO,
	VIEW_PHOTO,
	PHOTO_ERROR,
	GET_PHOTO_CATEGORIES,
	GET_POPULAR_PHOTOS,
	GET_PHOTOGRAPHER_PHOTOS,
	GET_AUTH_PHOTOGRAPHER_PHOTOS,
	GET_SEARCHED_PHOTOS,
	GET_AUTOCOMPLETE_PHOTOS,
	GET_PHOTOS_BY_CATEGORY,
	GET_VIEW_STATUS,
} from './types';

// Get all photos
export const getPhotos = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/photos');
		dispatch({
			type: GET_PHOTOS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PHOTO_ERROR,
			payload: { msg: err, status: err },
		});
	}
};

// Get view status
export const getViewStatus = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/photos/viewStatus/${id}`);
		dispatch({
			type: GET_VIEW_STATUS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PHOTO_ERROR,
			payload: { msg: err, status: err },
		});
	}
};

// Get like status
export const getLikeStatus = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/photos/likeStatus/${id}`);
		dispatch({
			type: GET_LIKE_STATUS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PHOTO_ERROR,
			payload: { msg: err, status: err },
		});
	}
};

// Get photo categories
export const getPhotosCategory = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/photos/categories');
		dispatch({
			type: GET_PHOTO_CATEGORIES,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PHOTO_ERROR,
			payload: { msg: err, status: err },
		});
	}
};

// Get popular photos
export const getPopularPhotos = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/photos/popular');
		dispatch({
			type: GET_POPULAR_PHOTOS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PHOTO_ERROR,
			payload: { msg: err, status: err },
		});
	}
};

// Search posts
export const searchPhotos = (content) => async (dispatch) => {
	try {
		const res = await axios.post('/api/photos/search', { content });
		dispatch({
			type: GET_SEARCHED_PHOTOS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PHOTO_ERROR,
			payload: { msg: err, status: err },
		});
	}
};

// Auto complete
export const autoCompletePhotos = (content) => async (dispatch) => {
	try {
		const res = await axios.post('/api/photos/complete', { content });
		dispatch({
			type: GET_AUTOCOMPLETE_PHOTOS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PHOTO_ERROR,
			payload: { msg: err, status: err },
		});
	}
};

// Get photos by category
export const getPhotosByCategory = (cat) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/photos/search/${cat}`);
		dispatch({
			type: GET_PHOTOS_BY_CATEGORY,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PHOTO_ERROR,
			payload: { msg: err, status: err },
		});
	}
};

// Get latest posts
export const getPhotographerPhotos = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/photos/photographer');
		dispatch({
			type: GET_PHOTOGRAPHER_PHOTOS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PHOTO_ERROR,
			payload: { msg: err, status: err },
		});
	}
};

// Get photos by photographer id
export const getPhotosByPhotographer = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/photos/photographer/${id}`);
		dispatch({
			type: GET_AUTH_PHOTOGRAPHER_PHOTOS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PHOTO_ERROR,
			payload: { msg: err, status: err },
		});
	}
};

// Get post
export const getPhoto = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/photos/${id}`);
		dispatch({
			type: GET_PHOTO,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PHOTO_ERROR,
			payload: { msg: err, status: err },
		});
	}
};

// Add like
export const addLike = (id) => async (dispatch) => {
	try {
		const res = await axios.put(`/api/photos/like/${id}`);

		dispatch({
			type: LIKE_PHOTO,
			payload: res.data,
		});
		dispatch(getLikeStatus(id));
	} catch (err) {
		dispatch({
			type: PHOTO_ERROR,
			payload: { msg: err, status: err },
		});
	}
};

// Remove like
export const removeLike = (id) => async (dispatch) => {
	try {
		const res = await axios.put(`/api/photos/unlike/${id}`);

		dispatch({
			type: UNLIKE_PHOTO,
			payload: res.data,
		});
		dispatch(getLikeStatus(id));
	} catch (err) {
		dispatch({
			type: PHOTO_ERROR,
			payload: { msg: err, status: err },
		});
	}
};

// Delete photo
export const deletePhoto = (id, history) => async (dispatch) => {
	try {
		await axios.delete(`/api/photos/${id}`);

		dispatch({
			type: DELETE_PHOTO,
			payload: id,
		});
		dispatch(setAlert('Photo deleted', 'success'));
		history.push('/dashboard');
	} catch (err) {
		dispatch({
			type: PHOTO_ERROR,
			payload: { msg: err, status: err },
		});
		dispatch(setAlert('Something went wrong', 'danger'));
	}
};

// Add photo
export const addPhoto = (formData, history) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.post('/api/photos', formData, config);
		dispatch({
			type: ADD_PHOTO,
			payload: res.data,
		});
		console.log(res.data);
		dispatch(setAlert('Photo created', 'success'));
		history.push('/dashboard');
	} catch (err) {
		console.log(err);
		dispatch({
			type: PHOTO_ERROR,
			payload: { msg: err, status: err },
		});
	}
};

// View photo
export const viewPhoto = (id) => async (dispatch) => {
	try {
		const res = await axios.put(`/api/photos/view/${id}`);

		dispatch({
			type: VIEW_PHOTO,
			payload: res.data,
		});
		dispatch(getViewStatus(id));
	} catch (err) {
		dispatch({
			type: PHOTO_ERROR,
			payload: { msg: err, status: err },
		});
	}
};
