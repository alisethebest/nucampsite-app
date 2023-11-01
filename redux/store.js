// Importing configureStore from Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";

// Importing your other slice reducers
import { campsitesReducer } from "../features/campsites/campsitesSlice";
import { commentsReducer } from "../features/comments/commentsSlice";
import { partnersReducer } from "../features/partners/partnersSlice";
import { promotionsReducer } from "../features/promotions/promotionsSlice";

// Importing the favoritesReducer
import { favoritesReducer } from "../features/favorites/favoritesSlice";

// Configuring the store
export const store = configureStore({
  reducer: {
    campsites: campsitesReducer,
    comments: commentsReducer,
    partners: partnersReducer,
    promotions: promotionsReducer,
    // Adding the favoritesReducer
    favorites: favoritesReducer,
  },
});
