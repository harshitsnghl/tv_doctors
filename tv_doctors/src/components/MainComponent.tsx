import React from "react";
import {
	ButtonDropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Navbar,
	NavbarBrand,
} from "reactstrap";
import "./Main.scss";
import DoctorCard from "./DoctorCardComponent";
import { Doctor } from "../shared/doctors";
import { baseUrl } from "../shared/baseUrl";

interface MainProps {}

interface MainState {
	speciality: string;
	availability: boolean;
	city: string;
	specialityDropdownOpen: boolean;
	availabilityDropdownOpen: boolean;
	cityDropdownOpen: boolean;
	filteredDoctors: Doctor[];
	specialisations: string[];
	doctors: Doctor[];
	cities: string[];
	isDoctorsLoading: boolean;
	isCitiesLoading: boolean;
	isSpecialisationsLoading: boolean;
}

class Main extends React.Component<MainProps, MainState> {
	constructor(props: MainProps) {
		super(props);
		this.state = {
			speciality: "Speciality",
			availability: null!,
			city: "City",
			specialityDropdownOpen: false,
			availabilityDropdownOpen: false,
			cityDropdownOpen: false,
			filteredDoctors: [],
			specialisations: [],
			doctors: [],
			cities: [],
			isDoctorsLoading: true,
			isCitiesLoading: true,
			isSpecialisationsLoading: true,
		};
	}

	componentDidMount() {
		fetch(baseUrl + "doctors").then((res) => {
			res.json().then((json) => {
				this.setState({
					doctors: json,
					isDoctorsLoading: false,
				});
			});
		});

		fetch(baseUrl + "specialisations").then((res) => {
			res.json().then((json) => {
				this.setState({
					specialisations: json,
					isSpecialisationsLoading: false,
				});
			});
		});

		fetch(baseUrl + "cities").then((res) => {
			res.json().then((json: []) => {
				json.sort((a, b) => {
					if (a < b) return -1;
					if (a > b) return 1;
					return 0;
				});
				this.setState({
					cities: json,
					isCitiesLoading: false,
				});
			});
		});
	}

	specialityToggle = () => {
		this.setState({
			specialityDropdownOpen: !this.state.specialityDropdownOpen,
		});
	};

	availabilityToggle = () => {
		this.setState({
			availabilityDropdownOpen: !this.state.availabilityDropdownOpen,
		});
	};

	cityToggle = () => {
		this.setState({ cityDropdownOpen: !this.state.cityDropdownOpen });
	};

	onSpecialitySelect(speciality: string) {
		this.setState({ speciality: speciality, filteredDoctors: [] }, () => {
			this.onSelect();
		});
	}

	onAvailabilitySelect(availability: boolean) {
		this.setState(
			{ availability: availability, filteredDoctors: [] },
			() => {
				this.onSelect();
			}
		);
	}

	onCitySelect(city: string) {
		this.setState({ city: city, filteredDoctors: [] }, () => {
			this.onSelect();
		});
	}

	onSelect() {
		if (
			this.state.speciality === "Speciality" ||
			this.state.availability == null ||
			this.state.city === "City"
		)
			return;
		const tempDoctors = this.state.doctors.filter((doctor) => {
			return (
				doctor.availability === this.state.availability &&
				doctor.city === this.state.city &&
				doctor.speciality === this.state.speciality
			);
		});
		this.setState({
			filteredDoctors: tempDoctors,
		});
	}

	render() {
		const { isDoctorsLoading, isSpecialisationsLoading, isCitiesLoading } =
			this.state;
		if (isDoctorsLoading || isSpecialisationsLoading || isCitiesLoading)
			return (
				<div className="container">
					<div className="row">
						<div className="col d-flex justify-content-center">
							<h1> Loading</h1>{" "}
							<i className="fa fa-spinner fa-3x fa-spin"></i>
						</div>
					</div>
				</div>
			);

		return (
			<React.Fragment>
				{" "}
				<Navbar dark>
					<img
						src="assets/logo.png"
						alt="logo"
						className="col-1 ml-5"
					></img>
					<div className="col-9">
						<span className="mx-1"></span>
						<NavbarBrand href="/" className="brand">
							Board of doctors
						</NavbarBrand>
					</div>
					<div className="col-2 d-flex justify-content-end">
						<i className="fa fa-user-o user-icon"></i>
						<ButtonDropdown className="button login-button">
							Login
						</ButtonDropdown>
						<i className="fa fa-angle-down caret"></i>
					</div>
				</Navbar>
				<Navbar id="filter-bar">
					<div className="row">
						<ButtonDropdown
							isOpen={this.state.specialityDropdownOpen}
							toggle={this.specialityToggle}
							className="col filter-button"
						>
							<DropdownToggle
								style={{
									backgroundColor: "#FFFFFF",
									color: "#000000",
									border: "none",
									boxShadow: "none",
								}}
								className="speciality d-flex flex-row"
							>
								{this.state.speciality}
								<i className="fa fa-angle-down filter-caret"></i>
							</DropdownToggle>
							<DropdownMenu>
								{this.state.specialisations.map(
									(specialisation, i) => {
										return (
											<DropdownItem
												key={i}
												onClick={() =>
													this.onSpecialitySelect(
														specialisation
													)
												}
											>
												{specialisation}
											</DropdownItem>
										);
									}
								)}
							</DropdownMenu>
						</ButtonDropdown>

						<ButtonDropdown
							isOpen={this.state.availabilityDropdownOpen}
							toggle={this.availabilityToggle}
							className="col filter-button"
						>
							<DropdownToggle
								style={{
									backgroundColor: "#FFFFFF",
									color: "#000000",
									border: "none",
									boxShadow: "none",
									fontSize: "80%",
									borderBottom: "1px solid black",
									borderRadius: "0",
								}}
								className="d-flex flex-row"
							>
								{this.state.availability == null
									? "Avalibility"
									: this.state.availability
									? "Available"
									: "Not Available"}
								<i className="fa fa-angle-down filter-caret"></i>
							</DropdownToggle>
							<DropdownMenu>
								<DropdownItem
									onClick={() =>
										this.onAvailabilitySelect(true)
									}
								>
									Yes
								</DropdownItem>
								<DropdownItem
									onClick={() =>
										this.onAvailabilitySelect(false)
									}
								>
									No
								</DropdownItem>
							</DropdownMenu>
						</ButtonDropdown>

						<ButtonDropdown
							isOpen={this.state.cityDropdownOpen}
							toggle={this.cityToggle}
							className="col filter-button"
						>
							<DropdownToggle
								style={{
									backgroundColor: "#FFFFFF",
									color: "#000000",
									border: "none",
									boxShadow: "none",
									fontSize: "80%",
									borderBottom: "1px solid black",
									borderRadius: "0",
								}}
								className="d-flex flex-row"
							>
								{this.state.city}{" "}
								<i className="fa fa-angle-down filter-caret"></i>
							</DropdownToggle>
							<DropdownMenu>
								{this.state.cities.map((city, i) => {
									return (
										<DropdownItem
											key={i}
											onClick={() =>
												this.onCitySelect(city)
											}
										>
											{city}
										</DropdownItem>
									);
								})}
							</DropdownMenu>
						</ButtonDropdown>
					</div>
				</Navbar>
				<div id="doctor-cards-block">
					<DoctorCard
						doctors={this.state.filteredDoctors}
					></DoctorCard>
				</div>
			</React.Fragment>
		);
	}
}

export default Main;
