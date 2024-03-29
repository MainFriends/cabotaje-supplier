import DataTable from 'react-data-table-component';

import {useEffect, useState, useMemo} from 'react';

import Spinner from '../../../components/Spinner';
import FilterComponent from '../../../components/FilterComponent';
import Modal from '../../../components/Modal';
import AddAccountPayForm from '../../../components/accPay/AddAccountPayForm';
import EditAccountPayForm from '../../../components/accPay/EditAccountPayForm';
import SelFeesPay from '../../../components/accPay/SelFeesPay';
import AddFeesPay from '../../../components/accPay/AddFeesPay';

import {paginationComponentOptions} from '../../../helpers/datatablesOptions';
import axios from '../../../config/axios';
import token from '../../../helpers/getToken';
import moment from 'moment';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import logo from '../../../assets/js/logo';  

const CuentasPagar = () => {
    const [rows, setRows] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(true);
    const [messageError, setMessageError] = useState('');
    const [sendRequest, setSendRequest] = useState(false);
    const [rowCOD, setRowCOD] = useState(null);

    const dowlandPdfPay = () => {
        const doc = new jsPDF();
        doc.text('Reporte de Cuentas por Pagar - Cabotaje Supplier',40,30);  
        const image = logo
        doc.addImage(image, 'PNG', 10, 10,20,30,'Cabotaje');

        const row = rows.map(fila => {
            const fecha = fila.DATE_LIMIT
            return [
                fila.COD_ACC_PAY,
                fila.DESCRIPTION,
                fila.TOT_BALANCE,
                moment(fecha).format('DD-MM-YYYY')
            ]
        })  
        doc.autoTable({
            head: [['Codigo', 'Descripcion', 'Monto', 'Fecha Limite']],
            body: row.sort(),
            startY: 45
        })

        doc.save('Cuentas por pagar - Cabotaje Supplier.pdf')
    }
    
    //definir las columnas
    const columns = [
        {
            name: 'CODIGO',
            selector: row => row.COD_ACC_PAY,
            sortable: true,
        },
        {
            name: 'DESCRIPCION',
            selector: row => row.DESCRIPTION,
            sortable: true,
            allowOverflow: true
        },
        {
            name: 'MONTO',
            selector: row => row.TOT_BALANCE,
            sortable: true,
            format: row => `L ${row.TOT_BALANCE.toFixed(2)}`
        },
        {
            name: 'FECHA LIMITE',
            selector: row => row.DATE_LIMIT,
            sortable: true,
            format: row => moment(row.DATE_LIMIT).format('DD-MM-YYYY')
        },
        {
            name: 'ACCIONES',
            button: true,
            cell: row => <>
                <button className='btn btn-sm btn-primary m-1' onClick={() => setRowCOD(row.COD_ACC_PAY)} data-toggle="modal" data-target='#idCobrar'><i className="fa-solid fa-eye"></i></button>
                <button className='btn btn-sm btn-warning mr-1' onClick={() => {setRowCOD(row.COD_ACC_PAY)}} data-toggle="modal" data-target='#editAccountPay'><i className="fa-solid fa-pen-to-square"></i></button>
                <button className='btn btn-sm btn-danger' onClick={() => handleDelete(row.COD_ACC_PAY)}><i className="fa-solid fa-trash"></i></button>
            </>
        }
    ];

    //datos
    const filteredItems = rows.filter(item => JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !== -1);

    //Componente del buscador
    const subHeaderComponentMemo = useMemo(() => {
    	return (
        		<FilterComponent onFilter={e => setFilterText(e.target.value)} filterText={filterText} />
        	);
    }, [filterText]);

    useEffect(() => {
        //PETICION GET
        axios.get('/accounts-pay', token())
           .then(res => {
               const {data} = res;
               setRows(data);
               setLoading(false);
               setSendRequest(false);
           })
    },[sendRequest]);

    const handleDelete = (cod) => {
        axios.delete(`/accounts-pay/${cod}`, token())
           .then(res => setSendRequest(true))
    }

    return (
            loading
            ?
            <Spinner />
            :
            <div className="card shadow rounded">
                <div className="card-header text-dark">
                    Cuentas por Pagar
                </div>
                <div className="card-body">
                    <div className="row mt-2 ml-1">
                        <div className="col">
                            <button className='btn btn-sm btn-primary' data-toggle="modal" data-target='#addAccountPay'><i className="fas fa-plus mr-2"></i>Agregar</button>
                        </div>
                    </div>
                    <DataTable
                        columns={columns}
                        data={filteredItems}
                        responsive
                        pagination
                        paginationComponentOptions={paginationComponentOptions}
                        subHeader
                        subHeaderComponent={subHeaderComponentMemo}
                        highlightOnHover
                        striped
                        persistTableHead 
                        actions={<button onClick={() => dowlandPdfPay()} className='btn btn-danger btn-sm'><i className="fa-solid fa-file-pdf mr-2"></i>Descargar</button>}
                    />

                    <Modal 
                        idModal='addAccountPay'
                        title='Agregar Cuenta por Pagar'
                        messageError={messageError}
                        content={<AddAccountPayForm setSendRequest={setSendRequest} setMessageError={setMessageError} />}
                    />
                    <Modal 
                        idModal='editAccountPay'
                        title='Actualizar Cuenta por Pagar'
                        messageError={messageError}
                        content={<EditAccountPayForm rowCOD={rowCOD} setSendRequest={setSendRequest} />}
                    />
                    <Modal 
                        idModal='idCobrar'
                        title='Cuotas de Pago'
                        messageError={messageError}
                        content={<SelFeesPay rowCOD={rowCOD} setSendRequest={setSendRequest} sendRequest={sendRequest}/>}
                    />
                    
                    <Modal
                        idModal='addCuotaPay'
                        title='Añadir Cuota'
                        messageError={messageError}
                        content={<AddFeesPay rowCOD={rowCOD} setSendRequest={setSendRequest} setMessageError={setMessageError} />}
                    />
                </div>
            </div> 
    )
}

export default CuentasPagar;