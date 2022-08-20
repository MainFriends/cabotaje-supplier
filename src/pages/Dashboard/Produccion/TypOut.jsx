
import DataTable from 'react-data-table-component';

import {useEffect, useState, useMemo} from 'react';

import Spinner from '../../../components/Spinner';
import FilterComponent from '../../../components/FilterComponent';
import Modal from '../../../components/Modal';
import AddTypOut from '../../../components/typeOut/AddTypeOut'
import EditTypOut from '../../../components/typeOut/EditTypeOut'


import {paginationComponentOptions} from '../../../helpers/datatablesOptions';
import axios from '../../../config/axios'


import token from '../../../../src/helpers/getToken';
import jsPDF from 'jspdf'
import 'jspdf-autotable';
import logo from '../../../assets/js/logo';
import moment from 'moment';

const dowlandPdfCategory = (filteredItems) => {
    const doc = new jsPDF();
    doc.text('Reporte de Categorias - Cabotaje Supplier',55,30);   
    const image = logo
    doc.addImage(image, 'PNG', 10, 10,20,30,'Cabotaje');

    const nombre = JSON.parse(localStorage.getItem("userSession"));
    const nombreReporte = `${nombre.FIRST_NAME} ${nombre.LAST_NAME}`
    doc.setFontSize(10)
    doc.text(`${moment(new Date()).format('DD-MM-YYYY, h:mm:ss a')}` ,165, 13)
    doc.text(`Impreso por: ${nombreReporte}`, 165, 7)

    const row = filteredItems.map(fila => [
        fila.COD_CATEGORY,
        fila.NAM_CATEGORY,
        fila.DESCRIPTION,
        fila.NAM_STATUS
    ])  
    doc.autoTable({
        head: [['#', 'Categoria', 'Descripcion', 'Estado']],
        body: row.sort(),
        startY: 45,
    })

    doc.save('Categorias de Inventario - Cabotaje Supplier.pdf')
}
    
    const TypOut = () => {  
        const [rows, setRows] = useState([]);
        const [filterText, setFilterText] = useState('');
        const [loading, setLoading] = useState(true);
        const [messageError, setMessageError] = useState('');
        const [sendRequest, setSendRequest] = useState('false');
        const [rowCOD, setRowCOD] = useState(null);
        const [permissions, setPermissions] = useState({});
        
        //definir las columnas
        const columns = [
            {
                id: "id",
                name: 'CODIGO',
                selector: row => row.COD_TYPE,
                sortable: true,
            },
             {
                name: 'NOMBRE',
                selector: row => row.NAM_TYPE,
                sortable: true,
            },
             {
                name: 'DESCRIPCIÓN',
                selector: row => row.DES_TYPE,
                sortable: true,
                wrap:true
            },
            {
                name: 'ACCIONES',
                button: true,
                cell: row => <>
                    <button className={'btn btn-sm btn-warning mr-1 ' + (!permissions.UPD ? ' disabled' : null)} onClick={() => {setRowCOD(row.COD_TYPE)}} data-toggle="modal" data-target='#editFormTypOut'><i className="fa-solid fa-pen-to-square"></i></button>
                    <button className={'btn btn-sm btn-danger ' + (!permissions.DEL ? 'disabled' : null)} onClick={() => handleDelete(row.COD_TYPE) }><i className="fa-solid fa-trash"></i></button>
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
            axios.get('/typeOut', token())
                .then(res => {
                    const {data} = res;
                    setRows(data);
                    setLoading(false);
                    setSendRequest(false);
                })
    
        },[sendRequest]);
    
        const handleDelete = (cod) => {
            axios.delete(`/typeOut/${cod}`, token())
            .then(res => setSendRequest(true))
        }
    
        useEffect(() => {
            axios.get(`/user-permissions`,token())
            .then(res => {
                const result = res.data.find(row => row.COD_MODULE === 6 && row.COD_TABLE === 9)
                setPermissions(result)
            })
        },[])
    
    
        return (
                loading
                ?
                <Spinner />
                :
                <div className="card shadow rounded">
                    <div className="card shadow rounded">
                    <div className="card-header text-dark" >
                Tipos de salidas
                     </div>
            <div className="card-body">
                <div className="row mt-2 ml-1">
                    <div className="col">
                        <button className={'btn btn-sm btn-primary ' + (!permissions.INS ? 'disabled' : null)} data-toggle="modal" data-target='#addTypOut'><i className="fas fa-plus mr-2"></i>Agregar</button>
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
                    defaultSortFieldId="id"
                    defaultSortAsc={false}
                    actions={<button onClick={() => dowlandPdfCategory(filteredItems)} className='btn btn-danger btn-sm'><i className="fa-solid fa-file-pdf mr-2"></i>Descargar</button>}
    
                />
    
                <Modal 
                    idModal='addTypOut'
                    title='Agregar tipo de salida de inventario'
                    messageError={messageError}
                    content={<AddTypOut setSendRequest={setSendRequest} setMessageError={setMessageError}/>}
                />
    
                <Modal 
                    idModal='editFormTypOut'
                    title='Actualizar tipo de salida de inventario'
                    messageError={messageError}
                    content={<EditTypOut rowCOD ={rowCOD} setSendRequest={setSendRequest} setMessageError={setMessageError}/>}
                />
                    </div> 
                    </div>
                </div>                              
    )    
    } 

    export default TypOut;