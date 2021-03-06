const mysqlConnect = require('../config');

const getRoles = (req, res) => {
    const sp = 'CALL SP_SEL_ROLES()';

    mysqlConnect.query(sp, (err, result) => {
        if(err){
            res.status(500).send({message: "Error en el servidor."});
        }else{
            res.status(200).json(result[0]);
        }
    })
};

const addRole = (req, res) => {
    const sp = 'CALL SP_INS_ROLE(?,?,?,?,?,?,?)';

    const {
        NAM_ROLE,
        DES_ROLE,
        COD_MODULE,
        QUE,
        INS,
        UPD,
        DEL
    } = req.body

    mysqlConnect.query(sp, [
        NAM_ROLE,
        DES_ROLE,
        COD_MODULE,
        QUE,
        INS,
        UPD,
        DEL
    ], (err, result) => {
        if(err){
            const message = err.message.split(': ')[1];
            res.status(400). send({message});
        }else{
            res.status(200).json({message: 'Rol creado correctamente.'});
        }
    })
};

const delRole = (req, res) => {
    const {codRole} = req.params;

    const sp = 'CALL SP_DEL_ROLE(?)';

    mysqlConnect.query(sp, [codRole], (err, result) => {
        if(err){
            res.status(500).send({message: err});
        }else{
            res.status(200).json({message: 'ok'});
        }
    })
};

const getPermissions = (req, res) => {
    const {codRole} = req.params;

    const sp = 'CALL SP_SEL_PERMISSIONS(?)';

    mysqlConnect.query(sp, [codRole], (err, result) => {
        if(err){
            res.status(500).send({message: "Error en el servidor."});
        }else{
            res.status(200).json(result[0]);
        }
    })
};

const getUserPermissions = (req, res) => {
    const {COD_ROLE} = req.user;

    const sp = 'CALL SP_SEL_PERMISSIONS(?)';

    mysqlConnect.query(sp, [COD_ROLE], (err, result) => {
        if(err){
            res.status(500).send({message: "Error en el servidor."});
        }else{
            res.status(200).json(result[0]);
        }
    })
};

const addPermissions = (req, res) => {
    const {codRole} = req.params;

    const sp = 'CALL SP_INS_PERMISSIONS(?,?,?,?,?,?)';

    const {
        COD_MODULE,
        QUE,
        INS,
        UPD,
        DEL
    } = req.body

    mysqlConnect.query(sp, [
        codRole,
        COD_MODULE,
        QUE,
        INS,
        UPD,
        DEL
    ], (err, result) => {
        if(err){
            const message = err.message.split(': ')[1];
            res.status(400). send({message});
        }else{
            res.status(200).json({message: 'Rol creado correctamente.'});
        }
    })
};

const delPermissions = (req, res) => {
    const {codPermission} = req.params;

    const sp = 'CALL SP_DEL_PERMISSION(?)';

    mysqlConnect.query(sp, [codPermission], (err, result) => {
        if(err){
            res.status(500).send({message: err});
        }else{
            res.status(200).json({message: 'ok'});
        }
    })
};

module.exports = {
    getRoles,
    addRole,
    delRole,
    getPermissions,
    getUserPermissions,
    addPermissions,
    delPermissions
}
