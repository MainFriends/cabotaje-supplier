import DataTable from 'react-data-table-component';

import {useEffect, useState, useMemo} from 'react';

import Spinner from '../../../components/Spinner';
import FilterComponent from '../../../components/FilterComponent';
import Modal from '../../../components/Modal';
import SelFeesReceivable from '../../../components/accReceivable/SelFeesReceivable';
import AddFeesReceivable from '../../../components/accReceivable/AddFeesReceivable';

import {paginationComponentOptions} from '../../../helpers/datatablesOptions';
import axios from '../../../config/axios';
import token from '../../../helpers/getToken';
import moment from 'moment';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import logo from '../../../assets/js/logo';

const CuentasCobrar = () => {
    const [rows, setRows] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(true);
    const [messageError, setMessageError] = useState('');
    const [sendRequest, setSendRequest] = useState(false);
    const [rowCOD, setRowCOD] = useState(null);

    const dowlandPdfReceivable = () => {
        const doc = new jsPDF();
        doc.text('Reporte de Cuentas por Cobrar - Cabotaje Supplier',40,30);    
        const image = logo
        doc.addImage(image, 'PNG', 10, 10,20,30,'Cabotaje');
        
        const row = rows.map(fila => {
            const fecha = fila.DAT_LIMIT
            return [
                fila.COD_ACC_RECEIVABLE,
                fila.IDENTITY,
                fila.FIRST_NAME,
                fila.LAST_NAME,
                fila.DESCRIPTION,
                fila.TOT_BALANCE,
                moment(fecha).format('DD-MM-YYYY')
            ]
        })  
        doc.autoTable({
            head: [['Codigo', 'Identidad', 'Nombre', 'Apellido', 'Descripcion', 'Monto', 'Fecha Limite']],
            body: row.sort(),
            startY: 45
        })

        doc.save('Cuentas por cobrar - Cabotaje Supplier.pdf')
    }
    
    //definir las columnas
    const columns = [
        {
            name: 'CODIGO',
            selector: row => row.COD_ACC_RECEIVABLE,
            sortable: true,
        },
        {
            name: 'IDENTIDAD',
            selector: row => row.IDENTITY,
            sortable: true,
        },
        {
            name: 'NOMBRE',
            selector: row => row.FIRST_NAME,
            sortable: true,
        },
        {
            name: 'APELLIDO',
            selector: row => row.LAST_NAME,
            sortable: true,
        },
        {
            name: 'DESCRIPCION',
            selector: row => row.DESCRIPTION,
            sortable: true
        },
        {
            name: 'MONTO',
            selector: row => row.TOT_BALANCE,
            sortable: true,
            format: row => `L ${row.TOT_BALANCE.toFixed(2)}`
        },
        {
            name: 'FECHA LIMITE',
            selector: row => row.DAT_LIMIT,
            sortable: true,
            format: row => moment(row.DAT_LIMIT).format('DD-MM-YYYY')
        },
        {
            name: 'ACCIONES',
            button: true,
            cell: row => <>
                <button className='btn btn-sm btn-primary me-1' onClick={() => setRowCOD(row.COD_ACC_RECEIVABLE)} data-toggle="modal" data-target='#idCobrar'><i className="fa-solid fa-eye"></i></button>
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
        axios.get('/accounts-receivable', token())
            .then(res => {
                const {data} = res;
                setRows(data);
                setLoading(false);
                setSendRequest(false);
            })
    },[sendRequest]);

    return (
            loading
            ?
            <Spinner />
            :
            <div className="card shadow rounded">
                <div className="card-header text-dark">
                    Cuentas por Cobrar
                </div>
                <div className="card-body">
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
                        actions={<button onClick={() => dowlandPdfReceivable()} className='btn btn-danger btn-sm'><i className="fa-solid fa-file-pdf mr-2"></i>Descargar</button>}
                    />
                    <Modal 
                        idModal='idCobrar'
                        title='Cuotas de Cobro'
                        messageError={messageError}
                        content={<SelFeesReceivable rowCOD={rowCOD} setSendRequest={setSendRequest} sendRequest={sendRequest}/>}
                    />
                    <Modal 
                        idModal='addCuota'
                        title='Añadir Cuota'
                        messageError={messageError}
                        content={<AddFeesReceivable rowCOD={rowCOD} setSendRequest={setSendRequest} setMessageError={setMessageError} />}
                    />
                </div>
            </div> 
    )
}

export default CuentasCobrar;