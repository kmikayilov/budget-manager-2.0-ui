import * as yup from 'yup';

export const schema = yup.object().shape({
	email: yup.string().email('The email format is incorrect!').required('Email is required!'),
	username: yup.string().required('Username is required!'),
	password: yup.string().required('Password is required!'),
});

export const initialValue = {
	email: '',
	username: '',
	password: '',
};
