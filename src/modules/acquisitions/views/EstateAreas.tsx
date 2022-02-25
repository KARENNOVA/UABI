const EstateAreas = () => {
    return (
        <section className="pt-5" id="texto-superior">
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div style={{ backgroundColor: 'white', borderRadius: 15 }}>
                            <h5>
                                <b>Creando:</b> Area
                            </h5>
                            <hr />
                            <div className="container">
                                <form>
                                    <div className="row">
                                        <div className="col-3 d-flex">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="flexRadioDefault"
                                                    id="flexRadioDefault4"
                                                    checked
                                                />
                                                <label className="form-check-label" htmlFor="flexRadioDefault4">
                                                    Bien inmueble existente
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="flexRadioDefault"
                                                    id="flexRadioDefault5"
                                                />
                                                <label className="form-check-label" htmlFor="flexRadioDefault5">
                                                    Bien inmueble nuevo
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            <select className="form-select" aria-label="Default select example">
                                                <option value="1" selected>
                                                    Puente la 80
                                                </option>
                                                <option value="2">Avenida oriental</option>
                                                <option value="3">Plaza de Toros la Macarena</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row my-5 py-3">
                                        <div className="col-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">
                                                Nombre
                                            </label>
                                            <input
                                                type=""
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                aria-describedby="emailHelp"
                                            />
                                            <div id="emailHelp" className="form-text" />
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="exampleInputEmail1" className="form-label">
                                                Descripción
                                            </label>
                                            <input
                                                type=""
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                aria-describedby="emailHelp"
                                            />
                                            <div id="emailHelp" className="form-text" />
                                        </div>

                                        <div className="col-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">
                                                Superficie
                                            </label>
                                            <input
                                                type=""
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                aria-describedby="emailHelp"
                                            />
                                            <div id="emailHelp" className="form-text" />
                                        </div>
                                        <div className="col-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">
                                                Interior
                                            </label>
                                            <input
                                                type=""
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                aria-describedby="emailHelp"
                                            />
                                            <div id="emailHelp" className="form-text" />
                                        </div>
                                        <div className="col-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">
                                                Avalúo
                                            </label>
                                            <input
                                                type=""
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                aria-describedby="emailHelp"
                                            />
                                            <div id="emailHelp" className="form-text" />
                                        </div>
                                        <div className="col-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">
                                                Valor Adminitración
                                            </label>
                                            <input
                                                type=""
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                aria-describedby="emailHelp"
                                            />
                                            <div id="emailHelp" className="form-text" />
                                        </div>
                                        <div className="col-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">
                                                Canon de arrendamiento
                                            </label>
                                            <input
                                                type=""
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                aria-describedby="emailHelp"
                                            />
                                            <div id="emailHelp" className="form-text" />
                                        </div>
                                        <div className="col-3">
                                            <label htmlFor="form-select" className="form-label">
                                                Dependencia
                                            </label>
                                            <select className="form-select" aria-label="Default select example">
                                                <option value="1" selected>
                                                    Secretaría Suministros
                                                </option>
                                                <option value="2">Secretaría Salud</option>
                                                <option value="3">Secretaría Cultura</option>
                                            </select>
                                        </div>
                                        <div className="col-3">
                                            <label htmlFor="form-select" className="form-label">
                                                Arrendatario
                                            </label>
                                            <select className="form-select" aria-label="Default select example">
                                                <option value="1" selected>
                                                    Alexander
                                                </option>
                                                <option value="2">Sergio</option>
                                                <option value="3">Ximena</option>
                                            </select>
                                        </div>
                                        <div className="col-3">
                                            <label htmlFor="form-select" className="form-label">
                                                Responsable
                                            </label>
                                            <select className="form-select" aria-label="Default select example">
                                                <option value="1" selected>
                                                    Alexander
                                                </option>
                                                <option value="2">Sergio</option>
                                                <option value="3">Ximena</option>
                                            </select>
                                        </div>
                                        <div className="col-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">
                                                Duración
                                            </label>
                                            <input
                                                type=""
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                aria-describedby="emailHelp"
                                            />
                                            <div id="emailHelp" className="form-text" />
                                        </div>
                                        <div className="col-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">
                                                No. Contrato
                                            </label>
                                            <input
                                                type=""
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                aria-describedby="emailHelp"
                                            />
                                            <div id="emailHelp" className="form-text" />
                                        </div>
                                    </div>
                                    <div
                                        className="row py-3 my-3"
                                        style={{
                                            backgroundColor: '#f7f7f7',
                                            borderRadius: 15,
                                            border: '1px solid',
                                        }}
                                    >
                                        <div className="col-3">
                                            <label htmlFor="form-select" className="form-label">
                                                Tipo Documento
                                            </label>
                                            <select className="form-select" aria-label="Default select example">
                                                <option value="1" selected>
                                                    Escritura
                                                </option>
                                                <option value="2">Matricula</option>
                                                <option value="3">Contrato</option>
                                            </select>
                                        </div>
                                        <div className="col-3">
                                            <div className="mb-3">
                                                <label htmlFor="formFile" className="form-label">
                                                    Default file input example
                                                </label>
                                                <input className="form-control" type="file" id="formFile" />
                                                <div id="emailHelp" className="form-text">
                                                    Escritura.pdf
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-1">
                                            <label htmlFor="" />
                                            <button type="submit" className="btn btn-primary mr-3">
                                                Subir
                                            </button>
                                        </div>
                                    </div>
                                    <div className="d-flex my-3">
                                        <button type="submit" className="btn btn-primary mr-3" >
                                            Guardar
                                        </button>
                                        <button type="submit" className="btn btn-primary mx-3">
                                            Agregar
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <table
                                className="table table-hover text-center table-bordered"
                                style={{ borderRadius: 15 }}
                            >
                                <thead>
                                    <tr>
                                        <th scope="col" className="align-top">
                                            No. Interior
                                        </th>
                                        <th scope="col" className="align-top">
                                            Nombre Inmueble
                                        </th>
                                        <th scope="col" className="align-top">
                                            Superficie
                                        </th>
                                        <th scope="col" className="align-top">
                                            % Servicios Públicos
                                        </th>
                                        <th scope="col" className="align-top">
                                            Acciones
                                            <div className="d-flex justify-content-center">
                                                <p>ver</p>
                                                <p>editar</p>
                                                <p>eliminar</p>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1-2345678</th>
                                        <td>Inmueble 1</td>
                                        <td>
                                            20mt<sup>2</sup>
                                        </td>
                                        <td>30</td>
                                        <td>
                                            <div
                                                className="btn-group"
                                                role="group"
                                                aria-label="Basic mixed styles example"
                                            >
                                                <span>
                                                    <i className="fa fa-eye" aria-hidden="true" />
                                                </span>
                                                <span>
                                                    <i className="fa fa-pencil" aria-hidden="true" />
                                                </span>
                                                <span>
                                                    <i className="fa fa-trash" aria-hidden="true" />
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">1-2345679</th>
                                        <td>Inmueble 2</td>
                                        <td>
                                            20mt<sup>2</sup>
                                        </td>
                                        <td>25</td>
                                        <td>
                                            <div
                                                className="btn-group"
                                                role="group"
                                                aria-label="Basic mixed styles example"
                                            >
                                                <span>
                                                    <i className="fa fa-eye" aria-hidden="true" />
                                                </span>
                                                <span>
                                                    <i className="fa fa-pencil" aria-hidden="true" />
                                                </span>
                                                <span>
                                                    <i className="fa fa-trash" aria-hidden="true" />
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">1-2345670</th>
                                        <td>Inmueble 3</td>
                                        <td>
                                            20mt<sup>2</sup>
                                        </td>
                                        <td>15</td>
                                        <td>
                                            <div
                                                className="btn-group"
                                                role="group"
                                                aria-label="Basic mixed styles example"
                                            >
                                                <span>
                                                    <i className="fa fa-eye" aria-hidden="true" />
                                                </span>
                                                <span>
                                                    <i className="fa fa-pencil" aria-hidden="true" />
                                                </span>
                                                <span>
                                                    <i className="fa fa-trash" aria-hidden="true" />
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="col text-center">
                                <button type="submit" className="btn btn-primary my-3">
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EstateAreas;
