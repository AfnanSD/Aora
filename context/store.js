// import { createStore, applyMiddleware } from 'redux';
// // import rootReducer from "./reducers"
// import thunk from 'redux-thunk';
// import globalReducer from './reducer';


// // const store = createStore(rootReducer)

// const store = createStore(globalReducer, applyMiddleware(thunk));

// export default store
// import { createStore, applyMiddleware } from 'redux';
// // import thunk from 'redux-thunk';
// import { thunk } from 'redux-thunk';
// import globalReducer from './reducer';

// const store = createStore(
//   globalReducer,
//   applyMiddleware(thunk.default)
// );
// console.log('**');
// console.log(store.getState())

// export default store;


//with redux toolkit - this works 
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here if needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Ignore serializability check for now
    }),
});

export default store;
