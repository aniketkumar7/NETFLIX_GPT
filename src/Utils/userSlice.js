import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: { 
        // Add user to state and return it
        addUser: (state, action) => {
            return action.payload;
        },
        
        // Remove user from state and return null
        removeUser: (state, action) => {   
            return null; 
        },
    },
});



export const {addUser, removeUser} = userSlice.actions;

export default userSlice.reducer;