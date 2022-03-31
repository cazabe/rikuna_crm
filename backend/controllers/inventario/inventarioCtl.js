const {sequelize} = require('../../models/sequelize')
const { UniqueConstraintError } = require('sequelize');
const { getFullDateWithTime } = require('../../utils/dates');
const { inventario } = sequelize.models

const createProducts = async (req, res) => {
    try {
        const { producto, cantidad, descripcion } = req.body

        if(!producto || !cantidad || !descripcion) {
            return res
            .status(409)
            .json({
                status: 409,
                message: 'Campos requeridos',
                error: 'Conflicts',
            })
            .end();
        }

        const data = {
            producto: producto,
            cantidad: cantidad,
            descripcion: descripcion,
            created: getFullDateWithTime(),
            estado: 'A'
        }

        await inventario.create(data);

        res.status(200).json({
            status: "OK",
            message: "Producto creado correctamente",
          });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "ERROR", data: "ERROR_SERVIDOR" });
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await inventario.findAll({
            where: {estado: 'A'}
        })
        return res.status(200).json({ status: 'OK', data: products });
    } catch (error) {
        res.status(500).json({ status: 'ERROR', data: 'ERROR_SERVIDOR' });
    }
}

const getOneProduct = async (req, res) => {
    try {
        let id = req.params.id;
        const products = await inventario.findOne({
            where: {id_inventario: id}
        })
        return res.status(200).json({ status: 'OK', data: products });
    } catch (error) {
        res.status(500).json({ status: 'ERROR', data: 'ERROR_SERVIDOR' });
    }
}

const updateProduct = async (req, res) => {
    try {
        const { producto,descripcion} = req.body
        const id = req.params.id

        if(!producto || !descripcion) {
            return res
            .status(200)
            .json({
                message: "Campos requeridos",
                error: "Conflicts",
            })
            .end();
        }

        const data = {
            producto,
            descripcion,
            updated: getFullDateWithTime()
        }

        await inventario.update(data,{
            where: {id_inventario : id},
        });

        res.status(200).json({
            status: "OK",
            message: "Actualizado Coreecto",
          });

    } catch (e) {
        if (e instanceof UniqueConstraintError) {
            res.status(403).json({ status: 'ERROR', data: 'PRODUCTO_YA_EXISTE' });
          } else {
            res.status(500).json({ status: 'ERROR', data: 'ERROR_SERVIDOR' });
          }
    }
}

const updateProductCant = async (req, res) => {
    try {
        const { cantidad } = req.body
        const id = req.params.id

        if( !cantidad ) {
            return res
            .status(200)
            .json({
                message: "Campos requeridos",
                error: "Conflicts",
            })
            .end();
        }

        const prod = await inventario.findOne({
            where: {id_inventario : id}
        })

        const data = {
            cantidad: parseFloat(prod.cantidad) + parseFloat(cantidad),
            updated: getFullDateWithTime()
        }

        await inventario.update(data,{
            where: {id_inventario : id},
        });

        res.status(200).json({
            status: "OK",
            message: "Cantidad de Producto actualizado",
          });
    } catch (e) {
        if (e instanceof UniqueConstraintError) {
            res.status(403).json({ status: 'ERROR', data: 'PRODUCTO_YA_EXISTE' });
          } else {
            res.status(500).json({ status: 'ERROR', data: 'ERROR_SERVIDOR' });
          }
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        let newState;

        const prod = await inventario.findOne({
          where: { id_inventario: id },
        });
      
        if (!prod) {
          return res.status(409).json({ status: 'ERROR', data: 'MODIFICACION_PROHIBIDA' });
        }

        if (prod.estado === 'A') {
          newState = 'I';
          
        }
        else {
          newState = 'A';
        }
        
        await inventario.update({
          estado: newState
        },
          {
            where: { id_inventario: id  }
          }
        );
        
        res.status(200).json({ status: 'OK', message: "Eliminado correctamente",}) 
    } catch (e) {
        if (e instanceof UniqueConstraintError) {
            res.status(403).json({ status: 'ERROR', data: 'PRODUCTO_YA_EXISTE' });
        } else {
            res.status(500).json({ status: 'ERROR', data: 'ERROR_SERVIDOR' });
        }
    }
} 

module.exports = {
    createProducts,
    getProducts,
    getOneProduct,
    updateProduct,
    updateProductCant,
    deleteProduct
}