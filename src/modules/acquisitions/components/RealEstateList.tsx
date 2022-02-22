import { FC, useEffect } from 'react';
import { formatDate, swal_warning } from '../../../utils';
import { Link, Table } from '../../../utils/ui';
import { useSelector, useDispatch } from 'react-redux';
import { swal } from '../../../utils';
import { actions } from '../redux';
import Tag from 'antd/lib/tag';
import { guards } from '../routes';

interface RealEstateListProps {
    withProject?: boolean;
    filters?: any;
    project_id?: number;
    init?: boolean;
    register?: boolean;
    realEstateFilter?: any;
    user?: any;
    change_page?: (page: number, pageSize?: number) => void;
}

const RealEstateList: FC<RealEstateListProps> = ({
    withProject,
    filters,
    project_id,
    init,
    register,
    realEstateFilter,
    user,
    // change_page
}) => {

    const dispatch = useDispatch();
    const [realEstates, loading, total_results] = useSelector((store: any) => [
        store.acquisitions.realEstates.value,
        store.acquisitions.realEstates.loading,
        store.acquisitions.realEstates.pagination.total_results,
    ]);
    const deleteRealEstate = (id, status) => async () => {
        const result = await swal_warning.fire({
            icon: 'warning',
            title: '¿Está seguro?',
            text: `¿Está seguro que quiere ${status === 'Inactivo' ? 'Activar' : 'Inactivar'} el Bien Inmueble?`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Continuar',
            denyButtonText: `Cancelar`,
        });

        if (result.isConfirmed) {
            await dispatch(actions.deleteRealEstate(id));
            await dispatch(actions.getRealEstates({ with: 'pagination', key: 'registry_number' }));
            // const _res: any = await dispatch(actions.deleteProject(id));

            // swal_warning.fire({
            //     title: "Proyecto Inactivado",
            //     text: message,
            //     icon: "success",
            //     showConfirmButton: false,
            //     timer: 1500,
            // });
        } else if (result.isDenied) {
            swal.close();
        }
    };

    const acciones = {
        title: 'Acciones',
        fixed: true,
        children: []
    }
    const ver = {
        title: 'Ver',
        dataIndex: 'id',
        align: 'center' as 'center',
        render: (id) => {
            return (
                <Link
                    to={
                        register
                            ? `/inventory-record/real-estates/${id}/`
                            : `/acquisitions/real-estates/${id}/`
                    }
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
                    to={
                        register
                            ? `/inventory-record/real-estates/edit/${id}/`
                            : `/acquisitions/real-estates/edit/${id}/`
                    }
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
        render: (id, row) => {
            return (
                <div className="text-danger" onClick={deleteRealEstate(id, row.status)}>
                    {row.status === "Activo" ?
                        <i className="fa fa-toggle-on" aria-hidden="true" style={{ fontSize: "18px", color: '#1FAEEF' }} />
                        :
                        <i className="fa fa-toggle-off" aria-hidden="true" style={{ fontSize: "18px", color: '#1FAEEF' }} />

                    }
                    {/* <i className="fa fa-times-circle" aria-hidden="true" /> */}
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
            title: 'Matrícula',
            dataIndex: 'registry_number',
            align: 'left' as 'left',
        },

        ...(withProject
            ? [
                {
                    title: 'Proyecto Asociado',
                    dataIndex: 'project',
                    align: 'left' as 'left',
                    render: (p) => `${p.id} - ${p?.name}` || '',
                },
            ]
            : []),
        {
            title: 'Fecha Creación',
            dataIndex: 'audit_trail',
            align: 'left' as 'left',
            responsive: ['md'],
            render: (dates) => formatDate(dates?.created_on),
        },
        {
            title: 'Creado por',
            dataIndex: 'audit_trail',
            align: 'left' as 'left',
            responsive: ['md'],
            render: (data) => data.created_by,
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            align: 'center' as 'center',
            render: (s) => {
                if (s === 'Activo') return <Tag color="success">{s}</Tag>;
                return <Tag color="default">{s}</Tag>;
            },
        },

    ];

    if (guards.detailRealEstate({ user })) {
        acciones.children.push(ver)
    }
    if (guards.editRealEstate({ user })) {
        acciones.children.push(editar)
    }
    if (guards.deleteRealEstate({ user }) && !register) {
        acciones.children.push(eliminar)
    }
    if (acciones.children.length > 0) {
        table_columns.push(acciones)
    }

    // if(withProject && register){
    //     if (guards.detailRealEstate({ user })) {
    //         table_columns[7] = ver;
    //     }
    //     if (guards.editRealEstate({ user })) {
    //         table_columns[8] = editar;
    //     }
    // }else if (!withProject && register) {
    //     if (guards.detailRealEstate({ user })) {
    //         table_columns[6] = ver;
    //     }
    //     if (guards.editRealEstate({ user })) {
    //         table_columns[7] = editar;
    //     }
    // }else if (withProject && !register){
    //     if (guards.detailRealEstate({ user })) {
    //         table_columns[6] = ver;
    //     }
    //     if (guards.editRealEstate({ user })) {
    //         table_columns[7] = editar;
    //     }
    //     if (guards.deleteRealEstate({ user })) {
    //         table_columns[8] = eliminar;
    //     }
    // }else {
    //     if (guards.detailRealEstate({ user })) {
    //         table_columns[5].children[0] = ver;
    //     }
    //     if (guards.editRealEstate({ user })) {
    //         table_columns[5].children[1] = editar;
    //     }
    //     if (guards.deleteRealEstate({ user })) {
    //         table_columns[5].children[2] = eliminar;
    //     }
    // }



    const change_page = (page, pageSize) => {
        // console.log(filters)
        if (project_id) {
            dispatch(actions.getRealEstatesByProject(project_id, { page, pageSize, with: 'pagination', ...filters }));

        } else {
            dispatch(actions.getRealEstates({ page, pageSize, with: 'pagination', ...filters }));
        }
    };

    useEffect(() => {
        dispatch(actions.clearRealEstates());
    }, []);

    useEffect(() => {
        if (project_id) {
            dispatch(actions.clearRealEstates());
            dispatch(actions.getRealEstatesByProject(project_id, {}));
        }
    }, [project_id])

    return (
        <Table
            columns={table_columns}
            items={Array.isArray(realEstateFilter) ? realEstateFilter : realEstates}
            with_pagination
            count={total_results}
            change_page={change_page}
            loading={loading}
        />
    );
};

RealEstateList.defaultProps = {
    withProject: false,
    init: true,
};

export default RealEstateList;
