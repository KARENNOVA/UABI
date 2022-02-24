// import store from '../../config/store';
import { IRoute } from '../../utils/components/app_router/custom_types';
import { DetailDisposition } from './views/DetailDisposition';
import { EditDisposition } from './views/EditDisposition';
import { ListDisposition } from './views/ListDisposition';
import CreateDisposition from './views/CreateDisposition';
import DetailContract from './views/Contracts/DetailContract';
import EditContract from './views/Contracts/EditContract';
import { ListContracts } from './views/Contracts/ListContracts';
import LeaseDoc from './components/Precontractual/Lease/LeaseDoc';
import PublicUseDoc from './components/Precontractual/PublicUse/PublicUseDoc';
import ComodatoDoc from './components/Precontractual/comodato/ComodatoDoc';
import ComodatoDocContract from './components/Contractual/comodatoContract/ComodatoDocContract';
import LeaseDocContract from './components/Contractual/Lease/LeaseDocContract';
import DetailPrecontractual from './views/Pre-contractual/DetailPrecontractual';
import { Permit } from '../..';

export const guards = {
    createContract: (props?) => {
        const user = props.user;
        if (!user) return false;
        const { permits } = user;
        return permits.includes(Permit.CREATE_CONTRACT);
    },
    detailContract: (props?) => {
        const user = props.user;
        if (!user) return false;
        const { permits } = user;
        return permits.includes(Permit.DETAIL_CONTRACT);
    },
    editContract: (props?) => {
        const user = props.user;
        if (!user) return false;
        const { permits } = user;
        return permits.includes(Permit.UPDATE_CONTRACT);
    },
    listContract: (props?) => {
        const user = props.user;
        if (!user) return false;
        const { permits } = user;
        return permits.includes(Permit.LIST_CONTRACTS);
    },
    deleteContract: (props?) => {
        const user = props.user;
        if (!user) return false;
        const { permits } = user;
        return permits.includes(Permit.DELETE_CONTRACT);
    },
    createPrecontract: (props?) => {
        const user = props.user;
        if (!user) return false;
        const { permits } = user;
        return permits.includes(Permit.CREATE_PRECONTRACT);
    },
    detailPrecontract: (props?) => {
        const user = props.user;
        if (!user) return false;
        const { permits } = user;
        return permits.includes(Permit.DETAIL_PRECONTRACT);
    },
    editPrecontract: (props?) => {
        const user = props.user;
        if (!user) return false;
        const { permits } = user;
        return permits.includes(Permit.UPDATE_PRECONTRACT);
    },

    listDisposition: (props?) => {
        const user = props.user;
        if (!user) return false;
        const { permits } = user;
        return permits.includes(Permit.LIST_DISPOSITION);
    },
    createDisposition: (props?) => {
        const user = props.user;
        if (!user) return false;
        const { permits } = user;
        return permits.includes(Permit.CREATE_DISPOSITION);
    },
    detailDisposition: (props?) => {
        const user = props.user;
        if (!user) return false;
        const { permits } = user;
        return permits.includes(Permit.DETAIL_DISPOSITION);
    },
    editDisposition: (props?) => {
        const user = props.user;
        if (!user) return false;
        const { permits } = user;
        return permits.includes(Permit.UPDATE_DISPOSITION);
    },
    deleteDisposition: (props?) => {
        const user = props.user;
        if (!user) return false;
        const { permits } = user;
        return permits.includes(Permit.DELETE_DISPOSITION);
    },
};
const get_routes = (): IRoute[] => {
    return [
        {
            exact: true,
            is_private: true,
            can_access: guards.listDisposition,
            path: '/disposition/list/',
            template_props: {
                breadcrumbs: [{ name: 'Disposición' }],
            },
            component: ListDisposition,
        },
        {
            exact: true,
            is_private: true,
            can_access: true,
            path: '/disposition/create/',
            template_props: {
                breadcrumbs: [
                    { name: 'Disposición', to: '/disposition/list/' },
                    { name: 'Crear' },
                ],
            },
            component: CreateDisposition,
        },
        {
            exact: true,
            is_private: true,
            can_access: guards.detailDisposition,
            path: '/disposition/:id/',
            template_props: {
                breadcrumbs: [
                    { name: 'Disposición', to: '/disposition/list/' },
                    { name: 'Tipo disposición' },
                ],
            },
            component: DetailDisposition,
        },
        {
            exact: true,
            is_private: true,
            can_access: true,
            path: '/disposition/edit/:id/',
            template_props: {
                breadcrumbs: [
                    { name: 'Disposición', to: '/disposition/list/' },
                    { name: 'Tipo disposición' },
                ],
            },
            component: EditDisposition,
        },
        {
            exact: true,
            is_private: true,
            can_access: true,
            path: '/disposition/contract/:id/',
            template_props: {
                breadcrumbs: [
                    { name: 'Lista de contratos', to: '/dispositions/contract/list' },
                    { name: 'Contrato' },
                ],
            },
            component: DetailContract,
        },
        {
            exact: true,
            is_private: true,
            can_access: true,
            path: '/disposition/contract/edit/:id/',
            template_props: {
                breadcrumbs: [
                    { name: 'Lista de contratos', to: '/dispositions/contract/list' },
                    { name: 'Contrato' },
                ],
            },
            component: EditContract,
        },
        {
            exact: true,
            is_private: true,
            can_access: true,
            path: '/dispositions/contract/list',
            template_props: {
                breadcrumbs: [{ name: 'lista de contratos' }],
            },
            component: ListContracts,
        },
        {
            exact: true,
            is_private: true,
            can_access: true,
            path: '/dispositions/precontractual/view/:active_code',
            template_props: {
                breadcrumbs: [{ name: 'Estudio Previo' }],
            },
            component: DetailPrecontractual,
        },
        {
            exact: true,
            is_private: true,
            can_access: true,
            path: '/document/comodato/contract',
            template_props: {
                breadcrumbs: [
                    { name: 'Contrato Comodato' },
                ],
            },
            component: ComodatoDocContract,
        },
        {
            exact: true,
            is_private: true,
            can_access: true,
            path: '/document/lease/contract',
            template_props: {
                breadcrumbs: [
                    { name: 'Contrato Arrendamiento' },
                ],
            },
            component: LeaseDocContract,
        },
        {
            exact: true,
            is_private: true,
            can_access: true,
            path: '/document/lease/',
            template_props: {
                breadcrumbs: [{ name: 'Estudio Previo para Arrendamiento' }],
            },
            component: LeaseDoc,
        },
        {
            exact: true,
            is_private: true,
            can_access: true,
            path: '/document/use-public/',
            template_props: {
                breadcrumbs: [{ name: 'Estudio previo para uso público' }],
            },
            component: PublicUseDoc,
        },
        {
            exact: true,
            is_private: true,
            can_access: true,
            path: '/document/comodato/',
            template_props: {
                breadcrumbs: [{ name: 'Estudio Previo para Comodato' }],
            },
            component: ComodatoDoc,
        },

        // {
        //     exact: true,
        //     is_private: true,
        //     can_access: true,
        //     path: '/disposition/precontractual/create/',
        //     template_props: {
        //         breadcrumbs: [
        //             { name: 'Disposición', to: '/disposition/list/' },
        //             { name: 'Tipo disposición', to: '/disposition/edit/:id/' },
        //             { name: 'Etapa Precontractual' },
        //         ],
        //     },
        //     component: CreatePrecontractual,
        // },
        // {
        //     exact: true,
        //     is_private: true,
        //     can_access: true,
        //     path: '/disposition/contract/create/',
        //     template_props: {
        //         breadcrumbs: [
        //             { name: 'Disposición', to: '/disposition/list/' },
        //             { name: 'Tipo disposición', to: '/disposition/edit/:id/' },
        //             { name: 'Crear Contrato' },
        //         ],
        //     },
        //     component: CreateContract,
        // },
    ];
};

export default get_routes;
