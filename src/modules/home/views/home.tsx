import Card from '../components/Card';

const Home = () => {
    return (
        <>
            <section className="pt-5" id="texto-superior">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h4>Bienvenido al sistema de información para administración de bienes inmuebles</h4>
                            <p className="mb-5">Encuentra aquí los accesos rápidos a las funciones más utilizadas.</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="content-cards">
                <section id="cards">
                    <div className="container">
                        <div className="row justify-content-center">
                            <Card
                                name="Administrativo"
                                links={[
                                    // { name: 'Asignación de Roles y Permisos',  to: '/acquisitions/projects/' },
                                    { name: 'Usuarios', to: '/users/' },
                                    { name: 'Gestión y asignación de Roles', to: '/roles/' },
                                ]}
                            />
                            <Card
                                name="Adquisición"
                                links={[
                                    { name: 'Proyectos', to: '/acquisitions/projects/' },
                                    { name: 'Bienes inmuebles', to: '/acquisitions/real-estates/' },
                                    { name: 'Registro de bien inmueble', to: '/acquisitions/real-estates/create/' },
                                ]}
                            />
                            <Card
                                name="Asegurabilidad"
                                links={[
                                    { name: 'Registrar póliza', to: '/insurabilities/policy/' },
                                    { name: 'Gestionar corredor de seguros', to: '/insurabilities/company/' },
                                    { name: 'Gestionar compañía aseguradora', to: '/insurabilities/broker/' },
                                ]}
                            />
                            <Card name="Inspección" links={[{ name: 'Gestionar Inspección', to: '/inspection/' }]} />
                            <Card
                                name="Disposición"
                                links={[
                                    { name: 'Gestionar disposición', to: '/disposition/list/' },
                                    { name: 'Gestionar contrato', to: '/dispositions/contract/list' },
                                ]}
                            />
                            <Card name="Supervisión" links={[]} />
                            <Card name="Mantenimiento" links={[]} />
                            <Card name="Consultas" links={[]} />
                            <Card name="Informes y logs" links={[]} />
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Home;
