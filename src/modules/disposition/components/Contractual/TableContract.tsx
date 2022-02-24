import React, { FC } from 'react';
import {swal_warning, swal, formatDate} from '../../../../utils';
import { Link, Table } from '../../../../utils/ui';
import { actions } from '../../redux';
import { guards } from '../../routes';
import { useDispatch } from 'react-redux';
import { Tag } from 'antd';

interface ContractProps {
    user?: any;
    contrats: any;
}

export const TableContract: FC<ContractProps> = ({ user, contrats }) => {
    const dispatch = useDispatch();
    const deleteContract = (id) => async () => {
        const result = await swal_warning.fire({
            icon: 'warning',
            title: '¿Está seguro?',
            text: '¿Está seguro que quiere inactivar este Usuario?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Continuar',
            denyButtonText: `Cancelar`,
        });

        if (result.isConfirmed) {
            await dispatch(actions.delete_contract(id));
            await dispatch(actions.get_all_contracts({}));
        } else if (result.isDenied) {
            swal.close();
        }
    };

    const ver = {
        title: 'Ver',
        dataIndex: 'id',
        align: 'center' as 'center',
        render: (id) => {
            return (
                <Link
                    to={`/disposition/contract/${id}/`}
                    name=""
                    avatar={false}
                    icon={<i className="fa fa-eye" aria-hidden="true" />}
                />
            );
        },
    }
    const eliminar = {
        title: 'Inactivar',
        dataIndex: 'id',
        align: 'center' as 'center',
        render: (id) => {
            return (
                <div className="text-danger" onClick={deleteContract(id)}>
                    <i className="fa fa-times-circle" aria-hidden="true" />
                </div>
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
                    to={`/disposition/contract/edit/${id}/`}
                    name=""
                    avatar={false}
                    icon={<i className="fa fa-edit" aria-hidden="true" />}
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
            responsive: ['md'],
            align: 'left' as 'left',
        },
        // {
        //     title: 'Activo Fijo',
        //     dataIndex: '',
        //     align: 'left' as 'left',
        // },
        // {
        //     title: 'CBML',
        //     dataIndex: '',
        //     align: 'left' as 'left',
        // },
        // {
        //     title: 'Dirección',
        //     dataIndex: '',
        //     align: 'left' as 'left',
        // },
        {
            title: 'Número de contrato',
            dataIndex: 'decree_number',
            align: 'center' as 'center',
        },
        {
            title: 'Tipo de contrato',
            dataIndex: 'type_contract',
            align: 'left' as 'left',
        },
        // {
        //     title: 'Estado',
        //     dataIndex: '',
        //     align: 'left' as 'left',
        // },
        {
            title: 'Fecha Inicio',
            dataIndex: 'decree_date',
            align: 'left' as 'left',
            render: (date) => formatDate(parseInt(date))
        },
        {
            title: 'Fecha Terminación',
            dataIndex: 'finish_date',
            align: 'left' as 'left',
            render: (date) => formatDate(parseInt(date))
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            align: 'center' as 'center',
            render: (s) => {
                if (s === 1) return <Tag color="success">Activo</Tag>;
                return <Tag color="default">Inactivo</Tag>;
            },
        },
    ];

    if (guards.detailContract({ user })) {
        acciones.children.push(ver)
    }
    if (guards.editContract({ user })) {
        acciones.children.push(editar)
    }
    if (guards.deleteContract({ user })) {
        acciones.children.push(eliminar)
    }
    if (acciones.children.length > 0) {
        table_columns.push(acciones)
    }

    return (
        <Table
            columns={table_columns}
            items={contrats}
            with_pagination
        //count={total_results}
        //change_page={change_page}
        //loading={loading}
        />
    );
};
