import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    IProjectAttributes,
    // IProjectsResponse,
    IRealEstateAttributes,
    // IRealEstatesResponse,
} from '../../../../utils/interfaces';
import { Input } from 'semantic-ui-react';
import AcquisitionsFrom from '../../components/RealEstateForm/AdquisitionsForm';
import GeneralDataForm from '../../components/RealEstateForm/GeneralDataForm';
import { actions } from '../../redux';
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import { qsToArray } from '../../../../utils';
import { Card } from '../../../../utils/ui';
import RealEstateList from '../../components/RealEstateList';
import RealEstateForm from '../../components/RealEstateForm';

const RealEstate = () => {
    const history: any = useHistory();
    const dispatch = useDispatch();
    const [project_id, set_project_id] = useState(history.location.state?.project_id);
    const realEstates: IRealEstateAttributes[] = useSelector((states: any) => states.acquisitions.realEstates.value);
    const projects: IProjectAttributes[] = useSelector((states: any) => states.acquisitions.projects.value);

    useEffect(() => {
        dispatch(actions.getProjects());
        if (history.location.state?.project_id) {
            dispatch(actions.getRealEstatesByProject(history.location.state?.project_id));
        }
    }, []);

    const createRealEstate = async (values, form, isFinish) => {
        try {
            const res: any = await dispatch(actions.createRealEstate(values));
            if (!isFinish) {
                if (res) {
                    return await dispatch(actions.getRealEstatesByProject(res.project_id));
                }
            } else {
                history.push(`/acquisitions/real-estates/`);
                return Promise.resolve();
            }
        } catch (e) {
            return Promise.reject();
        }
    };

    const onProjectSelectedChange = (value) => {
        if (project_id !== value) {
            set_project_id(value);
            if (value) {
                console.log(value);

                dispatch(actions.getRealEstatesByProject(value));
            }
        }
    };

    return (
        <RealEstateForm
            type="create"
            projects={projects}
            realEstates={realEstates}
            projectId={project_id}
            onProjectSelectedChange={onProjectSelectedChange}
            onSubmit={createRealEstate}
        />
    );
};

export default RealEstate;
