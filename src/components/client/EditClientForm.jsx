import { useEffect, useState } from "react";
import axios from '../../config/axios';
import token from '../../helpers/getToken';
import { toUpperCase } from "../../helpers/Mayusculas";

const EditClientForm = ({rowCOD, setSendRequest, setMessageError}) => {

    const [formEditClient, setFormEditClient] = useState({
        FIRST_NAME: '',
        LAST_NAME: '',
        IDENTITY: '',
        NUM_PHONE_ONE: '',
        NUM_PHONE_TWO: '',
        ADDRESS: '',
        RTN: ''
    })

    const handleInputChange = (e) => {
        setFormEditClient({
            ...formEditClient,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if(rowCOD){
            axios.get(`/client/${rowCOD}`, token())
            .then(res => {
                setFormEditClient({
                    ...res.data[0]
                })
            })
        }
    }, [rowCOD])

    const handleSubmitClient = (e) => {
        e.preventDefault();

        if(formEditClient.NUM_PHONE_TWO === ''){
            delete formEditClient['NUM_PHONE_TWO']
        }

        axios.put(`/client/${rowCOD}`,formEditClient, token())
            .then(res => {
                document.querySelector('#idCloseEditForm').click();
                setSendRequest(true);
            })
            .catch(err => {
                const {message} = err.response.data;
                setMessageError(message)

                setTimeout(() => {
                    setMessageError('')
                }, 3000);
            })
    }

    return(
        <form id='editFormClient' onSubmit={handleSubmitClient} action='#'>
            <div className="row mb-4">
                <div className="col-md-4">
                    <label className='form-label' htmlFor="FIRST_NAME">Nombre<span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange} value={formEditClient.FIRST_NAME} className='form-control' name='FIRST_NAME' type="text" pattern="^[a-zA-ZñÑáéíóú ]+$"  title="Primer nombre no debe contener carácteres especiales y/o númericos." onInput={toUpperCase} required/>
                </div>
                <div className="col-md-4">
                    <label className='form-label' htmlFor="LAST_NAME">Apellido<span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange} value={formEditClient.LAST_NAME} className='form-control' name='LAST_NAME' type="text"  pattern="^[a-zA-ZñÑáéíóú ]+$" title="Primer nombre no debe contener carácteres especiales y/o númericos." onInput={toUpperCase}required/>
                </div>
                <div className="col-md-4">
                    <label className='form-label' htmlFor="IDENTITY">Identidad<span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange} value={formEditClient.IDENTITY} className='form-control' name='IDENTITY'  minlenght={13} maxLength={13}  type="text" pattern="^[0-1][0-9]{12}"  title="Identidad debe comenzar con cero o uno, contener 13 carácteres númericos, sin guiones ni espacios." required/>
                </div>
                <div className="col-md-3 mt-2">
                    <label className='form-label' htmlFor="NUM_PHONE_ONE">Teléfono 1<span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange} value={formEditClient.NUM_PHONE_ONE} className='form-control' name='NUM_PHONE_ONE' type="tel" pattern="[0-9]{8}" minLength={8}  maxLength={8} title="El número telefónico debe contener 8 caracteres númericos, sin guiones ni espacios."  required/>
                </div>
                <div className="col-md-3 mt-2">
                    <label className='form-label' htmlFor="NUM_PHONE_TWO">Teléfono 2</label>
                    <input onChange={handleInputChange} value={formEditClient.NUM_PHONE_TWO === 0 ? '' : formEditClient.NUM_PHONE_TWO} className='form-control' name='NUM_PHONE_TWO' type="tel" pattern="[0-9]{8}" min={0}  maxLength={8} title="El número telefónico debe contener 8 caracteres númericos, sin guiones ni espacios."/>
                    <small className="form-text text-muted">Opcional</small>
                </div>
                <div className="col-md-6 mt-2">
                    <label className='form-label' htmlFor="ADDRESS">Dirección<span className="text-danger"> *</span></label>
                    <textarea onChange={handleInputChange} value={formEditClient.ADDRESS} className='form-control' name='ADDRESS'  rows='3' cols='4' type="text" pattern="^[a-zA-Z0-9ñÑØº-_ ]+$" onInput={toUpperCase} required/>
                </div>
                <div className="col-md-6">
                    <label className='form-label' htmlFor="RTN">RTN<span className="text-danger"> *</span></label>
                    <input onChange={handleInputChange} value={formEditClient.RTN} className='form-control' name='RTN' type="text" minLength={14}  maxLength={14}  pattern="^[0-1][0-9]{13}" title="RTN debe comenzar con cero o uno, contener 14 carácteres númericos, sin guiones ni espacios." required/>
                </div>
            </div>
            
            <div className="modal-footer">
                <button type="button" id='idCloseEditForm' className="btn btn-primary" data-dismiss="modal">Cerrar</button>
                <button type='submit' className="btn btn-success">Guardar</button>
            </div>
        </form>
    )
}



export default EditClientForm;