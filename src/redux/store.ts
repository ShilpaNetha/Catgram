import { createStore, Store } from "redux";
import reducer, { AppState } from "./reducer";

const store: Store<AppState> = createStore(reducer);

export default store;
