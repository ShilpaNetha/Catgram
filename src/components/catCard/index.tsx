/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";
import { useDispatch } from "react-redux";
import { FaAddressBook } from "react-icons/fa";
import { toast } from "react-toastify";
import { HiThumbUp, HiThumbDown } from "react-icons/hi";
import { toggleFavorite, voteOnImage } from "../../services/ApiClient";
import {
  setFavouriteCat,
  setUpVoted,
  setDownVoted,
  setCatLoading,
} from "../../redux/actions";
import Loader from "../loader";
import { FavoriteResponse, VoteResponse, CatCardProps } from "../type";
import { Favorited, Unfavorite } from "./icons";

const CatCard: React.FC<CatCardProps> = ({
  id,
  url,
  favouriteId,
  upvoted,
  upvotes,
  downvoted,
  downvotes,
  loading,
}) => {
  const dispatch = useDispatch();

  const handleToggleFavorite = async () => {
    try {
      dispatch(setCatLoading(true, id));

      const data: FavoriteResponse = await toggleFavorite(id, favouriteId);
      if (favouriteId) {
        toast.warn(
          <>
            {FaAddressBook}
            Disliked
          </>
        );
      } else {
        toast.success(
          <>
            {FaAddressBook}
            Liked
          </>
        );
      }

      dispatch(setFavouriteCat(data.id, id));
      dispatch(setCatLoading(false, id));
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const upVote = async (image_id: string, value: number) => {
    try {
      dispatch(setCatLoading(true, image_id));

      const data: VoteResponse = await voteOnImage(image_id, value);

      dispatch(setUpVoted(data.image_id));
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const downVote = async (image_id: string, value: number) => {
    try {
      dispatch(setCatLoading(true, image_id));

      const data: VoteResponse = await voteOnImage(image_id, value);

      dispatch(setDownVoted(data.image_id));
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div
      key={id}
      className="flex flex-col rounded-lg border border-2 border-blue-500 overflow-hidden shadow-md opacity-80 hover:opacity-100 hover:pointer transition-opacity duration-300 ease-in-out transition-opacity duration-300 ease-in-out transform hover:scale-105"
    >
      <img src={url} alt={`Cat ${id}`} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-row items-center justify-between">
        <button
          onClick={() => {
            handleToggleFavorite();
          }}
        >
          {favouriteId ? <Unfavorite /> : <Favorited />}
        </button>
        <button onClick={() => upVote(id, 1)} className="flex items-center">
          {upvoted ? (
            <HiThumbUp className="text-green-500 w-7 h-7 mr-2" />
          ) : (
            <HiThumbUp className="text-gray-500 w-7 h-7 mr-2" />
          )}
          <span className="text-green-800">{upvotes}</span>
        </button>
        <button onClick={() => downVote(id, -1)} className="flex items-center">
          {downvoted ? (
            <HiThumbDown className="text-red-500 w-7 h-7 mr-2" />
          ) : (
            <HiThumbDown className="text-gray-500 w-7 h-7 mr-2" />
          )}
          <span className="text-red-800">{downvotes}</span>
        </button>
      </div>
    </div>
  );
};

export default CatCard;
