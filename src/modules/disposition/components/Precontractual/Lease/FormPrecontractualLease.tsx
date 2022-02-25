import { Field } from 'formik';
import ErrorMessage from '../../../../../utils/ui/error_messge';
import Tooltip from 'antd/lib/tooltip';
import { FC, useEffect } from 'react';
import moment from 'moment';
import TooltipField from './../../../../../utils/ui/tooltip_field';

interface FormProps {
    formik: any;
}

const FormPrecontractualLease: FC<FormProps> = ({ formik }) => {
    let valueServPublic = 0
    useEffect(() => {
        switch (formik.values.public_service) {
            case "Recobro":
                valueServPublic =Number(formik.values?.recovery_value);
                break;
            case "Aforo":
                valueServPublic = Number(formik.values?.value_aforo);
                break;
            case "Contador individualizado":
                valueServPublic = Number(formik.values?.counter_value);
                break;
            case "Prepago":
                valueServPublic = 0;
                break;

            default:
                break;
        }
        // console.log((Number(formik.values.monthly_total) + Number(formik.values.administration_value) +Number(valueServPublic)))
        // console.log(parseInt(formik.values.monthly_total))
        // console.log(parseInt(formik.values.administration_value))
        formik.setFieldValue(
            'contract_value',
            (Number(formik.values.monthly_total) + Number(formik.values.administration_value) +Number(valueServPublic)),
            false
        );

        // formik.setFieldValue(
        //     'subtotal',
        //     parseInt(formik?.values.IVA + formik.values.canon_value),
        //     false
        // );
    }, [formik.values.value_aforo, formik.values.recovery_value, formik.values.counter_value, formik.values.public_service, formik.values.administration_value])


    return (
        <>
            <div className="row">
                <div className="col-12 col-lg-6 col-md-6">
                    <label htmlFor="registration_date_id" className="form-label">
                        Fecha de registro estudio previo
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

                <div className="col-12 col-lg-3 col-md-3">
                    <label htmlFor="canon_value_id" className="form-label">
                        Valor del canon
                    </label>
                    <Field
                        type="number"
                        id="canon_value_id"
                        name="canon_value"
                        className="form-control"
                        disabled

                    />
                    <ErrorMessage name="canon_value" />
                </div>
                <div className="col-12 col-lg-3 col-md-3">
                    <label htmlFor="IVA_id" className="form-label">
                        IVA
                    </label>
                    <Field
                        type="number"
                        id="IVA_id"
                        name="iva"
                        className="form-control"
                        disabled

                    />
                    <ErrorMessage name="iva" />
                </div>

            </div>
            <div className="row">
                <div className="col-12 col-lg-3 col-md-3">
                    <label htmlFor="public_service_id" className="form-label">
                        Valor de servicio público<span className="text-danger">*</span>
                    </label>
                    <Field
                        as="select"
                        className="w-100 form-select form-control"
                        id="public_service_id"
                        name="public_service"
                        disabled={false}
                    >
                        <option key="public_service" value="" hidden>
                            --Seleccione servicio público--
                        </option>
                        <option key="Aforo" value="Aforo">Aforo</option>
                        <option key="Recobro" value="Recobro">Recobro</option>
                        <option key="Contador individualizado" value="Contador individualizado">Contador individualizado</option>
                        <option key="Prepago" value="Prepago">Prepago</option>

                    </Field>
                    <ErrorMessage name="public_service" />
                </div>
                {formik.values.public_service === 'Aforo' && (
                    <div className="col-12 col-lg-3 col-md-3">
                        <label htmlFor="value_aforo_id" className="form-label">
                            Valor aforo
                        </label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-white border-end-0">$</span>
                            </div>
                            <Field
                                disabled={false}
                                name="value_aforo"
                                type="number"
                                id="value_aforo_id"
                                className="form-control border-start-0 text-end"
                                min={0}
                                max={9999999999}
                            />
                        </div>

                        <ErrorMessage name="value_aforo" />
                    </div>
                )}
                {formik.values.public_service === 'Recobro' && (
                    <div className="col-12 col-lg-3 col-md-3">
                        <label htmlFor="recovery_value_id" className="form-label">
                            Valor recobro
                        </label>
                        <TooltipField text="el valor se calcula cada mes de acuerdo al valor de factura por EPM y distribución correspondiente" />
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-white border-end-0">$</span>
                            </div>
                            <Field
                                disabled={false}
                                name="recovery_value"
                                type="number"
                                id="recovery_value_id"
                                className="form-control border-start-0 text-end"
                                min={0}
                                max={9999999999}
                            />
                        </div>

                        <ErrorMessage name="recovery_value" />
                    </div>
                )}
                {formik.values.public_service === 'Contador individualizado' && (
                    <div className="col-12 col-lg-3 col-md-3">
                        <label htmlFor="counter_value_id" className="form-label">
                            Valor contador individualizado
                        </label>
                        <TooltipField text="valor facturado directamente por EPM" />
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-white border-end-0">$</span>
                            </div>
                            <Field
                                disabled={false}
                                name="counter_value"
                                type="number"
                                id="counter_value_id"
                                className="form-control border-start-0 text-end"
                                min={0}
                                max={9999999999}
                            />
                        </div>

                        <ErrorMessage name="counter_value" />
                    </div>
                )}
                <div className="col-12 col-lg-3 col-md-3">
                    <label htmlFor="administration_value_id" className="form-label">
                        Valor administración<span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-white border-end-0">$</span>
                        </div>
                        <Field
                            disabled={false}
                            id="administration_value_id"
                            name="administration_value"
                            type="number"
                            className="form-control border-start-0 text-end"
                            min={0}
                            max={9999999999}
                        />
                    </div>
                    <ErrorMessage name="administration_value" />
                </div>
                <div className="col-12 col-lg-3 col-md-3">
                    <label htmlFor="vigilance_value_id" className="form-label">
                        Valor vigilancia
                    </label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-white border-end-0">$</span>
                        </div>
                        <Field
                            disabled={false}
                            name="vigilance_value"
                            type="number"
                            id="vigilance_value_id"
                            className="form-control border-start-0 text-end"
                            min={0}
                            max={9999999999}
                        />
                    </div>

                    <ErrorMessage name="vigilance_value" />
                </div>
                <div className="col-12 col-lg-3 col-md-3">
                    <label htmlFor="subtotal_id" className="form-label">
                        Valor subtotal
                    </label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-white border-end-0">$</span>
                        </div>
                        <Field
                            disabled
                            id="subtotal_id"
                            name="monthly_total"
                            type="number"
                            className="form-control border-start-0 text-end"
                            min={0}
                            max={9999999999}
                        />
                    </div>

                    <ErrorMessage name="monthly_total" />
                </div>
                <div className="col-12 col-lg-3 col-md-3">
                    <label htmlFor="total_id" className="form-label">
                        Valor total
                    </label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-white border-end-0">$</span>
                        </div>
                        <Field
                            disabled
                            id="total_id"
                            name="contract_value"
                            type="number"
                            className="form-control border-start-0 text-end"
                            min={0}
                            max={9999999999}
                        />
                    </div>
                    <ErrorMessage name="contract_value" />
                </div>

                <div className="col-12 col-lg-3 col-md-3">
                    <label htmlFor="prediation_number_id" className="form-label">
                        Número prediación<span className="text-danger">*</span>
                    </label>
                    <Field
                        type="text"
                        id="prediation_number_id"
                        name="prediation_number"
                        className="form-control"
                        disabled={false}
                        onChange={(e) => {
                            e.preventDefault();
                            const { value } = e.target;
                            const regex = /^[0-9]{0,10}$/;
                            if (regex.test(value.toString())) {
                                formik.handleChange(e);
                            }
                        }}
                    />
                    <ErrorMessage name="prediation_number" />
                </div>
                <div className="col-12 col-lg-3 col-md-3">
                    <label htmlFor="prediation_date_id" className="form-label">
                        Fecha de prediación<span className="text-danger">*</span>
                    </label>
                    <Field
                        type="date"
                        id="prediation_date_id"
                        name="prediation_date"
                        placeholder="Fecha Final"
                        className="form-control"
                        max={moment(new Date()).format('YYYY-MM-DD')}
                    // disabled={true}
                    />
                    <ErrorMessage name="prediation_date" />
                </div>
                <div className="col-12 col-lg-3 col-md-3">
                    <label htmlFor="appraisal_number_id" className="form-label">
                        Número de avalúo<span className="text-danger">*</span>
                    </label>
                    <Field
                        type="number"
                        id="appraisal_number_id"
                        name="appraisal_number"
                        className="form-control"
                        onChange={(e) => {
                            e.preventDefault();
                            const { value } = e.target;
                            const regex = /^[0-9]{0,10}$/;
                            if (regex.test(value.toString())) {
                                formik.handleChange(e);
                            }
                        }}
                    // disabled
                    />
                    <ErrorMessage name="appraisal_number" />
                </div>
                <div className="col-12 col-lg-3 col-md-3">
                    <label htmlFor="appraisal_date_id" className="form-label">
                        Fecha de avalúo<span className="text-danger">*</span>
                    </label>
                    <Field
                        type="date"
                        id="appraisal_date_id"
                        name="appraisal_date"
                        placeholder=""
                        className="form-control"
                        max={ moment(new Date()).format('YYYY-MM-DD')}
                    // disabled={true}
                    />
                    <ErrorMessage name="appraisal_date" />
                </div>
                <div className="col-12 col-lg-3 col-md-3 form-inline">
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
                        />
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-white border-start-0">%</span>
                        </div>
                    </div>
                    <ErrorMessage name="lockable_base" />
                </div>
                <div className="col-12 col-lg-3 col-md-3"> {/*{`col-${(formik.values.public_service === 'Prepago') ? 3 : 6}`}*/}
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
                        min={1}
                        max={12}
                        onChange={(e) => {
                            e.preventDefault();
                            const { value } = e.target;
                            const regex = /^[0-9]{0,3}$/;
                            if (regex.test(value.toString())) {
                                formik.handleChange(e);
                            }
                        }}
                    />
                    <ErrorMessage name="contract_period" />
                </div>
                <div className={`col-12 col-lg-${(formik.values.public_service === 'Aforo' || formik.values.public_service === 'Recobro' || formik.values.public_service === 'Contador individualizado') ? 6 : 3} col-md-${(formik.values.public_service === 'Aforo' || formik.values.public_service === 'Recobro' || formik.values.public_service === 'Contador individualizado') ? 6 : 3}`}>
                    <label htmlFor="coverage_id" className="form-label">
                        Mecanismo de cobertura
                    </label>
                    <Field
                        as="select"
                        className="w-100 form-select form-control"
                        id="coverage_id"
                        name="coverage"
                        disabled={false}
                    >
                        <option key="public_service" value="" hidden>
                            --Seleccione mecanismo de cobertura--
                        </option>
                        <option key="cumplimiento" value="cumplimiento">
                            cumplimiento
                        </option>
                        <option key="seguro arrendamiento" value="seguro arrendamiento">
                            seguro arrendamiento
                        </option>
                    </Field>
                    <ErrorMessage name="coverage" />
                </div>
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
                        <option key="Restaurante" value="Restaurante">Restaurante</option>
                        <option key="Cafetería" value="Cafetería">Cafetería</option>
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
                        />
                        <ErrorMessage name="business_type.input" withCount max={200} />
                    </div>
                }
                <div className="col-12 col-lg-6 col-md-6">
                    <label htmlFor="environmental_risk_id" className="form-label">
                        Riesgos ambientales<span className="text-danger">*</span>
                    </label>
                    <Field
                        type="text"
                        className="form-control"
                        id="environmental_risk_id"
                        name="environmental_risk"
                        aria-describedby="emailHelp"
                        placeholder="Riesgos ambientales"
                        autoComplete="off"
                        maxLength={200}
                    />
                    <ErrorMessage name="environmental_risk" withCount max={200} />
                </div>
                <div className="col-12 col-lg-6 col-md-6">
                    <label htmlFor="fines_id" className="form-label">
                        Multas<span className="text-danger">*</span>
                    </label>
                    <TooltipField text="Las multas serán fijadas de acuerdo a las condiciones especiales del bien inmueble dado en arrendamiento y se verificaran al momento de la elaboración de cada estudio previo, cuales aplican" />
                    <Field
                        type="text"
                        className="form-control"
                        id="fines_id"
                        name="fines"
                        aria-describedby="emailHelp"
                        placeholder="Multas"
                        autoComplete="off"
                        maxLength={250}
                    />
                    <ErrorMessage name="fines" withCount max={250} />
                </div>
                <div className={`col-12 col-lg-${(formik.values.public_service === 'Aforo' || formik.values.public_service === 'Recobro' || formik.values.public_service === 'Contador individualizado') ? 12 : 6} col-md-${(formik.values.public_service === 'Aforo' || formik.values.public_service === 'Recobro' || formik.values.public_service === 'Contador individualizado') ? 12 : 6}`}>
                    <label htmlFor="destination_realEstate_id" className="form-label">
                        Destinación de bien inmueble<span className="text-danger">*</span>
                    </label>
                    <Field
                        as="textarea"
                        className="form-control"
                        id="destination_realEstate_id"
                        name="destination_realestate"
                        aria-describedby="emailHelp"
                        placeholder="Destinación"
                        autoComplete="off"
                        style={{ height: '33px' }}
                        maxLength={200}
                    />
                    <ErrorMessage name="destination_realestate" withCount max={200} />
                </div>
                <div className={`col-${formik.values.business_type_select === 'otro' ? 6: 12}`}>
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
                    />
                    <ErrorMessage name="boundaries" withCount max={200} />
                </div>
            </div>
        </>
    );
};

export default FormPrecontractualLease;
