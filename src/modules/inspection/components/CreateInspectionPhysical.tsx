import React, { FC } from 'react';
import { Card } from '../../../utils/ui';
import InspectionPhysicalForm from './InspectionPhysicalForm';
import TableInspectionPhysycal from './TableInspectionPhysycal';
import ErrorMessage from '../../../utils/ui/error_messge';
import { Field, Form, Formik } from 'formik';
import { IPhysicalinspection, NewInspection } from '../custom_types';
import { values } from 'lodash';
interface CreateInspectionPhysicalProps {
    inspection: NewInspection;
    physical_inspection: IPhysicalinspection;
    innerRef: any;
    onSubmit: (values) => void;
}
const CreateInspectionPhysical: FC<CreateInspectionPhysicalProps> = ({
    inspection,
    physical_inspection,
    innerRef,
    onSubmit,
}) => {
    const has_public_services = (public_services) => {
        public_services = public_services || [];
        return (
            public_services.length > 0 &&
            public_services.every((ps) => ps.name && ps.subscriber && ps.accountant && ps.status)
        );
    };
    const initial_values = {
        public_services: has_public_services(physical_inspection?.public_services)
            ? physical_inspection?.public_services
            : has_public_services(inspection?.physical_inspection.public_services)
            ? inspection?.physical_inspection.public_services
            : physical_inspection.public_services,
        old_properties: inspection?.physical_inspection?.properties,
        properties: [
            {
                name: 'Pintura exterior',
                status_property: '',
                observation: '',
                accountant: '',
                status: '',
            },
            {
                name: 'Cubierta o techo',
                status_property: '',
                observation: '',
                accountant: '',
                status: '',
            },
            {
                name: 'Pisos',
                status_property: '',
                observation: '',
                accountant: '',
                status: '',
            },
            {
                name: 'Enchapes de baño y/o cocina',
                status_property: '',
                observation: '',
                accountant: '',
                status: '',
            },
            {
                name: 'Pintura interior',
                status_property: '',
                observation: '',
                accountant: '',
                status: '',
            },
            {
                name: 'Ventanas',
                status_property: '',
                observation: '',
                accountant: '',
                status: '',
            },
            {
                name: 'Puerta principal',
                status_property: '',
                observation: '',
                accountant: '',
                status: '',
            },
            {
                name: 'Cerraduras puerta principal',
                status_property: '',
                observation: '',
                accountant: '',
                status: '',
            },
            {
                name: 'Puertas interiores',
                status_property: '',
                observation: '',
                accountant: '',
                status: '',
            },
            {
                name: 'Cerraduras puertas interiores',
                status_property: '',
                observation: '',
                accountant: '',
                status: '',
            },
            {
                name: 'Rejas de seguridad',
                status_property: '',
                observation: '',
                accountant: '',
                status: '',
            },
            {
                name: 'Paredes',
                status_property: '',
                observation: '',
                accountant: '',
                status: '',
            },
            {
                name: 'Escaleras',
                status_property: '',
                observation: '',
                accountant: '',
                status: '',
            },
            {
                name: 'Aparatos sanitarios',
                status_property: '',
                observation: '',
                accountant: '',
                status: '',
            },
            {
                name: 'Orinales',
                status_property: '',
                observation: '',
                accountant: '',
                status: '',
            },
            {
                name: 'Griferías y abastos',
                status_property: '',
                observation: '',
                accountant: '',
                status: '',
            },
            {
                name: 'Lavamanos',
                status_property: '',
                observation: '',
                accountant: '',
                status: '',
            },
            {
                name: 'Rejillas desagüe',
                status_property: '',
                observation: '',
                accountant: '',
                status: '',
            },
            {
                name: 'Sistema eléctronico',
                status_property: '',
                observation: '',
                accountant: '',
                status: '',
            },
            {
                name: 'Acometidas eléctricas',
                status_property: '',
                observation: '',
                accountant: '',
                status: '',
            },
            {
                name: 'Cerramiento',
                status_property: '',
                observation: '',
                accountant: '',
                status: '',
            },
            {
                name: 'Fachada',
                status_property: '',
                observation: '',
                accountant: '',
                status: '',
            },
        ],
        observations: inspection?.physical_inspection?.observations || physical_inspection?.observations || '',
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <Formik
                        enableReinitialize
                        onSubmit={(values, form) => {
                            onSubmit(values);
                            form.setSubmitting(false);
                        }}
                        initialValues={initial_values}
                        innerRef={innerRef}
                    >
                        {(formik) => {
                            return (
                                <Form>
                                    <TableInspectionPhysycal obs={formik.values.observations} />
                                    <Card title="Servicios Publicos">
                                        {formik.values.public_services.map((service, i) => (
                                            <div className="row" key={i}>
                                                <div className="form-group col-3">
                                                    <label htmlFor="enclosure_prev_id" className="form-label">
                                                        Servicio
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        id="enclosure_prev_id"
                                                        className="form-control"
                                                        disabled={true}
                                                        name={`public_services[${i}].name`}
                                                        autoComplete="off"
                                                    />
                                                    <ErrorMessage name={`public_services[${i}].name`} />
                                                </div>
                                                <div className="form-group col-3">
                                                    <label htmlFor="enclosure_prev_id" className="form-label">
                                                        N° de Suscriptor
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        id="enclosure_prev_id"
                                                        className="form-control"
                                                        name={`public_services[${i}].subscriber`}
                                                        autoComplete="off"
                                                    />
                                                    <ErrorMessage name={`public_services[${i}].subscriber`} />
                                                </div>
                                                <div className="form-group col-3">
                                                    <label htmlFor="enclosure_prev_id" className="form-label">
                                                        N° de Contador
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        id="enclosure_prev_id"
                                                        className="form-control"
                                                        name={`public_services[${i}].accountant`}
                                                        autoComplete="off"
                                                    />
                                                    <ErrorMessage name={`public_services[${i}].accountant`} />
                                                </div>
                                                <div className="form-group col-3">
                                                    <label htmlFor="enclosure_id" className="form-label">
                                                        Estado
                                                    </label>
                                                    <Field
                                                        name={`public_services[${i}].status`}
                                                        id="enclosure_id"
                                                        as="select"
                                                        className="form-select"
                                                    >
                                                        <option value="" hidden>
                                                            -- Seleccione estado --
                                                        </option>
                                                        <option value={1}>Activo</option>
                                                        <option value={2}>Inactivo</option>
                                                        <option value={3}>No Aplica</option>
                                                    </Field>
                                                    <ErrorMessage name={`public_services[${i}].status`} />
                                                </div>
                                            </div>
                                        ))}
                                    </Card>
                                    <Card
                                        title={
                                            <>
                                                <div className="row">
                                                    <b className="col-3">Estado anterior</b>
                                                    <b className="col-4">Estado actual del bien inmueble</b>
                                                </div>
                                            </>
                                        }
                                    >
                                        <InspectionPhysicalForm formik={formik} />
                                    </Card>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default CreateInspectionPhysical;
