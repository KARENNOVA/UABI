import { useEffect, useState } from 'react';
import {
	createRealEstate,
	getProjects,
	getRealEstatesByProject,
} from '../../../../../apis/uabi';
import { Link, useHistory } from 'react-router-dom';
import {
	IProjectAttributes,
	IProjectsResponse,
	IRealEstatesResponse,
} from '../../../../../utils/interfaces/components.interfaces';
import { Input, Table } from 'semantic-ui-react';
import ItemRealEstate from './ItemRealEstate';
import AdquisitionsFrom from "./AdquisitionsForm";

interface IProps {
	name: string;
}

const RealEstate = ({ name }: IProps) => {
	const history = useHistory();
	const [projects, setProjects] = useState<IProjectAttributes[]>([
		{
			id: '',
			name: '',
			description: '',
			dependency: '',
			audit_trail: {
				created_by: '',
				created_on: '',
				updated_by: null,
				updated_on: null,
				updated_values: null,
			},
			status: -1,
		},
	]);

	const [realEstate, setRealEstate] = useState({
		dependency: '',
		destination_type: '',
		accounting_account: '',
		cost_center: '',
		registry_number: '',
		name: '',
		description: '',
		address: '',
		cbml: '',
		total_area: -1,
		total_percentage: -1,
		estate_type: '',
		tipology: '',
		project_id: -1,
	});

	const [realEstates, setRealEstates] = useState<any[]>([
		{
			id: -1,
			dependency: '',
			destination_type: '',
			accounting_account: '',
			cost_center: '',

			registry_number: '',
			name: '',
			description: '',

			total_area: -1,
			total_percentage: -1,
			estate_type: '',
			tipology: '',

			project_id: -1,

			audit_trail: {
				created_by: '',
				created_on: '',
				updated_by: null,
				updated_on: null,
				updated_values: null,
			},
			status: -1,
		},
	]);

	useEffect(() => {
		_getProjects();
	}, []);

	useEffect(() => {
		_getRealEstates();
	}, [realEstate.project_id]);

	useEffect(() => {
		printProjects();
	}, [projects]);

	const _getRealEstates = async () => {
		let realEstatesResponse: IRealEstatesResponse | string =
			await getRealEstatesByProject(String(realEstate.project_id));

		if (typeof realEstatesResponse !== 'string') {
			let tmpData = realEstatesResponse.data;

			setRealEstates(tmpData);
		}
	};

	const _getProjects = async () => {
		let projectsResponse: IProjectsResponse | string = await getProjects();

		if (typeof projectsResponse !== 'string') {
			let tmpData = projectsResponse.data;

			setProjects(tmpData);
		}
	};

	const _createRealEstate = async () => {
		const response: any = await createRealEstate(realEstate);

		await alert(response.message);
		console.log(response);
		cleanInputs();
		_getRealEstates();
	};

	const cleanInputs = () => {
		setRealEstate({
			dependency: '',
			destination_type: '',
			accounting_account: '',
			cost_center: '',
			registry_number: '',
			name: '',
			description: '',
			address: '',
			cbml: '',
			total_area: -1,
			total_percentage: -1,
			estate_type: '',
			tipology: '',
			project_id: -1,
		});
	};

	const handleChange = (e: any) => {
		console.log(e.target.name);
		console.log(e.target.value);

		setRealEstate({
			...realEstate,
			[e.target.name]: e.target.value,
		});
	};

	// Prints
	const printProjects = () => {
		projects.map((project) => {
			return (
				<option value={project.id} selected>
					{project.name}
				</option>
			);
		});
	};

	return (
		<section className='pt-5' id='texto-superior'>
			<div className='container-fluid'>
				<div className='row justify-content-center'>
					<div className='col-md-12'>
						<div
							style={{
								backgroundColor: 'white',
								borderRadius: 15,
								padding: '10px 20px',
							}}
						>
							<h5>{name} Bien Inmueble</h5>
							<hr />
							<div className='container'>
								<form>
									<div className='row'>
										<div className='col-3 d-flex'>
											{/*	<div className='form-check'>
												<input
													className='form-check-input'
													type='radio'
													name='flexRadioDefault'
													id='flexRadioDefault4'
													checked
												/>
												<label
													className='form-check-label'
													htmlFor='flexRadioDefault4'
												>
													Proyecto Existente
												</label>
											</div> */}
											{/* <div className='form-check'>
													<input
														className='form-check-input'
														type='radio'
														name='flexRadioDefault'
														id='flexRadioDefault5'
													/>
													<label
														className='form-check-label'
														htmlFor='flexRadioDefault5'
													>
														Proyecto Nuevo
													</label>
												</div> */}
										</div>
										<div className='col-6'>
											<select
												className='form-select'
												aria-label='Default select example'
												name='project_id'
												onChange={handleChange}
											>
												<option value='' selected disabled>
													-- Seleccione Proyecto --
												</option>
												{projects.map((project) => {
													return (
														<option value={project.id}>{project.name}</option>
													);
												})}
											</select>
										</div>
									</div>
									<div className='row my-5 py-3'>
										<div className='col-3'>
											<label htmlFor='form-select' className='form-label'>
												Dependencia a cargo
											</label>
											<select
												className='form-select'
												aria-label='dependency'
												name='dependency'
												onChange={handleChange}
											>
												<option value='' selected disabled hidden>
													-- Seleccione Dependencia --
												</option>
												<option value='Secretaría Suministros'>
													Secretaría Suministros
												</option>
												<option value='Secretaría Salud'>
													Secretaría Salud
												</option>
												<option value='Secretaría Cultura'>
													Secretaría Cultura
												</option>
												<option value='POR DEFINIR'>POR DEFINIR</option>
											</select>
										</div>
										<div className='col-3'>
											<label htmlFor='form-select' className='form-label'>
												Tipo Destinación
											</label>
											<select
												className='form-select'
												aria-label='destination_type'
												name='destination_type'
												onChange={handleChange}
											>
												<option value='' selected disabled hidden>
													-- Seleccione Destinación --
												</option>
												<option value='PÚBLICO'>Público</option>
												<option value='FISCAL'>Fiscal</option>
												<option value='MIXTO'>Mixto</option>
											</select>
										</div>
										<div className='col-3'>
											<label htmlFor='form-select' className='form-label'>
												Cuenta Contable
											</label>
											<select
												className='form-select'
												aria-label='accounting_account'
												name='accounting_account'
												onChange={handleChange}
											>
												<option value='' selected disabled hidden>
													-- Seleccione Cuenta Contable --
												</option>
												<option value='PÚBLICO'>Público</option>
												<option value='FISCAL'>Fiscal</option>
												<option value='MIXTO'>Mixto</option>
												<option value='POR DEFINIR'>POR DEFINIR</option>
											</select>
										</div>
										<div className='col-3'>
											<label htmlFor='form-select' className='form-label'>
												Centro de Costos
											</label>
											<select
												className='form-select'
												aria-label='cost_center'
												name='cost_center'
												onChange={handleChange}
											>
												<option value='' selected disabled hidden>
													-- Seleccione Centro de Costos --
												</option>
												<option value='PÚBLICO'>Público</option>
												<option value='FISCAL'>Fiscal</option>
												<option value='MIXTO'>Mixto</option>
												<option value='POR DEFINIR'>POR DEFINIR</option>
											</select>
										</div>

										<div className='col-3'>
											<label
												htmlFor='exampleInputEmail1'
												className='form-label'
											>
												Número Matricula
											</label>
											<input
												type=''
												className='form-control'
												id='exampleInputEmail1'
												aria-describedby='emailHelp'
												name='registry_number'
												onChange={handleChange}
											/>
											<div id='emailHelp' className='form-text'></div>
										</div>
										<div className='col-3'>
											<div className='mb-3'>
												<label htmlFor='formFile' className='form-label'>
													Default file input example
												</label>
												<input
													className='form-control'
													type='file'
													id='formFile'
												/>
												<div id='emailHelp' className='form-text'>
													Escritura.pdf
												</div>
											</div>
										</div>

										<div className='col-3'>
											<label
												htmlFor='exampleInputEmail1'
												className='form-label'
											>
												Nombre Inmueble
											</label>
											<input
												type=''
												className='form-control'
												id='name'
												name='name'
												onChange={handleChange}
											/>
										</div>
										<div className='col-6'>
											<label
												htmlFor='exampleInputEmail1'
												className='form-label'
											>
												Descripción Inmueble
											</label>
											<input
												type=''
												className='form-control'
												id='description'
												aria-describedby='description'
												name='description'
												onChange={handleChange}
											/>
											<div id='emailHelp' className='form-text'></div>
										</div>
										<div className='col-3'>
											<label
												htmlFor='exampleInputEmail1'
												className='form-label'
											>
												Valor Patrimonial
											</label>
											<input
												type=''
												className='form-control'
												id='patrimonial_value'
												aria-describedby='patrimonial_value'
												name='patrimonial_value'
												onChange={handleChange}
											/>
										</div>

										<div className='col-3'>
											<label
												htmlFor='exampleInputEmail1'
												className='form-label'
											>
												Dirección
											</label>
											<input
												type=''
												className='form-control'
												id='address'
												name='address'
												onChange={handleChange}
												placeholder='Pop Up'
											/>
										</div>
										<div className='col-2'>
											<label className='form-label'>Area Total (m2)</label>
											<input
												type='number'
												className='form-control'
												id='total_area'
												name='total_area'
												onChange={handleChange}
											/>
										</div>
										<div className='col-2'>
											<label className='form-label'>Porcentaje Total (%)</label>
											<input
												type='number'
												className='form-control'
												id='total_percentage'
												name='total_percentage'
												onChange={handleChange}
											/>
										</div>

										{/* <div className='col-3'>
											<label
												className='form-label'
											>
												Avalúo
											</label>
											<input
												type=''
												className='form-control'
												id='exampleInputEmail1'
											/>
										</div> */}
										<div className='col-2'>
											<div className='form-check'>
												<input
													className='form-check-input'
													type='radio'
													id='flexRadioDefault2'
													name='estate_type'
													onChange={handleChange}
													checked
												/>
												<label
													className='form-check-label'
													htmlFor='flexRadioDefault2'
												>
													Urbano
												</label>
											</div>

											<div className='form-check'>
												<input
													className='form-check-input'
													type='radio'
													id='flexRadioDefault1'
													name='estate_type'
													onChange={handleChange}
												/>
												<label
													className='form-check-label'
													htmlFor='flexRadioDefault1'
												>
													Rural
												</label>
											</div>
										</div>
										<div className='col-3'>
											<label className='form-label'>Tipología</label>
											<select
												className='form-select'
												name='tipology'
												id='tipology'
												onChange={handleChange}
											>
												<option value='' selected disabled hidden>
													-- Seleccione Tipología --
												</option>
												<option value='2'>Secretaría Salud</option>
												<option value='3'>Secretaría Cultura</option>
												<option value='POR DEFINIR'>POR DEFINIR</option>
											</select>
										</div>
									</div>

									{/* Adquisitions */}
                                    <AdquisitionsFrom handleChange={handleChange}/>
									{/* END Adquisitions */}

									<div
										className='row py-3 my-3'
										style={{
											backgroundColor: '#f7f7f7',
											borderRadius: 15,
											border: '1px solid',
										}}
									>
										<h5>Documentos Soporte</h5>

										<div className='col-3'>
											<label htmlFor='form-select' className='form-label'>
												Nombre del Documento
											</label>
											<Input />
										</div>
										<div className='col-3'>
											<div className='mb-3'>
												<label htmlFor='formFile' className='form-label'>
													Default file input example
												</label>
												<input
													className='form-control'
													type='file'
													id='formFile'
												/>
												<div id='emailHelp' className='form-text'>
													Escritura.pdf
												</div>
											</div>
										</div>
										<div className='col-1'>
											<label htmlFor=''></label>
											<button type='submit' className='btn btn-primary mr-3'>
												Subir
											</button>
										</div>
									</div>
									<div className='d-flex my-3'>
										<button type='submit' className='btn btn-success mr-3'>
											Guardar
										</button>
										<button
                                            type="button"
											className='btn btn-primary mx-3'
											onClick={_createRealEstate}
										>
											Agregar
										</button>
									</div>
								</form>
							</div>
							<hr />
							<div className='d-flex flex-row'>
								<h5>Bienes Inmuebles del Proyecto</h5>
							</div>
							<Table responsive>
								<thead>
									<tr>
										<th scope='col' className='align-top center'>
											ID
										</th>
										<th scope='col' className='align-top'>
											Matricula
										</th>
										<th scope='col' className='align-top'>
											Nombre
										</th>
										<th scope='col' className='align-top'>
											Fecha Creación
										</th>
										<th scope='col' className='align-top'>
											Creado por
										</th>
										<th scope='col' className='align-top'>
											<div
												style={{
													display: 'flex',
													flexDirection: 'column',
												}}
											>
												Acciones
												<div
													style={{
														display: 'flex',
														width: '100%',
														justifyContent: 'space-around',
													}}
												>
													<p> Ver </p>
													<p> Editar </p>
													<p> Eliminar </p>
												</div>
											</div>
										</th>
									</tr>
								</thead>
								<tbody>
									{realEstates.map((project) => {
										let creationDate = new Date(
											parseFloat(project.audit_trail.created_on)
										).toDateString();
										return (
											<ItemRealEstate
												id={project.id}
												matricula={project.registry_number}
												name={project.name}
												creationDate={creationDate}
												createdBy={project.audit_trail.created_by}
											/>
										);
									})}
								</tbody>
							</Table>

							<div className='col text-center'>
								<button type='submit' className='btn btn-success my-3'>
									Guardar
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default RealEstate;
