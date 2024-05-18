import { createSlice } from "@reduxjs/toolkit";


const initialState = null;

export const UserSlice = createSlice({
    name : "UserId",
    initialState,
    reducers : {
        currentLoggedInUser: (state , action)=>{
            return { userid : action.payload}

        }
    }
})

export const {currentLoggedInUser}  = UserSlice.actions

export default UserSlice.reducer
