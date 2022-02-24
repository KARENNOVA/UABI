import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Select from '../../../utils/ui/select';
import { FC, useEffect, useState } from 'react';


interface DispositionFormPros {
    realEstate: any;
    onTypeDispositionChange?: (value) => void;
    precontractual?: any;
    dispositionType: string;
}

export const FormTypeDisposition: FC<DispositionFormPros> = ({ realEstate, onTypeDispositionChange, precontractual, dispositionType }) => {

    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        if(precontractual) {
            onTypeDispositionChange(precontractual?.type_disposition)
            setIsDisabled(true)
        }else {
            setIsDisabled(false)
        }
    }, [onTypeDispositionChange, precontractual]);


    let initialValues = {
        destination_type: realEstate?.destination_type,
        disposition_type: realEstate?.disposition_type === null ? "" : realEstate?.disposition_type,
        availability: precontractual ? dispositionType : "",
    };


    // console.log(initialValues)

    const submit = (values /*, actions*/) => {
        console.log(values);
    };

    const schema = Yup.object().shape({
    });
    let dispositions = [];
    if(initialValues.destination_type === "FISCAL" && initialValues.disposition_type === "Misional" ){
        dispositions = [
            "Dependencias"
        ]
    } else if(initialValues.destination_type === "FISCAL" && initialValues.disposition_type === "Misional social" ){
        dispositions = [
            "Dependencias",
            "Comodato"
        ]

    }else if (initialValues.destination_type === "FISCAL" && initialValues.disposition_type === "Inversión") {
            dispositions = [
                "Arrendamiento",
                "Ventas"
            ]

    }else if (initialValues.destination_type === "FISCAL" && initialValues.disposition_type === "Inversión Social") {
        dispositions = [
            "Arrendamiento"
        ]
    }else if(initialValues.destination_type === "PÚBLICO" && initialValues.disposition_type === "Administración") {
        dispositions = [
            "AEP"
        ]
    } else if (initialValues.destination_type === "PÚBLICO" && initialValues.disposition_type === "Mantenimiento") {
        dispositions = [
            "MTEP"
        ]
    } else if (initialValues.destination_type === "PÚBLICO" && initialValues.disposition_type === "Aprovechamiento") {
        dispositions = [
            "APRED"
        ]
    }
    // dispositions = [
    //     "Dependencias",
    //     "Comodato",
    //     "arrendamiento",
    //     "ventas",
    //     "AEP",
    //     "MTEP",
    //     "APRED",
    //     "servidumbre",
    //     "autorizaciones"
    // ]

    return (
        <Formik enableReinitialize onSubmit={submit} initialValues={initialValues} validationSchema={schema}>
            <Form>
                <div className="row">
                    <div className="col-12 col-lg-3 col-md-6">
                        <label htmlFor="destination_type_id" className="form-label">
                            Tipo de uso
                        </label>
                        <Field
                        type="text"
                        id="destination_type_id"
                        name="destination_type"
                        className="form-control"
                        disabled
                        />
                    </div>
                    <div className="col-12 col-lg-3 col-md-6">
                        <label htmlFor="disposition_type_id" className="form-label">
                            Tipo de activo
                        </label>
                        <Field
                            type="text"
                            id="disposition_type_id"
                            name="disposition_type"
                            className="form-control"
                            disabled
                        />
                    </div>
                    <div className="col-12 col-lg-6 col-md-12">
                        <label htmlFor="availability_id" className="form-label">
                            Tipo disposición
                        </label>
                        <Field
                            component={Select}
                            name="availability"
                            id="availability_id"
                            className="w-100"
                            disabled={isDisabled}
                            options={dispositions.map(real => ({ id: real, name: real }))}
                            extra_on_change={onTypeDispositionChange}
                        />
                    </div>
                </div>
            </Form>
        </Formik>
    );
};
