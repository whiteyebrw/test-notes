import { RouteRecordRaw } from 'vue-router';
import { noteRoutes } from '../modules';

export const routes: Readonly<RouteRecordRaw[]> = [
	...noteRoutes
];
