// export interface User {
// 	uid?: string;
// 	name?: string;
// 	email?: string;
// }

export interface User {
	uid?: string;
	adminPermissions: boolean;
	firstName: string;
	lastName: string;
	email: string;
	cpf?: string;
	registry?: string; // matrícula
	mainImage: string;
	mainAddress: Address;
	secondaryAddress?: Address;
	mainPhone: PhoneNumber;
	secondaryPhone?: PhoneNumber;
	userInfo?: UserInfo;
}

export interface PhoneNumber {
	number?: string;
	type?: string;
}
export interface UserInfo {
	gender: string;
	maritalStatus: string;
	scholarity: string;
	profession: string;
	fatherName: string;
	motherName: string;
	birthdate: string;
	placeOfBirth?: string;
	nationality?: string;
	identityNumber: string;
	identityInstitution: string;
	ctps: string;
	OAB: string;
	professionalIdentity: string;
}

export interface Address {
	street?: string;
	number?: string;
	complement?: string;
	district?: string;
	state?: string;
	city?: string;
	zipCode?: string;
}
