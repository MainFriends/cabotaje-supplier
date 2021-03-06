import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import axios from '../config/axios';
import token from '../helpers/getToken';

const SidebarItems = () => {

    const {pathname} = useLocation();
    const [role, setRole] = useState(null);
    const [permissions, setPermissions] = useState([]);

    const handleActive = isActive => {
        return "nav-link" + (isActive && " active");
    }

    useEffect(() => {
        axios.get('/user-profile', token())
            .then(res => {
                setRole(res.data[0].COD_ROLE)
            })
    }, [])

    useEffect(() => {
        axios.get('/user-permissions', token())
        .then(res => setPermissions(res.data))
    }, [])

    const viewFacturar = () => {
        return permissions.some(row => row.COD_MODULE === 1);
    }

    return (
        <>
            <li className={ "nav-item " + (pathname === '/dashboard' ? "active" : "")}>
                <NavLink className={handleActive} to="/dashboard">
                <i className="mr-2 fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span>
                </NavLink>
            </li>

            {
                viewFacturar()
                ?
                <li className={ "nav-item"}>
                <NavLink className='nav-link' to="/facturar">
                    <i className="mr-2 fa-solid fa-cash-register"></i>
                    <span>Facturar</span>
                </NavLink>
                </li>
                :
                null
            }

            <hr className="sidebar-divider"></hr>

            <div className="sidebar-heading">
                Módulos
            </div>

            <li className={ "nav-item " + (pathname === '/dashboard/ventas' ? "active" : "")}>
                <a className="nav-link collapsed dinamic" href="#" data-toggle="collapse" data-target="#collapseVenta"
                    aria-expanded="true" aria-controls="collapseTwo">
                    <i className="mr-2 fa-solid fa-chart-line"></i>
                    <span>Ventas</span>
                </a>
                <div className="collapse" id="collapseVenta"  aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Tablas</h6>
                        <NavLink className="collapse-item" to="ventas">Facturas de ventas</NavLink>
                    </div>
                </div>
            </li>

            <li className={ "nav-item " + (pathname === '/dashboard/compras' || pathname === '/dashboard/pedidos' ? "active" : "")}>
                <a className="nav-link collapsed dinamic" href="#" data-toggle="collapse" data-target="#collapseCompra"
                    aria-expanded="true" aria-controls="collapseTwo">
                    <i className="mr-2 fa-solid fa-hand-holding-dollar"></i>
                    <span>Compras</span>
                </a>
                <div className="collapse" id="collapseCompra"  aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Tablas</h6>
                        <NavLink className="collapse-item" to="compras">Facturas de compras</NavLink>
                        <NavLink className="collapse-item" to="pedidos">Pedidos</NavLink>
                    </div>
                </div>
            </li>

            <li className={ "nav-item " + (pathname === '/dashboard/usuarios' || pathname === '/dashboard/clientes' || pathname === '/dashboard/proveedores' ? "active" : "")}>
                <a className="nav-link collapsed dinamic" href="#" data-toggle="collapse" data-target="#collapsePersona"
                    aria-expanded="true" aria-controls="collapseTwo">
                    <i className="mr-2 fas fa-users"></i>
                    <span>Personas</span>
                </a>
                <div className="collapse" id="collapsePersona"  aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Tablas</h6>
                        {
                            role === 1
                            ?
                            <NavLink className="collapse-item" to="usuarios">Usuarios</NavLink>
                            :
                            null
                        }
                        <NavLink className="collapse-item" to="clientes">Clientes</NavLink>
                        <NavLink className="collapse-item" to="proveedores">Proveedores</NavLink>
                    </div>
                </div>
            </li>

            <li className={ "nav-item " + 
                    (pathname === '/dashboard/inventario' || 
                    pathname === '/dashboard/movimientos-inventario' || 
                    pathname === '/dashboard/devoluciones-inventario' || 
                    pathname === '/dashboard/categorias-inventario' || 
                    pathname === '/dashboard/mermas' ? "active" : "")}>
                <a className="nav-link collapsed dinamic" href="#" data-toggle="collapse" data-target="#collapseProduccion"
                    aria-expanded="true" aria-controls="collapseTwo">
                    <i className="mr-2 fas fa-boxes"></i>
                    <span>Producción</span>
                </a>
                <div className="collapse" id="collapseProduccion" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Tablas</h6>
                        <NavLink className="collapse-item" to="inventario">Inventario</NavLink>
                        <NavLink className="collapse-item" to="categorias-inventario">Categorías</NavLink>
                        <NavLink className="collapse-item" to="movimientos-inventario">Movimientos</NavLink>
                        <NavLink className="collapse-item" to="devoluciones-inventario">Devoluciones</NavLink>
                        <NavLink className="collapse-item" to="mermas">Mermas</NavLink>
                    </div>
                </div>
            </li>

            <li className={ "nav-item " + 
                    (pathname === '/dashboard/cuentas-cobrar' || 
                    pathname === '/dashboard/cuentas-pagar' || 
                    pathname === '/dashboard/devoluciones' || 
                    pathname === '/dashboard/rebajas' ||
                    pathname === '/dashboard/planilla-pago' ? "active" : "")}>
                <a className="nav-link collapsed dinamic" href="#" data-toggle="collapse" data-target="#collapseContabilidad"
                    aria-expanded="true" aria-controls="collapseTwo">
                    <i className="mr-2 fas fa-coins"></i>
                    <span>Contabilidad</span>
                </a>
                <div className="collapse" id="collapseContabilidad"  aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Tablas</h6>
                        <NavLink className="collapse-item" to="cuentas-cobrar">Cuentas por cobrar</NavLink>
                        <NavLink className="collapse-item" to="cuentas-pagar">Cuentas por pagar</NavLink>
                        <NavLink className="collapse-item" to="devoluciones">Devoluciones V/C</NavLink>
                        <NavLink className="collapse-item" to="rebajas">Rebajas V/C</NavLink>
                        <NavLink className="collapse-item" to="planilla-pago">Planilla de pago</NavLink>
                    </div>
                </div>
            </li>

            <hr className="sidebar-divider"></hr>

            <div className="sidebar-heading">
                Utilidades
            </div>

            {
                role === 1
                ?
                <li className={ "nav-item " + (pathname === '/dashboard/roles-permisos' ? "active" : "")}>
                    <NavLink className='nav-link' to="roles-permisos">
                    <i className="mr-2 fa-solid fa-user-lock"></i>
                    <span>Roles y permisos</span></NavLink>
                </li>
                :
                null
            }   

            <li className={ "nav-item " + (pathname === '/dashboard/graficas' ? "active" : "")}>
                <NavLink className='nav-link' to="graficas">
                <i className="mr-2 fas fa-chart-pie"></i>
                <span>Gráficas</span></NavLink>
            </li>

        </>
    )
}

export default SidebarItems;