import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
	getProject,
	getRealEstate,
	updateProject,
	updateRealEstate,
} from '../../../../../apis/uabi';
import {
	IRealEstateAttributes,
	IRealEstateResponse,
	IRealEstatesResponse,
} from '../../../../../utils/interfaces/components.interfaces';
import AdquisitionsFrom from "./AdquisitionsForm";

interface IProps {
	id: string;
}

const DetailProjects = () => {
	const { id } = useParams<IProps>();
	console.log(useParams());

	const history = useHistory();
	const [realEstate, setRealEstate] = useState<IRealEstateAttributes>({
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
	});

	const _getRealEstate = async () => {
		let realEstateResponse: IRealEstateResponse | string = await getRealEstate(
			id
		);
		console.log(realEstateResponse);

		if (typeof realEstateResponse !== 'string') {
			let tmpData = realEstateResponse.data;

			setRealEstate(tmpData);
		}
	};

	const _updateRealEstate = async () => {
		if (typeof realEstate.id === 'number') {
			let res: any = await updateRealEstate(realEstate, parseInt(id));

			console.log(res);
			await alert(res.data.message);
			history.push(`/adquisitions/real-estates/${id}`);
		}
	};

	useEffect(() => {
		_getRealEstate();
	}, []);

	const handleChange = (e: any) => {
		console.log(e.target.name);
		console.log(e.target.value);

		setRealEstate({
			...realEstate,
			[e.target.name]: e.target.value,
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
							<h5>Bien Inmueble</h5>
							<hr />
							<div className='container'>
								<form>
									<div className='row my-5 py-3'>
										<div className='col-3'>
											<label htmlFor='form-select' className='form-label'>
												Dependencia a cargo
											</label>
											<select
												className='form-select'
												aria-label='dependency'
												name='dependency'
												value={realEstate.dependency}
												onChange={handleChange}
											>
												<option
													value='Secretaría Suministros'
													selected={
														realEstate.dependency === 'Secretaría Suministros'
													}
												>
													Secretaría Suministros
												</option>
												<option
													value='Secretaría Salud'
													selected={
														realEstate.dependency === 'Secretaría Salud'
													}
												>
													Secretaría Salud
												</option>
												<option
													value='Secretaría Cultura'
													selected={
														realEstate.dependency === 'Secretaría Cultura'
													}
												>
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
												value={realEstate.destination_type}
											>
												<option
													value='Público'
													selected={realEstate.dependency === 'Público'}
												>
													Público
												</option>
												<option
													value='Fiscal'
													selected={realEstate.dependency === 'Fiscal'}
												>
													Fiscal
												</option>
												<option
													value='Mixto'
													selected={realEstate.dependency === 'Mixto'}
												>
													Mixto
												</option>
												<option
													value='POR DEFINIR'
													selected={realEstate.dependency === 'POR DEFINIR'}
												>
													POR DEFINIR
												</option>
											</select>
										</div>
										<div className='col-3'>
											<label htmlFor='form-select' className='form-label'>
												Cuenta Contable
											</label>
											<select
												className='form-select'
												aria-label='accounting_account'
												onChange={handleChange}
												name='accounting_account'
												value={realEstate.accounting_account}
											>
												<option
													value='Público'
													selected={realEstate.dependency === 'Público'}
												>
													Público
												</option>
												<option
													value='Fiscal'
													selected={realEstate.dependency === 'Fiscal'}
												>
													Fiscal
												</option>
												<option
													value='Mixto'
													selected={realEstate.dependency === 'Mixto'}
												>
													Mixto
												</option>
												<option
													value='POR DEFINIR'
													selected={realEstate.dependency === 'POR DEFINIR'}
												>
													POR DEFINIR
												</option>
											</select>
										</div>
										<div className='col-3'>
											<label htmlFor='form-select' className='form-label'>
												Centro de Costos
											</label>
											<select
												className='form-select'
												aria-label='cost_center'
												onChange={handleChange}
												name='cost_center'
												value={realEstate.cost_center}
											>
												<option
													value='Público'
													selected={realEstate.dependency === 'Público'}
												>
													Público
												</option>
												<option
													value='Fiscal'
													selected={realEstate.dependency === 'Fiscal'}
												>
													Fiscal
												</option>
												<option
													value='Mixto'
													selected={realEstate.dependency === 'Mixto'}
												>
													Mixto
												</option>
												<option
													value='POR DEFINIR'
													selected={realEstate.dependency === 'POR DEFINIR'}
												>
													POR DEFINIR
												</option>
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
												id='registry_number'
												name='registry_number'
												onChange={handleChange}
												value={realEstate.registry_number}
											/>
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
												value={realEstate.name}
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
												value={realEstate.description}
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
												value={realEstate.address}
												placeholder='Integración con Localización (Pop Up)'
											/>
										</div>
										<div className='col-2'>
											<label className='form-label'>Area Total (m2)</label>
											<input
												type='number'
												className='form-control'
												id='total_area'
												onChange={handleChange}
												name='total_area'
												value={realEstate.total_area}
											/>
										</div>
										<div className='col-2'>
											<label className='form-label'>Porcentaje Total (%)</label>
											<input
												type='number'
												className='form-control'
												id='total_percentage'
												onChange={handleChange}
												name='total_percentage'
												value={realEstate.total_percentage}
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
													value={realEstate.estate_type}
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
													value={realEstate.estate_type}
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
												value={realEstate.tipology}
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
                                    <AdquisitionsFrom type="edit"/>
									{/* END Adquisitions */}

									<div
										className='row py-3 my-3'
										style={{
											backgroundColor: '#f7f7f7',
											borderRadius: 15,
											border: '1px solid',
										}}
									>
										<div className='col-3'>
											<label htmlFor='form-select' className='form-label'>
												Tipo Documento
											</label>
											<select
												className='form-select'
												aria-label='Default select example'
											>
												<option value='1' selected>
													Escritura
												</option>
												<option value='2'>Matricula</option>
												<option value='3'>Contrato</option>
											</select>
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
									</div>
								</form>
							</div>

							<div className='col text-center'>
								<div
									className='btn btn-success my-3'
									onClick={_updateRealEstate}
								>
									Guardar
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default DetailProjects;
