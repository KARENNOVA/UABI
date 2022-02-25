// export {default as Insurability} from './CreatePolicy';
import { useDispatch } from 'react-redux';
import { IPolicyAttributes } from '../../../../utils/interfaces';
import { useSelector } from 'react-redux';
import { actions } from '../../redux';
import { useEffect } from 'react';
import moment from 'moment';

import { Link, Card, Table as UiTable } from '../../../../utils/ui';
import FilterForm from '../../../../utils/ui/filter_form';
import { guards } from '../../routes';


const Policies = () => {
    const dispatch = useDispatch();
    const policies: IPolicyAttributes[] = useSelector((store: any) => store.insurability.policies.value);
    const loading: boolean = useSelector((store: any) => store.insurability.policies.loading);
    const { total_results } = useSelector((store: any) => store.insurability.policies.pagination);
    const change_page = (page, pageSize) => {
        dispatch(actions.getPolicies({ page, pageSize, with: 'pagination' }));
    };
    const user = useSelector((store: any) => store.auth.user);
    const aux_user = {
        ...user,
        permits: user?.permits.map((a) => a.name) || [],
        roles: user?.roles.map((a) => a.name) || [],
    };

    useEffect(() => {
        dispatch(actions.clearPolicies());
        // dispatch(actions.getPolicies({ with: 'pagination' }));
    }, []);

    const filter = async (_filters, _) => {
        await dispatch(actions.getPolicies({ page: 1, with: 'pagination', ..._filters }));
    };

    const ver = {
        title: 'Ver',
        dataIndex: 'id',
        align: 'center' as 'center',
        render: (id) => {
            return (
                <Link
                    to={`/insurabilities/policy/${id}/`}
                    name=""
                    avatar={false}
                    icon={<i className="fa fa-eye" aria-hidden="true" />}
                />
            );
        },
    }

    const editar = {
        title: 'Editar',
        dataIndex: 'id',
        align: 'center' as 'center',
        render: (id) => {
            return (
                <Link
                    to={`/insurabilities/policy/edit/${id}/`}
                    name=""
                    avatar={false}
                    icon={<i className="fa fa-pencil" aria-hidden="true" />}
                />
            );
        },
    }

    const acciones = {
        title: 'Acciones',
        fixed: true,
        children: [],
    }

    const table_columns: any = [
        {
            title: 'ID',
            dataIndex: 'id',
            align: 'center' as 'center',
        },
        {
            title: 'Compañías aseguradoras',
            dataIndex: 'insurance_companies',
            align: 'left' as 'left',
            responsive: ['md'],
            render: (date) => date.map((d) => d.nit).join(' - '),
        },
        {
            title: 'Número póliza',
            dataIndex: 'policy_number',
            align: 'center' as 'center',
        },
        {
            title: 'Bienes inmuebles',
            dataIndex: 'real_estates',
            responsive: ['md'],
            align: 'center' as 'center',
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            align: 'center' as 'center',
        },
        {
            title: 'Fecha de inicio',
            dataIndex: 'vigency_start',
            align: 'center' as 'center',
            responsive: ['md'],
            render: (dates) => {
                const tmpDate = new Date(parseInt(dates));
                // noinspection UnnecessaryLocalVariableJS
                return moment(tmpDate).format('MM/DD/YYYY');
            },
        },
        {
            title: 'Fecha finalización',
            dataIndex: 'vigency_end',
            align: 'center' as 'center',
            responsive: ['md'],
            render: (dates) => {
                const tmpDate = new Date(parseInt(dates));
                return moment(tmpDate).format('MM/DD/YYYY');
            },
        },
        {
            title: 'Creada por',
            dataIndex: 'audit_trail',
            align: 'center' as 'center',
            responsive: ['md'],
            render: (data) => data.created_by,
        },
    ];

    if (guards.detailPolicy({ user: aux_user })) {
        acciones.children.push(ver)
    }
    if (guards.editPolicy({ user: aux_user })) {
        acciones.children.push(editar)
    }
    if (acciones.children.length > 0) {
        table_columns.push(acciones)
    }

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <Card
                        title="Registro de pólizas"
                        extra={
                            <>
                                {guards.createPolicy({ user: aux_user }) && (
                                    <Link to="/insurabilities/policy/create/" name="Crear" iconText="+" />
                                )}
                            </>
                        }
                    >
                        <div className="row justify-content-between">
                            <div className="col-12 col-lg-5 d-flex">
                                <div className="col-12 col-md-6 col-lg-6">
                                    <FilterForm
                                        filters={[
                                            { key: 'policy_number', name: 'Número póliza' },
                                            { key: 'policy_type', name: 'Tipo de póliza' },
                                            { key: 'registry_number', name: 'Matrícula' },
                                        ]}
                                        onSubmit={filter}
                                    />
                                </div>
                            </div>
                        </div>
                        <UiTable
                            columns={table_columns}
                            items={policies}
                            with_pagination
                            count={total_results}
                            loading={loading}
                            change_page={change_page}
                        />
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Policies;
