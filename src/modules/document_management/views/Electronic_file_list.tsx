import React, { useContext } from 'react'
import { Card } from '../../../utils/ui';
import ElectronicFielList from '../components/ElectronicFielList';
import { useDispatch, useSelector } from 'react-redux';
import actions from './../../acquisitions/redux/actions/index';
import FilterForm from './../../../utils/ui/filter_form';
import { TemplateContext } from '../../../utils/components/template/template_context';

const Electronic_file_list = () => {
    const dispatch = useDispatch();
    const user = useSelector((store: any) => store.auth.user);
    const context = useContext(TemplateContext);
    const aux_user = {
        ...user,
        permits: user?.permits.map((a) => a.name) || [],
        roles: user?.roles.map((a) => a.name) || [],
    };


    const filter = async (_filters, _) => {
        await dispatch(actions.getRealEstates({ page: 1, with: 'pagination', ..._filters }));
    };
    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <Card
                        title="Expediente electrónico"
                    >
                        <div className="row justify-content-between">
                            <div className="col-12 col-lg-5 d-flex">
                                <div className="col-12 col-md-6 col-lg-6">
                                    <FilterForm
                                        filters={[
                                            { key: 'registry_number', name: 'Matrícula' },
                                            ...(context.device !== "sm"
                                                ? [
                                                    ...(context.device !== "md" ? [
                                                        { key: 'project', name: 'Proyecto' },
                                                        { key: 'CBML', name: 'CBML' },
                                                        { key: 'sap_id', name: 'Activo fijo' },
                                                    ] : []),
                                                    { key: 'name', name: 'Nombre' },
                                                ]
                                                : []),

                                        ]}
                                        onSubmit={filter}
                                    />
                                </div>
                            </div>
                        </div>
                        <ElectronicFielList />
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Electronic_file_list
