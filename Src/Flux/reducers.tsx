import { 
	SET_USER_NAME, 
	SET_USER_HANDLE,
	SET_USER_AGE,
	SET_USER_PASSWORD,
	SET_USER_ID,
	SET_USER_NAES,
	SET_USER_FOLLOWEE,
	SET_USER_FOLLOWER,
	SET_USER_BLOCKED,
	SET_USER_REQUEST,
	SET_USER_OUTGOING,
	SET_USER_PHOTO_URI,
	} from './actions';
const initialState = {
	userName: '',
	userHandle: '',
	userAge: 0,
	userPassword: '',
	userID: '',
	userNAES: 0,
	userPhoto: {},
	userFollower: {},
	userFollowee: {},
	userBlocked: {},
	userOutgoing: {},
	userRequest: {}
}
function userReducer(state = initialState, action) {
	switch(action.type) {
		case SET_USER_NAME:
			return { ...state, userName: action.payload }
		case SET_USER_HANDLE:
			return { ...state, userHandle: action.payload }
		case SET_USER_AGE:
			return { ...state, userAge: action.payload }
		case SET_USER_PASSWORD:
			return { ...state, userPassword: action.payload }
		case SET_USER_ID:
			return { ...state, userID: action.payload }
		case SET_USER_NAES:
			return { ...state, userNAES: action.payload }
		case SET_USER_FOLLOWEE:
			return { ...state, userFollowee: action.payload }
		case SET_USER_FOLLOWER:
			return { ...state, userFollower: action.payload }
		case SET_USER_BLOCKED:
			return { ...state, userBlocked: action.payload }
		case SET_USER_REQUEST:
			return { ...state, userRequest: action.payload }
		case SET_USER_OUTGOING:
			return { ...state, userOutgoing: action.payload }
		case SET_USER_PHOTO_URI:
			return { ...state, userPhoto: action.payload }
		default: 
			return state
	}
}

export default userReducer;
