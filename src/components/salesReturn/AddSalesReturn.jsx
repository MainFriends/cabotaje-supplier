import { useState, useEffect } from "react";
import axios from "../../config/axios";
import token from "../../helpers/getToken";
import moment from "moment";

const AddSalesReturn = ({setSendRequest, setMessageError}) => {
    const [formAddSalesReturn, setFormAddSalesReturn] = useState({
        COD_PRODUCT: '',
        CANT: 0,
        NAM_TYPE_PRODUCT: '',
        AMOUNT: 0,
        DAT_RETURN: ''
    });

    const handleInputChange = (e) => {
        setFormAddSalesReturn({
            ...formAddSalesReturn,
            [e.target.name] : e.target.value
        })
    }
 // Estados que manejaran el nombre del producto y del usuario 
 const [productName, setProductName] = useState('');

 useEffect(() => {
     axios.get(`/inventory/${formAddSalesReturn.COD_PRODUCT}`, token())
        .then(res => {
            const {NAM_PRODUCT} = res.data[0];
            setProductName(`${NAM_PRODUCT}`)
        })
        .catch(err => {
            setProductName('Producto no encontrado')
        })
 },[formAddSalesReturn.COD_PRODUCT]); 

    const handleSubmitSalesReturn = (e) => {
        e.preventDefault();
        axios.post('/sales-returns', formAddSalesReturn, token())
            .then(res => {
                document.querySelector('#idCloseAddSalesReturn').click();
                e.target.reset();
                setSendRequest(true);
                setProductName('');
            })
            .catch(err => {
                const {message} = err.response.data;
                setMessageError(message);
                setTimeout(() => {
                    setMessageError('');
                }, 3000);
            })
    }


   

    return(
        <form id='addFormSalesReturn' onSubmit={handleSubmitSalesReturn} action='#'>
            <div className="row mb-4">
                <div className="col-md-4">
                    <label className='form-label' htmlFor="COD_PRODUCT">SKU <span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange}  className='form-control'  name='COD_PRODUCT' type="text" required/>
                </div>
                <div className="col-md-5">
                    <label className='form-label' htmlFor="PRODUCT">Producto</label>
                    <input className='form-control' value={productName} name='PRODUCT' type="text" required disabled/>
                </div>
                <div className="col-md-5 mt-2">
                    <label className='form-label' htmlFor="DESCRIPTION">Descripción</label>
                    <textarea onChange={handleInputChange} className='form-control' name='DESCRIPTION' type="text" rows={3}  wrap="hard"  required/>
                </div>
                <div className="col-md-3 mt-2">
                    <label className='form-label' htmlFor="CANT">Cantidad <span className="text-danger"> *</span> </label>
                    <input className='form-control' onChange={handleInputChange} name='CANT' type="number" required/>
                </div>
                <div className="col-md-4 mt-2">
                    <label className='form-label' htmlFor="AMOUNT">Monto <span className="text-danger"> *</span> </label>
                    <input className='form-control' onChange={handleInputChange} name='AMOUNT' type="number" required/>
                </div>
                <div className="col-md-4 mt-2">
                    <label className='form-label' htmlFor="DAT_RETURN">Fecha <span className="text-danger"> *</span> </label>
                    <input max={moment().format('YYYY-MM-DD')} className='form-control' onChange={handleInputChange} name='DAT_RETURN' type="date" required/>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" id='idCloseAddSalesReturn' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
                <button type='submit' className="btn btn-success">Guardar</button>
            </div>
        </form>
    )
} 

export default AddSalesReturn;