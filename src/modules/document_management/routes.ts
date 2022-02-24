// import store from '../../config/store';
import { IRoute } from '../../utils/components/app_router/custom_types';
import Master_formats from './views/Master_formats';
import Electronic_file_list from './views/Electronic_file_list';
import Electronic_file from './views/Electronic_file';
import MassiveCharge from "./views/massive_charge";

const get_routes = (): IRoute[] => {
    return [
        {
            exact: true,
            is_private: true,
            can_access: true,
            path: '/document-management/electronic_file/view/:id/',
            template_props: {
                breadcrumbs: [
                    { name: 'Expediente Electrónico', to: '/document-management/electronic_file/list' },
                    { name: 'Documentos asociados' },
                ],
            },
            component: Electronic_file,
        },
        {
            exact: true,
            is_private: true,
            can_access: true,
            path: '/document-management/master_formats/',
            template_props: {
                breadcrumbs: [
                    { name: 'Master de formatos' },
                ],
            },
            component: Master_formats,
        },
        {
            exact: true,
            is_private: true,
            can_access: true,
            path: '/document-management/electronic_file/list',
            template_props: {
                breadcrumbs: [
                    { name: 'Expediente Electrónico' },
                ],
            },
            component: Electronic_file_list,
        },
        {
            exact: true,
            is_private: true,
            can_access: true,
            path: '/document-management/massive_charge/',
            template_props: {
                breadcrumbs: [
                    { name: 'Carga Masiva' },
                ],
            },
            component: MassiveCharge,
        },
    ];
};

export default get_routes;
