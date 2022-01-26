import React, { FC, useEffect, useState } from 'react';
import 'moment/locale/es';
import { io, Socket } from 'socket.io-client';
import { BASE_URL } from '../../../config/axios_instances/notifications';
import { useSelector } from 'react-redux';

type KeyPath = [string, string?];
interface TemplateProps {
    menu_collapsed: boolean;
    drawer_collapsed: boolean;
    menu_toggle: () => void;
    drawer_open: () => void;
    drawer_close: () => void;
    drawer_menu_collapsed: boolean;
    set_drawer_menu_collapsed: any;
    menu_key_path: KeyPath;
    set_menu_key_path: Function;
    pass_modal: boolean;
    percentege: boolean;
    canon_type: string;
    toggle_pass_modal: () => void;
    toggle_percentage_modal: () => void;
    idNode: string;
    socket: Socket;
    set_canon_type: (type: "inversion" | "inversion_social" | null) => void;
}

export const TemplateContext = React.createContext<TemplateProps>(null);

const TemplateProvider: FC = React.memo(({ children }) => {
    const [menu_collapsed, set_menu_collapsed] = useState<boolean>(false);
    const [menu_key_path, set_menu_key_path] = useState<KeyPath>(['p0']);
    const [drawer_collapsed, set_drawer_collapsed] = useState<boolean>(false);
    const [drawer_menu_collapsed, set_drawer_menu_collapsed] = useState<boolean>(false);
    const [pass_modal, set_pass_modal] = useState<boolean>(false);
    const [percentege, setpercentege] = useState<boolean>(false);
    const [canon_type, setCanon_type] = useState(null);
    const [idNode, set_idNode] = useState<string>(null);
    const [socket, set_socket] = useState<Socket>(null);
    const [user] = useSelector((store: any) => [store.auth.user]);

    useEffect(() => {
        const new_socket = io(BASE_URL);
        if (user?.detailsUser) {
            new_socket.on('init', (data) => {
                set_idNode(data.id as string);
                console.log("data", data)
                console.log("connect to service socket success", data.id);
                new_socket.emit('register:user', {
                    headerAuthorization: `Bearer ${localStorage.getItem('_tk_')}`,
                    id: user.detailsUser.user_id,
                });
            });
            set_socket(new_socket);
        }

        return () => {
            socket?.close();
            set_socket(null);
        };
    }, [user]);

    return (
        <TemplateContext.Provider
            value={{
                menu_key_path,
                drawer_menu_collapsed,
                menu_collapsed,
                drawer_collapsed,
                pass_modal,
                percentege,
                canon_type,
                idNode,
                socket,
                set_menu_key_path,
                set_drawer_menu_collapsed,
                menu_toggle: () => set_menu_collapsed((collapsed) => !collapsed),
                drawer_open: () => set_drawer_collapsed(true),
                drawer_close: () => set_drawer_collapsed(false),
                toggle_pass_modal: () => set_pass_modal((collapsed) => !collapsed),
                toggle_percentage_modal: () => setpercentege((collapsed) => !collapsed),
                set_canon_type: (type: "inversion" | "inversion_social" | null) => {
                    setCanon_type(type);
                },
            }}
        >
            {children}
        </TemplateContext.Provider>
    );
});

export default TemplateProvider;
