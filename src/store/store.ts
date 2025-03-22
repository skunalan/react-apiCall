import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PhotoParams } from "../pages/AlbumPage";

interface StoreParams {
  favPhotos: PhotoParams[],
  addFavorite: (photo: PhotoParams) => void,
  removeFavorite: (id: number) => void
}

export const useStore = create<StoreParams>()(
  persist(
    (set) => ({
      favPhotos: [],
      addFavorite: (photo) => set((state) => ({favPhotos: [...state.favPhotos, photo]})),
      removeFavorite: (id: number) => set((state) => ({
        favPhotos: state.favPhotos.filter((photo) => photo.id !== id)
      })),
    }),
    {
      name: "favPhotos-storage"
    }
  )
);