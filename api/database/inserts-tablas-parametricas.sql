/* TABLAS PARAMETRICAS */

-- MODULOS
INSERT INTO MODULES(NAM_MODULE, DESCRIPTION)
VALUES('Dashboard', NULL);
INSERT INTO MODULES(NAM_MODULE, DESCRIPTION)
VALUES('Facturar', NULL);
INSERT INTO MODULES(NAM_MODULE, DESCRIPTION)
VALUES('Ventas', NULL);
INSERT INTO MODULES(NAM_MODULE, DESCRIPTION)
VALUES('Compras', NULL);
INSERT INTO MODULES(NAM_MODULE, DESCRIPTION)
VALUES('Personas', NULL);
INSERT INTO MODULES(NAM_MODULE, DESCRIPTION)
VALUES('Producción', NULL);
INSERT INTO MODULES(NAM_MODULE, DESCRIPTION)
VALUES('Gestión contable', NULL);
INSERT INTO MODULES(NAM_MODULE, DESCRIPTION)
VALUES('Seguridad', NULL);
INSERT INTO MODULES(NAM_MODULE, DESCRIPTION)
VALUES('Gráficas', NULL);

-- TABLAS
INSERT INTO TABLES(COD_MODULE, NAM_TABLE)
VALUES(1, 'Dashboard');
INSERT INTO TABLES(COD_MODULE, NAM_TABLE)
VALUES(2, 'Facturar');
INSERT INTO TABLES(COD_MODULE, NAM_TABLE)
VALUES(3, 'Ventas');
INSERT INTO TABLES(COD_MODULE, NAM_TABLE)
VALUES(4, 'Compras');
INSERT INTO TABLES(COD_MODULE, NAM_TABLE)
VALUES(4, 'Pedidos');
INSERT INTO TABLES(COD_MODULE, NAM_TABLE)
VALUES(5, 'Clientes');
INSERT INTO TABLES(COD_MODULE, NAM_TABLE)
VALUES(5, 'Proveedores');
INSERT INTO TABLES(COD_MODULE, NAM_TABLE)
VALUES(6, 'Inventario');
INSERT INTO TABLES(COD_MODULE, NAM_TABLE)
VALUES(6, 'Categorías');
INSERT INTO TABLES(COD_MODULE, NAM_TABLE)
VALUES(6, 'Movimientos');
INSERT INTO TABLES(COD_MODULE, NAM_TABLE)
VALUES(6, 'Entradas');
INSERT INTO TABLES(COD_MODULE, NAM_TABLE)
VALUES(6, 'Salidas');
INSERT INTO TABLES(COD_MODULE, NAM_TABLE)
VALUES(7, 'Cuentas cobrar');
INSERT INTO TABLES(COD_MODULE, NAM_TABLE)
VALUES(7, 'Cuentas pagar');
INSERT INTO TABLES(COD_MODULE, NAM_TABLE)
VALUES(7, 'Devoluciones');
INSERT INTO TABLES(COD_MODULE, NAM_TABLE)
VALUES(7, 'Rebajas');
INSERT INTO TABLES(COD_MODULE, NAM_TABLE)
VALUES(7, 'Planilla');
INSERT INTO TABLES(COD_MODULE, NAM_TABLE)
VALUES(8, 'Usuarios');
INSERT INTO TABLES(COD_MODULE, NAM_TABLE)
VALUES(8, 'Roles permisos');
INSERT INTO TABLES(COD_MODULE, NAM_TABLE)
VALUES(8, 'Bitácora de usuarios');
INSERT INTO TABLES(COD_MODULE, NAM_TABLE)
VALUES(9, 'Gráficas');

-- TABLA DE ROLES
INSERT INTO ROLE(NAM_ROLE, DES_ROLE) VALUES ('Administrador', 'Permisos totales.');
INSERT INTO ROLE(NAM_ROLE, DES_ROLE) VALUES ('Usuario', 'Solo lectura.');

-- TABLA DE PERMISOS A ADMINISTRADOR
INSERT INTO PERMISSIONS(COD_ROLE, COD_MODULE, COD_TABLE, INS, DEL, UPD, QUE) VALUES(1, 1, 1, 1, 1, 1, 1);
INSERT INTO PERMISSIONS(COD_ROLE, COD_MODULE, COD_TABLE, INS, DEL, UPD, QUE) VALUES(1, 2, 2, 1, 1, 1, 1);
INSERT INTO PERMISSIONS(COD_ROLE, COD_MODULE, COD_TABLE, INS, DEL, UPD, QUE) VALUES(1, 3, 3, 1, 1, 1, 1);
INSERT INTO PERMISSIONS(COD_ROLE, COD_MODULE, COD_TABLE, INS, DEL, UPD, QUE) VALUES(1, 4, 4, 1, 1, 1, 1);
INSERT INTO PERMISSIONS(COD_ROLE, COD_MODULE, COD_TABLE, INS, DEL, UPD, QUE) VALUES(1, 4, 5, 1, 1, 1, 1);
INSERT INTO PERMISSIONS(COD_ROLE, COD_MODULE, COD_TABLE, INS, DEL, UPD, QUE) VALUES(1, 5, 6, 1, 1, 1, 1);
INSERT INTO PERMISSIONS(COD_ROLE, COD_MODULE, COD_TABLE, INS, DEL, UPD, QUE) VALUES(1, 5, 7, 1, 1, 1, 1);
INSERT INTO PERMISSIONS(COD_ROLE, COD_MODULE, COD_TABLE, INS, DEL, UPD, QUE) VALUES(1, 6, 8, 1, 1, 1, 1);
INSERT INTO PERMISSIONS(COD_ROLE, COD_MODULE, COD_TABLE, INS, DEL, UPD, QUE) VALUES(1, 6, 9, 1, 1, 1, 1);
INSERT INTO PERMISSIONS(COD_ROLE, COD_MODULE, COD_TABLE, INS, DEL, UPD, QUE) VALUES(1, 6, 10, 1, 1, 1, 1);
INSERT INTO PERMISSIONS(COD_ROLE, COD_MODULE, COD_TABLE, INS, DEL, UPD, QUE) VALUES(1, 6, 11, 1, 1, 1, 1);
INSERT INTO PERMISSIONS(COD_ROLE, COD_MODULE, COD_TABLE, INS, DEL, UPD, QUE) VALUES(1, 6, 12, 1, 1, 1, 1);
INSERT INTO PERMISSIONS(COD_ROLE, COD_MODULE, COD_TABLE, INS, DEL, UPD, QUE) VALUES(1, 7, 13, 1, 1, 1, 1);
INSERT INTO PERMISSIONS(COD_ROLE, COD_MODULE, COD_TABLE, INS, DEL, UPD, QUE) VALUES(1, 7, 14, 1, 1, 1, 1);
INSERT INTO PERMISSIONS(COD_ROLE, COD_MODULE, COD_TABLE, INS, DEL, UPD, QUE) VALUES(1, 7, 15, 1, 1, 1, 1);
INSERT INTO PERMISSIONS(COD_ROLE, COD_MODULE, COD_TABLE, INS, DEL, UPD, QUE) VALUES(1, 7, 16, 1, 1, 1, 1);
INSERT INTO PERMISSIONS(COD_ROLE, COD_MODULE, COD_TABLE, INS, DEL, UPD, QUE) VALUES(1, 7, 17, 1, 1, 1, 1);
INSERT INTO PERMISSIONS(COD_ROLE, COD_MODULE, COD_TABLE, INS, DEL, UPD, QUE) VALUES(1, 8, 18, 1, 1, 1, 1);
INSERT INTO PERMISSIONS(COD_ROLE, COD_MODULE, COD_TABLE, INS, DEL, UPD, QUE) VALUES(1, 8, 19, 1, 1, 1, 1);
INSERT INTO PERMISSIONS(COD_ROLE, COD_MODULE, COD_TABLE, INS, DEL, UPD, QUE) VALUES(1, 8, 20, 1, 1, 1, 1);
INSERT INTO PERMISSIONS(COD_ROLE, COD_MODULE, COD_TABLE, INS, DEL, UPD, QUE) VALUES(1, 9, 21, 1, 1, 1, 1);

-- TABLA DE ESTADOS
INSERT INTO STATUS(NAM_STATUS, DES_STATUS) VALUES('Activo', 'Estado activo.');
INSERT INTO STATUS(NAM_STATUS, DES_STATUS) VALUES('Inactivo', 'Estado Inactivo.');
INSERT INTO STATUS(NAM_STATUS, DES_STATUS) VALUES('Revisado', 'El lote ha sido revisado.');
INSERT INTO STATUS(NAM_STATUS, DES_STATUS) VALUES('Sin revisar', 'El lote se encuentra sin revisar.');
INSERT INTO STATUS(NAM_STATUS, DES_STATUS) VALUES('En proceso', 'Pedido procesado pero no recibido.');
INSERT INTO STATUS(NAM_STATUS, DES_STATUS) VALUES('Recibido', 'El pedido ha sido recibido.');

-- TABLA TIPO DE PAGO
INSERT INTO TYPE_TO_PAY(NAM_TYPE_PAY) VALUES('Efectivo');
INSERT INTO TYPE_TO_PAY(NAM_TYPE_PAY) VALUES('Tarjeta');
INSERT INTO TYPE_TO_PAY(NAM_TYPE_PAY) VALUES('Transferencia');

-- TABLA TIPO DE PRODUCTO
INSERT INTO TYPE_PRODUCT(NAM_TYPE_PRODUCT) VALUES('Unidad');
INSERT INTO TYPE_PRODUCT(NAM_TYPE_PRODUCT) VALUES('Peso/Volumen');

-- CATEGORIAS
INSERT INTO CATEGORY(NAM_CATEGORY, DESCRIPTION, COD_STATUS) VALUES('Carnes', null, 1);
INSERT INTO CATEGORY(NAM_CATEGORY, DESCRIPTION, COD_STATUS) VALUES('Refrescos', null, 1);
INSERT INTO CATEGORY(NAM_CATEGORY, DESCRIPTION, COD_STATUS) VALUES('Lacteos', null, 1);
INSERT INTO CATEGORY(NAM_CATEGORY, DESCRIPTION, COD_STATUS) VALUES('Verduras', null, 1);

-- CLIENTE CONSUMIDOR FINAL
INSERT INTO CLIENT(IDENTITY, FIRST_NAME, LAST_NAME, SECOND_LAST_NAME, ADDRESS, NUM_PHONE_ONE, NUM_PHONE_TWO, RTN)
VALUES(0, 'CF', '', '', '', 0, 0, 0);

-- TIPOS DE ENTRADAS
INSERT INTO TYP_PRODUCT_ENTRIES(NAM_TYPE, DES_TYPE)
VALUES('Compra', 'Compra a proveedores');
INSERT INTO TYP_PRODUCT_ENTRIES(NAM_TYPE, DES_TYPE)
VALUES('Devolución', 'Devoluciones entrantes');

-- TIPOS DE SALIDAS
INSERT INTO TYP_PRODUCT_OUTPUT(NAM_TYPE, DES_TYPE)
VALUES('Venta', 'Venta a proveedores');
INSERT INTO TYP_PRODUCT_OUTPUT(NAM_TYPE, DES_TYPE)
VALUES('Devolución', 'Devoluciones a proveedores');
INSERT INTO TYP_PRODUCT_OUTPUT(NAM_TYPE, DES_TYPE)
VALUES('Merma', 'Mermas de productos');

-- TIPOS DE ENTRADAS
INSERT INTO TYP_PRODUCT_ENTRIES(NAM_TYPE, DES_TYPE)
VALUES('Compra', 'Compra a proveedores');
INSERT INTO TYP_PRODUCT_ENTRIES(NAM_TYPE, DES_TYPE)
VALUES('Devolución', 'Devoluciones entrantes');

-- TIPOS DE SALIDAS
INSERT INTO TYP_PRODUCT_OUTPUT(NAM_TYPE, DES_TYPE)
VALUES('Venta', 'Venta a proveedores');
INSERT INTO TYP_PRODUCT_OUTPUT(NAM_TYPE, DES_TYPE)
VALUES('Devolución', 'Devoluciones a proveedores');
INSERT INTO TYP_PRODUCT_OUTPUT(NAM_TYPE, DES_TYPE)
VALUES('Merma', 'Mermas de productos');

INSERT INTO COMPANY_DATA(COMPANY_NAM, COMPANY_ADDRESS, COMPANY_EMAIL, COMPANY_RTN, COMPANY_PHONE, COMPANY_LOCATION, COMPANY_FACEBOOK, COMPANY_INSTAGRAM, COMPANY_WHATSAPP, COD_USER)
VALUES('Cabotaje Supplier', 'Colonia Kennedy', 'cabotajesupplier@gmail.com', NULL, 96615148, 'Tegucigalpa, Francisco Morazán', NULL, NULL, NULL, 1);

INSERT INTO SYSTEM_SETTINGS(NUM_DAYS_PASSWORD_EXPIRED, NUM_ATTEMPS_LOGIN, COD_USER)
VALUES(30, 5, 1);