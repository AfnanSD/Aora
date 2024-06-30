import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentUser } from '../lib/appwrite'; // Adjust import path as per your project structure

const initialState = {
  isLogged: false,
  user: null,
  loading: false,
};

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async () => {
    try {
      const response = await getCurrentUser();
      return response; 
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLogged: (state, action) => {
      state.isLogged = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {

        if (action.payload.username) { //user is logged in
          state.loading = false;
          state.isLogged = true; 
          state.user = action.payload; 

        } else {
          state.loading = false;
          state.isLogged = false; 
          state.user = null; 
        }
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.loading = false;
        state.isLogged = false; 
        state.user = null; 
      });
  },
});

export const { setIsLogged, setUser, setLoading } = authSlice.actions;

export default authSlice.reducer;