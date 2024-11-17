<script setup lang="ts" async>
import { useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import { Note } from '../types';
import { useNoteStore } from '../store';

const route = useRoute();
const noteStore = useNoteStore();

const note = ref<Note>();
const noteSlug = computed(() => route.params.slug.toString());

onMounted(() => {
	note.value = noteStore.getNoteBySlug(noteSlug.value);
});
</script>

<template>
	<span v-if="!note">Не найден</span>
	<v-container v-else-if="note">
		<v-col>
			<h1 class="text-h1">{{ note.title }}</h1>
			<p>Статус: {{ note.completed ? 'выполнена' : 'не выполнена' }}</p>
			<v-btn to="/">Вернуться назад</v-btn>
		</v-col>
	</v-container>
</template>

<style scoped>

</style>