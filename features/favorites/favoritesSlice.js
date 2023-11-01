// Importing createSlice from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Creating the slice
const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [], // Starts with an empty array
  reducers: {
    // Toggle favorite action
    toggleFavorite: (favorites, action) => {
      // If the favorite is already in the list
      if (favorites.includes(action.payload)) {
        // Remove the favorite from the array
        return favorites.filter((favorite) => favorite !== action.payload);
      } else {
        // Add the favorite to the array
        favorites.push(action.payload);
      }
    },
  },
});

// Exporting the actions and the reducer
export const { toggleFavorite } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
