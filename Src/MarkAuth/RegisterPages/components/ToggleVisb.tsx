import { useState } from 'react';

export const useTogglePasswordVisibility = () => {
	const [passwordVisibility, setPasswordVisibility] = useState(true);
	const [rightIcon, setRightIcon] = useState('eye-off');
	const handlePasswordVisibility = () => {
		if (rightIcon === 'eye') {
			setRightIcon('eye-off');
			setPasswordVisibility(!passwordVisibility);
		} else if (rightIcon === 'eye-off') {
			setRightIcon('eye');
			setPasswordVisibility(!passwordVisibility);
		}
	}
	return {
		passwordVisibility,
		rightIcon,
		handlePasswordVisibility
	}
}

export const useToggleSecPasswordVisibility = () => {
	const [passwordVisibilitySec, setPasswordVisibility] = useState(true);
	const [rightIconSec, setRightIcon] = useState('eye-off');
	const handlePasswordVisibilitySec = () => {
		if (rightIconSec === 'eye') {
			setRightIcon('eye-off');
			setPasswordVisibility(!passwordVisibilitySec);
		} else if (rightIconSec === 'eye-off') {
			setRightIcon('eye');
			setPasswordVisibility(!passwordVisibilitySec);
		}
	}
	return {
		passwordVisibilitySec,
		rightIconSec,
		handlePasswordVisibilitySec
	}
}

