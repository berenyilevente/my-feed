import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import authReducer from "./authentication/auth.reducer";
import postsReducer from "./posts/posts.reducer";
import commentsReducer from "./comments/comment.reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["posts, comments"],
};

export const rootReducer = combineReducers({
  posts: postsReducer,
  auth: authReducer,
  comments: commentsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(persistedReducer, compose(applyMiddleware(thunk)));

export const persistor = persistStore(store);
