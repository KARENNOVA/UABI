import { IPolicyAttributes } from '../../../utils/interfaces/components.interfaces';
import { FC } from 'react';
import { formatDate } from '../../../utils';
import { Table, Link } from '../../../utils/ui';
interface InsurabilityListProps {
    policies: IPolicyAttributes[];
}
const PolizaList: FC<InsurabilityListProps> = ({ policies }) => {
    const table_columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            align: 'center' as 'center',
        },
        {
            title: 'Matrícula',
            dataIndex: 'matricula',
            align: 'center' as 'center',
        },
        {
            title: 'Fecha inicial de la póliza',
            dataIndex: 'initialDate',
            align: 'center' as 'center',
            render: (dates) => formatDate(dates?.created_on),
        },
        {
            title: 'Fecha final de póliza',
            dataIndex: 'finalDate',
            align: 'center' as 'center',
            render: (dates) => formatDate(dates?.created_on),
        },
        {
            title: 'Corredor de Seguros',
            dataIndex: 'ensuranceAgent',
            align: 'center' as 'center',
        },
        {
            title: 'Compañía de Seguros',
            dataIndex: 'ensuranceCompany',
            align: 'center' as 'center',
        },
        {
            title: 'Valor Asegurado',
            dataIndex: 'ensuranceValue',
            align: 'center' as 'center',
        },
        {
            title: 'Póliza',
            dataIndex: 'ensuranceFile',
            align: 'center' as 'center',
        },
        {
            title: 'Acciones',
            fixed: true,
            children: [
                {
                    title: 'Ver',
                    dataIndex: 'id',
                    align: 'center' as 'center',
                    render: (id) => {
                        return (
                            <Link
                                to={`/policy/${id}/`}
                                name=""
                                avatar={false}
                                icon={<i className="fa fa-eye" aria-hidden="true" />}
                            />
                        );
                    },
                },
                {
                    title: 'Editar',
                    dataIndex: 'id',
                    align: 'center' as 'center',
                    render: (id) => {
                        return (
                            <Link
                                to={`/policy/edit/${id}/`}
                                name=""
                                avatar={false}
                                icon={<i className="fa fa-pencil" aria-hidden="true" />}
                            />
                        );
                    },
                },
                {
                    title: 'Desactivar',
                    dataIndex: 'id',
                    align: 'center' as 'center',
                    render: (id) => {
                        return (
                            <Link
                                to={`/policy/delete?id=${id}`}
                                name=""
                                avatar={false}
                                className="text-danger"
                                icon={<i className="fa fa-times-circle" aria-hidden="true" />}
                            />
                        );
                    },
                },
            ],
        },
    ];
    return <Table columns={table_columns} items={policies} with_pagination count={10} change_page={() => {}} />;
};

export default PolizaList;
