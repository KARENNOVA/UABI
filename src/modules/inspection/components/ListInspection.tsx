import React from 'react';
import { Card, Table as UiTable } from '../../../utils/ui';
import { formatDate } from '../../../utils';
import FilterForm from '../../../utils/ui/filter_form';
import Tag from 'antd/lib/tag';
import ModalInspection from './ModalInspection';

const ListInspection = ({ inspections, change_page, total_results, loading, projects, filter, user }) => {
    const table_columns = [
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
        {
            title: 'Inspecionar',
            dataIndex: 'id',
            align: 'center' as 'center',
            render: (id) => {
                return (
                    <ModalInspection project_id={id} />

                    // <Link
                    //     to={openModal(id)}
                    //     name=""
                    //     avatar={false}
                    //     icon={<i className="fa fa-plus" aria-hidden="true" />}
                    // />
                );
            },
        },
    ];
    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <Card title="Inspección">
                        <div className="row justify-content-between">
                            <div className="col-5 d-flex">
                                <div className="col-6 ">
                                    <FilterForm
                                        filters={[
                                            { key: 'name', name: 'Nombre' },
                                            { key: 'id', name: 'Código' },
                                            { key: 'dependency', name: 'Dependencia' },
                                            { key: 'subdependency', name: 'Subdependencia' },
                                            { key: 'audit_trail.created_by', name: 'Fecha', type: 'date' },
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

export default ListInspection;
