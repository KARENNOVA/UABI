import types from './types';
import { Loadable, Pageable } from '../../../custom_types';
import { User } from './service';

interface State {
    rol: Loadable<any>;
    roles: Pageable<any>;
    user: Loadable<User>;
    users: Pageable<User>;
    rolesSelect: Loadable<any>;
    permits: Loadable<any>;
}

const fake_role = {
    id: -1,
    id_rol: '',
    permits: [],
    audit_trail: {
        created_by: '',
        created_on: '',
        updated_by: null,
        updated_on: null,
        updated_values: null,
    },
    status: -1,
};

const emptyInitialState: State = {
    users: {
        value: [],
        pagination: {
            page: 1,
            count: 0,
            next_page: null,
            previous_page: null,
            total_results: 0,
        },
        loading: false,
        loaded: false,
    },
    user: {
        value: null,
        loading: false,
        loaded: false,
    },
    rol: {
        value: [fake_role],
        loading: false,
        loaded: false,
    },
    roles: {
        value: [],
        pagination: {
            page: 1,
            count: 0,
            next_page: null,
            previous_page: null,
            total_results: 0,
        },
        loading: false,
        loaded: false,
    },
    rolesSelect: {
        value: [],
        loading: false,
        loaded: false,
    },
    permits: {
        value: [
            {
                id: 0,
                name: '',
            },
        ],
        loading: false,
        loaded: false,
    },
};
const initialState = emptyInitialState;

const reducer = (state: State = initialState, action: any): State => {
    const dataUsers = userReducer(state, action);
    return {
        ...state,
        ...dataUsers,
        ...reducerRol(state, action),
    };
};

export default reducer;

const userReducer = (aux_state: any, action: any) => {
    const { user, users } = aux_state;
    const state = { user, users };
    switch (action.type) {
        case types.create_user.default:
        case types.update_user.default:
        case types.delete_user.default:
        case types.get_user.default: {
            return {
                ...state,
                user: {
                    ...state.user,
                    loading: true,
                    loaded: false,
                },
            };
        }
        case types.update_user.success:
        case types.create_user.success:
        case types.clear_user.success:
        case types.get_user.success: {
            return {
                ...state,
                user: {
                    ...state.user,
                    value: action.payload,
                    loading: false,
                    loaded: true,
                },
            };
        }
        case types.create_user.fail:
        case types.update_user.fail:
        case types.delete_user.fail:
        case types.delete_user.success:
        case types.get_user.fail: {
            return {
                ...state,
                user: {
                    ...state.user,
                    value: emptyInitialState.user.value,
                    loading: false,
                    loaded: false,
                },
            };
        }
        case types.get_list_users.default:
        case types.get_all_users.default: {
            return {
                ...state,
                users: {
                    ...state.users,
                    loading: true,
                    loaded: false,
                },
            };
        }
        case types.get_all_users.success: {
            return {
                ...state,
                users: {
                    ...state.users,
                    value: action.payload?.results || [],
                    pagination: {
                        page: action.payload?.page || 1,
                        count: action.payload?.count || 0,
                        next_page: action.payload?.next_page,
                        previous_page: action.payload?.previous_page,
                        total_results: action.payload?.total_results || 0,
                    },
                    loading: false,
                    loaded: true,
                },
            };
        }
        case types.get_list_users.fail:
        case types.get_all_users.fail: {
            return {
                ...state,
                users: {
                    ...state.users,
                    value: emptyInitialState.users.value,
                    pagination: emptyInitialState.users.pagination,
                    loading: false,
                    loaded: false,
                },
            };
        }
        case types.get_list_users.success: {
            return {
                ...state,
                users: {
                    ...state.users,
                    value: action.payload || [],
                    pagination: emptyInitialState.users.pagination,
                    loading: false,
                    loaded: true,
                },
            };
        }
        default: {
            return state;
        }
    }
};

const reducerRol = (aux_state: State = initialState, action: any): any => {
    const { rol, roles, rolesSelect, permits } = aux_state;
    const state = { rol, roles, rolesSelect, permits };
    switch (action.type) {
        case types.roles.default: {
            return {
                ...state,
                roles: { ...state.roles, loading: true },
            };
        }
        case types.roles.success: {
            // console.log(action.payload)
            return {
                ...state,
                roles: {
                    ...state.roles,
                    value: action.payload?.results || [],
                    pagination: {
                        page: action.payload?.page || 1,
                        count: action.payload?.count || 0,
                        next_page: action.payload?.next_page,
                        previous_page: action.payload?.previous_page,
                        total_results: action.payload?.total_results || 0,
                    },
                    loading: false,
                    loaded: true,
                },
            };
        }
        case types.roles.fail: {
            return {
                ...state,
                roles: {
                    ...state.roles,
                    loading: false,
                    loaded: false,
                    value: emptyInitialState.roles.value,
                },
            };
        }
        case types.rol.default: {
            return {
                ...state,
                rol: { ...state.rol, loading: true },
            };
        }
        case types.rol.success: {
            return {
                ...state,
                rol: {
                    ...state.rol,

                    value: action.payload,

                    loading: false,
                    loaded: true,
                },
            };
        }
        case types.rol.fail: {
            return {
                ...state,
                rol: {
                    ...state.rol,
                    message: emptyInitialState.rol.message,
                    loading: false,
                    loaded: false,
                    value: emptyInitialState.rol.value,
                },
            };
        }
        case types.permits.default: {
            return {
                ...state,
                permits: { ...state.permits, loading: true },
            };
        }
        case types.permits.success: {
            return {
                ...state,
                permits: {
                    value: action.payload,
                    loading: false,
                    loaded: true,
                },
            };
        }
        case types.permits.fail: {
            return {
                ...state,
                permits: {
                    ...state.permits,
                    loading: false,
                    loaded: false,
                    value: emptyInitialState.permits.value,
                },
            };
        }
        case types.rolesSelect.default: {
            return {
                ...state,
                rolesSelect: { ...state.rolesSelect, loading: true },
            };
        }
        case types.rolesSelect.success: {
            return {
                ...state,
                rolesSelect: {
                    value: action.payload,
                    loading: false,
                    loaded: true,
                },
            };
        }
        case types.rolesSelect.fail: {
            return {
                ...state,
                rolesSelect: {
                    ...state.rolesSelect,
                    loading: false,
                    loaded: false,
                    value: emptyInitialState.rolesSelect.value,
                },
            };
        }

        default: {
            return state;
        }
    }
};
