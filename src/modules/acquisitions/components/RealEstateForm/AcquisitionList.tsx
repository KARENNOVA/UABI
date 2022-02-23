import { FC } from 'react';
import { Link, Table } from '../../../../utils/ui';
import AcquisitionModal from './AcquisitionModal';

interface AcquisitionListProps {
    acquisitions: any[];
    type: 'view' | 'edit' | 'create';
    disabled?: boolean;
}

const AcquisitionList: FC<AcquisitionListProps> = ({ acquisitions, type, disabled }) => {
    // console.log(acquisitions)
    const acquisition_columns = [
        {
            title: 'Tipo de Adquisición',
            align: 'center' as 'center',
            dataIndex: 'acquisition_type',
        },
        {
            title: 'No. Acto administrativo',
            align: 'center' as 'center',
            dataIndex: 'act_number',
        },
        {
            title: 'Valor de adquisición',
            align: 'center' as 'center',
            dataIndex: 'act_value',
        },
        ...(type === 'view'
            ? [
                  {
                      title: 'Tipo de Título',
                      align: 'center' as 'center',
                      dataIndex: 'title_type',
                  },
                //   {
                //       title: 'Tipo de activo',
                //       align: 'center' as 'center',
                //       dataIndex: 'active_type',
                //   },
                  {
                      title: 'Procedencia',
                      align: 'center' as 'center',
                      dataIndex: 'seller',
                  },
                  {
                      title: 'Porcentaje Adquirido',
                      align: 'center' as 'center',
                      dataIndex: 'acquired_percentage',
                  },
                  {
                      title: 'Área Total',
                      align: 'center' as 'center',
                      dataIndex: 'area',
                  },
                  {
                      title: 'Tipo de Entidad',
                      align: 'center' as 'center',
                      dataIndex: 'entity_type',
                  },
                  {
                      title: 'No. Entidad',
                      align: 'center' as 'center',
                      dataIndex: 'entity_number',
                  },
                  {
                      title: 'Ciudad',
                      align: 'center' as 'center',
                      dataIndex: 'city',
                  },
                //   {
                //       title: 'Ver',
                //       dataIndex: 'id',
                //       align: 'center' as 'center',
                //       render: () => {
                //           return <i className="fa fa-eye text-muted" aria-hidden="true" />;
                //       },
                //   },
              ]
            : []),
        ...(type === 'edit'
            ? [
                  {
                      title: 'Editar',
                      dataIndex: 'id',
                      align: 'center' as 'center',
                      render: (id, acquisition, index) => {
                          return (
                              <AcquisitionModal
                                  type="edit"
                                  acquisition={{ ...acquisition, index }}
                                  btn_label={
                                      <i
                                          className={['fa fa-pencil', ...(disabled ? ['text-muted'] : [])].join(' ')}
                                          aria-hidden="true"
                                      />
                                  }
                                  onChange={(values) => {
                                      console.log('acquisitions list', values);
                                      return Promise.resolve();
                                  }}
                              />
                          );
                      },
                  },
              ]
            : []),
        {
            title: 'Desactivar',
            dataIndex: '',
            align: 'center' as 'center',
            render: () => {
                return (
                    <Link to="" name="" avatar={false} icon={<i className="fa fa-times-circle" aria-hidden="true" />} />
                );
            },
        },
    ];
    return <Table columns={acquisition_columns} items={acquisitions} />;
};

AcquisitionList.defaultProps = {
    disabled: false,
};

export default AcquisitionList;
