import {combineReducers} from "redux";
import userSlice from "./slices/user/userSlice";
import articleSlice from "./slices/articles/articleSlice";

//import reducer from 'chemin/reducer'

const rootReducer = combineReducers({
    user: userSlice,
    //article: articleSlice,
})


export default rootReducer