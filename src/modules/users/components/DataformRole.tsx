import { Transfer } from 'antd';
import { Field } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IPermitAttributes } from '../../../utils/interfaces/permits';
import ErrorMessage from '../../../utils/ui/error_messge';
import Select from '../../../utils/ui/select';
import { actions } from '../redux';
import union from 'lodash/union';
import difference from 'lodash/difference';

interface IUserFormPros {
    user_roles?: any[];
    user_permits?: any[];
    rol?: any;
    disabled?: boolean;
    type_rol?: 'assign';
    formik?: any;
}

const DataformRole: FC<IUserFormPros> = ({ disabled, type_rol, user_roles, user_permits, rol, formik}) => {
    // console.log(user_permits)
    const permitsAll: IPermitAttributes[] = useSelector((store: any) => store.users.permits.value);

    const roles: any[] = useSelector((store: any) => store.users.roles.value);
    const dispatch = useDispatch();
    const [targetKeys, setTargetKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [mockData, setMockData] = useState([]);
    const [permits_rol_ids, set_permits_rol_ids] = useState([]);

    useEffect(() => {
        dispatch(actions.getPermits());
        if (type_rol === 'assign') {
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
        const permits = mockData.filter(permit => {
            const isInTargetKeys = targetKeys.includes(permit.key);
            const isDisabled = permit.disabled;
            return isInTargetKeys && !isDisabled
        } ).map(p => p.key)
        formik.setFieldValue('permits', permits, false);
    }, [targetKeys]);

    console.log(mockData)




    useEffect(() => {
        let allPermits = [];
        if (permitsAll?.length > 0) {
            allPermits = permitsAll?.map((per: any) => ({
                key: per.id,
                title: per.name,
                children: per.description
            }));
        }
        setMockData(allPermits);
    }, [permitsAll]);


    useEffect(() => {
        let permitUser = [];
        if (user_permits?.length > 0) {
            permitUser = user_permits?.map((per: any) => ({
                key: per.id,
                title: per.name,
                children: per.description
            }));
        }
        const initialTargetKeys = permitUser.map((item) => item.key);
        setTargetKeys(initialTargetKeys);
    }, [user_permits]);


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
                // debugger;
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

    const onChange = (nextTargetKeys /*, direction, moveKeys*/) => {
        setTargetKeys(nextTargetKeys);

    };

    const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };

    return (
        <div className="row">
            {type_rol !== 'assign' && (
                <div className="col-12 col-lg-6">
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
            {type_rol === 'assign' && (
                <div className="col-12 col-lg-6">
                    <label htmlFor="assign_id" className="form-label">
                        Rol
                    </label>
                    <Field
                        component={Select}
                        name="roles"
                        id="assign_id"
                        disabled={disabled}
                        placeholder=""
                        options={roles?.map((rol) => ({ id: rol.id, name: rol.role_name })) || []}
                        showSearch
                        mode="multiple"
                        extra_on_change={(values, prev) => {
                            prev = prev || [];
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
                    <ErrorMessage name="roles" />
                </div>
            )}
            <div className="col-12 ">
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
                    className="tree-transfer"
                    render={(item) => item.title}
                    listStyle={{
                        width: 250,
                        height: 300,
                    }}
                />
            </div>
        </div>
    );
};

export default DataformRole;
