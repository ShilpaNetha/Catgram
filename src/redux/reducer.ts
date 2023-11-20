/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
// reducer.ts
import { Cat, Vote } from "../components/type";
import {
  SET_CATS,
  SET_CAT_LOADING,
  SET_COUNTER,
  SET_DOWNVOTED,
  SET_FAVOURITES,
  SET_FAVOURITE_CAT,
  SET_UPVOTED,
  SET_VOTES,
} from "./actions";

export interface AppState {
  counter: number;
  cats: Cat[];
  catsLoading: boolean;
}

const initialState: AppState = {
  counter: 0,
  cats: [],
  catsLoading: true,
};

const transformCats = (cats: any[]): Cat[] => {
  return cats.map((cat) => ({
    id: cat.id,
    url: cat.url,
    image_id: cat.id,
    favourite_id: "",
    upvoted: false,
    downvoted: false,
    upvotes: 0,
    downvotes: 0,
    loading: false,
  }));
};

const reducer = (state: AppState = initialState, action: any): AppState => {
  switch (action.type) {
    case SET_COUNTER:
      return {
        ...state,
        counter: action.payload,
      };
    case SET_CATS:
      const modifiedCats: Cat[] = transformCats(action.payload);
      return {
        ...state,
        cats: modifiedCats,
        catsLoading: false,
      };
    case SET_FAVOURITES:
      const updatedCats = state.cats.map((cat) => {
        const matchingFavourite = action.payload.find(
          (fav: any) => fav.image_id === cat.image_id
        );
        if (matchingFavourite) {
          return {
            ...cat,
            favourite_id: matchingFavourite.id,
          };
        }
        return cat;
      });

      return {
        ...state,
        cats: updatedCats,
      };

    case SET_FAVOURITE_CAT:
      const { catId, favouriteId } = action.payload;

      const favouriteCats = state.cats.map((cat) => {
        if (cat.id === catId) {
          return {
            ...cat,
            favourite_id: favouriteId,
            loading: false,
          };
        }
        return cat;
      });

      return {
        ...state,
        cats: favouriteCats,
      };

    case SET_UPVOTED:
      const upvotedCats = state.cats.map((cat) => {
        if (cat.id === action.payload.catId) {
          return {
            ...cat,
            upvoted: true,
            upvotes: cat.upvotes + 1,
            loading: false,
          };
        }
        return cat;
      });

      return {
        ...state,
        cats: upvotedCats,
      };

    case SET_DOWNVOTED:
      const downVotedCats = state.cats.map((cat) => {
        if (cat.id === action.payload.catId) {
          return {
            ...cat,
            downvoted: true,
            downvotes: cat.downvotes + 1,
            loading: false,
          };
        }
        return cat;
      });

      return {
        ...state,
        cats: downVotedCats,
      };

    case SET_VOTES:
      const { votes } = action.payload;

      return {
        ...state,
        cats: state.cats.map((cat) => {
          const catVotes = votes.filter(
            (vote: { image_id: string }) => vote.image_id === cat.image_id
          );

          const upvotes = catVotes
            .filter((vote: { value: number }) => vote.value > 0)
            .reduce((sum: any, vote: { value: any }) => sum + vote.value, 0);

          const downvotes = catVotes
            .filter((vote: { value: number }) => vote.value < 0)
            .reduce(
              (sum: number, vote: { value: number }) =>
                sum + Math.abs(vote.value),
              0
            );

          return {
            ...cat,
            upvoted: upvotes > 0,
            downvoted: downvotes > 0,
            upvotes,
            downvotes,
          };
        }),
      };

    case SET_CAT_LOADING:
      return {
        ...state,
        cats: state.cats.map((cat) => {
          if (cat.id === action.payload.catId) {
            return {
              ...cat,
              loading: action.payload.loading,
            };
          }
          return cat;
        }),
      };

    default:
      return state;
  }
};

export default reducer;
