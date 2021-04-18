import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import settingsReducer from "./settings"

const store = configureStore({
    reducer:{
        settings: settingsReducer
    },
    devTools: true
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store