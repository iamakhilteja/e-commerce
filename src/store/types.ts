import { ListingInterface } from "../data/listingModel";

// State type
export interface AppState {
    posts: ListingInterface[];
    loading: boolean;
    error: string | null;
}

// Action types
export enum ActionTypes {
    FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST',
    FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS',
    FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE',
}

// Action interfaces
export interface FetchPostsRequestAction {
    type: ActionTypes.FETCH_POSTS_REQUEST;
}

export interface FetchPostsSuccessAction {
    type: ActionTypes.FETCH_POSTS_SUCCESS;
    payload: ListingInterface[];
}

export interface FetchPostsFailureAction {
    type: ActionTypes.FETCH_POSTS_FAILURE;
    payload: string;
}

export type AppAction =
    | FetchPostsRequestAction
    | FetchPostsSuccessAction
    | FetchPostsFailureAction;
