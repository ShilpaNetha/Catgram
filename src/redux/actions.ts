// actions.ts
import { Action } from "redux";
import {
  CatImageData,
  Favorite,
  Vote,
  SetCatsAction,
  SetCounterAction,
  SetDownVotedAction,
  SetFavouriteCatAction,
  SetFavouritesAction,
  SetUpVotedAction,
  SetVotesAction,
  SetCatLoadingAction,
} from "../components/type";

export const SET_COUNTER = "SET_COUNTER";
export const SET_CATS = "SET_CATS";
export const SET_FAVOURITES = "SET_FAVOURITES";
export const SET_FAVOURITE_CAT = "SET_FAVOURITE_CAT";
export const SET_UPVOTED = "SET_UPVOTED";
export const SET_DOWNVOTED = "SET_DOWNVOTED";
export const SET_VOTES = "SET_VOTES";
export const SET_CAT_LOADING = "SET_CAT_LOADING";

export const setCounter = (value: number): SetCounterAction => ({
  type: SET_COUNTER,
  payload: value,
});

export const setCats = (cats: Array<CatImageData>): SetCatsAction => ({
  type: SET_CATS,
  payload: cats,
});

export const setFavouriteCat = (
  favouriteId: number,
  catId: string
): SetFavouriteCatAction => {
  return {
    type: SET_FAVOURITE_CAT,
    payload: {
      favouriteId,
      catId,
    },
  };
};

export const setUpVoted = (catId: string): SetUpVotedAction => {
  return {
    type: SET_UPVOTED,
    payload: {
      catId,
    },
  };
};

export const setDownVoted = (catId: string): SetDownVotedAction => {
  return {
    type: SET_DOWNVOTED,
    payload: {
      catId,
    },
  };
};

export const setVotes = (votes: Vote[]): SetVotesAction => {
  return {
    type: SET_VOTES,
    payload: {
      votes,
    },
  };
};

export const setFavourites = (
  favourites: Array<Favorite>
): SetFavouritesAction => ({
  type: SET_FAVOURITES,
  payload: favourites,
});

export const setCatLoading = (
  loading: boolean,
  catId: string
): SetCatLoadingAction => ({
  type: SET_CAT_LOADING,
  payload: {
    loading,
    catId,
  },
});
