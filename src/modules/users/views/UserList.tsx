import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../redux';
import { formatDate, swal, swal_warning } from '../../../utils';
import { Link, Table } from '../../../utils/ui';
import { IUserAttributes } from '../../../utils/interfaces/users';
import { guards } from '../routes';
import Tag from 'antd/lib/tag';

interface UserListProps {
    users: IUserAttributes[];
    change_page?: (page: number, pageSize?: number) => void;
    total?: number;
    loading?: boolean;
    user: any;
}
const UserList: FC<UserListProps> = ({ users, change_page, total, user, loading }) => {
    const dispatch = useDispatch();
    const deleteUser = (id, status) => async () => {
        const result = await swal_warning.fire({
            icon: 'warning',
            title: '¿Está seguro?',
            text: `¿Está seguro que quiere ${status === "Inactivo" ? "Activar" : "Inactivar"} este Usuario?`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Continuar',
            denyButtonText: `Cancelar`,
        });

        if (result.isConfirmed) {
            await dispatch(actions.delete_user(id, status === "Inactivo" ? "activate" : "inactivate" ));
            await dispatch(actions.get_all_users({key: 'name', with: 'pagination'}));
        } else if (result.isDenied) {
            swal.close();
        }
    };

    const ver = {
        title: 'Ver',
        dataIndex: 'user_id',
        align: 'center' as 'center',
        render: (id) => {
            return (
                <Link
                    to={`/users/${id}/`}
                    name=""
                    avatar={false}
                    icon={<i className="fa fa-eye" aria-hidden="true" />}
                />
            );
        },
    };

    const editar = {
        title: 'Editar',
        dataIndex: 'user_id',
        align: 'center' as 'center',
        render: (id) => {
            return (
                <Link
                    to={`/users/edit/${id}/`}
                    name=""
                    avatar={false}
                    icon={<i className="fa fa-pencil" aria-hidden="true" />}
                />
            );
        },
    };

    const eliminar = {
        title: 'Desactivar',
        dataIndex: 'user_id',
        align: 'center' as 'center',
        render: (id, row) => {
            return (
                <div className="text-danger" onClick={deleteUser(id, row.status)}>
                    {row.status === "Activo" ?
                        <i className="fa fa-toggle-on" aria-hidden="true" style={{ fontSize: "18px", color: '#1FAEEF' }} />
                        :
                        <i className="fa fa-toggle-off" aria-hidden="true" style={{ fontSize: "18px", color: '#1FAEEF' }} />

                    }
                    {/* <i className="fa fa-times-circle" aria-hidden="true" /> */}
                </div>
            );
        },
    };

    const acciones = {
        title: 'Acciones',
        align: 'center' as 'center',
        fixed: true,
        children: [],
    }

    const table_columns: any = [
        {
            title: 'ID',
            dataIndex: 'user_id',
            responsive: ['md'],
            align: 'center' as 'center',
        },
        {
            title: 'Nombre',
            dataIndex: 'names',
            align: 'left' as 'left',
            responsive: ['md'],
            render: (_, user) => {
                return `${(user && Object.values(user?.names).join(' ')) || ''} ${(user && Object.values(user?.surnames).join(' ')) || ''
                    }`;
            },
        },
        // {
        //     title: 'Nombre',
        //     dataIndex: 'names',
        //     align: 'left' as 'left',
        // },
        // {
        //     title: 'rol',
        //     dataIndex: 'extra',
        //     align: 'center' as 'center',
        //     render: (extra) => {
        //         return extra?.roles?.map(r => r.name).join(", ")
        //     },
        // },
        {
            title: 'C.C',
            dataIndex: 'id_number',
            // responsive: ['md'],
            align: 'center' as 'center',
        },
        {
            title: 'Fecha creación',
            dataIndex: 'audit_trail',
            align: 'center' as 'center',
            responsive: ['md'],
            render: (_) => formatDate(_?.created_on),
        },
        {
            title: 'Creado por',
            dataIndex: 'audit_trail',
            align: 'center' as 'center',
            responsive: ['md'],
            render: (_) => _?.created_by,
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

    if (guards.detail({ user })) {
        acciones.children.push(ver)
    }
    if (guards.edit({ user })) {
        acciones.children.push(editar)
    }
    if (guards.delete({ user })) {
        acciones.children.push(eliminar)
    }
    if (acciones.children.length > 0) {
        table_columns.push(acciones)
    }


    return <Table columns={table_columns} items={users} with_pagination count={total} change_page={change_page} loading={loading} />;
};

export default UserList;
