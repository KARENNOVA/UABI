import { FC, useContext } from 'react';
import tmpImg from '../../assets/img/medellin.png';
import Menu from 'antd/lib/menu';
import { TemplateContext } from './template_context';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { guards as guardsAsegurability } from '../../../modules/asegurabilidad/routes';
import { guards as guardsUsers } from '../../../modules/users/routes';
import { guards as guardsAcquisitions } from '../../../modules/acquisitions/routes';
import { guards as guardsInpection } from '../../../modules/inspection/routes';
import { guards as guardsDisposition } from '../../../modules/disposition/routes';

const Sider: FC<{ width: number }> = ({ width }) => {
    const { SubMenu } = Menu;
    const context = useContext(TemplateContext);
    const history = useHistory();
    const location = useLocation<{ menu: any[] }>();
    const goTo = (to) => (ev) => {
        context.drawer_close()
        history.push({ pathname: to, state: { menu: ev.keyPath } });
    };

    const user = useSelector((store: any) => store.auth.user);
    const aux_user = {
        ...user,
        permits: user?.permits.map((a) => a.name) || [],
        roles: user?.roles.map((a) => a.name) || [],
    };

    const menu_selected: any = location.state?.menu || [];
    let menu_config: any = [
        {
            path: '/',
            name: 'Inicio',
        },
        {
            name: 'Usuarios',
            children: [
                ...(guardsUsers.list({ user: aux_user })
                    ? [
                          {
                              path: '/users/',
                              name: 'Usuarios',
                          },
                      ]
                    : []),
                ...(guardsUsers.listRole({ user: aux_user })
                    ? [
                          {
                              path: '/roles/',
                              name: 'Roles y permisos',
                          },
                      ]
                    : []),
            ],
        },
        {
            name: 'Adquisición',
            children: [
                ...(guardsAcquisitions.listProject({ user: aux_user })
                    ? [
                          {
                              path: '/acquisitions/projects/',
                              name: 'Proyectos',
                          },
                      ]
                    : []),
                ...(guardsAcquisitions.listRealEstate({ user: aux_user })
                    ? [
                          {
                              path: '/acquisitions/real-estates/',
                              name: 'Bienes Inmuebles',
                          },
                      ]
                    : []),
                ...(guardsAcquisitions.createRealEstate({ user: aux_user })
                    ? [
                          {
                              path: '/acquisitions/real-estates/create/',
                              name: 'Registro de BI',
                          },
                      ]
                    : []),
            ],
        },
        {
            path: '/inventory-record-list',
            name: 'Administración de inventario',
            ...(aux_user.roles.includes('UABI') || aux_user.roles.includes('Administrador')
                ? []
                : {
                      children: [],
                  }),
        },
        {
            name: 'Asegurabilidad',
            children: [
                ...(guardsAsegurability.listPolicy({ user: aux_user })
                    ? [
                          {
                              path: '/insurabilities/policy/',
                              name: 'Pólizas de Seguro',
                          },
                      ]
                    : []),
                ...(guardsAsegurability.listInsuranceCompany({ user: aux_user })
                    ? [
                          {
                              path: '/insurabilities/company/',
                              name: 'Compañías Aseguradoras',
                          },
                      ]
                    : []),
                ...(guardsAsegurability.listInsuranceBroker({ user: aux_user })
                    ? [
                          {
                              path: '/insurabilities/broker/',
                              name: 'Corredores de Seguros',
                          },
                      ]
                    : []),
            ],
        },
        {
            name: 'Inspección',
            path: '/inspection/',
            ...(!guardsInpection.ListInspection({ user: aux_user })
                ? {
                      children: [],
                  }
                : []),
        },
        {
            name: 'Disposición',
            children: [
                ...(guardsDisposition.listDisposition({ user: aux_user })
                    ? [
                          {
                              path: '/disposition/list/',
                              name: 'Disposición',
                          },
                      ]
                    : []),
                ...(guardsDisposition.listContract({ user: aux_user })
                    ? [
                          {
                              path: '/dispositions/contract/list',
                              name: 'Contratos',
                          },
                      ]
                    : []),
            ],
        },
        {
            name: 'Gestión Documental',
            children: [
                {
                    path: '/document-management/master_formats/',
                    name: 'Máster de Formatos',
                },
                {
                    path: '/document-management/electronic_file/list',
                    name: 'Expediente Electrónico',
                },
                {
                    path: '/document-management/massive_charge/',
                    name: 'Carga Masiva',
                },
            ],
        },
        {
            name: 'Supervisión',
            children: [],
        },
        {
            name: 'Facturación',
            children: [],
        },
        {
            name: 'Mantenimiento',
            children: [],
        },
        {
            name: 'Consultas',
            children: [],
        },
        {
            name: 'Informes y Logs',
            children: [],
        },
    ];

    menu_config = menu_config.map((m, i) => {
        return {
            ...m,
            is_submenu: !!m.children,
            is_disabled: m.children?.length === 0 || false,
            ...(m.children
                ? {
                      children: m.children.map((s, j) => {
                          return { ...s, key: `s${i}-${j}`, is_disabled: false };
                      }),
                  }
                : {}),
            key: `p${i}`,
        };
    });

    return (
        <>
            {context.device !== 'sm' && (
                <div className="text-center" style={{ backgroundColor: '#6DA3FC', borderRight: '1px solid #2ea1fe' }}>
                    <img src={tmpImg} className="img-fluid" alt="" width="80%" style={{ paddingTop: '16px' }} />
                    <div
                        className="text-white"
                        style={{ fontWeight: 400, padding: '8px 0', width: '80%', margin: '0 auto' }}
                    >
                        Sistema para la Administración de Bienes Inmuebles
                    </div>
                </div>
            )}
            {/*<SideBar />*/}

            <Menu
                style={{ width }}
                mode={context.device === 'sm' ? 'inline' : 'vertical'}
                defaultSelectedKeys={menu_selected}
                onOpenChange={(open) => {
                    if (open.length > 0 && context.device !== 'sm') {
                        context.set_drawer_menu_collapsed(true);
                    } else {
                        context.set_drawer_menu_collapsed(false);
                    }
                }}
            >
                {menu_config.map((menu, i) => {
                    return !menu.is_submenu ? (
                        <Menu.Item key={menu.key} onClick={goTo(menu.path)} disabled={menu.is_disabled}>
                            {menu.name}
                        </Menu.Item>
                    ) : (
                        <SubMenu key={menu.key} title={menu.name} disabled={menu.is_disabled}>
                            {menu.children.map((sub, j) => {
                                return (
                                    <Menu.Item key={`s${i}-${j}`} disabled={sub.is_disabled} onClick={goTo(sub.path)}>
                                        {sub.name}
                                    </Menu.Item>
                                );
                            })}
                        </SubMenu>
                    );
                })}
            </Menu>
        </>
    );
};

export default Sider;
