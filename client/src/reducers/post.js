import {
  GET_POSTS,
  GET_NUMBERED_POSTS,
  GET_POSTS_CATEGORIES,
  GET_POST,
  GET_SEARCHED_POSTS,
  GET_POSTS_BY_CATEGORY,
  GET_POPULAR_POSTS,
  GET_LATEST_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "../actions/types";

const initialState = {
  posts: [],
  singlePost: null,
  searchedPosts: [],
  numberedPosts: [],
  popularPosts: [],
  latestPosts: [],
  categoryPosts: [],
  categories: [],
  loading: true,
  singlePostLoading: true,
  numberedPostsLoading: true,
  loadingSearchedPosts: true,
  loadingPopularPosts: true,
  loadingLatestPosts: true,
  loadingCategoryPosts: true,
  loadingCategories: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_NUMBERED_POSTS:
      return {
        ...state,
        numberedPosts: payload,
        numberedPostsLoading: false,
      };
    case GET_POSTS_CATEGORIES:
      return {
        ...state,
        categories: payload,
        loadingCategories: false,
      };
    case GET_SEARCHED_POSTS:
      return {
        ...state,
        searchedPosts: payload,
        loadingSearchedPosts: false,
      };
    case GET_POSTS_BY_CATEGORY:
      return {
        ...state,
        categoryPosts: payload,
        loadingCategoryPosts: false,
      };
    case GET_POPULAR_POSTS:
      return {
        ...state,
        popularPosts: payload,
        loadingPopularPosts: false,
      };
    case GET_LATEST_POSTS:
      return {
        ...state,
        latestPosts: payload,
        loadingLatestPosts: false,
      };
    case GET_POST:
      return {
        ...state,
        singlePost: payload,
        singlePostLoading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        singlePost: { ...state.singlePost, comments: payload },
        singlePostLoading: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        singlePost: {
          ...state.singlePost,
          comments: state.singlePost.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
        singlePostLoading: false,
      };
    default:
      return state;
  }
}
