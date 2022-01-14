import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux';
import { useHistory } from 'react-router-dom';
import RealEstateForm from '../../components/RealEstateForm';
import { clearRealEstate } from '../../redux/actions/realEstates';
import { useEffect } from 'react';



const RealEstate = () => {
    const history: any = useHistory();
    const dispatch = useDispatch();
    const dependencies: any = useSelector((states: any) => states.acquisitions.dependencies.value);
    // console.log(history.location.state.project_id);

    useEffect(() => {
        dispatch(clearRealEstate());
        dispatch(actions.getDependencies());
    }, []);

    const createRealEstate = async (values, form, isFinish) => {
        try {
            const res: any = await dispatch(actions.createRealEstate(values));
            console.log('@@',res);
            if (values.acquisitions.length > 0) {
                await dispatch(actions.createAcquisitionForRealEstate(res.id, values.acquisitions));
            }
            if (isFinish) {
                history.push(`/acquisitions/real-estates/`);
            } else {
                if (res) {
                    return await dispatch(actions.getRealEstatesByProject(res.project_id));
                }
            }
            return Promise.resolve();
        } catch (e) {
            return Promise.reject();
        }
    };

    return <RealEstateForm type="create" onSubmit={createRealEstate} dependencies={dependencies} />;
};

export default RealEstate;
