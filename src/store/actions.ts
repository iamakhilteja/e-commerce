import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { TinyForceApi } from '../data/api';
import { ListingInterface } from '../data/listingModel';
import { AppAction, ActionTypes, AppState } from './types';

export const fetchPostsRequest = (): AppAction => ({
    type: ActionTypes.FETCH_POSTS_REQUEST,
});

export const fetchPostsSuccess = (posts: ListingInterface[]): AppAction => ({
    type: ActionTypes.FETCH_POSTS_SUCCESS,
    payload: posts,
});

export const fetchPostsFailure = (error: string): AppAction => ({
    type: ActionTypes.FETCH_POSTS_FAILURE,
    payload: error,
});

export const fetchPosts = (): ThunkAction<
    Promise<void>,
    AppState,
    unknown,
    AppAction
> => {
    return async (dispatch: ThunkDispatch<AppState, unknown, AppAction>) => {
        dispatch(fetchPostsRequest());

        try {
            const response = await TinyForceApi.getPosts();
            dispatch(fetchPostsSuccess(response.data));
        } catch (error: any) {
            dispatch(fetchPostsFailure(error.message));
        }
    };
};
