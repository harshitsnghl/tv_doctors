import { Card } from "@material-ui/core";
import React, { Component } from "react";
import { Button, CardBody, CardImg, CardText, CardTitle } from "reactstrap";
import "./DoctorCard.scss";
import { Doctor } from "../shared/doctors";
import { baseUrl } from "../shared/baseUrl";

interface State {
	selectedDoctor: Doctor;
}

interface Props {
	doctors: Doctor[];
}

class DoctorCard extends Component<Props, State> {
	constructor(props: any) {
		super(props);
		this.state = {
			selectedDoctor: null!,
		};
	}

	onDoctorSelect(doctor: Doctor) {
		this.setState({ selectedDoctor: doctor });
	}

	renderDegree(degrees: string[]) {
		const degreeList = degrees.map((degree, i) => {
			if (i === degrees.length - 1)
				return (
					<div key={i}>
						<CardText className="doctor-details">{degree}</CardText>
					</div>
				);
			else
				return (
					<div key={i}>
						<CardText className="doctor-details">
							{degree},
						</CardText>
					</div>
				);
		});

		return <div className="d-flex flex-row">{degreeList}</div>;
	}

	render() {
		const doctorList = this.props.doctors.map((doctor, i) => {
			return (
				<div className="col-4 mt-3 g-3" key={i}>
					<Card key={doctor.id}>
						<div className="row">
							<div className="col-2">
								<CardImg
									top
									src={baseUrl + "images/" + doctor.image}
									alt={doctor.name}
									className="doctor-image"
								/>
							</div>
							<CardBody
								className="col-7 row"
								style={{ paddingLeft: "1rem" }}
							>
								<div className="col-10">
									<CardTitle
										className="doctor-name"
										style={{ margin: "0.1rem" }}
									>
										Dr. {doctor.name}
									</CardTitle>
									<CardText className="doctor-details">
										{doctor.experience} years experience
									</CardText>
									{this.renderDegree(doctor.degree)}
									<CardText className="doctor-details">
										{doctor.speciality}
									</CardText>
								</div>
								<div className="col-2 p-0 d-flex align-self-end pb-1">
									<CardText className="doctor-charge">
										₹{doctor.charge}
									</CardText>
								</div>
							</CardBody>
							<hr style={{ margin: "1rem 0 0 0" }}></hr>
							<CardBody>
								<div className="row my-2">
									<CardText className="doctor-details col">
										Next Availability<br></br>
										At {doctor.time}
									</CardText>
									<Button
										className="col schedule-button"
										style={{
											backgroundColor: "#FFFFFF",
											color: "#E67E89",
											border: "none",
											fontSize: ".8rem",
											fontWeight: "bolder",
											boxShadow: "none",
										}}
									>
										SCHEDULE NOW
									</Button>
								</div>
							</CardBody>
						</div>
					</Card>
				</div>
			);
		});

		return (
			<div className="container">
				<div className="row" style={{ margin: "0rem 2rem" }}>
					{doctorList}
				</div>
			</div>
		);
	}
}

export default DoctorCard;
