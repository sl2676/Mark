import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import userReducer from './reducers';

const rootReducer = combineReducers({userReducer});


const persistConfig = {
	key: 'root',
	storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const Store = createStore(persistedReducer, applyMiddleware(thunk));
export const Persistor = persistStore(Store);


