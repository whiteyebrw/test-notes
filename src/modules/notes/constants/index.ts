import { VDataTableVirtual } from 'vuetify/components';

export const tableTitles: VDataTableVirtual['headers'] = [
	{ title: '№' },
	{ title: 'Название' },
	{
		title: 'Отметка о выполнении',
		key: 'completed',
		sortable: false,
	},
	{ title: 'Ссылка' },
	{ title: 'Actions' },
];

export const noteValidation = {
	title: (value: string) => {
		const length = value.length;
		if (!length) {
			return 'Обязательное поле'
		}

		if(length < 3 || length > 50) {
			return 'Заголовок должен быть минимум 3 символа, максимум 50'
		}

		return true;
	}
}