import { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { TextArea } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';

import { IProjectAttributes, IRealEstateAttributes } from '../../../../utils/interfaces';
import AcquisitionsFrom from '../../components/RealEstateForm/AdquisitionsForm';
import { actions } from '../../redux';
import RealEstateForm from '../../components/RealEstateForm';

interface IParams {
    id: string;
}

const DetailRealEstate = () => {
    const { id } = useParams<IParams>();
    const history: any = useHistory();
    const dispatch = useDispatch();
    const realEstate: IRealEstateAttributes = useSelector((states: any) => states.acquisitions.realEstate.value);
    const [project_id, set_project_id] = useState(realEstate?.project_id);
    const projects: IProjectAttributes[] = useSelector((states: any) => states.acquisitions.projects.value);

    useEffect(() => {
        dispatch(actions.getProjects());
        dispatch(actions.getRealEstate(id));
    }, []);

    useEffect(() => {
        dispatch(actions.getRealEstatesByProject(realEstate.project_id));
    }, [realEstate.project_id]);

    return (
        <RealEstateForm
            type="view"
            projects={projects}
            realEstate={realEstate}
            projectId={parseInt(project_id + '')}
            onProjectSelectedChange={(value) => {
                if (project_id !== value) {
                    set_project_id(value);
                    if (value) dispatch(actions.getRealEstatesByProject(value));
                }
            }}
            onSubmit={async (values, form, isFinish) => {
                return Promise.reject();
            }}
        />
    );
};

export default DetailRealEstate;
