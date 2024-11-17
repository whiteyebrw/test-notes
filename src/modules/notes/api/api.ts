import { api } from '../../../api';
import { AxiosResponse } from 'axios';
import { Note } from '../types';

export const getNotes = (): Promise<AxiosResponse<Note[]>> => {
	return api.get('/todos');
};