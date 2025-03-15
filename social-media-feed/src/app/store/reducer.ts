import { createReducer, on } from '@ngrx/store';
import { addPost, updatePost, addComment, likePost } from './actions';

export interface FeedState {
  posts: any[];
}

const initialState: FeedState = { posts: [] };

export const feedReducer = createReducer(
  initialState,
  on(addPost, (state, { post }) => ({ ...state, posts: [...state.posts, post] })),
  on(updatePost, (state, { post }) => ({
    ...state,
    posts: state.posts.map(p => (p.id === post.id ? post : p))
  })),
  on(addComment, (state, { comment }) => ({
    ...state,
    posts: state.posts.map(post => post.id === comment.postId ? 
      { ...post, comments: [...post.comments, comment] } : post)
  })),
  on(likePost, (state, { postId }) => ({
    ...state,
    posts: state.posts.map(post => post.id === postId ? { ...post, likes: post.likes + 1 } : post)
  }))
);