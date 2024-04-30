export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_HANDLE = 'SET_USER_HANDLE';
export const SET_USER_AGE = 'SET_USER_AGE';
export const SET_USER_PASSWORD = 'SET_USER_PASSWORD';
export const SET_USER_ID = 'SET_USER_ID';
export const SET_USER_NAES = 'SET_USER_NAES';
export const SET_USER_PHOTO_URI = 'SET_USER_PHOTO_URI';

export const SET_USER_FOLLOWEE = 'SET_USER_FOLLOWEE';
export const SET_USER_FOLLOWER = 'SET_USER_FOLLOWER';
export const SET_USER_BLOCKED = 'SET_USER_BLOCKED';
export const SET_USER_OUTGOING = 'SET_USER_OUTGOING';
export const SET_USER_REQUEST = 'SET_USER_REQUEST';

export const setUserName = userName => dispatch => {
	dispatch({
		type: 'SET_USER_NAME',
		payload: userName
	})
}

export const setUserHandle = userHandle => dispatch => {
	dispatch({
		type: 'SET_USER_HANDLE',
		payload: userHandle
	})
}

export const setUserAge = userAge => dispatch => {
	dispatch({
		type: 'SET_USER_AGE',
		payload: userAge
	})
}

export const setUserPassword = userPassword => dispatch => {
	dispatch({
		type: 'SET_USER_PASSWORD',
		payload: userPassword
	})
}

export const setUserID = userID => dispatch => {
	dispatch({
		type: 'SET_USER_ID',
		payload: userID
	})
}

export const setUserNAES = userNAES => dispatch => {
	dispatch({
		type: 'SET_USER_NAES',
		payload: userNAES
	})
}

export const setUserFollower = userFollower => dispatch => {
	dispatch({
		type: 'SET_USER_FOLLOWER',
		payload: userFollower
	})
}

export const setUserFollowee = userFollowee => dispatch => {
	dispatch({
		type: 'SET_USER_FOLLOWEE',
		payload: userFollowee
	})
}

export const setUserBlocked = userBlocked => dispatch => {
	dispatch({
		type: 'SET_USER_BLOCKED',
		payload: userBlocked
	})
}

export const setUserOutgoing = userOutgoing => dispatch => {
	dispatch({
		type: 'SET_USER_OUTGOING',
		payload: userOutgoing
	})
}

export const setUserRequest = userRequest => dispatch => {
	dispatch({
		type: 'SET_USER_REQUEST',
		payload: userRequest
	})
}

export const setUserPhotoURI = userPhoto => dispatch => {
	dispatch({
		type: 'SET_USER_PHOTO_URI',
		payload: userPhoto
	})
}

