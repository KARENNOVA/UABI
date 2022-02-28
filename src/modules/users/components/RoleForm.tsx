import { FC, MutableRefObject, useEffect } from 'react';
import { Field, Formik, Form, FormikProps, FormikValues } from 'formik';
import ErrorMessage from '../../../utils/ui/error_messge';
import { useState } from 'react';
import { Popover, Transfer } from 'antd';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { actions } from '../redux';
import { IPermitAttributes } from '../../../utils/interfaces/permits';
import Select from '../../../utils/ui/select';
import union from 'lodash/union';
import difference from 'lodash/difference';

interface IUserFormPros {
    user_roles?: any[];
    user_permits?: any[];
    rol?: any;
    disabled?: boolean;
    type?: 'view' | 'create' | 'edit' | 'assign';
    onSubmit?: (values, actions?) => Promise<any>;
    innerRef?: MutableRefObject<FormikProps<FormikValues>>;
}

const RoleForm: FC<IUserFormPros> = ({ rol, disabled, type, user_roles, user_permits, onSubmit, innerRef }) => {
    const permitsAll: IPermitAttributes[] = useSelector((store: any) => store.users.permits.value);
    const roles: any[] = useSelector((store: any) => store.users.roles.value);
    const dispatch = useDispatch();
    const [targetKeys, setTargetKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [mockData, setMockData] = useState([]);
    const [permits_rol_ids, set_permits_rol_ids] = useState([]);

    useEffect(() => {
        dispatch(actions.getPermits());
        if (type === 'assign') {
            dispatch(actions.getRolesList({}));
        }
    }, []);

    useEffect(() => {
        if (user_roles?.length > 0) {
            const role_ids = user_roles.map((rol) => rol.id);
            update_permits_rol(role_ids);
        }
    }, [user_roles]);

    useEffect(() => {
        if (rol?.permits?.length > 0) {
            setTargetKeys(rol?.permits);
        }
    }, [rol]);

    useEffect(() => {
        let allPermits = [];
        let permitUser = [];
        if (permitsAll?.length > 0) {
            allPermits = permitsAll?.map((per: any) => ({
                key: per.id,
                title: <Popover content={<span>{per.description}</span>} title={per.name}>
                    <span>{per.name}</span>
                </Popover>,
            }));
        }
        if (user_permits?.length > 0) {
            permitUser = user_permits?.map((per: any) => ({
                key: per.id,
                title: <Popover content={<span>{per.description}</span>} title={per.name}>
                    <span>{per.name}</span>
                </Popover>,
            }));
        }
        const initialTargetKeys = permitUser.map((item) => item.key);
        setMockData(allPermits);
        setTargetKeys(initialTargetKeys);
    }, [permitsAll, user_permits]);

    const get_permits_rol_ids_list = (rol_ids) => {
        return Promise.all(rol_ids.map((id) => dispatch(actions.getRole(id)))).then((res) => {
            let ids = res.map((subres: any) => subres.permits.map((a) => a.id));
            return union(...ids);
        });
    };

    const update_permits_rol = (rol_ids) => {
        return get_permits_rol_ids_list(rol_ids).then((ids: number[]) => {
            if (mockData.length > 0) {
                const data = mockData.map((permit) => {
                    permit.disabled = ids.includes(permit.key);
                    return permit;
                });
                set_permits_rol_ids(ids);
                setMockData(data);
            }
            return ids;
        });
    };

    const remove_permits_rol = (rol_ids) => {
        return get_permits_rol_ids_list(rol_ids).then((ids) => {
            setTargetKeys(difference(targetKeys, ids));
        });
    };

    const add_permits_rol = (rol_ids) => {
        return get_permits_rol_ids_list(rol_ids).then((ids) => {
            setTargetKeys(union(targetKeys, ids));
        });
    };

    const initialValues = {
        name: '',
        permits: [],
        ...rol,
        ...(user_roles ? { roles_to_assign: user_roles.map((rol) => rol.id) } : {}),
    };

    const onChange = (nextTargetKeys /*, direction, moveKeys*/) => {
        setTargetKeys(nextTargetKeys);
    };

    const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };

    const submit = (_values, actions) => {
        const permitUser = [];
        targetKeys.map((key) => permitUser.push(Number(key)));
        const values = {
            ..._values,
            permits: permitUser,
        };
        if (type === 'assign') {
            delete values.name;
            values.permits = difference(values.permits, permits_rol_ids);
        }
        onSubmit(values, actions).then(() => {
            actions.setSubmitting(false);
            actions.resetForm();
        });
    };

    // const schema = Yup.object().shape({
    //     name: Yup.string().required('Campo obligatorio'),
    // });

    return (
        <Formik enableReinitialize onSubmit={submit} initialValues={initialValues} innerRef={innerRef}>
            {({ isSubmitting }) => {
                return (
                    <Form>
                        <div className="row">
                            {type !== 'assign' && (
                                <div className="col-12 col-lg-6 col-md-6">
                                    <label htmlFor="name" className="form-label">
                                        Rol
                                    </label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Nuevo Rol"
                                        name="name"
                                        autoComplete="off"
                                        disabled={disabled}
                                    />
                                    <ErrorMessage name="name" />
                                </div>
                            )}
                            {type === 'assign' && (
                                <div className="col-6">
                                    <label htmlFor="assign_id" className="form-label">
                                        Rol
                                    </label>
                                    <Field
                                        component={Select}
                                        name="roles_to_assign"
                                        id="assign_id"
                                        disabled={disabled}
                                        placeholder="Selecciona una Dependencia"
                                        options={roles?.map((rol) => ({ id: rol.id, name: rol.role_name })) || []}
                                        showSearch
                                        mode="multiple"
                                        extra_on_change={(values, prev) => {
                                            update_permits_rol(values).then((/*ids*/) => {
                                                if (prev.length > values.length) {
                                                    const remove_ids = difference(prev, values);
                                                    remove_permits_rol(remove_ids);
                                                } else {
                                                    add_permits_rol(values);
                                                }
                                            });
                                        }}
                                        filterOption={(input, option) => {
                                            return option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                        }}
                                    />
                                    <ErrorMessage name="name" />
                                </div>
                            )}
                            <div className="col-12">
                                <label htmlFor="permits" className="form-label">
                                    Permisos
                                </label>
                                <Transfer
                                    disabled={disabled}
                                    dataSource={mockData}
                                    titles={['no permitidos', 'permitidos']}
                                    locale={{ itemUnit: 'permisos', itemsUnit: 'permisos' }}
                                    targetKeys={targetKeys}
                                    selectedKeys={selectedKeys}
                                    onChange={onChange}
                                    onSelectChange={onSelectChange}
                                    render={(item) => item.title}
                                    listStyle={{
                                        width: 250,
                                        height: 300,
                                    }}
                                />
                            </div>
                        </div>

                        {!innerRef && (
                            <div className="row justify-content-end">
                                <div className="col text-end">
                                    {type !== 'view' && (
                                        <button className="btn btn-primary my-3" disabled={isSubmitting || disabled}>
                                            {type === 'assign' ? 'Asignar' : 'Guardar'}
                                            {isSubmitting && (
                                                <i
                                                    className="fa fa-spinner fa-spin"
                                                    style={{ fontSize: 12, marginLeft: 4, color: '#fff' }}
                                                />
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </Form>
                );
            }}
        </Formik>
    );
};

export default RoleForm;
