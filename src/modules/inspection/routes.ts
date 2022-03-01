// import store from '../../config/store';
import { IRoute } from '../../utils/components/app_router/custom_types';
import InspectionCreate from './views/inspection/InspectionCreate';

import ListInspection from './views/inspection';
import Scheduler from './views/scheduler';
import { Permit } from '../..';

export const guards =  {
    ListInspection: (props?) => {
        const user = props.user;
        if (!user) return false;
        const { permits } = user;
        return permits.includes(Permit.LIST_INSPECTION);
    },
    detailInspection: (props?) => {
        const user = props.user;
        if (!user) return false;
        const { permits } = user;
        return permits.includes(Permit.DETAIL_INSPECTION);
    },
    updateInspection: (props?) => {
        const user = props.user;
        if (!user) return false;
        const { permits } = user;
        return permits.includes(Permit.UPDATE_INSPECTION);
    },

}
const get_routes = (): IRoute[] => {
    return [
        {
            exact: true,
            is_private: true,
            can_access: guards.ListInspection,
            path: '/inspection/',
            template_props: {
                breadcrumbs: [
                    {
                        name: 'Inspecciones',
                    },
                ],
            },
            component: ListInspection,
        },
        {
            exact: true,
            is_private: true,
            can_access: true, //guards.createInpection,
            path: '/inspection/:real_estate_id/create/',
            template_props: {
                breadcrumbs: [
                    {
                        name: 'Inspecciones',
                        to: '/inspection/',
                    },
                    {
                        name: 'Crear',
                    },
                ],
            },
            component: InspectionCreate,
        },
    ];
};

export default get_routes;
