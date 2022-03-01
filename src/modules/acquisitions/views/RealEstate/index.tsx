import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './../../redux';
import { Link, Card } from '../../../../utils/ui';
import RealEstateList from '../../components/RealEstateList';
import FilterForm from '../../../../utils/ui/filter_form';
import { guards } from '../../routes';
import { TemplateContext } from '../../../../utils/components/template/template_context';

const RealEstates = () => {
    const dispatch = useDispatch();
    const [filters, set_filters] = useState<object>(null);
    const user = useSelector((store: any) => store.auth.user);
    const context = useContext(TemplateContext);
    const aux_user = {
        ...user,
        permits: user?.permits.map((a) => a.name) || [],
        roles: user?.roles.map((a) => a.name) || [],
    };


    const filter = async (_filters, _) => {
        set_filters(_filters);
        await dispatch(actions.getRealEstates({ page: 1, with: 'pagination', ..._filters }));
    };


    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <Card
                        title="Bienes inmuebles"
                        extra={
                            <>
                                {guards.createRealEstate({ user: aux_user }) && (
                                    <Link to="/acquisitions/real-estates/create" name="Crear" iconText="+" />
                                )}
                            </>
                        }
                    >
                        <div className="row justify-content-between">
                            <div className="col-12 col-lg-5 d-flex">
                                <div className="col-12 col-md-6 col-lg-6">
                                    <FilterForm
                                        filters={[
                                            { key: 'registry_number', name: 'Matrícula' },
                                            ...(context.device !== "sm" ? [
                                                { key: 'project', name: 'Proyecto' },
                                                { key: 'name', name: 'Nombre' },
                                                ...(context.device !== "md" ? [
                                                    { key: 'CBML', name: 'CBML' },
                                                    { key: 'sap_id', name: 'Activo fijo' },
                                                ] : []),

                                            ] : []),

                                        ]}
                                        onSubmit={filter}
                                    />
                                </div>
                            </div>
                        </div>
                        <RealEstateList withProject user={aux_user} filters={filters} />
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default RealEstates;
