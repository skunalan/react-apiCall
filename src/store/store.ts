import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PhotoParams } from "../pages/AlbumPage";
import { PostDetailParams } from "../pages/PostDetailPage";

interface StoreParams {
  favPhotos: PhotoParams[];
  favPosts: PostDetailParams[];
  addFavoritePhoto: (photo: PhotoParams) => void;
  removeFavoritePhoto: (id: number) => void;
  addFavoritePost: (post: PostDetailParams) => void;
  removeFavoritePost: (id: number) => void;
}

export const useStore = create<StoreParams>()(
  persist(
    (set) => ({
      favPhotos: [],
      favPosts: [],
      addFavoritePhoto: (photo) =>
        set((state) => ({ favPhotos: [...state.favPhotos, photo] })),
      removeFavoritePhoto: (id: number) =>
        set((state) => ({
          favPhotos: state.favPhotos.filter((photo) => photo.id !== id),
        })),
      addFavoritePost: (post) =>
        set((state) => ({ favPosts: [...state.favPosts, post] })),
      removeFavoritePost: (id: number) =>
        set((state) => ({
          favPosts: state.favPosts.filter((post) => post.id !== id),
        })),
    }),
    {
      name: "favPhotos-storage",
    }
  )
);
