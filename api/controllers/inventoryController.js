const mysqlConnect = require('../config')

const getInventory = (req, res) =>{
    const sp  = 'CALL SP_SEL_INVENTORY(?)';
    mysqlConnect.query(sp, [0], (error, resultado) => {
        if(error){
            res.status(500).send({message :' Error en el servidor'});
        }else{
            res.status(200).json(resultado[0]);
        };
    });
};

const getInventoryS = (req, res) =>{
    const {codInventory} = req.params;
    const sp  = 'CALL SP_SEL_INVENTORY(?)';
    mysqlConnect.query(sp, [codInventory], (error, resultado) => {
        if(error){
            res.status(500).send({message :' Error en el servidor'});
        }else{
            res.status(200).json(resultado[0]);
        };
    });
}

const addInventory = (req, res) => {
  const {
    COD_PRODUCT,
    COD_SUPPLIER,
	NAM_PRODUCT,
    DES_PRODUCT,
    COD_CATEGORY,
    COD_TYP_PRODUCT
    } = req.body

    const sp = 'CALL SP_INS_INVENTORY(?,?,?,?,?,?)';

    mysqlConnect.query(sp,[
        COD_PRODUCT,
        COD_SUPPLIER,
        NAM_PRODUCT,
        DES_PRODUCT,
        COD_CATEGORY,
        COD_TYP_PRODUCT
    ], (error, resultado) => {
        if(error){
            res.status(400).send({message: error.message});
        }else{
            res.status(201).send({message: 'El inventario se ha agregado exitosamente'})
        }
    });
}

const updateInventory = (req, res) =>{
    const {codInventory} = req.params;

    const {
        COD_SUPPLIER,
        NAM_PRODUCT,
        DES_PRODUCT,
        COD_CATEGORY,
        COD_TYP_PRODUCT
        } = req.body
    
        const sp = 'CALL SP_UPD_INVENTORY(?,?,?,?,?,?)';
    
        mysqlConnect.query(sp,[
        codInventory,
        COD_SUPPLIER,
        NAM_PRODUCT,
        DES_PRODUCT,
        COD_CATEGORY,
        COD_TYP_PRODUCT
        ], (error, resultado) => {
            if(error){
                res.status(304).send({message: error.message});
            }else{
                res.status(200).send({message: 'El inventario se ha actualizado exitosamente'})
            }
        });
    }

    const deleteInventory = (req, res) =>{
        const {codInventory} = req.params;
        const sp  = 'CALL SP_DEL_INVENTORY(?)';
        mysqlConnect.query(sp, [codInventory], (error, resultado) => {
            if(error){
                res.status(304).send({message: error.message});
            }else{
                res.status(200).send({message: 'El inventario se ha eliminado exitosamente'})
            };
        });
    };


module.exports = {
    getInventory,
    getInventoryS,
    addInventory,
    updateInventory,
    deleteInventory
}