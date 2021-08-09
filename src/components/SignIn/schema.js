import * as yup from 'yup';

export const schema = yup.object().shape({
	email: yup.string().email('Format is wrong!').required('Email is required!'),
	password: yup.string().required('Password is required!'),
});

export const initialValue = {
	// email: 'kenan.mikayilov.00@gmail.com',
	// password: 'KM_jr2000',
	email: '',
	password: '',
};
