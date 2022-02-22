import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Card, Link } from '../../../utils/ui';
import { getRealEstates } from '../../acquisitions/redux/actions/realEstates';
import RealEstateList from '../../acquisitions/components/RealEstateList';
import FilterForm from './../../../utils/ui/filter_form';
import { guards } from '../../acquisitions/routes';

const InventoryRecordList = () => {
    const dispatch = useDispatch();
    const [filters, set_filters] = useState<object>(null);
    const user = useSelector((store: any) => store.auth.user);
    const aux_user = {
        ...user,
        permits: user?.permits.map((a) => a.name) || [],
        roles: user?.roles.map((a) => a.name) || [],
    };

    // const change_page = (page, pageSize) => {
    //     dispatch(getRealEstates({ page, pageSize, with: 'pagination', ...filters }));
    // };

    const filter = async (_filters, _) => {
        set_filters(_filters);
        await dispatch(getRealEstates({ page: 1, with: 'pagination', ..._filters }));
    };

    // useEffect(() => {
    //     dispatch(actions.clearRealEstate());
    // }, []);

    return (
        <div className="h-100 d-flex flex-column">
            <div className="flex-fill overflow-auto">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <Card
                                title="Administrar Bienes Inmuebles"
                                extra={
                                    <>
                                        {guards.createRealEstate({ user: aux_user }) && (
                                            <Link to="/acquisitions/real-estates/create" name="Crear" iconText="+" />
                                        )}
                                    </>
                                }
                            >
                                <div className="row justify-content-between">
                                    <div className="col-5 d-flex">
                                        <div className="col-6 ">
                                            <FilterForm
                                                filters={[
                                                    { key: 'CBML', name: 'CBML' },
                                                    { key: 'registry_number', name: 'Matrícula' },
                                                    { key: 'project.name', name: 'Proyecto' },
                                                    { key: 'address', name: 'Dirección' },
                                                    { key: 'sap_id', name: 'Activo fijo' },
                                                ]}
                                                onSubmit={filter}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <RealEstateList withProject register user={aux_user} filters={filters}/*change_page={change_page}*/ />
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="bg-white d-flex flex-row justify-content-between"
                style={{ padding: 16, borderTop: '1px solid #ccc' }}
            >
                <div className="flex-fill" />
                <a href="/supervisionArrendamientos.xlsx" target="_blank" className='btn btn-outline-primary me-3 btn-sm' download="supervisionArrendamientos.xlsx" >plantilla sap</a>

            </div>
        </div>
    );
};

export default InventoryRecordList;



