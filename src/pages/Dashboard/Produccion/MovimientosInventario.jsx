import DataTable from 'react-data-table-component';

import {useEffect, useState, useMemo} from 'react';

import Spinner from '../../../components/Spinner';
import FilterComponent from '../../../components/FilterComponent';
import Modal from '../../../components/Modal';


import {paginationComponentOptions} from '../../../helpers/datatablesOptions';
import axios from '../../../config/axios'
import moment from 'moment';


import token from '../../../../src/helpers/getToken';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import logo from '../../../assets/js/logo'; 

const dowlandPdf = (filteredItems) => {
    const doc = new jsPDF();
    doc.text('Reporte de Movimientos - Cabotaje Supplier',50,30); 
    const image = logo
    doc.addImage(image, 'PNG', 10, 10,20,30,'Cabotaje'); 

    const nombre = JSON.parse(localStorage.getItem("userSession"));
    const nombreReporte = `${nombre.FIRST_NAME} ${nombre.LAST_NAME}`
    doc.setFontSize(10)
    doc.text(`${moment(new Date()).format('DD-MM-YYYY, h:mm:ss a')}` ,165, 13)
    doc.text(`Impreso por: ${nombreReporte}`, 165, 7)

    const row = filteredItems.map(fila => {
        const fecha = fila.DAT_TRANSACTION
        return [
            fila.COD_PRODUCT,
            fila.NAM_PRODUCT,
            fila.TYP_TRANSACTION,
            fila.CANT,
            fila.NUM_LOT,
            moment(fecha).format('DD-MM-YYYY')
        ]
    })  
    doc.autoTable({
        head: [['#', 'Producto', 'Tip. de transaccion', 'Cant. productos', 'N. Lote', 'Fecha de merma']],
        body: row.sort(),
        startY: 45
    })

    doc.save('Movimientos de inventario - Cabotaje Supplier.pdf')
}

const MovimientosInventario = () => {
    const [rows, setRows] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(true);
    const [sendRequest, setSendRequest] = useState('false');
    
    //definir las columnas
    const columns = [
         {
            name: 'SKU',
            selector: row => row.COD_PRODUCT,
            sortable: true,
        },
        {
            name: 'PRODUCTO',
            selector: row => row.NAM_PRODUCT,
            sortable: true,
        },
         {
            name: 'TIPO DE TRANSACCIÓN',
            selector: row => row.TYP_TRANSACTION,
            sortable: true,
        },
        {
            name: 'CANTIDAD',
            selector: row => row.CANT,
            sortable: true,
            format: row => (/^[Entrada]/.test(row.TYP_TRANSACTION) ? (<span><i className="fa-solid fa-circle-arrow-up text-success"></i> {row.CANT}</span>) : (<span><i className="fa-solid fa-circle-arrow-down text-danger"></i> {row.CANT}</span>)),
        },
        {
            name: 'NÚMERO DE LOTE',
            selector: row => row.NUM_LOT,
            sortable: true,
        },
        {
            id: "id",
            name: 'FECHA',
            selector: row => row.DAT_TRANSACTION,
            sortable: true,
            format : row => moment(row.DAT_TRANSACTION).format('DD-MM-YYYY h:mm:ss A')
        },
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
        axios.get('/inventoryTransactions', token())
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
                   Movimientos Inventario
                </div>
                <div className="card-body">
                    <div className="row mt-2 ml-1">
                
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
                        defaultSortFieldId="id"
                        defaultSortAsc={false}
                        actions={<button onClick={() => dowlandPdf(filteredItems)} className='btn btn-danger btn-sm'><i className="fa-solid fa-file-pdf mr-2"></i>Descargar</button>}
                    />
                </div>
            </div> 
    )
}

export default MovimientosInventario;