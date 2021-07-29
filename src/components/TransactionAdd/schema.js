import * as yup from "yup";

export const schema = yup.object().shape({
	transactionDate: yup.date().required("Transaction date is required"),
	categoryId: yup
		.object({
			value: yup.string().required(),
			label: yup.string().required(),
		})
		.required("Category is required"),
	paymentMethodId: yup
		.object({
			value: yup.string().required(),
			label: yup.string().required(),
		})
		.required("Payment method is required"),
	accountingTypeId: yup
		.object({
			value: yup.string().required(),
			label: yup.string().required(),
		})
		.required("Accounting type is required"),
	transactionAmount: yup.number().required("Transaction amount is required"),
});

export const initialValue = {
	transactionDate: "",
	categoryId: { value: "", label: "" },
	paymentMethodId: { value: "", label: "" },
	accountingTypeId: { value: "", label: "" },
	transactionAmount: 0,
};
