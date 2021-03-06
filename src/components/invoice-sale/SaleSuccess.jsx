import React from 'react'

const SaleSuccess = ({saleMessage, setsaleInvoice, setCurrentPage, setproductListSale}) => {
    const {message, ok} = saleMessage;

    const onCheck = () => {
        if(ok){
            setsaleInvoice({
                COD_CLIENT: 1,
                NAM_CLIENT: 'CF',
                COD_USER: '', 
                NAM_USER: '',
                SUBTOTAL: 0,
                TOT_DISCOUNT: 0,
                TOT_ISV: 0,
                TOT_SALE: 0,
                TYP_TO_SALE: 'Contado',
                COD_TYP_PAY: 1,
                RTN: 0
            })
            
            setproductListSale([])
            setCurrentPage(1)
        }
    }

  return (
        <div className="modal fade" id="saleSuccess" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-success">
            <div className="modal-content">
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                {
                    ok
                    ?
                        <h3 className="alert alert-success text-center mx-0" role="alert">
                            <strong><i className="fa-solid fa-circle-check mr-3"></i></strong>{message}
                        </h3>
                    :
                    <h3 className="alert alert-danger text-center mx-0" role="alert">
                            <strong><i className="fa-solid fa-circle-check mr-3"></i></strong>{message}
                    </h3>
                }
            </div>
                <div className="modal-footer">
                    <button onClick={() => onCheck()} to='/facturar' type="button" className="btn btn-primary" data-dismiss="modal">Listo</button>
                </div>
            </div>
        </div>
        </div>
  )
}

export default SaleSuccess