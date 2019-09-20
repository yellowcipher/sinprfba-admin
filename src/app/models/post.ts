export interface Post {
	uid?: string;
	title: string;
	excerpt: string;
	font: string;
	content: string;
	mainImage: File;
	mainImageUrl?: string;
	slides?: File[];
	slidesUrls?: string[];
	files?: File[];
	filesUrls?: string[];
	createdAt?: firebase.firestore.FieldValue;
	updatedAt?: firebase.firestore.FieldValue;
	// userUpd: string;
	// dhPublicacao: string;
	// dhVigência?: string;
	// areaSite: string;
	// destaque: boolean;
	// tags: string;
	// estado: string;//cadastrado, cancelado, publicado, suspenso, não vigente
}
