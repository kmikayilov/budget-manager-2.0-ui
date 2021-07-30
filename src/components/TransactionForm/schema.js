import * as yup from 'yup';

export const schema = yup.object().shape({
	transactionDate: yup.date().required('Transaction date is required'),
	transactionAmount: yup.string().required('Transaction amount is required'),
	categoryId: yup
		.object({
			value: yup.string().required(),
			label: yup.string().required(),
		})
		.required('Category is required'),
	paymentMethodId: yup
		.object({
			value: yup.string().required(),
			label: yup.string().required(),
		})
		.required('Payment method is required'),
	accountingTypeId: yup
		.object({
			value: yup.string().required(),
			label: yup.string().required(),
		})
		.required('Accounting type is required'),
});

export const initialValue = {
	transactionDate: '',
	transactionAmount: '',
	categoryId: 'x',
	paymentMethodId: 'x',
	accountingTypeId: 'x',
	// categoryId: { value: 'x', label: 'X' },
	// paymentMethodId: { value: 'x', label: 'X' },
	// accountingTypeId: { value: 'x', label: 'X' },
};
