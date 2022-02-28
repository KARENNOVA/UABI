import React, { FC, MutableRefObject } from 'react';
import { Form, Formik, FormikProps, FormikValues } from 'formik';
import { Card } from '../../../utils/ui';
import * as Yup from 'yup';
import Dataformuser from './Dataformuser';
import DataformRole from './DataformRole';



interface IUserFormPros {
    user?: any;
    user_roles?: any[];
    user_permits?: any[];
    disabled?: boolean;
    type?: 'view' | 'create' | 'edit';
    type_rol?: 'assign'
    dependencies?: any;
    onSubmit: (values, actions?) => Promise<any>;
    innerRef?: MutableRefObject<FormikProps<FormikValues>>;
}

const FormUserprueba: FC<IUserFormPros> = ({ type, disabled, onSubmit, user, innerRef, type_rol, dependencies, user_roles, user_permits }) => {
    const initial_values = {
        user: {
            id_number: '',
            password: '',
            ...(user ? { id_number: user.id_number } : {}),
        },
        detailsUser: {
            id: '',
            society_type: '',
            entity_type: '',
            id_type: '',
            names: { firstName: '', lastName: '' },
            surnames: { firstSurname: '', lastSurname: '' },
            email: '',
            location: '',
            str_location: user?.location?.address || "",
            cellphone_number: '',
            phone_number: '',
            phone_number_ext: '',
            gender: '',
            dependency: user?.dependencies?.dependency?.dependency || '',
            subdependency: user?.dependencies?.subdependency?.subdependency || '',
            cost_center_id: '',
            ...user,
        },
        permits: [],
        roles: user_roles ? user_roles.map((rol) => rol.id) : []


    };

    const schema = Yup.object().shape({
        user: Yup.object().shape({
            id_number: Yup.string().required('Campo obligatorio'),
            password: Yup.string()
                .matches(/(?=.*[0-9])/, 'debe contener almenos 1 numero')
                .matches(/(?=.*[@$!%*?&,.#])/, 'debe contener almenos 1 caracter special')
                .min(8, 'minimo 8 caracteres'),
        }),
        detailsUser: Yup.object().shape({
            // location: Yup.object().required('Campo obligatorio'),
            society_type: Yup.string().required('Campo obligatorio'),
            entity_type: Yup.string().required('Campo obligatorio'),
            id_type: Yup.string().required('Campo obligatorio'),
            names: Yup.object().shape({
                firstName: Yup.string().required('Campo obligatorio'),
            }),
            surnames: Yup.object().shape({
                firstSurname: Yup.string().required('Campo obligatorio'),
            }),
            email: Yup.string().email('email invalido').required('Campo obligatorio'),
            cellphone_number: Yup.number()
                .required('Campo obligatorio')
                .min(9999, 'El minimo es 5 caracteres')
                .max(99999999999999999999, 'El maximo 20 es caracteres'),
            phone_number: Yup.number()
                .required('Campo obligatorio')
                .min(9999, 'El minimo es 5 caracteres')
                .max(99999999999999999999, 'El maximo 20 es caracteres'),
            gender: Yup.string().required('Campo obligatorio'),
            dependency: Yup.string()
                .when('entity_type', {
                    is: 'P',
                    then: Yup.string().required('Campo obligatorio'),
                })
                .nullable(),
            subdependency: Yup.string()
                .when('entity_type', {
                    is: 'P',
                    then: Yup.string().required('Campo obligatorio'),
                })
                .nullable(),
        }),
    });

    const submit = (values, actions) => {
        onSubmit(values, actions)
            .then(() => {
                actions.setSubmitting(false);
            })
            .catch(() => actions.setSubmitting(false));

        //type === 'create' && history.push(`/users/permits/${initial_values.id}/`);
    };

    return (
        <Formik
            enableReinitialize
            onSubmit={submit}
            innerRef={innerRef}
            initialValues={initial_values}
            validationSchema={schema}
        >
            {(formik) => {
                return (
                    <Form>
                        <Card
                            title="Información usuario"
                        >
                            <Dataformuser
                                // user={user}
                                disabled={disabled}
                                type={type}
                                formik={formik}
                                dependencies={dependencies}
                            />
                        </Card>
                        <Card
                            title="Asignar Permisos A Usuario"
                        >
                            <DataformRole
                                formik={formik}
                                type_rol={type_rol}
                                user_roles={user_roles}
                                user_permits={user_permits}
                            />
                        </Card>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default FormUserprueba;
