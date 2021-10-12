import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const swal = withReactContent(Swal);

/**
 * Function to create generic actions from a request
 * @param { default: string; success: string; fail: string } type  type of generic action
 * @param {Promise<any>} request  service to get data of the generic action
 * @param {[success: function, fail: function]} creators  array successful and fails for the callback of the generic action, these functions should return the action to dispatch according to the case
 * @param {function} effect  In the event that the generic action is successful and you want to trigger more actions depending on the generic action, you must pass this function
 */
type EffectFn = (payload: any) => void;
export const request_dispatch =
    (
        type: { default: string; success: string; fail: string },
        request: Promise<any>,
        creators: [Function?, Function?] = [],
        effect?: EffectFn
    ) =>
    (dispatch: any): Promise<any> => {
        const [success, fail] = creators || [];
        dispatch({ type: type.default });
        return request
            .then((payload) => {
                success
                    ? dispatch(success(payload))
                    : dispatch({ type: type.success, payload });
                if (effect) effect(payload);
                return Promise.resolve(payload);
            })
            .catch((error) => {
                fail
                    ? dispatch(fail(error))
                    : dispatch({ type: type.fail, error });
                return Promise.reject(error);
            });
    };


export const setTitle = (title: string) => document.title = title;
