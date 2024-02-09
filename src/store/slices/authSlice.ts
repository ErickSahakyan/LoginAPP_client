import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../utils/axios';
import { IUser } from "../../types/IUser.types";

type AuthState = {
	user: IUser | null,
	token: string | boolean | null,
	isLoading: boolean,
	status: string | null,
}

const initialState: AuthState = {
	user: null,
	token: null,
	isLoading: false,
	status: null
}


export const registration = createAsyncThunk<AuthState, { values: { name: string, surname: string, email: string, password: string } }>(
	'auth/registration',
	async ({ values }) => {
		try {
			const { data } = await axios.post('/auth/registration',  values )

			// if (data.token) {
			// 	window.localStorage.setItem('token', data.token)
			// }

			return data
		} catch (error) {
			console.log(error)
		}
	},
)

export const authorization = createAsyncThunk<AuthState, { values: { email: string, password: string } }>(
	'auth/authorization',
	async ({ values }) => {
		try {
			const { data } = await axios.post('/auth/authorization', values)
			
			if (data.token) {
				window.localStorage.setItem('token', data.token)
			}
			return data
		} catch (error) {
			console.log(error)
		}
	},
)

export const user = createAsyncThunk<AuthState, { currentUserToken: string | boolean | null}>(
	'auth/user',
	async ({currentUserToken}) => {
		try {
			const { data } = await axios.get('/auth/user', currentUserToken ? {headers: {Authorization: `Bearer ${currentUserToken}`}} : {})

			return data
		} catch (error) {
			console.log(error)
		}
	},
)


export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			state.user = null
			state.token = null
			state.isLoading = false
			state.status = null
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(registration.pending, (state) => {
				state.isLoading = true
				state.status = null
			})
			.addCase(registration.fulfilled, (state, {payload}) => {
				state.isLoading = false
				state.status = payload.status
				state.user = payload.user
				state.token = payload.token
			})
			.addCase(authorization.pending, (state) => {
				state.isLoading = true
				state.status = null
			})
			.addCase(authorization.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.status = payload?.status
				state.user = payload?.user
				state.token = payload?.token
			})
			.addCase(user.pending, (state) => {
				state.isLoading = true
				state.status = null
			})
			.addCase(user.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.status = null
				state.user = payload?.user
				state.token = payload?.token
			})
	}
})

export const checkIsAuth = (state: AuthState) => state.token

export const { logout } = authSlice.actions

export default authSlice.reducer;