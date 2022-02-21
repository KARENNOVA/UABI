import { useEffect, useState /*, useState*/ } from 'react';
import { IProjectAttributes /*, IProjectsResponse*/ } from '../../../../utils/interfaces';
// import ItemProject from "../../components/ItemProject";
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../redux';
import { Link, Card, Table as UiTable } from '../../../../utils/ui';
import { formatDate, swal, swal_warning } from '../../../../utils';
import Tag from 'antd/lib/tag';
import FilterForm from './../../../../utils/ui/filter_form';
import { guards } from '../../routes';

const Projects = () => {
    const dispatch = useDispatch();
    const projects: IProjectAttributes[] = useSelector((states: any) => states.acquisitions.projects.value);
    const loading: boolean = useSelector((states: any) => states.acquisitions.projects.loading);
    const { total_results } = useSelector((store: any) => store.acquisitions.projects.pagination);
    const [query, set_query] = useState<string>('');
    const user = useSelector((store: any) => store.auth.user);
    const aux_user = {
        ...user,
        permits: user?.permits.map((a) => a.name) || [],
        roles: user?.roles.map((a) => a.name) || [],
    };

    const filter = async (_filters, _) => {
        await dispatch(actions.getProjects({ page: 1, with: 'pagination', ..._filters }));
    };
    // const filter = () => {
    //     dispatch(actions.getProjects({ page: 1, q: query }));
    // };

    const change_page = (page, pageSize) => {
        dispatch(actions.getProjects({ page, pageSize, q: query }));
    };

    const deleteProject = (id, status) => async () => {
        let res: any;
        if (id !== '' && id !== undefined) {
            res = await dispatch(actions.getRealEstatesByProject(id));
        }
        if (res?.total && res.total !== 0 && status === "Activo" ) {
            const result = await swal_warning.fire({
                icon: 'warning',
                title: '¡Precaución!',
                text: `El proyecto contiene ${res?.total || ''
                    } bienes inmuebles asociados.\n\nSi desea continuar los proyectos quedarán sin proyecto y se les debe asignar uno nuevo.`,
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Continuar',
                denyButtonText: `Cancelar`,
            });

            if (result.isConfirmed) {
                swal_warning.fire({
                    icon: 'info',
                    title: '¡Última oportunidad!',
                    text: `¿Está seguro que quiere  inactivar el proyecto?`,
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: 'Continuar',
                    denyButtonText: `Cancelar`,
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        await dispatch(actions.deleteProject(id));
                        await dispatch(actions.getProjects());
                        // swal.fire({
                        //     title: "Proyecto Inactivado",
                        //     text: message,
                        //     icon: "success",
                        //     showConfirmButton: false,
                        //     timer: 1500,
                        // });
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
                text: `¿Está seguro que quiere  ${status === 'Inactivo' ? 'Activar' : 'Inactivar'} el proyecto?`,
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Continuar',
                denyButtonText: `Cancelar`,
            });

            if (result.isConfirmed) {
                await dispatch(actions.deleteProject(id));
                await dispatch(actions.getProjects());
                // const _res: any = await dispatch(actions.deleteProject(id));

                // swal.fire({
                //     title: "Proyecto Inactivado",
                //     text: message,
                //     icon: "success",
                //     showConfirmButton: false,
                //     timer: 1500,
                // });
            } else if (result.isDenied) {
                swal.close();
            }
        }
    };

    const acciones = {
        title: 'Acciones',
        align: 'center' as 'center',
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
                    to={`/acquisitions/projects/${id}/`}
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
            if (id !== 0) {
                return (
                    <Link
                        to={`/acquisitions/projects/edit/${id}/`}
                        name=""
                        avatar={false}
                        icon={<i className="fa fa-pencil" aria-hidden="true" />}
                    />
                );
            } else {
                return <i className="fa fa-pencil" aria-hidden="true" style={{ color: '#aaa' }} />;
            }
        },
    }

    const eliminar = {
        title: 'Desactivar',
        dataIndex: 'id',
        align: 'center' as 'center',
        render: (id, row) => {
            if (id !== 0) {
                return (
                    <div className="text-primary" onClick={deleteProject(id, row.status)}>
                        {row.status === "Activo" ?
                            <i className="fa fa-toggle-on" aria-hidden="true"  style={{fontSize: "18px", color: '#1FAEEF'}} />
                            :
                            <i className="fa fa-toggle-off" aria-hidden="true" style={{fontSize: "18px", color: '#1FAEEF'}} />

                        }
                        {/* <i className="fa fa-times-circle" aria-hidden="true" /> */}
                        {/*<Switch size="small" />*/}
                    </div>
                );
            } else {
                return <i className="fa fa-times-circle" aria-hidden="true" style={{ color: '#aaa' }} />;
                // return <Switch size="small" disabled />;
            }
        },
    }

    const table_columns: any = [
        {
            title: 'ID',
            dataIndex: 'id',
            align: 'center' as 'center',
            responsive: ['md'],
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            align: 'left' as 'left',
        },
        {
            title: 'Dependencia',
            dataIndex: 'dependency',
            align: 'left' as 'left',
            responsive: ['md'],
        },
        {
            title: 'Fecha Creación',
            dataIndex: 'audit_trail',
            align: 'left' as 'left',
            responsive: ['md'],
            render: (audit_trail) => formatDate(audit_trail?.created_on),
        },
        {
            title: 'Creado por',
            dataIndex: 'audit_trail',
            align: 'left' as 'left',
            responsive: ['md'],
            render: (audit_trail) => audit_trail?.created_by,
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            align: 'center' as 'center',
            responsive: ['md'],
            render: (s) => {
                if (s === 'Activo') return <Tag color="success">{s}</Tag>;
                return <Tag color="default">{s}</Tag>;
            },
        },
    ];

    if (guards.detailProject({ user: aux_user })) {
        acciones.children.push(ver)
    }
    if (guards.editProject({ user: aux_user })) {
        acciones.children.push(editar)
    }
    if (guards.deleteProject({ user: aux_user })) {
        acciones.children.push(eliminar)
    }
    if (acciones.children.length > 0) {
        table_columns.push(acciones)
    }

    useEffect(() => {
        // dispatch(actions.getProjects());
        dispatch(actions.clearProjects());

    }, []);

    return (

        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <Card
                        title="Proyectos"
                        extra={
                            <>
                                {guards.createProject({ user: aux_user }) && (
                                    <Link to="/acquisitions/projects/create/" name="Crear" iconText="+" />
                                )}
                            </>
                        }
                    >
                        <div className="row justify-content-between">
                            <div className="col-12 col-lg-5  d-flex">
                                <div className="col-12 col-md-6 col-lg-6">
                                    <FilterForm
                                        filters={[
                                            { key: 'name', name: 'Nombre' },
                                            { key: 'id', name: 'Código' },
                                            { key: 'dependency', name: 'Dependencia' },
                                            { key: 'subdependency', name: 'Subdependencia' },
                                            { key: 'created_on', name: 'Fecha', type: 'date' },
                                        ]}
                                        onSubmit={filter}
                                    />
                                </div>
                            </div>
                        </div>
                        <UiTable
                            columns={table_columns}
                            items={projects}
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

export default Projects;
