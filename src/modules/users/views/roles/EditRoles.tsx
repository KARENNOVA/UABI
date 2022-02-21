import React, {useEffect, useRef} from 'react';
import { Card } from '../../../../utils/ui';
import { useHistory, useParams } from 'react-router-dom';
import RoleForm from './../../components/RoleForm';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux';
import {FormikProps, FormikValues} from "formik";

interface IParams {
    id: string;
}
export const EditRoles = () => {
    const { id } = useParams<IParams>();
    const history = useHistory();
    const dispatch = useDispatch();
    const form = useRef<FormikProps<FormikValues>>();
    const role: any = useSelector((store: any) => store.users.rol.value);

    useEffect(() => {
        dispatch(actions.getRole(Number(id)));
    }, []);

    const finalRole = {
        name: role?.name,
        permits: role?.permits?.map((a) => a.id),
    };

    const editRol = async (values) => {
        await dispatch(actions.updateRole(values, id));
        history.push(`/roles/${id}/`)
    };
    return (
        <div className="h-100 d-flex flex-column">
            <div className="flex-fill overflow-auto">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <Card title="Editar Rol">
                                <RoleForm
                                    rol={finalRole}
                                    type="edit"
                                    innerRef={form}
                                    onSubmit={(values) => {
                                        return editRol(values);
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
