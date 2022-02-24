import moment from 'moment';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../acquisitions/redux';

interface DispositionFormPros {
    dispositionType: string;
    realEstate: any;
    contractual: any;
}

export const FormDisposition: FC<DispositionFormPros> = ({ dispositionType, realEstate, contractual }) => {
    const dispatch = useDispatch();
    const tipology: any = useSelector((store: any) => store.acquisitions.tipology.value);
    useEffect(() => {
        dispatch(actions.getTipology(realEstate?.tipology_id));
    }, [dispatch,realEstate]);

    const is_aepDisposition = dispositionType === 'AEP';
    const is_ComodatoDisposition = dispositionType === 'Comodato';
    const is_mtepDisposition = dispositionType === 'MTEP';
    const is_dependenciasDisposition = dispositionType === 'Dependencias';
    const is_ventasDisposition = dispositionType === 'ventas';
    const is_autorizacionesDisposition = dispositionType === 'autorizaciones';
    const showContract =
        !is_aepDisposition &&
        !is_mtepDisposition &&
        !is_dependenciasDisposition &&
        !is_ventasDisposition &&
        !is_autorizacionesDisposition;
    const showAprovechamiento =
        !is_ComodatoDisposition &&
        !is_aepDisposition &&
        !is_mtepDisposition &&
        !is_dependenciasDisposition &&
        !is_ventasDisposition;
    const showInspeccion = !is_dependenciasDisposition && !is_ventasDisposition && !is_autorizacionesDisposition;
    const showCanon =
        !is_ComodatoDisposition &&
        !is_aepDisposition &&
        !is_mtepDisposition &&
        !is_dependenciasDisposition &&
        !is_ventasDisposition &&
        !is_autorizacionesDisposition;

    //const tipologies: ITipologyAttributes[] = useSelector((states: any) => states.acquisitions.tipologies.value);

    // const dispatch = useDispatch()
    //dispatch(actions.getTipologies())
    //console.log(realEstate)
    //realEstate?.tipology_id
    return (
        <div className="col-12">
            <div className="content_box_table">
                <div className="title" style={{ borderBottom: '1px solid #e2e4e4' }}>
                    Datos del bien inmueble
                </div>
                <div className="table_content" style={{ margin: 7 }}>
                    <div className="" style={{ width: '100%' }}>
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">Nombre</label>
                                <div className="my-3">{realEstate?.name}</div>
                            </div>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">Comuna - Barrio</label>
                                <div className="my-3">{realEstate?.address?.location?.commune} - {realEstate?.address?.location?.neighborhood}</div>
                            </div>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">CBML</label>
                                <div className="my-3">{realEstate?.address?.cbmls?.uabi}</div>
                            </div>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">Código Activo Sap</label>
                                <div className="my-3">{realEstate?.active_code}</div>
                            </div>
                        </div>
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">Dirección</label>
                                <div className="my-3">{realEstate?.address?.address}</div>
                            </div>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">Área</label>
                                <div className="my-3">
                                    {realEstate?.total_area} m<sup>2</sup>
                                </div>
                            </div>
                            {dispositionType !== 'autorizaciones' && (
                                <div className="col-12 col-lg-3 col-md-6">
                                    <label htmlFor="">Avalúo</label>
                                    <div className="my-3">$ {realEstate?.patrimonial_value ?? "0"}</div>
                                </div>
                            )}
                            {dispositionType !== 'ventas' && dispositionType !== 'autorizaciones' && (
                                <div className="col-12 col-lg-3 col-md-6">
                                    <label htmlFor="">Tipología</label>
                                    <div className="my-3">{tipology?.tipology}</div>
                                </div>
                            )}
                        </div>
                        {(showInspeccion || showContract || showCanon) && (
                            <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                                {showInspeccion && (
                                    <div className="col-12 col-lg-3 col-md-6">
                                        <label htmlFor="">Última Fecha de Inspección</label>
                                        <div className="my-3">-</div>
                                    </div>
                                )}
                                {showContract && (
                                    <div className="col-12 col-lg-3 col-md-6">
                                        <label htmlFor="">Número contrato</label>
                                        <div className="my-3">{contractual?.consecutive ?? "-"}</div>
                                    </div>
                                )}
                                {showContract && (
                                    <div className="col-12 col-lg-3 col-md-6">
                                        <label htmlFor="">Fecha Terminación Contrato</label>
                                        <div className="my-3">{ contractual?.finish_date ? moment(new Date(Number(contractual?.finish_date))).format('YYYY-MM-DD') === "Fecha inválida" : "-" }</div>
                                    </div>
                                )}
                                {showCanon && (
                                    <div className="col-12 col-lg-3 col-md-6">
                                        <label htmlFor="">Último Canon de Arrendamiento</label>
                                        <div className="my-3">$ {realEstate?.canyon_value === null ? 0 : realEstate?.canyon_value}</div>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="row my-3">
                            {showAprovechamiento && (
                                <>
                                    <div className="col-12 col-lg-3 col-md-6">
                                        <label htmlFor="">Valor de Aprovechamiento</label>
                                        <div className="my-3">$ {realEstate?.exploitation_value === null ? 0 : realEstate?.exploitation_value}</div>
                                    </div>
                                    <div className="col-12 col-lg-3 col-md-6">
                                        <label htmlFor="">Valor Autorización</label>
                                        <div className="my-3">$ {realEstate?.authorization_value === null ? 0 : realEstate?.authorization_value}</div>
                                    </div>
                                </>
                            )}
                            {/* <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">Dependencia</label>
                                <div className="my-3">{realEstate?.dependency}</div>
                            </div>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">Subdpendencia</label>
                                <div className="my-3">{realEstate?.subdependency}</div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

