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
  GET_VIEW_STATUS,
  GET_PHOTO_CATEGORIES,
  GET_POPULAR_PHOTOS,
  GET_PHOTOGRAPHER_PHOTOS,
  GET_AUTH_PHOTOGRAPHER_PHOTOS,
  GET_SEARCHED_PHOTOS,
  GET_AUTOCOMPLETE_PHOTOS,
  GET_PHOTOS_BY_CATEGORY,
} from "../actions/types";

const initialState = {
  photos: [],
  categoryPhotos: [],
  searchedPhotos: [],
  autocompletePhotos: [],
  photographerPhotos: [],
  authPhotographerPhotos: [],
  viewStatus: [],
  likeStatus: [],
  singlePhoto: null,
  popularPhotos: [],
  categories: [],
  loading: true,
  singlePhotoLoading: true,
  categoryPhotosLoading: true,
  searchedPhotosLoading: true,
  viewStatusLoading: true,
  likeStatusLoading: true,
  autocompletePhotosLoading: true,
  photographerPhotosLoading: true,
  authPhotographerPhotosLoading: true,
  popularPhotosLoading: true,
  categoriesLoading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PHOTOS:
      return {
        ...state,
        photos: payload,
        loading: false,
      };
    case GET_PHOTOS_BY_CATEGORY:
      return {
        ...state,
        categoryPhotos: payload,
        categoryPhotosLoading: false,
      };
    case GET_SEARCHED_PHOTOS:
      return {
        ...state,
        searchedPhotos: payload,
        searchedPhotosLoading: false,
      };
    case GET_AUTOCOMPLETE_PHOTOS:
      return {
        ...state,
        autocompletePhotos: payload,
        autocompletePhotosLoading: false,
      };
    case GET_PHOTOGRAPHER_PHOTOS:
      return {
        ...state,
        photographerPhotos: payload,
        photographerPhotosLoading: false,
      };
    case GET_AUTH_PHOTOGRAPHER_PHOTOS:
      return {
        ...state,
        authPhotographerPhotos: payload,
        authPhotographerPhotosLoading: false,
      };
    case GET_POPULAR_PHOTOS:
      return {
        ...state,
        popularPhotos: payload,
        popularPhotosLoading: false,
      };
    case GET_PHOTO_CATEGORIES:
      return {
        ...state,
        categories: payload,
        categoriesLoading: false,
      };
    case GET_PHOTO:
      return {
        ...state,
        singlePhoto: payload,
        singlePhotoLoading: false,
      };
    case ADD_PHOTO:
      return {
        ...state,
        posts: [payload, ...state.photos],
        loading: false,
      };
    case DELETE_PHOTO:
      return {
        ...state,
        photos: state.photos.filter((photo) => photo._id !== payload),
        loading: false,
      };
    case GET_VIEW_STATUS:
      return {
        ...state,
        viewStatus: payload,
        viewStatusLoading: false,
      };
    case VIEW_PHOTO:
      return {
        ...state,
        singlePhoto: { ...state.singlePhoto, views: payload },
        singlePhotoLoading: false,
      };
    case GET_LIKE_STATUS:
      return {
        ...state,
        likeStatus: payload,
        likeStatusLoading: false,
      };
    case LIKE_PHOTO:
      return {
        ...state,
        singlePhoto: { ...state.singlePhoto, likes: payload },
        singlePhotoLoading: false,
      };
    case UNLIKE_PHOTO:
      return {
        ...state,
        singlePhoto: { ...state.singlePhoto, likes: payload },
        singlePhotoLoading: false,
      };
    case PHOTO_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        singlePhotoLoading: false,
      };
    default:
      return state;
  }
}
