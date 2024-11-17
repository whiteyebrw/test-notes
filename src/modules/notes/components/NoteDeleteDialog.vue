<script setup lang="ts">
import { ref } from 'vue';
import { useNoteStore } from '../store';

interface Props {
	id: number;
}

const props = defineProps<Props>();

const noteStore = useNoteStore();

const isOpenDialog = ref(false);

const closeDialog = () => {
	isOpenDialog.value = false;
};

const handleDelete = () => {
	noteStore.deleteNotyById(props.id);
	closeDialog();
};
</script>

<template>
	<v-dialog v-model="isOpenDialog" max-width="400">
		<template v-slot:activator="{ props: activatorProps }">
			<v-btn
				size="x-small"
				variant="text"
				text="Удалить"
				v-bind="activatorProps"
			/>
		</template>

		<v-card>
			<v-card-title class="d-flex justify-space-between align-center">
				<h3 class="text-h5 text-medium-emphasis ps-2">
					Удалить?
				</h3>

				<v-btn
					icon="mdi-close"
					variant="text"
					@click="closeDialog"
				></v-btn>
			</v-card-title>
			<v-card-actions>
				<v-spacer></v-spacer>

				<v-btn
					text="Закрыть"
					@click="closeDialog"
				/>
				<v-btn
					@click="handleDelete"
					color="primary"
					text="Удалить"
				/>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<style scoped>

</style>