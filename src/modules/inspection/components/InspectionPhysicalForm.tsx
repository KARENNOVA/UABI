import { Field } from 'formik';
import React, { FC } from 'react';
import ErrorMessage from '../../../utils/ui/error_messge';
import DocumentModal from '../../../utils/components/DocumentsModal';
import { IProperty } from '../custom_types';

interface InspectionPhysicalFormProps {
    formik: any;
}
const InspectionPhysicalForm: FC<InspectionPhysicalFormProps> = ({ formik }) => {
    return (
        <>
            {formik.values.properties?.map((property, i) => {
                const p = formik.values.properties[i];
                // console.log(p, p.status_property)
                const show_upload = p.status_property === "2" || p.status_property === "3";
                const old_p = formik.values.old_properties?.find((op) => op.name === p.name);
                return (
                    <div className="row border-1" key={`properties_${i}`}>
                        <div className={`form-group col-12 col-lg${show_upload ? '-3' : '-6'} col-md${show_upload ? '-3' : '-6'} `}>
                            <label htmlFor="enclosure_prev_id" className="form-label">
                                {property.name}
                            </label>
                            <input
                                type="text"
                                id="enclosure_prev_id"
                                className="form-control"
                                disabled
                                value={old_p?.status_property}
                                autoComplete="off"
                            />
                            <ErrorMessage name={`properties[${i}].status_property`} />
                        </div>
                        <div className={`form-group col-12 col-lg${show_upload ? '-3' : '-6'} col-md${show_upload ? '-3' : '-6'}`}>
                            <label htmlFor="enclosure_id" className="form-label">
                                {property.name}
                            </label>
                            <Field
                                name={`properties[${i}].status_property`}
                                id="enclosure_id"
                                as="select"
                                className="form-select"

                            >
                                <option value="" hidden>
                                    -- Seleccione estado --
                                </option>
                                <option value={1}>Bueno</option>
                                <option value={2}>Regular</option>
                                <option value={3}>Malo</option>
                                <option value={0}>No aplica</option>
                            </Field>
                            <ErrorMessage name={`properties[${i}].status_property`} />
                        </div>

                        {show_upload && (
                            <div className="col-12 col-lg-6 col-md-6">
                                <label htmlFor="form-select" className="form-label">
                                    Imagen
                                </label>
                                <Field
                                    name={`properties[${i}].image`}
                                    component={DocumentModal}
                                    file_type="img"
                                    btn_label="Adjuntar"
                                />
                                <ErrorMessage name={`properties[${i}].image`} />
                            </div>
                        )}

                        <div className="col-12 col-lg-6 col-md-6">
                            <label htmlFor="enclosure_obligations_id" className="form-label">
                                Observaciones anteriores de {property.name}
                            </label>
                            <Field
                                as="textarea"
                                className="form-control"
                                id="enclosure_obligations_id"
                                value={old_p?.observation}
                                autoComplete="off"
                                maxLength={250}
                                style={{ height: '20px' }}
                                disabled
                            />
                            <ErrorMessage/>
                        </div>
                        <div className="col-12 col-lg-6 col-md-6">
                            <label htmlFor="enclosure_obligations_id" className="form-label">
                                Observaciones {property.name}
                            </label>
                            <Field
                                as="textarea"
                                className="form-control"
                                id="enclosure_obligations_id"
                                name={`properties[${i}].observation`}
                                autoComplete="off"
                                maxLength={250}
                                style={{ height: '20px' }}
                            />
                            <ErrorMessage name="enclosure_obligations" withCount max={250} />
                        </div>
                    </div>
                );
            })}

            <div className="row">
                <div className="col">
                    <label htmlFor="observations_id" className="form-label">
                        Observeciones
                    </label>
                    <Field
                        as="textarea"
                        className="form-control"
                        id="observations_id"
                        name="observations"
                        placeholder="Agrega observaciones sobre este bien inmueble"
                        autoComplete="off"
                        maxLength={240}
                    />
                    <ErrorMessage name="observations" withCount max={240} />
                </div>
            </div>
        </>
    );
};

export default InspectionPhysicalForm;
