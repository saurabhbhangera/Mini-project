import { createAction, props } from '@ngrx/store';

export const loadPosts = createAction('[Feed] Load Posts');
export const addPost = createAction('[Feed] Add Post', props<{ post: any }>());
export const updatePost = createAction('[Feed] Update Post', props<{ post: any }>());
export const addComment = createAction('[Feed] Add Comment', props<{ comment: any }>());
export const likePost = createAction('[Feed] Like Post', props<{ postId: string }>());