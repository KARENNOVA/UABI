import { useEffect, useState /*, useState*/ } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../redux';
import { Link, Card, Table as UiTable } from '../../../../utils/ui';
import {swal, swal_warning} from '../../../../utils';
import FilterForm from "../../../../utils/ui/filter_form";
import { guards } from '../../routes';

const InsuranceCompanies = () => {
    const dispatch = useDispatch();
    const insurance_companies: any = useSelector((store: any) => store.insurability.companies.value);
    const loading: boolean = useSelector((store: any) => store.insurability.companies.loading);
    const { total_results } = useSelector((store: any) => store.insurability.companies.pagination);
    const [filters, set_filters] = useState(null);
    const user = useSelector((store: any) => store.auth.user);
    const aux_user = {
        ...user,
        permits: user?.permits.map((a) => a.name) || [],
        roles: user?.roles.map((a) => a.name) || [],
    };
    const filter = async (_filters, _) => {
        set_filters(_filters);
        await dispatch(actions.get_all_companies(_filters));
    };

    const change_page = (page, pageSize) => {
        dispatch(actions.get_all_companies({ page, pageSize, ...filters }));
    };

    const deleteInsuranceCompany = (id) => async () => {
        let res: any;
        if (id !== '' && id !== undefined) {
            // res = await dispatch(actions.getRealEstatesByInsuranceCompany(id));
        }
        if (res && res.length !== 0) {
            const result = await swal_warning.fire({
                icon: 'warning',
                title: '¡Precaución!',
                text: `La Compañia contiene ${res?.length || ''} valores asociados.\n\.`,
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Continuar',
                denyButtonText: `Cancelar`,
            });

            if (result.isConfirmed) {
                swal_warning.fire({
                    icon: 'info',
                    title: '¡Última oportunidad!',
                    text: '¿Está seguro que quiere inactivar la compañia?',
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: 'Continuar',
                    denyButtonText: `Cancelar`,
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        await dispatch(actions.delete_company(id));
                        await filter({}, null);
                    } else if (result.isDenied) {
                        swal.close();
                    }
                });
            } else if (result.isDenied) {
                swal.close();
            }
        } else {
            const result = await swal_warning.fire({
                icon: 'warning',
                title: '¿Está seguro?',
                text: '¿Está seguro que quiere inactivar la compañia?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Continuar',
                denyButtonText: `Cancelar`,
            });

            if (result.isConfirmed) {
                await dispatch(actions.delete_company(id));
                await filter({}, null);
            } else if (result.isDenied) {
                swal.close();
            }
        }
    };

    const acciones = {
        title: 'Acciones',
        fixed: true,
        children: [],
    }

    const ver = {
        title: 'Ver',
        dataIndex: 'id',
        align: 'center' as 'center',
        render: (id) => {
            return (
                <Link
                    to={`/insurabilities/company/${id}/`}
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
                    to={`/insurabilities/company/edit/${id}/`}
                    name=""
                    avatar={false}
                    icon={<i className="fa fa-pencil" aria-hidden="true" />}
                />
            );
        },
    }

    const eliminar = {
        title: 'Desactivar',
        dataIndex: 'id',
        align: 'center' as 'center',
        render: (id) => {
            return (
                <div className="text-danger" onClick={deleteInsuranceCompany(id)}>
                    <i className="fa fa-times-circle" aria-hidden="true" />
                </div>
            );
        },
    }

    const table_columns: any = [
        {
            title: 'ID',
            dataIndex: 'id',
            align: 'center' as 'center',
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            align: 'left' as 'left',
        },
        {
            title: 'Nit',
            dataIndex: 'nit',
            align: 'left' as 'left',
        },
        {
            title: 'Teléfono',
            dataIndex: 'phone',
            responsive: ['md'],
            align: 'left' as 'left',
        },
        {
            title: 'Creado por',
            dataIndex: 'audit_trail',
            align: 'left' as 'left',
            responsive: ['md'],
            render: (audit_trail) => audit_trail?.created_by,
        },
    ];

    if (guards.detailInsuranceCompany({ user: aux_user })) {
        acciones.children.push(ver)
    }
    if (guards.editInsuranceCompany({ user: aux_user })) {
        acciones.children.push(editar)
    }
    if (guards.deleteInsuranceCompany({ user: aux_user })) {
        acciones.children.push(eliminar)
    }
    if (acciones.children.length > 0) {
        table_columns.push(acciones)
    }

    useEffect(() => {
        dispatch(actions.clear_all_companies());
    }, []);

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <Card
                        title="Compañias Aseguradoras"
                        extra={<Link to="/insurabilities/company/create/" name="Crear" iconText="+" />}
                    >
                        <div className="row justify-content-between">
                            <div className="col-12 col-lg-5 d-flex">
                                <div className="col-12 col-md-6 col-lg-6">
                                    <FilterForm filters={[{ key: 'name', name: 'Nombre' }]} onSubmit={filter} />
                                </div>
                            </div>
                        </div>
                        <UiTable
                            columns={table_columns}
                            items={insurance_companies}
                            with_pagination
                            change_page={change_page}
                            count={total_results}
                            loading={loading}
                        />
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default InsuranceCompanies;
