import {configureStore} from "@reduxjs/toolkit";

import userReducer from "./UserSlice"
import jobReducer from "./JobSlice"
import profileReducer from "./ProfileSlice"
import searchReducer from "./SearchSlice"
import applicationReducer from "./applicationSlice"


const store = configureStore({
    reducer:{
        user:userReducer,
        jobs:jobReducer,
        profile:profileReducer,
        search:searchReducer,
        application:applicationReducer


    }
})

export default store;