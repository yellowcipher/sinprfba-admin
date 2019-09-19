import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
	{
		title: 'GERAL',
		group: true,
	},
	{
		title: 'Dashboard',
		icon: 'home-outline',
		link: '/pages/dashboard',
	},
	{
		title: 'Publicar',
		icon: 'home-outline',
		children: [
			{
				title: 'Notícia',
				link: '/pages/posts/news',
			},
			{
				title: 'Carrousel',
				link: '/pages/posts/carrousel',
			},
			{
				title: 'Diretorias',
				link: '/pages/posts/diretorias',
			},
		],
	},
	// {
	// 	title: 'TESOURARIA',
	// 	group: true,
	// },
	// {
	// 	title: 'Fluxo de caixa',
	// 	icon: 'home-outline',
	// },
	// {
	// 	title: 'Controle de inventário',
	// 	icon: 'home-outline',
	// },
	// {
	// 	title: 'ADMINISTRATIVO',
	// 	group: true,
	// },
	// {
	// 	title: 'Controle de ATAs',
	// 	icon: 'home-outline',
	// },
	// {
	// 	title: 'Controle de acessos',
	// 	icon: 'home-outline',
	// },
	// {
	// 	title: 'Controle de pessoas',
	// 	icon: 'home-outline',
	// },
	// {
	// 	title: 'JURÍDICO',
	// 	group: true,
	// },
	// {
	// 	title: 'Processos',
	// 	icon: 'home-outline',
	// },
	// {
	// 	title: 'SISTEMA',
	// 	group: true,
	// },
	{
		title: 'Autenticação',
		icon: 'home-outline',
		children: [
			{
				title: 'Entrar',
				link: '/auth/login',
			},
			{
				title: 'Registrar',
				link: '/auth/register',
			},
			{
				title: 'Esqueci minha senha',
				link: '/auth/request-password',
			},
			{
				title: 'Nova Senha',
				link: '/auth/reset-password',
			},
		],
	},
	// {
	// 	title: 'Variados',
	// 	icon: 'home-outline',
	// 	children: [
	// 		{
	// 			title: '404',
	// 			link: '/pages/miscellaneous/404',
	// 		},
	// 	],
	// },
];
