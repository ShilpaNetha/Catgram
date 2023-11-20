import {
  CatImageData,
  Favorite,
  FavoriteResponse,
  VoteResponse,
} from "../components/type";
import axiosClient from "./api";

const fetchCatImages = async (): Promise<CatImageData[]> => {
  try {
    const response = await axiosClient.get("/images/?limit=50");
    return response as unknown as CatImageData[];
  } catch (error: any) {
    throw new Error(`Failed to fetch cat images: ${error.message}`);
  }
};

const toggleFavorite = async (imageId: string, favoriteId: string) => {
  const url = "/favourites";
  const data = {
    image_id: imageId,
  };

  try {
    if (favoriteId) {
      const response = await axiosClient.delete(`${url}/${favoriteId}`);
      return response as unknown as FavoriteResponse;
    } else {
      const response = await axiosClient.post(url, data);
      return response as unknown as FavoriteResponse;
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    throw error;
  }
};

const uploadImage = async (file: File) => {
  const url = "/images/upload";

  try {
    const formData = new FormData();
    formData.append("file", file);
    return await axiosClient.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

const fetchFavorites = async (): Promise<any[]> => {
  try {
    const response = await axiosClient.get("/favourites");
    return response as unknown as any[];
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw new Error("Failed to fetch favorites");
  }
};

const fetchVotes = async (): Promise<any[]> => {
  try {
    const response = await axiosClient.get("/votes");
    return response as unknown as any[];
  } catch (error) {
    console.error("Error fetching votes:", error);
    throw new Error("Failed to fetch votes");
  }
};

const voteOnImage = async (imageId: string, value: number) => {
  const url = "/votes";
  const data = {
    image_id: imageId,
    value,
  };

  try {
    const response = await axiosClient.post(url, data);
    return response as unknown as VoteResponse;
  } catch (error) {
    console.error("Error submitting vote:", error);
    throw error;
  }
};

export {
  fetchCatImages,
  toggleFavorite,
  uploadImage,
  voteOnImage,
  fetchVotes,
  fetchFavorites,
};
