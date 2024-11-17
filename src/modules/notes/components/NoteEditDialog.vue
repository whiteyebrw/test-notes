<script setup lang="ts">
import { ref } from 'vue';
import { Note } from '../types';
import { useNoteStore } from '../store';
import { noteValidation } from '../constants';

interface Props {
	note: Note;
}

const props = defineProps<Props>();

const noteStore = useNoteStore();

const isOpenDialog = ref(false);
const title = ref(props.note.title);
const isValidForm = ref(false);

const closeDialog = () => {
	isOpenDialog.value = false;
};

const handleSubmit = () => {
	if (!isValidForm.value) {
		return;
	}

	const newNote: Note = {
		...props.note,
		title: title.value,
	};

	noteStore.setNote(newNote);
	closeDialog();
};
</script>

<template>
	<v-dialog v-model="isOpenDialog" max-width="400">
		<template v-slot:activator="{ props: activatorProps }">
			<v-btn
				size="x-small"
				variant="text"
				text="Редактировать"
				v-bind="activatorProps"
			/>
		</template>

		<v-card>
			<v-card-title class="d-flex justify-space-between align-center">
				<h3 class="text-h5 text-medium-emphasis ps-2">
					Редактирование поста
				</h3>

				<v-btn
					icon="mdi-close"
					variant="text"
					@click="closeDialog"
				></v-btn>
			</v-card-title>
			<v-form v-model="isValidForm" @submit.prevent="handleSubmit">
				<v-text-field :rules="[noteValidation.title]" label="Название" v-model="title"/>

				<v-card-actions>
					<v-spacer></v-spacer>

					<v-btn
						type="button"
						text="Закрыть"
						@click="closeDialog"
					/>
					<v-btn
						type="submit"
						color="primary"
						text="Изменить"
					/>
				</v-card-actions>
			</v-form>
		</v-card>
	</v-dialog>
</template>

<style scoped>

</style>