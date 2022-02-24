import React from 'react';
import { TableContract } from '../../components/Contractual/TableContract';
import { Card } from '../../../../utils/ui';
import FilterForm from '../../../../utils/ui/filter_form';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux';

export const ListContracts = () => {
    const dispatch = useDispatch();
    const user = useSelector((store: any) => store.auth.user );
    const contracts = useSelector((store: any) => store.disposition.contracts.value );
    console.log(contracts);
    const filter = async (_filters, _) => {
        await dispatch(actions.get_all_contracts({ page: 1, with: 'pagination', ..._filters }));
        // await dispatch(actions.get_list_contracts());
    };

    const aux_user = {
        ...user,
        permits: user?.permits.map((a) => a.name) || [],
        roles: user?.roles.map((a) => a.name) || [],
    };


    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <Card title="Contratos">
                        <div className="row justify-content-between">
                            <div className="col-5 d-flex">
                                <div className="col-6 ">
                                    <FilterForm
                                        filters={[
                                            { key: 'sap_id', name: 'Activo fijo' },
                                            { key: 'CBML', name: 'CBML' },
                                            { key: 'address', name: 'Dirección' },
                                            { key: 'date', name: 'Fecha inicial' /*type: 'date'*/ },
                                            { key: 'date', name: 'Fecha terminación', /*type: 'date'*/ },
                                            { key: 'sap_id', name: 'Número del contrato' },
                                        ]}
                                        onSubmit={filter}
                                    />
                                </div>
                            </div>
                        </div>
                        <TableContract user={aux_user} contrats={contracts}  />
                    </Card>
                </div>
            </div>
        </div>
    );
};
