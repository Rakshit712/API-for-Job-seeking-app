import {configureStore} from "@reduxjs/toolkit";

import userReducer from "./UserSlice"
import jobReducer from "./JobSlice"
import profileReducer from "./ProfileSlice"

const store = configureStore({
    reducer:{
        user:userReducer,
        jobs:jobReducer,
        profile:profileReducer
    }
})

export default store;