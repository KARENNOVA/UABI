import types from './types';
import service, { User } from './service';
import { request_dispatch } from '../../../utils';

// ROLES //
const getRole = (id: number) => {
    return request_dispatch(types.rol, service.getRole(id));
};

const getRolesList = (filters) => request_dispatch(types.roles, service.getRolesList(filters));

const clearRolesList = () => request_dispatch(types.roles, Promise.resolve([]));

const getRoles = () => request_dispatch(types.rolesSelect, service.getRoles());

const createRole = (data) =>
    request_dispatch(types.rol, service.createRole(data));

const updateRole = (data: any, id) =>
    request_dispatch(types.rol, service.updateRole(data, id));

const deleteRole = (id) => request_dispatch(types.rol, service.deleteRole(id));

const getPermits = () => request_dispatch(types.permits, service.getPermits());

// ----------------users-----------------------
const get_list_users = () =>
    request_dispatch(types.get_list_users, service.get_list_users());
const get_all_users = (filters?) =>
    request_dispatch(types.get_all_users, service.get_all_users(filters));
const clear_get_all_users = () =>
    request_dispatch(types.get_all_users, Promise.resolve([]));
const create_user = (data: User) =>
    request_dispatch(types.create_user, service.create_user(data));
const delete_user = (id, action) =>
    request_dispatch(types.delete_user, service.delete_user(id, action));
const get_user_by_id = (id) =>
    request_dispatch(types.get_user, service.get_user_by_id(id));
const update_user = (id, data: any) =>
    request_dispatch(types.update_user, service.update_user(id, data));
const clear_user = () => request_dispatch(types.clear_user, Promise.resolve(null));

const actions = {
    // example
    get_list_users,
    get_all_users,
    clear_get_all_users,
    create_user,
    delete_user,
    get_user_by_id,
    update_user,
    clear_user,
    getRole,
    getRolesList,
    getRoles,
    createRole,
    updateRole,
    deleteRole,
    getPermits,
    clearRolesList
};

export default actions;
