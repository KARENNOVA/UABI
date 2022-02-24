import React from 'react';
// import { useHistory } from 'react-router-dom';
import { /*Form,  Header, Input, Button, Select,*/ Grid, Image } from 'semantic-ui-react';
// import moment from 'moment';
// import axios from 'axios';

import loginimage from './../../../utils/assets/img/login.jpeg';
import logo from './../../../utils/assets/img/escudoAlcaldia.png';
import SignUpForm from '../components/SignUpForm';

const Register = () => {
    // const history = useHistory();
    // const [id_tipo, setId_tipo] = React.useState('');
    // const [idusuario, setIdusuario] = React.useState('');
    // const [contraseña, setContraseña] = React.useState('');
    // const [nombres, setNombres] = React.useState('');
    // const [apellidos, setApellidos] = React.useState('');
    // const [direccion, setDireccion] = React.useState('');
    // const [telefono, setTeléfono] = React.useState('');
    // const [tipo_identificacion, setTipo_identificacion] = React.useState('');
    // //   const [fecha_creacion, setFecha_creacion] = React.useState("");
    // const [email, setEmail] = React.useState('');
    // // TIPO DE IDENTIFICACIONES
    // const tiposidentificacion = [
    //     { key: 'TI', value: 'TI', text: 'TARJETA IDENTIDAD' },
    //     { key: 'CE', value: 'CE', text: 'CEDULA EXTRANJERIA' },
    //     { key: 'TE', value: 'TE', text: 'TARJETA EXTRANGERIA' },
    //     { key: 'CC', value: 'CC', text: 'CEDULA DE CIUDADANIA' },
    //     { key: 'NI', value: 'NI', text: 'NIT' },
    //     { key: 'PA', value: 'PA', text: 'PASAPORTE' },
    //     { key: 'TDE', value: 'TDE', text: 'TIPO DE DOCUMENTO EXTRANJERO' },
    //     { key: 'RG', value: 'RG', text: 'REGISTRO CIVIL' },
    //     { key: 'SIN', value: 'SIN', text: 'SIN IDENTIFICACION' },
    // ];
    //
    // async function registrarUsuario() {
    //     let fecha_creacion = moment().format('YYYY-MM-DD');
    //     let fecha_actualizacion = moment().format('YYYY-MM-DD');
    //     try {
    //         const data = await axios.post(`${process.env.REACT_APP_PAGE_HOST}api/usuarios`, {
    //             id_tipo,
    //             idusuario,
    //             contraseña,
    //             nombres,
    //             apellidos,
    //             tipo_identificacion,
    //             direccion,
    //             telefono,
    //             email,
    //             fecha_creacion,
    //             fecha_actualizacion,
    //         });
    //         history.push('/auth');
    //     } catch (error: any) {
    //         console.error(error.response);
    //     }
    // }

    return (
        <div>
            <Grid columns={2} style={{ height: '100vh' }} className="no-margin">
                <Grid.Row className="no-padding-bottom no-padding-top">
                    <Grid.Column className="no-padding-right no-padding-left">
                        <Image className="image-container-login" src={loginimage} />
                    </Grid.Column>
                    <Grid.Column className="no-padding-right no-padding-left container-form-creacion-cuentas">
                        <div className="form-creacion-cuentas">
                            <div className="container-center">
                                <img width="200" src={logo} alt="" />
                            </div>
                            <h5 className="sub-header-login">Registro de usuario</h5>
                            <SignUpForm />
                        </div>
                        {/* <Form className="form-creacion-cuentas">
                            <Form.Field className="container-center">
                                <img width="240" src={logo} />
                            </Form.Field>
                            <Form.Field>
                                <Header as="h2" className="sub-header-login">
                                    Registro de Usuario
                                    <Header.Subheader className="sub-header-login">Digite sus datos</Header.Subheader>
                                </Header>
                            </Form.Field>
                            <Form.Group widths="equal">
                                <Form.Field>
                                    <label>Usuario</label>
                                    <Input onChange={(e) => setId_tipo(e.target.value)} value={id_tipo} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Contraseña</label>
                                    <Input
                                        type="password"
                                        onChange={(e) => setContraseña(e.target.value)}
                                        value={contraseña}
                                    />
                                </Form.Field>
                            </Form.Group>
                            <Form.Group widths="equal">
                                <Form.Field>
                                    <label>Nombres</label>
                                    <Input onChange={(e) => setNombres(e.target.value)} value={nombres} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Apellidos</label>
                                    <Input onChange={(e) => setApellidos(e.target.value)} value={apellidos} />
                                </Form.Field>
                            </Form.Group>
                            <Form.Group widths="equal">
                                <Form.Field>
                                    <label>Tipo identificacion</label>
                                    <Select
                                        placeholder="Seleccione el tipo de identificacion"
                                        options={tiposidentificacion}
                                        onChange={(e: any, { value }: any) => {
                                            if (typeof value !== 'undefined') {
                                                setTipo_identificacion(value.toString());
                                            }
                                        }}
                                    />
                                    <Input onChange={(e) => setTipo_identificacion(e.target.value)} value={tipo_identificacion} />
                                </Form.Field>
                                <Form.Field>
                                    <label>identificacion</label>
                                    <Input onChange={(e) => setIdusuario(e.target.value)} value={idusuario} />
                                </Form.Field>
                            </Form.Group>
                            <Form.Group widths="equal">
                                <Form.Field>
                                    <label>Teléfono</label>
                                    <Input onChange={(e) => setTeléfono(e.target.value)} value={telefono} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Email</label>
                                    <Input onChange={(e) => setEmail(e.target.value)} value={email} />
                                </Form.Field>
                            </Form.Group>
                            <Form.Field>
                                <label>Dirección</label>
                                <Input onChange={(e) => setDireccion(e.target.value)} value={direccion} />
                            </Form.Field>
                            <Form.Field className="container-space-between">
                                <Button
                                    color="black"
                                    className="boton-ingresar-login"
                                    onClick={() => history.push('/auth')}
                                >
                                    Regresar
                                </Button>
                                <Button color="blue" className="boton-ingresar-login" onClick={registrarUsuario}>
                                    Registrar
                                </Button>
                            </Form.Field>
                        </Form> */}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
};

export default Register;
