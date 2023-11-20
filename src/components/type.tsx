import { Action } from "redux";
import {
  SET_CATS,
  SET_COUNTER,
  SET_DOWNVOTED,
  SET_FAVOURITES,
  SET_FAVOURITE_CAT,
  SET_UPVOTED,
  SET_VOTES,
  SET_CAT_LOADING,
} from "../redux/actions";

interface CatImageData {
  id: string;
  url: string;
}
interface Favorite {
  id: string;
  image_id: string;
}

interface FavoriteResponse {
  id: number;
  image_id: string;
}

interface Cat {
  id: string;
  url: string;
  image_id: string;
  favourite_id: string;
  upvoted: boolean;
  downvoted: boolean;
  upvotes: number;
  downvotes: number;
  loading: boolean;
}

interface VoteResponse {
  image_id: string;
}

interface setFavouriteCatI {
  favouriteId: number;
  catId: string;
}

interface Vote {
  id: number;
  image_id: string;
  value: number;
}
interface SetCounterAction extends Action<typeof SET_COUNTER> {
  payload: number;
}

interface SetCatsAction extends Action<typeof SET_CATS> {
  payload: CatImageData[];
}

interface SetFavouritesAction extends Action<typeof SET_FAVOURITES> {
  payload: Favorite[];
}

interface SetFavouritesAction extends Action<typeof SET_FAVOURITES> {
  payload: Favorite[];
}

interface SetFavouriteCatAction extends Action<typeof SET_FAVOURITE_CAT> {
  payload: setFavouriteCatI;
}

interface SetUpVotedAction extends Action<typeof SET_UPVOTED> {
  payload: {
    catId: string;
  };
}

interface SetDownVotedAction extends Action<typeof SET_DOWNVOTED> {
  payload: {
    catId: string;
  };
}

interface SetVotesAction extends Action<typeof SET_VOTES> {
  payload: {
    votes: Vote[];
  };
}
interface SetCatLoadingAction extends Action<typeof SET_CAT_LOADING> {
  payload: {
    loading: boolean;
    catId: string;
  };
}

export interface CatCardProps {
  id: string;
  url: string;
  favouriteId: string;
  upvoted: boolean;
  upvotes: number;
  downvoted: boolean;
  downvotes: number;
  loading: boolean;
}

export type {
  CatImageData,
  Favorite,
  Cat,
  Vote,
  VoteResponse,
  FavoriteResponse,
  SetCounterAction,
  SetCatsAction,
  SetFavouritesAction,
  SetFavouriteCatAction,
  SetUpVotedAction,
  SetDownVotedAction,
  SetVotesAction,
  SetCatLoadingAction,
};
