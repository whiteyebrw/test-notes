<script setup lang="ts">
import { tableTitles } from '../constants';
import { useNoteStore } from '../store';
import { computed, ref, watch } from 'vue';
import { createSlug } from '../utils';
import { useRoute, useRouter } from 'vue-router';
import NoteDeleteDialog from '../components/NoteDeleteDialog.vue';
import { NoteEditDialog } from '../components';

const route = useRoute();
const router = useRouter();
const isCompleted = ref<boolean>(route.query.completed === 'true');

const noteStore = useNoteStore();

const isLoading = computed(() => noteStore.isLoading);
const error = computed(() => noteStore.error);
const notes = computed(() => {
	if (!isCompleted.value) {
		return noteStore.notes;
	}

	return noteStore.notes.filter((note) => note.completed);
});

watch([isCompleted], () => {
	router.push({ ...route, query: { completed: isCompleted.value ? `${isCompleted.value}` : undefined } });
});

const changeCompleted = () => {
	isCompleted.value = !isCompleted.value;
};
</script>

<template>
	<h1 class="text-h1">Список заметок</h1>
	<span v-if="isLoading">Загрузка...</span>
	<span v-if="error">Ошибка: {{ error }}</span>
	<v-data-table-virtual
		v-else-if="notes.length"
		:headers="tableTitles"
		:items="notes"
		height="400"
		theme="dark"
	>
		<template v-slot:header.completed="{column}">
			<span class="cursor-pointer" @click="changeCompleted">{{ column.title }}</span>
		</template>

		<template v-slot:item="{ item, index }">
			<tr :class="{'bg-green': item.completed}">
				<td>{{ index + 1 }}</td>
				<td class="text-truncate">{{ item.title }}</td>
				<td>
					<v-checkbox-btn v-model="item.completed"/>
				</td>
				<td>
					<router-link :to="`/todo/${createSlug(item.title)}`">Ссылка</router-link>
				</td>
				<td>
					<note-delete-dialog :id="item.id"/>
					<note-edit-dialog :note="item"/>
				</td>
			</tr>
		</template>
	</v-data-table-virtual>
</template>

<style scoped>

</style>