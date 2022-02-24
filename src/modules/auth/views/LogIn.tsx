import { Image, Grid } from 'semantic-ui-react';
import loginimage from './../../../utils/assets/img/login.jpeg';
import logo from './../../../utils/assets/img/escudoAlcaldia.png';
import { Redirect, useHistory } from 'react-router-dom';
import LoginForm from './../components/LoginForm';
import actions from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Link from '../../../utils/ui/link';
import { useState } from 'react';

export default function SignIn({ location, redirect }) {
    const can_access = useSelector((store: any) => store.auth.can_access);
    const dispatch = useDispatch();
    const history = useHistory();

    // const [disabled, setDisabled] = useState(parseInt(localStorage.getItem('attemp')) >= 9);
    const [alert, set_alert] = useState(null);

    const onLogin = async (values) => {
        // if (values.remember) {
        //     const c = `user=${values.user}`;
        //     console.log(document.cookie, c);
        //     document.cookie = c;
        //     console.log(document.cookie);
        // }
        const promise: any = dispatch(actions.login(values.user, values.password));
        await promise
            .then(() => {
                history.push('/');
            })
            .catch((e) => {
                const [message, intententos] = e;
                const val = (
                    <>
                        {message && <span>{message}</span>}
                        {intententos && (
                            <>
                                <br />
                                <span>{intententos >= 3 ? `Intentos restantes ${intententos}` : ''}</span>
                            </>
                        )}
                    </>
                );
                set_alert(val);
            });
    };

    return (
        <div>
            {redirect(can_access, location)}

            <div className="row" style={{ height: '100vh' }}>
                <div className="col d-none d-md-block no-padding-bottom no-padding-top">
                    <Image className="image-container-login" src={loginimage} />
                </div>
                <div className="col mt-3 no-padding-right no-padding-left container-form-creacion-cuentas">
                    <div className="container-form-login" style={{ width: 300 }}>
                        <div className="container-center">
                            <Image className="image-logo-container-login" src={logo} />
                        </div>
                        <h5 className="sub-header-login text-center">
                            Sistema para la administración de bienes inmuebles
                        </h5>
                        <div className="form-login">
                            <div>
                                <p
                                    style={{
                                        fontWeight: 'bold',
                                        paddingTop: '15px',
                                        fontSize: '14px',
                                        borderTop: '0.5px solid #D1D0D0',
                                    }}
                                >
                                    Ingrese sus datos para Iniciar Sesión
                                </p>
                            </div>
                            <LoginForm onSubmit={onLogin} alert={alert} />
                            <div
                                className="row"
                                style={{
                                    paddingTop: '15px',
                                    borderTop: '0.5px solid #D1D0D0',
                                }}
                            >
                                <div className="col-12 text-center">
                                    <span>¿Olvidó su contraseña?</span>
                                    <Link to="/auth/login/" name="Recupérala AQUÍ" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Grid columns={2} style={{ height: '100vh' }} className="no-margin">
                <Grid.Row className="no-padding-bottom no-padding-top">
                    <Grid.Column className="no-padding-right no-padding-left">
                        <Image className="image-container-login" src={loginimage} />
                    </Grid.Column>
                    <Grid.Column className="no-padding-right no-padding-left container-form-creacion-cuentas">
                        <div className="container-form-login" style={{ width: 300 }}>
                            <div className="container-center">
                                <Image className="image-logo-container-login" src={logo} />
                            </div>
                            <div>
                                <h5 className="sub-header-login text-center">
                                    Sistema para la Administración de Bienes Inmuebles
                                </h5>
                                <p
                                    style={{
                                        fontWeight: 'bold',
                                        paddingTop: '15px',
                                        fontSize: '14px',
                                        borderTop: '0.5px solid #D1D0D0',
                                    }}
                                >
                                    Ingrese sus datos para Iniciar sesión
                                </p>
                            </div>
                            <LoginForm onSubmit={onLogin} alert={alert} />

                            <div
                                className="row"
                                style={{
                                    paddingTop: '15px',
                                    borderTop: '0.5px solid #D1D0D0',
                                }}
                            >
                                <div className="col-12 text-center">
                                    <span>¿Olvidó su contraseña?</span>
                                    <Link to="/auth/login/" name="Recupérala AQUÍ" />
                                </div>
                            </div>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid> */}
        </div>
    );
}
