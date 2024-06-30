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
      const response = await getCurrentUser(); // Assuming getCurrentUser is an async function fetching user data
      return response; // Assuming response contains user data
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
        state.loading = false;
        state.isLogged = true; // Example assuming user is logged in after fetching user data
        state.user = action.payload; // Example setting user data from response
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.loading = false;
        state.isLogged = false; // Example setting logged out state on fetch error
        state.user = null; // Example clearing user data on fetch error
      });
  },
});

export const { setIsLogged, setUser, setLoading } = authSlice.actions;

export default authSlice.reducer;

// -- was working without fetchuser function
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   isLogged: false,
//   user: null,
//   loading: false,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setIsLogged: (state, action) => {
//       state.isLogged = action.payload;
//     },
//     setUser: (state, action) => {
//       state.user = action.payload;
//     },
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//   },
// });

// export const { setIsLogged, setUser, setLoading } = authSlice.actions;

// export default authSlice.reducer;
