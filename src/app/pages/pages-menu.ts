import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
	{
		title: 'GERAL',
		group: true,
	},
	{
		title: 'Dashboard',
		icon: 'nb-home',
		link: '/pages/dashboard',
	},
	{
		title: 'TESOURARIA',
		group: true,
	},
	{
		title: 'Fluxo de caixa',
		icon: 'nb-bar-chart',
	},
	{
		title: 'Controle de inventário',
		icon: 'nb-checkmark',
	},
	{
		title: 'ADMINISTRATIVO',
		group: true,
	},
	{
		title: 'Controle de ATAs',
		icon: 'nb-compose',
	},
	{
		title: 'Controle de acessos',
		icon: 'nb-locked',
	},
	{
		title: 'Controle de pessoas',
		icon: 'nb-person',
	},
	{
		title: 'JURÍDICO',
		group: true,
	},
	{
		title: 'Processos',
		icon: 'nb-list',
	},
	{
		title: 'SISTEMA',
		group: true,
	},
	{
		title: 'Autenticação',
		icon: 'nb-locked',
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
	{
		title: 'Variados',
		icon: 'nb-shuffle',
		children: [
			{
				title: '404',
				link: '/pages/miscellaneous/404',
			},
		],
	},
];
