import { configureStore } from '@reduxjs/toolkit'
import monitorReducerEnhancer from './config/enhancers/monitorReducers'
import logger from "./config/middleware/logger";
import rootReducer from "./reducers";


export default function configureAppStore(preloadedState) {
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
        preloadedState,
        //enhancers: [monitorReducersEnhancer]
        //enhancers: (existingEnhancers) => [...existingEnhancers, monitorReducerEnhancer]

    })

    return store
}