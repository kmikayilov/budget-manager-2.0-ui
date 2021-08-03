import * as yup from 'yup';

export const schema = yup.object().shape({
	transactionDate: yup.date().required('Transaction date is required'),
	transactionAmount: yup.string().matches(/^\d+$/).required('Transaction amount is required'),
	categoryId: yup
		.object({
			value: yup.string().required(),
			label: yup.string().required(),
		})
		.required('Category is required')
		.nullable(),
	paymentMethodId: yup
		.object({
			value: yup.string().required(),
			label: yup.string().required(),
		})
		.required('Payment method is required')
		.nullable(),
});

export const initialValue = {
	transactionDate: '',
	transactionAmount: '',
	categoryId: null,
	paymentMethodId: null,
};
