import React, { useEffect } from 'react'
import { Link, Table } from '../../../utils/ui';
import { useDispatch, useSelector } from 'react-redux';
import actions from './../../acquisitions/redux/actions/index';

const ElectronicFielList = () => {
    const dispatch = useDispatch();
    const [realEstates, loading, total_results] = useSelector((store: any) => [
        store.acquisitions.realEstates.value,
        store.acquisitions.realEstates.loading,
        store.acquisitions.realEstates.pagination.total_results,
    ]);

    const change_page = (page, pageSize) => {
        dispatch(actions.getRealEstates({key: 'registry_number', page, pageSize, with: 'pagination', /*...filters*/ }));
    };

    useEffect(() => {
        dispatch(actions.clearRealEstates());
    }, []);

    const table_columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            align: 'center' as 'center',
        },
        {
            title: 'Proyecto',
            dataIndex: 'project',
            align: 'left' as 'left',
            render: (project) => project?.name
        },
        {
            title: 'Bien Inmueble',
            dataIndex: 'name',
            align: 'left' as 'left',
        },
        {
            title: 'Activo fijo',
            dataIndex: 'sap_id',
            align: 'center' as 'center',
        },
        {
            title: 'Dirección',
            dataIndex: 'address',
            align: 'left' as 'left',
            render: (address) => address?.address

        },
        {
            title: 'Matrícula',
            dataIndex: 'registry_number',
            align: 'center' as 'center',

        },
        {
            title: 'Acciones',
            dataIndex: 'id',
            align: 'center' as 'center',
            render: (id) => {
                return (
                    <Link
                        to={`/document-management/electronic_file/view/${id}/`}
                        name=""
                        avatar={false}
                        icon={<i className="fa fa-file-text" aria-hidden="true"/>}
                    />
                );
            },

        },
    ];
    return (
        <Table
            columns={table_columns}
            items={realEstates}
            with_pagination
            count={total_results}
            change_page={change_page}
            loading={loading}
        />
    )
}

export default ElectronicFielList
