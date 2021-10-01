export interface Doctor {
	id: number;
	name: string;
	image: string;
	speciality: string;
	charge: number;
	availability: boolean;
	time: string;
	experience: number;
	degree: string[];
	city: string;
}
