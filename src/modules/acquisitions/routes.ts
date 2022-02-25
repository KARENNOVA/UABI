import { IRoute } from '../../utils/components/app_router/custom_types';
// import store from './../../config/store';
import EnglobeProject from './views/Projects/EnglobeProject';
import DesenglobeProject from './views/Projects/DesenglobeProject';

import {
    CreateProject,
    CreateRealEstate,
    DetailRealEstate,
    EditProject,
    EditRealEstate,
    // EstateAreas,
    RealEstate,
    DetailProject,
    Projects,
} from './views';
import { Permit } from '../..';
import { TableAreas } from './components/en_des_globe/TableAreas';
import RealEstateGlobe from './components/en_des_globe/RealEstateGlobe';

export const guards = {
    createProject: (props?) => {
        const user = props.user;
        if (!user) return false;
        const { permits } = user;
        return permits.includes(Permit.CREATE_PROJECT);
    },
    detailProject: (props?) => {
        const user = props.user;
        if (!user) return false;
        const { permits } = user;
        return permits.includes(Permit.DETAIL_PROJECT);
    },
    editProject: (props?) => {
        const user = props.user;
        if (!user) return false;
        const { permits } = user;
        return permits.includes(Permit.UPDATE_PROJECT);
    },
    deleteProject: (props?) => {
        const user = props.user;
        if (!user) return false;
        const { permits } = user;
        return permits.includes(Permit.DELETE_PROJECT);
    },
    listProject: (props?) => {
        const user = props.user;
        if (!user) return false;
        const { permits } = user;
        return permits.includes(Permit.LIST_PROJECT);
    },
    createRealEstate: (props?) => {
        const user = props.user;
        if (!user) return false;
        const { permits } = user;
        return permits.includes(Permit.CREATE_REALESTATE);
    },
    detailRealEstate: (props?) => {
        const user = props.user;
        if (!user) return false;
        const { permits } = user;
        return permits.includes(Permit.DETAIL_REALESTATE);
    },
    editRealEstate: (props?) => {
        const user = props.user;
        if (!user) return false;
        const { permits } = user;
        return permits.includes(Permit.UPDATE_REALESTATE);
    },
    deleteRealEstate: (props?) => {
        const user = props.user;
        if (!user) return false;
        const { permits } = user;
        return permits.includes(Permit.DELETE_REALESTATE);
    },
    listRealEstate: (props?) => {
        const user = props.user;
        if (!user) return false;
        const { permits } = user;
        return permits.includes(Permit.LIST_REALESTATE);
    },
};

const get_routes = (): IRoute[] => {
    return [
        {
            exact: true,
            is_private: true,
            can_access: guards.createRealEstate,
            path: '/acquisitions/real-estates/create/',
            template_props: {
                breadcrumbs: [
                    {
                        name: 'Bienes inmuebles',
                        to: '/acquisitions/real-estates/',
                    },
                    { name: 'Crear bien inmueble' },
                ],
            },
            component: CreateRealEstate,
        },
        {
            exact: true,
            is_private: true,
            can_access: guards.editRealEstate,
            path: '/acquisitions/real-estates/edit/:id/',
            template_props: {
                breadcrumbs: [
                    {
                        name: 'Bienes Inmuebles',
                        to: '/acquisitions/real-estates/',
                    },
                    { name: 'Editar bien inmueble' },
                ],
            },
            component: EditRealEstate,
        },
        {
            exact: true,
            is_private: true,
            can_access: guards.detailRealEstate,
            path: '/acquisitions/real-estates/:id/',
            template_props: {
                breadcrumbs: [
                    {
                        name: 'Bienes inmuebles',
                        to: '/acquisitions/real-estates/',
                    },
                    { name: 'Ver bien inmueble' },
                ],
            },
            component: DetailRealEstate,
        },
        {
            exact: true,
            is_private: true,
            can_access: guards.listRealEstate,
            path: '/acquisitions/real-estates/',
            template_props: {
                breadcrumbs: [{ name: 'Bienes inmuebles' }],
            },
            component: RealEstate,
        },
        {
            exact: true,
            is_private: true,
            can_access: guards.createProject,
            path: '/acquisitions/projects/create/',
            template_props: {
                breadcrumbs: [
                    { name: 'Proyectos', to: '/acquisitions/projects/' },
                    { name: 'Crear proyecto' },
                ],
            },
            component: CreateProject,
        },
        {
            exact: true,
            is_private: true,
            can_access: guards.editProject,
            path: '/acquisitions/projects/edit/:id/',
            template_props: {
                breadcrumbs: [
                    { name: 'Proyectos', to: '/acquisitions/projects/' },
                    { name: 'Editar proyecto' },
                ],
            },
            component: EditProject,
        },
        {
            exact: true,
            is_private: true,
            can_access: guards.detailProject,
            path: '/acquisitions/projects/:id/',
            template_props: {
                breadcrumbs: [
                    { name: 'Proyectos', to: '/acquisitions/projects/' },
                    { name: 'Ver proyecto' },
                ],
            },
            component: DetailProject,
        },
        {
            exact: true,
            is_private: true,
            can_access: guards.listProject,
            path: '/acquisitions/projects/',
            template_props: {
                breadcrumbs: [{ name: 'Proyectos' }],
            },
            component: Projects,
        },
        {
            exact: true,
            is_private: true,
            can_access: true,
            path: '/acquisitions/projects/englobar/:id/',
            template_props: {
                breadcrumbs: [
                    { name: 'Proyectos', to: '/acquisitions/projects/' },
                    { name: 'Englobar Proyecto' },
                ],
            },
            component: EnglobeProject,
        },
        {
            exact: true,
            is_private: true,
            can_access: true,
            path: '/acquisitions/projects/desenglobar/:id/',
            template_props: {
                breadcrumbs: [
                    { name: 'Proyectos', to: '/acquisitions/projects/' },
                    { name: 'Desenglobar proyecto' },
                ],
            },
            component: DesenglobeProject,
        },
        {
            exact: true,
            is_private: true,
            can_access: true,
            path: '/englobar/realEstates/',
            template_props: {
                breadcrumbs: [{ name: 'Finalizar proyecto' }],
            },
            component: TableAreas,
        },
        {
            exact: true,
            is_private: true,
            can_access: true,
            path: '/englobar/real-estates/edit',
            template_props: {
                breadcrumbs: [
                    { name: 'Finalizar proyecto', to: '' },
                    { name: 'Bien inmueble' },
                ],
            },
            component: RealEstateGlobe,
        },
    ];
};

export default get_routes;
