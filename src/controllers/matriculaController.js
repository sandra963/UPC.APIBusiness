const { busquedaColegioVacantes , insertarContactenos, 
    busquedaFormularioxDnixCodigoformulario, obtenerUbicacionColegio, 
    registrarFormulario , listarSolicitudes, aprobarSolicitud , recharzarSolicitud,
    crearSeccion_Colegio, obtenerColegios , 
    obtenerDepartamentos,
    obtenerProvinciaxDeprtamento,
    obtenerDistritoxProvincia } = require('../database/connection')

const buscarColegioVacantes = async(req , res ) => {

 

    try {
        const { p_distritoColegio  , p_provinciaColegio , p_departamentoColegio , p_nivel , p_grado  } = req.body;
    
        const data = await busquedaColegioVacantes(p_distritoColegio , p_provinciaColegio , p_departamentoColegio , p_nivel , p_grado )
        
        return res.status(200).json({
            ok:true,
            data
        });
    } catch (error) {
        return res.status(500).json({
            ok:false,
            error
        })
    }
}

const crearContactenos = async (req , res ) => {

    try {
        const { p_nombres , p_numero, p_correo, p_mensaje }  = req.body;

        const creado = await insertarContactenos(p_nombres , p_numero , p_correo , p_mensaje )
    
        if(creado){
            return res.status(201).json({
                ok:true,
                msg:'Contacto registrado correctamente'
            });
        }else{
            return res.status(500).json({
                ok:true,
                msg:'Error al registrar el contacto'
            });
        }
    
    } catch (error) {
        return res.status(500).json({
            ok:false,
            error
        })

    }

}

const busquedaFormulario = async (req, res ) => {

    try {
        const { p_dni_alumno , 
                p_tipo_dni_alumno , 
                p_dni_apoderado , 
                p_tipo_dni_apoderado,
                p_motivo }  = req.body;

        const data = await busquedaFormularioxDnixCodigoformulario(p_dni_alumno , 
            p_tipo_dni_alumno , 
            p_dni_apoderado , 
            p_tipo_dni_apoderado,
            p_motivo);
    

    return res.status(200).json({
        ok:true,
        data
    });  
    } catch (error) {
        return res.status(500).json({
            ok:false,
            error
        })
    }
}

const getUbigeo = async (req , res ) => {


    try {
        const data = await obtenerUbicacionColegio();

        return res.status(200).json({
            ok:true,
            data
        });


    } catch (error) {
        return res.status(500).json({
            ok:false,
            error
        })
    }
}

const crearFormulario = async ( req , res ) => {


    try {

        const formulario  = req.body;

        const registro = await registrarFormulario(formulario);

        if(registro){
            return res.status(201).json({
                ok:true,
                msg:'Creado exitosamente'
            });
        }else{
            return res.status(500).json({
                ok:true,
                msg:'error'
            });
        }
        
    } catch (error) {
        return res.status(500).json({
            ok:false,
            error
        })
    }
}

const getSolicitudesPendientes = async( req , res ) => {

    try {
        const data = await listarSolicitudes();

        return res.status(200).json({
            ok:true,
            data
        });


    } catch (error) {
        return res.status(500).json({
            ok:false,
            error
        })
    }

}

const aprobarSolicitudes = async (req , res ) => {

    const { formularioId } = req.body;
    const data =  await aprobarSolicitud(formularioId)

    return res.status(201).json({
        ok:true,
        data
    })
}

const rechazarSolicitudes = async (req , res ) => {

    const { formularioId } = req.body;

    const data =  await recharzarSolicitud(formularioId)

    return res.status(201).json({
        ok:true,
        data
    })
    
}

const crearSalon = async (req , res ) => {

    try {

        const data = await crearSeccion_Colegio(req.body)

        return res.status(201).json({
            ok:true,
            data
        }); 

    } catch (error) {
        return res.status(500).json({
            ok:false,
            error
        })
    }

}

const listarColegios = async (req , res ) => {
 
    try {

        const data = await obtenerColegios()

        return res.status(201).json({
            ok:true,
            data
        }); 

    } catch (error) {
        return res.status(500).json({
            ok:false,
            error
        })
    }

}


const getDepartamentos = async (req, res ) => {

    try {
      
        const data = await obtenerDepartamentos();

        return res.status(200).json({
            ok:true,
            data
        });  
    } catch (error) {
        return res.status(500).json({
            ok:false,
            error
        })
    }
}

const getProvincias = async (req, res ) => {

    try {
        const { departamento } = req.body;

        const data = await obtenerProvinciaxDeprtamento(departamento);

        return res.status(200).json({
            ok:true,
            data
        });  
    } catch (error) {
        return res.status(500).json({
            ok:false,
            error
        })
    }
}



const getDistritos= async (req, res ) => {

    try {

        const { provincia } = req.body;
      
        const data = await obtenerDistritoxProvincia(provincia);

        return res.status(200).json({
            ok:true,
            data
        });  
    } catch (error) {
        return res.status(500).json({
            ok:false,
            error
        })
    }
}





module.exports = {
    buscarColegioVacantes,
    crearContactenos,
    busquedaFormulario,
    getUbigeo,
    crearFormulario,
    getSolicitudesPendientes,

    aprobarSolicitudes,
    rechazarSolicitudes,

    crearSalon,
    listarColegios,

    getDepartamentos,
    getProvincias,
    getDistritos
}