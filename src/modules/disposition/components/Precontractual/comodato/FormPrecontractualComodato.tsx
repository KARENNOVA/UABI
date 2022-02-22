import { Field } from 'formik';
import ErrorMessage from '../../../../../utils/ui/error_messge'
// import Tooltip from 'antd/lib/tooltip';
import { FC, useState } from 'react';
import { LinkButton } from '../../../../../utils/ui/link';
import moment from 'moment';
import TooltipField from './../../../../../utils/ui/tooltip_field';

interface FormProps {
    formik: any;
}
export const FormPrecontractualComodato: FC<FormProps> = ({ formik }) => {
    const [idDisposition, setIdDisposition] = useState(17);
    const [idProhibition, setIdProhibition] = useState(13);
    return (
        <>
            <div className="row">
                <div className="col-12 col-lg-3 col-md-6">
                    <label htmlFor="registration_date_id" className="form-label">
                        Fecha de Registro estudio previo
                    </label>
                    <Field
                        type="date"
                        id="registration_date_id"
                        name="registration_date"
                        placeholder="Fecha Final"
                        className="form-control"
                        disabled
                    />
                    <ErrorMessage name="registration_date" />
                </div>
                <div className="col-12 col-lg-3 col-md-6">
                    <label htmlFor="patrimonial_value_id" className="form-label">
                        Valor Patrimonial
                    </label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-white border-end-0">$</span>
                        </div>
                        <Field
                            disabled
                            id="patrimonial_value_id"
                            name="patrimonial_value"
                            type="number"
                            className="form-control border-start-0 text-end"
                            min={0}
                            max={9999999999}
                        />
                    </div>
                    <ErrorMessage name="patrimonial_value" />
                </div>
                <div className="col-12 col-lg-3 col-md-6">
                    <label htmlFor="loan_value_id" className="form-label">
                        Valor comodato
                    </label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-white border-end-0">$</span>
                        </div>
                        <Field
                            disabled={false}
                            id="loan_value_id"
                            name="loan_value"
                            type="number"
                            className="form-control border-start-0 text-end"
                            min={0}
                            max={9999999999}
                            onChange={(e) => {
                                e.preventDefault();
                                const { value } = e.target;
                                const regex = new RegExp(`^[+]?\\d{0,10}$`);
                                if (regex.test(value.toString())) {
                                    formik.handleChange(e);
                                }
                            }}
                        />
                    </div>
                    <ErrorMessage name="loan_value" />
                </div>
                <div className="col-12 col-lg-3 col-md-6">
                    <label htmlFor="contract_period_id" className="form-label">
                        Duración del contrato<span className="text-danger">*</span>
                    </label>
                    <TooltipField text="Número de meses" />
                    <Field
                        type="number"
                        id="contract_period_id"
                        name="contract_period"
                        className="form-control"
                        disabled={false}
                        min={0}
                        max={3}
                        onChange={(e) => {
                            e.preventDefault();
                            const { value } = e.target;
                            const regex = new RegExp(`^[+]?\\d{0,3}$`);
                            if (regex.test(value.toString())) {
                                formik.handleChange(e);
                            }
                        }}
                    />
                    <ErrorMessage name="contract_period" />
                </div>
                <div className="col-12 col-lg-6 col-md-6">
                    <label htmlFor="loan_typology_id" className="form-label">
                        Tipología del comodato<span className="text-danger">*</span>
                    </label>
                    <Field
                        as="select"
                        className="w-100 form-select form-control"
                        id="loan_typology_id"
                        name="loan_typology"
                        disabled={false}
                    >
                        <option key="loan_typology" value="" hidden>
                            --Seleccione tipología--
                        </option>
                        <option key="Junta de acción comunal" value="las juntas de acción comunal">
                            Juntas de acción comunal
                        </option>
                        <option key="Entidades animo de lucro" value="entidades sin animo de lucro">
                            Entidades sin animo de lucro
                        </option>
                    </Field>
                    <ErrorMessage name="loan_typology" />
                </div>
                <div className="col-12 col-lg-3 col-md-6 form-inline">
                    <label htmlFor="lockable_base_id" className="form-label">
                        Base asegurable<span className="text-danger">*</span>
                    </label>
                    <TooltipField text="no inferior del 10%" />
                    <div className="input-group">
                        <Field
                            id="lockable_base_id"
                            name="lockable_base"
                            className="form-control border-end-0"
                            min={10}
                            max={100}
                            type="number"
                            onChange={(e) => {
                                e.preventDefault();
                                const { value } = e.target;
                                const regex = new RegExp(`^[+]?\\d{0,3}$`);
                                if (regex.test(value.toString())) {
                                    formik.handleChange(e);
                                }
                            }}
                        />
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-white border-start-0">%</span>
                        </div>
                    </div>

                    <ErrorMessage name="lockable_base" />
                </div>
                <div className="col-12 col-lg-3">
                    <label htmlFor="competitive_process_id" className="form-label">
                        Aplica Proceso competitivo<span className="text-danger">*</span>
                    </label>
                    <Field
                        as="select"
                        className="w-100 form-select form-control"
                        id="competitive_process_id"
                        name="competitive_process"
                        disabled={false}
                    >
                        <option key="competitive_process" value="" hidden>
                            --Seleccione si aplica o no aplica--
                        </option>
                        <option key="Aplica" value="Aplica">
                            Aplica
                        </option>
                        <option key="No aplica" value="No aplica">
                            No aplica
                        </option>
                    </Field>
                    <ErrorMessage name="competitive_process" />
                </div>
            </div>

            {formik.values.competitive_process === 'Aplica' && (
                <div className="row">
                    <div className="col-12">
                        <label htmlFor="competitive_process_value_id" className="form-label">
                            Proceso competitivo
                        </label>
                        <Field
                            as="textarea"
                            className="form-control"
                            id="competitive_process_value_id"
                            name="competitive_process_value"
                            aria-describedby="emailHelp"
                            placeholder="proceso competitivo"
                            autoComplete="off"
                            maxLength={500}
                            onChange={(e) => {
                                e.preventDefault();
                                const { value } = e.target;
                                const regex = new RegExp(/^[^'\\\/<>=*@&#$+-]*$/);
                                // const regex = new RegExp(/^[A-Za-z0-9\s\\Ñ\\ñ\\.\\,\\:\\;\\(\\)\\áéíóúüÁÉÍÓÚÜ]*$/g);
                                if (regex.test(value.toString())) {
                                    formik.handleChange(e);
                                }
                            }}
                        />
                        <ErrorMessage name="competitive_process_value" withCount max={500} />
                    </div>
                </div>
            )}
            <div className="row">
                <div className="col-12 col-lg-3 col-md-6">
                    <label htmlFor="prediation_date_id" className="form-label">
                        Fecha de Prediación<span className="text-danger">*</span>
                    </label>
                    <Field
                        type="date"
                        id="prediation_date_id"
                        name="prediation_date"
                        placeholder=""
                        className="form-control"
                        max={ moment(new Date().getTime()).format('YYYY-MM-DD')}
                    />
                    <ErrorMessage name="prediation_date" />
                </div>
                <div className="form-group col-12 col-lg-3 col-md-6">
                    <label htmlFor="horizontal_property_id" className="form-label">
                        Propiedad Horizontal<span className="text-danger">*</span>
                    </label>
                    <Field
                        as="select"
                        className="w-100 form-select form-control"
                        id="horizontal_property_id"
                        name="horizontal_property"
                        disabled={false}
                    >
                        <option key="Horizontal_property_id" value="" hidden>
                            -- Propiedad Horizontal --
                        </option>
                        <option key="si" value="si">
                            Si
                        </option>
                        <option key="no" value="no">
                            No
                        </option>
                    </Field>
                    <ErrorMessage name="horizontal_property"></ErrorMessage>
                </div>
                <div className="col-12 col-lg-3 col-md-6">
                    <label htmlFor="resolution_id" className="form-label">
                        ¿resolución SSS202050083439?<span className="text-danger">*</span>
                    </label>
                    <Field
                        as="select"
                        className="w-100 form-select form-control"
                        id="resolution_id"
                        name="resolution"
                        disabled={false}
                    >
                        <option key="resolution" value="" hidden>
                            -- Aplica resolución --
                        </option>
                        <option key="si resolución" value="si">
                            Si
                        </option>
                        <option key="no resolución" value="no">
                            No
                        </option>
                    </Field>
                    <ErrorMessage name="resolution" />
                </div>
                {formik.values.resolution === "no" &&
                    <div className="col-12 col-lg-3 col-md-6">
                        <label htmlFor="commercial_appraisal_id" className="form-label">
                            Valor Avalúo Comercial
                        </label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-white border-end-0">$</span>
                            </div>
                            <Field
                                id="commercial_appraisal_id"
                                name="commercial_appraisal"
                                type="number"
                                className="form-control border-start-0 text-end"
                                min={0}
                                max={9999999999}
                                onChange={(e) => {
                                    e.preventDefault();
                                    const { value } = e.target;
                                    const regex = new RegExp(`^[+]?\\d{0,10}$`);
                                    if (regex.test(value.toString())) {
                                        formik.handleChange(e);
                                    }
                                }}
                            />
                        </div>
                        <ErrorMessage name="commercial_appraisal" />
                    </div>

                }
                <div className={`col-12 col-lg-${(formik.values.resolution === 'no') ? 6 : 3} col-md-6`} >
                    {/*{`col-${(formik.values.economic_exploitation === 'si' ) ? 3 : 6}`}*/}
                    <label htmlFor="economic_exploitation_id" className="form-label">
                        ¿Autoriza explotación económica?<span className="text-danger">*</span>
                    </label>
                    <Field
                        as="select"
                        className="w-100 form-select form-control"
                        id="economic_exploitation_id"
                        name="economic_exploitation"
                        disabled={false}
                    >
                        <option key="economic_exploitation" value="" hidden>
                            -- Autoriza explotación económica --
                        </option>
                        <option key="si explotación" value="si">
                            Si
                        </option>
                        <option key="no explotación" value="no">
                            No
                        </option>
                    </Field>
                    <ErrorMessage name="economic_exploitation" />
                </div>
                {/* {console.log('valor', formik.values.public_service)} */}
                <div className="col-12 col-lg-6 col-md-6">
                    <label htmlFor="public_service_id" className="form-label">
                        Servicios publicos por Aforo<span className="text-danger">*</span>
                    </label>
                    <Field
                        as="select"
                        className="w-100 form-select form-control"
                        id="public_service_id"
                        name="public_service"
                        disabled={false}
                    >
                        <option key="public_service" value="" hidden>
                            -- Servicios públicos por aforo --
                        </option>
                        <option key="si" value="si">
                            Si
                        </option>
                        <option key="no" value="no">
                            No
                        </option>
                    </Field>
                    <ErrorMessage name="public_service" />

                </div>
                {formik.values.public_service === 'si' && (
                    <>
                        <div className="col-12 col-lg-6 col-md-6">
                            <label htmlFor="value_public_service_id" className="form-label">
                                valor de servicios públicos por aforo<span className="text-danger">*</span>
                            </label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-white border-end-0">$</span>
                                </div>
                                <Field
                                    type="number"
                                    id="value_public_service_id"
                                    name="value_public_service"
                                    className="form-control border-start-0 text-end"
                                    min={0}
                                    max={9999999999}
                                />
                            </div>
                            <ErrorMessage name="value_public_service" />
                        </div>
                        <div className="col-12 col-lg-6 col-md-6">
                            <label htmlFor="capacity_specification_id" className="form-label">
                                Especificación del Aforo<span className="text-danger">*</span>
                            </label>
                            <Field
                                type="text"
                                className="form-control"
                                id="capacity_specification"
                                name="capacity_specification"
                                aria-describedby="emailHelp"
                                placeholder="Especificación"
                                autoComplete="off"
                                maxLength={200}
                                onChange={(e) => {
                                    e.preventDefault();
                                    const { value } = e.target;
                                    const regex = new RegExp(/^[^'\\/<>=*@&#$+-]*$/);
                                    if (regex.test(value.toString())) {
                                        formik.handleChange(e);
                                    }
                                }}
                            />
                            <ErrorMessage name="capacity_specification" withCount max={200} />
                        </div>
                    </>
                )}
                <div className="col-12 col-lg-6 col-md-6">
                    <label htmlFor="business_type_select_id" className="form-label">
                        Tipo de negocio<span className="text-danger">*</span>
                    </label>
                    <Field
                        as="select"
                        className="w-100 form-select form-control"
                        id="business_type_select_id"
                        name="business_type.select"
                        disabled={false}
                    >
                        <option key="business_type" value="" hidden>
                            --Seleccione tipo de negocio--
                        </option>
                        <option key="teatro" value="teatro">teatro</option>
                        <option key="museo" value="museo">museo</option>
                        <option key="entidad cultural" value="entidad cultural">entidad cultural</option>
                        <option key="otro" value="otro">otro</option>
                    </Field>
                    <ErrorMessage name="business_type.select" />
                </div>
                {formik.values.business_type.select === "otro" &&
                    <div className="col-12 col-lg-6 col-md-6">
                        <label htmlFor="business_type_input_id" className="form-label">
                            cual tipo de negocio
                        </label>
                        <Field
                            type="text"
                            className="form-control"
                            id="business_type_input_id"
                            name="business_type.input"
                            aria-describedby="emailHelp"
                            placeholder="digite el tipo de negocio"
                            autoComplete="off"
                            maxLength={200}
                            onChange={(e) => {
                                e.preventDefault();
                                const { value } = e.target;
                                const regex = new RegExp(/^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ,.;:()¿?¡!"]*$/g);
                                if (regex.test(value.toString())) {
                                    formik.handleChange(e);
                                }
                            }}
                        />
                        <ErrorMessage name="business_type.input" withCount max={200} />
                    </div>
                }
                <div className="col-12 col-lg-6 col-md-6">
                    <label htmlFor="destination_realEstate_id" className="form-label">
                        Destinación de bien Inmueble<span className="text-danger">*</span>
                    </label>
                    <Field
                        as="textarea"
                        className="form-control"
                        id="destination_realestate_id"
                        name="destination_realestate"
                        aria-describedby="emailHelp"
                        placeholder="Destinación"
                        autoComplete="off"
                        style={{ height: '33px' }}
                        maxLength={200}
                        onChange={(e) => {
                            e.preventDefault();
                            const { value } = e.target;
                            const regex = new RegExp(/^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ,.;:()¿?¡!"]*$/g);
                            if (regex.test(value.toString())) {
                                formik.handleChange(e);
                            }
                        }}
                    />
                    <ErrorMessage name="destination_realestate" withCount max={200} />
                </div>
                <div className="col-12 col-lg-6 col-md-6">
                    <label htmlFor="peacesafe_id" className="form-label">
                        Paz y Salvo de Rubros<span className="text-danger">*</span>
                    </label>
                    <TooltipField text="paz y salvo de cuotas de administración, constancia de pago de impuesto predial cuando el inmueble se encuentre por fuera de la circunscripción territorial del Municipio de Medellín, entre otros" />
                    <Field
                        as="textarea"
                        className="form-control"
                        id="peacesafe_id"
                        name="peacesafe"
                        aria-describedby="emailHelp"
                        placeholder=""
                        autoComplete="off"
                        style={{ height: '33px' }}
                        maxLength={200}
                        onChange={(e) => {
                            e.preventDefault();
                            const { value } = e.target;
                            const regex = new RegExp(/^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ,.;:()¿?¡!"]*$/g);
                            if (regex.test(value.toString())) {
                                formik.handleChange(e);
                            }
                        }}
                    />
                    <ErrorMessage name="peacesafe" withCount max={200} />
                </div>
                <div className={`col-12  col-lg-${(formik.values.business_type.select !== 'otro') ? 12 : 6}  col-md-${(formik.values.business_type.select !== 'otro') ? 12 : 6}`}>
                    <label htmlFor="social_event_id" className="form-label">
                        Eventos sociales<span className="text-danger">*</span>
                    </label>
                    <Field
                        as="textarea"
                        className="form-control"
                        id="social_event_id"
                        name="social_event"
                        aria-describedby="emailHelp"
                        placeholder="Descripción de eventos"
                        autoComplete="off"
                        style={{ height: '33px' }}
                        maxLength={200}
                        onChange={(e) => {
                            e.preventDefault();
                            const { value } = e.target;
                            const regex = new RegExp(/^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ,.;:()¿?¡!"]*$/g);
                            if (regex.test(value.toString())) {
                                formik.handleChange(e);
                            }
                        }}
                    />
                    <ErrorMessage name="social_event" withCount max={200} />
                </div>
                <div className={`col-12 col-lg-${(formik.values.resolution === 'si') ? 12 : 6} col-md-${(formik.values.resolution === 'si') ? 12 : 6}`}>
                    <label htmlFor="action_field_id" className="form-label">
                        Campo de acción<span className="text-danger">*</span>
                    </label>
                    <TooltipField text="La Secretaría que tiene a cargo el inmueble debe motivar el por qué las actividades desarrolladas por el contratista solo pueden ser ejecutadas por el mismo, en razón de su campo de acción. ejemplo: Atención de necesidades territoriales, beneficios que presta para la Secretaría en razón de sus objetivos misionales y que no sean prestados por otros contratistas, entre otros que marquen factor decisivo y directo de su escogencia" />
                    <Field
                        as="textarea"
                        className="form-control"
                        id="action_field_id"
                        name="action_field"
                        aria-describedby="emailHelp"
                        placeholder="Descripción campo de acción"
                        autoComplete="off"
                        style={{ height: '33px' }}
                        maxLength={200}
                        onChange={(e) => {
                            e.preventDefault();
                            const { value } = e.target;
                            const regex = new RegExp(/^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ,.;:()¿?¡!"]*$/g);
                            if (regex.test(value.toString())) {
                                formik.handleChange(e);
                            }
                        }}
                    />
                    <ErrorMessage name="action_field" withCount max={200} />
                </div>
                <div className={`col-12 col-lg-${formik.values.resolution === "si" ? 12 : 6 } col-md-${formik.values.resolution === "si" ? 12 : 6 }`}>
                    <label htmlFor="dependence_id" className="form-label">
                        Como contribuye la dependencia<span className="text-danger">*</span>
                    </label>
                    <TooltipField text="Digite claramente en la forma como la dependencia que entrega el inmueble se ve identificada en el objeto social y la forma como contribuye según la gestión misional" />
                    <Field
                        as="textarea"
                        className="form-control"
                        id="dependence_id"
                        name="dependence"
                        aria-describedby="emailHelp"
                        placeholder="Descripcion"
                        autoComplete="off"
                        style={{ height: '33px' }}
                        maxLength={200}
                        onChange={(e) => {
                            e.preventDefault();
                            const { value } = e.target;
                            const regex = new RegExp(/^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ,.;:()¿?¡!"]*$/g);
                            if (regex.test(value.toString())) {
                                formik.handleChange(e);
                            }
                        }}
                    />
                    <ErrorMessage name="dependence" withCount max={200} />
                </div>
                <div className="col-12 col-lg-6 col-md-6">
                    <label htmlFor="environmental_risk_id" className="form-label">
                        Riesgos Ambientales<span className="text-danger">*</span>
                    </label>
                    <Field
                        as="textarea"
                        className="form-control"
                        id="environmental_risk_id"
                        name="environmental_risk"
                        aria-describedby="emailHelp"
                        placeholder="Riesgos ambientales"
                        autoComplete="off"
                        maxLength={500}
                        onChange={(e) => {
                            e.preventDefault();
                            const { value } = e.target;
                            const regex = new RegExp(/^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ,.;:()¿?¡!"]*$/g);
                            if (regex.test(value.toString())) {
                                formik.handleChange(e);
                            }
                        }}
                    />
                    <ErrorMessage name="environmental_risk" withCount max={500} />
                </div>

                <div className={`col-12 col-lg-${formik.values.resolution === "no" ? 12 : 6 } col-md-${formik.values.resolution === "no" ? 12 : 6 }`}>
                    <label htmlFor="activities_id" className="form-label">
                        Actividades<span className="text-danger">*</span>
                    </label>
                    <TooltipField text="Realice una descripción detallada de la necesidad que se pretende solucionarle al solicitante con la entrega en comodato del inmueble - se deben describir los programas específicos de la entidad y su relación en cuanto a la línea del plan de desarrollo actual que se apoyará con su operación." />
                    <Field
                        as="textarea"
                        className="form-control"
                        id="activities_id"
                        name="activities"
                        aria-describedby="emailHelp"
                        placeholder="Actividades"
                        autoComplete="off"
                        maxLength={500}
                        onChange={(e) => {
                            e.preventDefault();
                            const { value } = e.target;
                            const regex = new RegExp(/^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ,.;:()¿?¡!"]*$/g);
                            if (regex.test(value.toString())) {
                                formik.handleChange(e);
                            }
                        }}
                    />
                    <ErrorMessage name="activities" withCount max={500} />
                </div>
                <div className="col-12">
                    <label htmlFor="boundaries_id" className="form-label">
                        Descripción de linderos<span className="text-danger">*</span>
                    </label>
                    <Field
                        as="textarea"
                        className="form-control"
                        id="boundaries_id"
                        name="boundaries"
                        aria-describedby="emailHelp"
                        placeholder="descripción de linderos"
                        autoComplete="off"
                        style={{ height: '33px' }}
                        maxLength={200}
                        onChange={(e) => {
                            e.preventDefault();
                            const { value } = e.target;
                            const regex = new RegExp(/^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ,.;:()¿?¡!"]*$/g);
                            if (regex.test(value.toString())) {
                                formik.handleChange(e);
                            }
                        }}
                    />
                    <ErrorMessage name="boundaries" withCount max={200} />
                </div>
                <div className="bg-white d-flex flex-row justify-content-between">
                    <div className="flex-fill" />

                    <LinkButton
                        onClick={() => {
                            setIdDisposition(idDisposition + 1);
                            const obligations_list = [
                                ...formik.values?.obligations,
                                {
                                    key: idDisposition,
                                    obligation: '',
                                },
                            ];
                            formik.setFieldValue('obligations', obligations_list, false);
                            //console.log(obligations_list)
                        }}
                        name="Agregar Obligación"
                        icon={<i className="fa fa-plus-circle" aria-hidden="true" />}
                    />
                </div>
                {Array.isArray(formik.values.obligations) &&
                    formik.values.obligations?.map((item, i) => {
                        return (
                            <div className="row" key={i}>
                                <div className="col-11">
                                    <label htmlFor={`percentage_insured_${i}`} className="form-label">
                                        Obligación
                                    </label>
                                    <Field
                                        // disabled={disabled}
                                        type="text"
                                        className="form-control"
                                        id={`obligation_${i}`}
                                        name={`obligations[${i}].obligation`}
                                        maxLength={100}
                                    />
                                    <ErrorMessage name={`obligations[${i}].obligation`} withCount max={100} />
                                </div>

                                <div className="col-1 " style={{ display: 'flex', alignItems: 'center' }}>
                                    <LinkButton
                                        name=""
                                        icon={<i className="fa fa-times" aria-hidden="true" />}
                                        onClick={() => {
                                            setIdDisposition(idDisposition - 1);
                                            const obligations_list = formik.values.obligations.filter(
                                                (v, j) => j !== i
                                            );
                                            formik.setFieldValue('obligations', obligations_list, false);
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })}

                {/* prohibiciones */}
                <div className="bg-white d-flex flex-row justify-content-between">
                    <div className="flex-fill" />

                    <LinkButton
                        onClick={() => {
                            setIdProhibition(idProhibition + 1);
                            const prohibitions_list = [
                                ...formik.values.prohibitions,
                                {
                                    key: idProhibition,
                                    prohibition: '',
                                },
                            ];
                            formik.setFieldValue('prohibitions', prohibitions_list, false);
                            //console.log(obligations_list)
                        }}
                        name="Agregar Prohibición"
                        icon={<i className="fa fa-plus-circle" aria-hidden="true" />}
                    />
                </div>
                {Array.isArray(formik.values.prohibitions) &&
                    formik.values.prohibitions?.map((item, i) => {
                        return (
                            <div className="row" key={i}>
                                <div className="col-11">
                                    <label htmlFor={`prohibition_${i}`} className="form-label">
                                        Prohibición
                                    </label>
                                    <Field
                                        // disabled={disabled}
                                        type="text"
                                        className="form-control"
                                        id={`prohibition_${i}`}
                                        name={`prohibitions[${i}].prohibition`}
                                        maxLength={100}
                                    />
                                    <ErrorMessage name={`prohibitions[${i}].prohibition`} withCount max={100} />
                                </div>

                                <div className="col-1 " style={{ display: 'flex', alignItems: 'center' }}>
                                    <LinkButton
                                        name=""
                                        icon={<i className="fa fa-times" aria-hidden="true" />}
                                        onClick={() => {
                                            setIdProhibition(idProhibition - 1);
                                            const prohibitions_list = formik.values.prohibitions.filter(
                                                (v, j) => j !== i
                                            );
                                            formik.setFieldValue('prohibitions', prohibitions_list, false);
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
};
