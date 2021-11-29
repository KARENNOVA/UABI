import React from 'react'
import { Link } from '../../../../utils/ui'
import ContractViewForm from '../../components/Contractual/ContractViewForm'

const DetailContract = () => {
    return (
        <div className="h-100 d-flex flex-column">
            <div className="flex-fill overflow-auto">
                <div className="bg-white d-flex flex-column h-100">
                    <div className="d-flex flex-row mb-3 pt-3 ps-4 shadow-sm p-3 bg-white rounded">
                        <h5 className='col-11 '>Detalle Contrato</h5>
                        <Link
                            to={`/disposition/contract/edit/:id/`}
                            name=""
                            avatar={false}
                            icon={<i style={{ marginLeft: '30px', fontSize: 16, color: '#000' }} className="fa fa-pencil" aria-hidden="true" />}
                        />
                    </div>
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-md-12">
                                {/* <UserViewForm user={user} /> */}
                                <ContractViewForm />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="bg-white d-flex flex-row justify-content-between"
                style={{ padding: 16, borderTop: '1px solid #ccc' }}
            >
                <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => {
                        // history.goBack();
                    }}
                >
                    Atras
                </button>
            </div>
        </div>
    )
}

export default DetailContract
