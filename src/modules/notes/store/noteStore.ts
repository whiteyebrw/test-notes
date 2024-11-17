import { defineStore } from 'pinia';
import { Note } from '../types';
import { useFetch } from '../../../composables';
import { getNotes } from '../api';
import { ref } from 'vue';

export const useNoteStore = defineStore('noteStore', () => {
	const notes = ref<Note[]>([]);
	const { isLoading, fetchData, data, error } = useFetch<Note[], Parameters<typeof getNotes>>({
		requestFunction: getNotes,
	});

	const addNote = (note: Note) => {
		notes.value.push(note);
	};

	const removeNote = (id: number) => {
		notes.value = notes.value.filter((note) => note.id !== id);
	};

	const fetchNotes = async () => {
		await fetchData();

		if (data.value) {
			notes.value = data.value;
		}
	};

	const getNoteBySlug = (slug: string) => {
		const title = slug.split('-').join(' ');

		return notes.value.find((note) => note.title === title);
	};

	const deleteNotyById = (id: number) => {
		notes.value = notes.value.filter((note) => note.id !== id);
	};

	const setNote = (newNote: Note) => {
		const noteIdx = notes.value.findIndex((note) => note.id === newNote.id);

		if (noteIdx !== -1) {
			notes.value[noteIdx] = newNote;
		}
	};

	return {
		notes,
		isLoading,
		error,
		getNoteBySlug,
		addNote,
		fetchNotes,
		removeNote,
		deleteNotyById,
		setNote
	};
});