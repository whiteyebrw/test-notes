<script setup lang="ts">
import { onMounted } from 'vue';
import { useNoteStore } from './modules';

const noteStore = useNoteStore();

onMounted(() => {
	noteStore.fetchNotes();
});
</script>

<template>
	<router-view/>
</template>

<style scoped>

</style>
