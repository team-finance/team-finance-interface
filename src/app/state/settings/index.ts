import { AnyAction, createSlice, Dispatch } from "@reduxjs/toolkit";
import { SettingsState } from "../types";
import {helperDesc} from "./helper"
const initialState: SettingsState = {
    isDark: true
}

export const settingsSlice = createSlice({
    name: "Settings",
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.isDark = !state.isDark; 
        }
    }
})

// Actions
export const { setTheme} = settingsSlice.actions;

// Thunks
export const setThemeHandler = () =>  async (dispatch:any) => {
    helperDesc();
    dispatch(setTheme(""));
}

export default settingsSlice.reducer