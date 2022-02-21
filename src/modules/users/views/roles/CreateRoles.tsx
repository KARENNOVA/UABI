import React, {useRef} from 'react';
import { Card } from '../../../../utils/ui';
import { useHistory } from 'react-router-dom';
import RoleForm from './../../components/RoleForm';
import { useDispatch } from 'react-redux';
import { actions } from '../../redux';
import {FormikProps, FormikValues} from "formik";

export const CreateRoles = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const form = useRef<FormikProps<FormikValues>>();
    const createUser = async (values) => {
        await dispatch(actions.createRole(values));
    };
    return (
        <div className="h-100 d-flex flex-column">
            <div className="flex-fill overflow-auto">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <Card title="Crear Rol">
                                <RoleForm
                                    type="create"
                                    innerRef={form}
                                    onSubmit={(values) => {
                                        return createUser(values);
                                    }}
                                />
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="bg-white d-flex flex-row justify-content-between"
                style={{ padding: 16, borderTop: '1px solid #ccc' }}
            >
                <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => {
                        history.goBack();
                    }}
                >
                    Atras
                </button>
                <div className="flex-fill" />
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                        form.current?.submitForm();
                    }}
                >
                    Guardar
                </button>
            </div>
        </div>
    );
};
