// HomePage.tsx
import React, { useEffect } from "react";
import { useQuery } from "react-query";

import { connect, useDispatch } from "react-redux";
import {
  fetchCatImages,
  fetchFavorites,
  fetchVotes,
} from "../../services/ApiClient";
import Loader from "../loader";
import CatCard from "../catCard";
import { Cat, CatImageData, Favorite, Vote } from "../type";
import { AppState } from "../../redux/reducer";
import {
  setCounter,
  setCats,
  setFavourites,
  setVotes,
} from "../../redux/actions";
interface IHomePage {
  counter: number;
  cats: Cat[];
  catsLoading: boolean;
}

const HomePage: React.FC<IHomePage> = ({ cats, catsLoading }) => {
  const dispatch = useDispatch();

  const { data, isLoading } = useQuery<CatImageData[]>(
    "catImages",
    fetchCatImages
  );

  const { data: favorites } = useQuery<Favorite[]>(
    ["favorites"],
    fetchFavorites
  );

  const { data: votes } = useQuery<Vote[]>(["votes"], fetchVotes);

  useEffect(() => {
    if (favorites && favorites.length > 0 && !catsLoading) {
      dispatch(setFavourites(favorites));
    }
  }, [favorites, catsLoading, dispatch]);

  useEffect(() => {
    if (votes && votes.length > 0 && !catsLoading) {
      dispatch(setVotes(votes));
    }
  }, [votes, catsLoading, dispatch]);

  useEffect(() => {
    if (data && data.length > 0) {
      dispatch(setCats(data));
    }
  }, [data]);

  return (
    <div className="container mx-auto p-4">
      {isLoading && <Loader />}
      {cats.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cats.map((cat: Cat) => (
            <CatCard
              key={cat.id}
              id={cat.id}
              url={cat.url}
              favouriteId={cat.favourite_id}
              upvoted={cat.upvoted}
              downvoted={cat.downvoted}
              upvotes={cat.upvotes}
              downvotes={cat.downvotes}
              loading={cat.loading}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  counter: state.counter,
  cats: state.cats,
  catsLoading: state.catsLoading,
});

const mapDispatchToProps = {
  setCounter,
  setCats,
  setFavourites,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
