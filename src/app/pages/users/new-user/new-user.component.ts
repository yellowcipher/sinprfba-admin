import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserInfo, User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
	selector: 'ngx-new-user',
	templateUrl: './new-user.component.html',
	styleUrls: [ './new-user.component.scss' ],
})
export class NewUserComponent implements OnInit {
	@ViewChild('labelImport', { static: true })
	labelImport: ElementRef;

	userForm: FormGroup;
	fileToUpload: File;

	public phoneMask = function(rawValue) {
		const numbers = rawValue.match(/\d/g);
		let numberLength = 0;
		if (numbers) {
			numberLength = numbers.join('').length;
		}

		if (numberLength > 10) {
			return [ '(', /[1-9]/, /[1-9]/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/ ];
		} else {
			return [ '(', /[1-9]/, /[1-9]/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/ ];
		}
	};
	public zipCodeMask = [ /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/ ];
	public dateMask = [ /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/ ];
	public cpfMask = [ /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/ ];
	constructor(
		private fb: FormBuilder,
		private auth: AuthService,
		private userService: UserService,
		private afs: AngularFirestore,
		private router: Router,
	) {}

	userInfo: UserInfo = {
		gender: '',
		maritalStatus: '',
		scholarity: '',
		profession: '',
		fatherName: '',
		motherName: '',
		birthdate: '',
		placeOfBirth: '',
		nationality: '',
		identityNumber: '',
		identityInstitution: '',
		ctps: '',
		OAB: '',
		professionalIdentity: '',
	};
	user: User = {
		firstName: '',
		lastName: '',
		email: '',
		cpf: '',
		registry: '',
		mainImage: '',
		mainAddress: { street: '', number: '', complement: '', district: '', state: '', city: '', zipCode: '' },
		secondaryAddress: { street: '', number: '', complement: '', district: '', state: '', city: '', zipCode: '' },
		mainPhone: { number: '', type: '' },
		secondaryPhone: { number: '', type: '' },
		userInfo: this.userInfo,
		uid: '',
		adminPermissions: false,
	};

	ngOnInit() {
		this.userForm = this.fb.group({
			firstName: [ '', [ Validators.required ] ],
			lastName: [ '', [ Validators.required ] ],
			email: [ '', [ Validators.required, Validators.email ] ],
			password: [ '', [ Validators.required, Validators.minLength(8) ] ],
			cpf: [ '', [ Validators.required, Validators.minLength(14) ] ],
			registry: [ '' ],
			photoFile: [ null, [ Validators.required ] ],
			mainPhone: [ '', [ Validators.required, Validators.minLength(14) ] ],
			mainPhoneType: [ '', [ Validators.required ] ],
			secondaryPhone: [ '' ],
			secondaryPhoneType: [ '' ],
			mainCEP: [ '', [ Validators.required, Validators.minLength(9) ] ],
			mainStreet: [ '', [ Validators.required ] ],
			mainNumber: [ '', [ Validators.required ] ],
			mainComplement: [ '' ],
			mainDistrict: [ '', [ Validators.required ] ],
			mainCity: [ '', [ Validators.required ] ],
			mainState: [ '', [ Validators.required ] ],
			secondaryCEP: [ '' ],
			secondaryStreet: [ '' ],
			secondaryNumber: [ '' ],
			secondaryComplement: [ '' ],
			secondaryDistrict: [ '' ],
			secondaryCity: [ '' ],
			secondaryState: [ '' ],
			gender: [ '', [ Validators.required ] ],
			maritalStatus: [ '' ],
			scholarity: [ '' ],
			profession: [ '' ],
			fatherName: [ '' ],
			motherName: [ '' ],
			birthdate: [ '', [ Validators.required, Validators.minLength(10) ] ],
			placeOfBirth: [ '' ],
			nationality: [ '' ],
			identityNumber: [ '', [ Validators.required ] ],
			identityInstitution: [ '', [ Validators.required ] ],
			ctps: [ '' ],
			oab: [ '' ],
			professionalIdentity: [ '' ],
		});
	}

	onFileChange(files: FileList) {
		this.labelImport.nativeElement.innerText = Array.from(files).map((f) => f.name).join(', ');
		this.fileToUpload = files.item(0);
	}

	registerUser() {
		if (this.userForm.valid) {
			this.auth
				.register(this.userForm.get('email').value, this.userForm.get('password').value)
				.then((result) => {
					const uid = result.user.uid;
					this.buildUser(uid);

					this.userService.upload(this.fileToUpload, { folder: 'users/' + uid + '/' }).then((imageURL) => {
						this.user.mainImage = imageURL;
						this.afs.collection('users').doc(uid).set(this.user, { merge: true }).then((value) => {
							this.router.navigate([ '/login' ]);
						});
					});
				})
				.catch((e) => {});
		}
		// this.buildUser(uid);
		// console.log(this.user);
	}

	buildUser(uid) {
		this.user.firstName = this.userForm.get('firstName').value;
		this.user.lastName = this.userForm.get('lastName').value;
		this.user.email = this.userForm.get('email').value;
		this.user.cpf = this.userForm.get('cpf').value;
		this.user.registry = this.userForm.get('registry').value;
		this.user.mainAddress = {
			street: this.userForm.get('mainStreet').value,
			number: this.userForm.get('mainNumber').value,
			complement: this.userForm.get('mainComplement').value,
			district: this.userForm.get('mainDistrict').value,
			state: this.userForm.get('mainState').value,
			city: this.userForm.get('mainCity').value,
			zipCode: this.userForm.get('mainCEP').value,
		};
		this.user.secondaryAddress = {
			street: this.userForm.get('secondaryStreet').value,
			number: this.userForm.get('secondaryNumber').value,
			complement: this.userForm.get('secondaryComplement').value,
			district: this.userForm.get('secondaryDistrict').value,
			state: this.userForm.get('secondaryState').value,
			city: this.userForm.get('secondaryCity').value,
			zipCode: this.userForm.get('secondaryCEP').value,
		};
		this.user.mainPhone = {
			number: this.userForm.get('mainPhone').value,
			type: this.userForm.get('mainPhoneType').value,
		};
		this.user.secondaryPhone = {
			number: this.userForm.get('secondaryPhone').value,
			type: this.userForm.get('secondaryPhoneType').value,
		};

		this.userInfo.gender = this.userForm.get('gender').value;
		this.userInfo.maritalStatus = this.userForm.get('maritalStatus').value;
		this.userInfo.scholarity = this.userForm.get('scholarity').value;
		this.userInfo.profession = this.userForm.get('profession').value;
		this.userInfo.fatherName = this.userForm.get('fatherName').value;
		this.userInfo.motherName = this.userForm.get('motherName').value;
		this.userInfo.birthdate = this.userForm.get('birthdate').value;
		this.userInfo.placeOfBirth = this.userForm.get('placeOfBirth').value;
		this.userInfo.nationality = this.userForm.get('nationality').value;
		this.userInfo.identityNumber = this.userForm.get('identityNumber').value;
		this.userInfo.identityInstitution = this.userForm.get('identityInstitution').value;
		this.userInfo.ctps = this.userForm.get('ctps').value;
		this.userInfo.OAB = this.userForm.get('oab').value;
		this.userInfo.professionalIdentity = this.userForm.get('professionalIdentity').value;
		this.user.uid = uid;
	}
}
