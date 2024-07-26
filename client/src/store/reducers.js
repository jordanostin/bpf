import {combineReducers} from "redux";
import userSlice from "./slices/user/userSlice";
import articleSlice from "./slices/articles";

//import reducer from 'chemin/reducer'

const rootReducer = combineReducers({
    user: userSlice,
    artticle: articleSlice,
})


export default rootReducer