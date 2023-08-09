import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";

const middlewares = [composeWithDevTools()];

const store = createStore(rootReducer, ...middlewares);

export default store;
