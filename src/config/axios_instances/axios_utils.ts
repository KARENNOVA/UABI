import axios from 'axios';
import { FORBIDDEN, INTERNAL_SERVER_ERROR, UNAUTHORIZED } from './index';
import { swal, swal_warning } from '../../utils';
import { actions } from '../../modules/auth/redux';
import store, { AppDispatch } from '../store';

const response_error_interceptor = (error: any) => {
    if (!axios.isCancel(error)) {
        if (error.response) {
            switch (error.response?.status) {
                case UNAUTHORIZED: {
                    return onUnauthorized(error);
                }
                case FORBIDDEN: {
                    return onForbidden(error);
                }
                case INTERNAL_SERVER_ERROR: {
                    return onInternalServerError(error);
                }
                default: {
                    return Promise.reject(error);
                }
            }
        } else {
            // store.dispatch(auth.actions.logOut());
            swal_warning.fire({
                title: 'Warning',
                text: 'We have detected a problem in your connection',
                icon: 'warning',
            });
        }
    }
};

// const compute_token = (token: string) => `Bearer ${token}`;

// const get_on_hold = (original_config: any) => {
//     return new Promise((resolve, reject) => {
//         window.__sabi.retry_pending.push({
//             resolve,
//             reject,
//             url: original_config.url,
//         });
//     })
//         .then((token: any) => {
//             original_config.headers.Authorization = compute_token(token);
//             return http.request(original_config);
//         })
//         .catch((error) => {
//             return Promise.reject(error);
//         });
// };

// const validate_refresh = (original_config: any) => {
//     if (window.__sabi.is_in_refresh) {
//         return get_on_hold(original_config);
//     }
//     original_config._retry = true;
//     window.__sabi.is_in_refresh = true;
//     return original_config;
// };

const onUnauthorized = (original_error: any) => {
    let original_config = original_error.config;
    if (!original_config._retry) {
        return new Promise((resolve, reject) => {
            const { logOut /*, newToken*/ } = actions;
            const dispatch: any = store.dispatch;
            dispatch(logOut());
        });
        // original_config = validate_refresh(original_config);
        // return new Promise((resolve, reject) => {
        //     const { logOut/*, newToken*/ } = actions;
        //     const { tokenRefresh } = auth.service;
        //     const dispatch: AppDispatch = store.dispatch;
        //     tokenRefresh()
        //         .then((response) => {
        //             const token = response?.data?.access;
        //             dispatch(newToken(response?.data));
        //             original_config.headers.Authorization =
        //                 compute_token(token);
        //             processQueue({ token });
        //             resolve(http.request(original_config));
        //         })
        //         .catch((error) => {
        //             processQueue({ error });
        //             reject(error);
        //             dispatch(logOut());
        //         })
        //         .then(() => {
        //             window.__sabi.is_in_refresh = false;
        //         });
        // });
    }
    return Promise.reject(original_error);
};

// noinspection GrazieInspection
const onInternalServerError = (original_error: any) => {
    swal_warning.fire({
        title: 'Warning',
        text: 'An unexpected error has occurred, please notify the system administrator!',
        icon: 'warning',
        timer: 2000,
    });
    return Promise.reject(original_error);
    // store.dispatch(auth.actions.logOut());  avoid logout when an error happened
};

const onForbidden = (original_error: any) => {
    const { detail } = original_error.response?.data;
    if (detail) {
        swal_warning.fire({
            title: 'Warning',
            text: detail,
            icon: 'warning',
        });
    }
    return Promise.reject(original_error);
};

// const processQueue = ({ error = null, token = null }) => {
//     if (window.__sabi.retry_pending.length) {
//         window.__sabi.retry_pending.forEach((prom) => {
//             if (error) {
//                 prom.reject(error);
//             } else if (token) {
//                 prom.resolve(token);
//             } else {
//                 prom.reject(null);
//             }
//         });
//         window.__sabi.retry_pending = [];
//     }
// };

export default response_error_interceptor;
