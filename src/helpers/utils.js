export const dateNormalizer = (date) => {
	let year = date.getFullYear();
	let day = date.getDate() > 10 ? date.getDate() : `0${date.getDate()}`;
	let month = date.getMonth() > 10 ? date.getMonth() : `0${date.getMonth()}`;
	return `${year}-${month}-${day}`;
};

export const transactionNormalizer = (data) => ({
	id: data.id,
	transactionAmount: data.transactionAmount,
	transactionDate: data.transactionDate,
	category_id: data.category.id,
	category_name: data.category.category,
	accounting_id: data.category.accounting.id,
	accounting_type: data.category.accounting.accounting_type,
	accounting_coefficient: data.category.accounting.coefficient,
	payment_id: data.payment.id,
	payment_method: data.payment.method,
});
