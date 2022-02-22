import { Field } from 'formik';
import React, { FC } from 'react';
import ErrorMessage from '../../../../../utils/ui/error_messge';
import LocationModal from './../../../../../utils/components/Location/LocationModal';
interface FormProps {
    formik: any;
}
const BeneficiaryForm: FC<FormProps> = ({ formik }) => {
    return (
        <>
            <div className="row">
                <div className="col-12 col-lg-3 col-md-6">
                    <label htmlFor="population_id" className="form-label">
                        Población<span className="text-danger">*</span>
                    </label>
                    <Field
                        type="text"
                        className="form-control"
                        id="population_id"
                        name="population"
                        aria-describedby="emailHelp"
                        autoComplete="off"
                    />
                    <ErrorMessage name="population" />
                </div>
                <div className="col-12 col-lg-3 col-md-6">
                    <label htmlFor="benefited_sector_id" className="form-label">
                        Sector Beneficiado<span className="text-danger">*</span>
                    </label>
                    <Field
                        type="text"
                        className="form-control"
                        id="benefited_sector_id"
                        name="benefited_sector"
                        aria-describedby="emailHelp"
                        placeholder=""
                        autoComplete="off"
                    />
                    <ErrorMessage name="benefited_sector" />
                </div>
                <div className="form-group col-12 col-lg-6">
                    <label htmlFor="location_id" className="form-label">
                        Comuna Y Barrio<span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                        <Field
                            name="location"
                            id="location_id"
                            type="text"
                            className="form-control"
                            disabled
                            value={`${formik.values.location.commune || ""}, ${formik.values.location.neighborhood || ""}`}
                        />
                        <div className="input-group-prepend">
                            <LocationModal
                                // disabled
                                view="comodato"
                                onSave={async (values: any) => {
                                    console.log('valores modal', values);
                                    formik.setFieldValue('location.commune', `${values.commune_name}`, false);
                                    formik.setFieldValue('location.neighborhood', `${values.neighborhood_name}`, false);
                                    formik.setFieldValue('location.beneficiary_location_id', `${values.id}`, false);
                                    return Promise.resolve();
                                }}
                            />
                        </div>
                    </div>
                    <ErrorMessage name="location" />
                </div>
            </div>
        </>
    );
};

export default BeneficiaryForm;
