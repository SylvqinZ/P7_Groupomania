// Get user data from localStorage. Returns {userId: ..., token: ..., admin: ...} or false
export const getUserData = () => {
	let userData = JSON.parse(localStorage.getItem("userData")) || {};
	if(!userData.hasOwnProperty('userId') || userData.userId === '' || userData.userId === null) return false;
	if(!userData.hasOwnProperty('token') || userData.token === '' || userData.token === null) return false;
	if(!userData.hasOwnProperty('admin') || userData.admin === '' || userData.admin === null) return false;
	if([true, false].includes(userData.admin) === false) userData.admin = false;
	return userData;
}

// Set user data into localStorage
export const setUserData = (data) => {
	localStorage.setItem("userData", JSON.stringify(data));
}

// Allows to check if current user is LoggedIn
export const isLoggedIn = () => {
	const userData = getUserData();
	if(userData === false) return false;
	return true;
}

// Allows to check if current user is LoggedIn
export const isAuthorized = (currentUserId) => {
	const userData = getUserData();
	if(userData === false) return false;
	return (userData.userId === currentUserId || userData.admin === true) ? true : false;
}

