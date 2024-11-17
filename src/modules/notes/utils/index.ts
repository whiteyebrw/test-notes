export const createSlug = (title: string): string => {
	return title.split(' ').join('-');
};