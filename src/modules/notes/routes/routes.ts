import { RouteRecordRaw } from 'vue-router';

const NoteAddView = () => import('../views/NoteAddView.vue');
const NoteListView = () => import('../views/NoteListView.vue');
const NoteDetailView = () => import('../views/NoteDetailView.vue');

export const routes: Readonly<RouteRecordRaw[]> = [
	{ path: '/', component: NoteListView },
	{ path: '/add', component: NoteAddView },
	{ path: '/todo/:slug', component: NoteDetailView },
];