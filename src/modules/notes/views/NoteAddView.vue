<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Note } from '../types';
import { useRouter } from 'vue-router';
import { useNoteStore } from '../store';
import { noteValidation } from '../constants';

const router = useRouter();
const noteStore = useNoteStore();

const isValidForm = ref(false);
const note = reactive<Note>({
	title: '',
	completed: false,
	userId: Date.now(),
	id: Date.now(),
});

const handleSubmit = () => {
	if (!isValidForm.value) {
		return
	}

	noteStore.addNote(note);
	router.push('/');
};
</script>

<template>
	<v-container>
		<v-col>
			<h1 class="text-h1">Создать заметку</h1>
			<v-form v-model="isValidForm" @submit.prevent="handleSubmit">
				<v-text-field
					v-model="note.title"
					:rules="[noteValidation.title]"
					label="Заголовок"
				/>
				<v-checkbox label="Выполнена" v-model="note.completed"></v-checkbox>
				<v-btn class="mt-2" type="submit" block>Создать</v-btn>
			</v-form>
		</v-col>
	</v-container>
</template>

<style scoped>

</style>