
const sql = require('mssql');
const logger = require('../server/logger');

const MATRICULA_DB_CONF = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
     pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
}


const busquedaColegioVacantes = async ( p_distritoColegio, p_provinciaColegio, p_departamentoColegio, p_nivel, p_grado ) => {

     try {
        logger.info(`Ejecutando busquedaColegioVacantes`)
        const pool = await sql.connect(MATRICULA_DB_CONF);

        const result = await pool.request()
        .input('p_distritoColegio', sql.NVarChar, p_distritoColegio)
        .input('p_provinciaColegio', sql.NVarChar, p_provinciaColegio)
        .input('p_departamentoColegio', sql.NVarChar, p_departamentoColegio)
        .input('p_nivel', sql.NVarChar, p_nivel)
        .input('p_grado', sql.NVarChar, p_grado)
        .execute(`[dbo].[busquedaColegioVacantes]`);
        
        logger.info(`BusquedaColegioVacantes finalizada con exito`)
        queryResult = result.recordset;
        return queryResult;

     } catch (error) {
       logger.error(`Error al ejecutar BusquedaColegioVacantes`)
       logger.error(error);
     }

}

const insertarContactenos = async (p_nombres, p_numero , p_correo , p_mensaje , p_motivo) => {

    let creado = null;

    try {
        const pool = await sql.connect(MATRICULA_DB_CONF);
         await pool.request()
        .input('p_nombres', sql.NVarChar, p_nombres)
        .input('p_numero' , sql.NVarChar, p_numero)
        .input('p_motivo' , sql.NVarChar , p_motivo)
        .input('p_correo' , sql.NVarChar, p_correo)
        .input('p_mensaje' , sql.NVarChar , p_mensaje)         
        .execute(`[dbo].[insertContactenos]`);

        logger.info(`crearContactenos finalizada con exito`)
  
        creado = true;

    } catch (error) {
        logger.error(`Error al ejecutar crearContactenos`)
         logger.error(error);
         creado = false;
    } finally {

        return creado;

    }
}

const busquedaFormularioxDnixCodigoformulario = async( p_dni_alumno , p_tipo_dni_alumno , p_dni_apoderado , p_tipo_dni_apoderado   ) => {

    try {
        
        logger.info(`Ejecutando busquedaFormularioxDnixCodigoformulario`)
        const pool = await sql.connect(MATRICULA_DB_CONF);

        const result = await pool.request()
            .input('p_dni_alumno', sql.NVarChar, p_dni_alumno)
            .input('p_tipo_dni_alumno' , sql.NVarChar, p_tipo_dni_alumno)
            .input('p_dni_apoderado' , sql.NVarChar, p_dni_apoderado)
            .input('p_tipo_dni_apoderado' , sql.NVarChar , p_tipo_dni_apoderado)
            .execute(`[dbo].[busquedaFormularioxDnixCodigoformulario]`);

            queryResult = result.recordset;
            return queryResult;

    } catch (error) {
        logger.error(`Error al ejecutar BusquedaColegioVacantes`)
        logger.error(error);
    }
}

const obtenerUbicacionColegio = async () => {

    try {
        
        logger.info(`Ejecutando obtenerUbicacionColegio`)
        const pool = await sql.connect(MATRICULA_DB_CONF);
        const result = await pool.request()
        .execute(`[dbo].[obtenerUbicacionColegio]`);
        
        logger.info(`obtenerUbicacionColegio finalizada con exito`)
        queryResult = result.recordset;
        return queryResult;

    } catch (error) {
        logger.error(`Error al ejecutar BusquedaColegioVacantes`)
        logger.error(error);
    }


}

const registrarFormulario = async ( formulario ) => {

    let creado = null;

    try {
        const { 
            idVacante,
            nombreApoderadoFormulario ,
            paternoApoderadoFormulario , 
            maternoApoderadoFormulario ,
            tipoDocApoderadoFormulario ,
            docApoderadoFormulario ,
            parentezcoApoderadoFormulario ,
            telefonoApoderadoFormulario ,
            correoApoderadoFormulario ,
            documentoSolicitudFormulario ,
            nombreAlumnoFormulario ,
            paternoAlumnoFormulario , 
            maternoAlumnoFormulario ,
            tipoDocAlumnoFormulario ,
            docAlumnoFormulario ,
            fechaNacAlumnoFormulario  } = formulario;

        const pool = await sql.connect(MATRICULA_DB_CONF);
        await pool.request()
            .input('p_idVacante', sql.Int, idVacante)
            .input('p_nombreApoderadoFormulario' , sql.NVarChar, nombreApoderadoFormulario)
            .input('p_paternoApoderadoFormulario' , sql.NVarChar , paternoApoderadoFormulario)
            .input('p_maternoApoderadoFormulario' , sql.NVarChar, maternoApoderadoFormulario)
            .input('p_tipoDocApoderadoFormulario' , sql.NVarChar , tipoDocApoderadoFormulario)        
            .input('p_docApoderadoFormulario' , sql.NVarChar , docApoderadoFormulario)         
            .input('p_parentezcoApoderadoFormulario' , sql.NVarChar , parentezcoApoderadoFormulario)         
            .input('p_telefonoApoderadoFormulario' , sql.NVarChar , telefonoApoderadoFormulario)         
            .input('p_correoApoderadoFormulario' , sql.NVarChar , correoApoderadoFormulario)         
            .input('p_documentoSolicitudFormulario' , sql.NVarChar , documentoSolicitudFormulario)         
            .input('p_nombreAlumnoFormulario' , sql.NVarChar , nombreAlumnoFormulario)         
            .input('p_paternoAlumnoFormulario' , sql.NVarChar , paternoAlumnoFormulario)         
            .input('p_maternoAlumnoFormulario' , sql.NVarChar , maternoAlumnoFormulario)         
            .input('p_tipoDocAlumnoFormulario' , sql.NVarChar , tipoDocAlumnoFormulario)         
            .input('p_docAlumnoFormulario' , sql.NVarChar , docAlumnoFormulario)         
            .input('p_fechaNacAlumnoFormulario' , sql.NVarChar , fechaNacAlumnoFormulario)         
            .execute(`[dbo].[inserFormularioEstudiante]`);

             logger.info(`crearContactenos finalizada con exito`)

         creado = true;

    } catch (error) {
        logger.error(`Error al ejecutar BusquedaColegioVacantes`)
        logger.error(error);

        creado = false;
    }finally{
        return creado;
    }

}

const listarSolicitudes = async ( ) => {

    try {
        
        logger.info(`Ejecutando listarSolicitudes`)
        const pool = await sql.connect(MATRICULA_DB_CONF);
        const result = await pool.request()
        .execute(`[dbo].[listarFormularioPendiente]`);
        
        logger.info(`listarSolicitudes finalizada con exito`)
        queryResult = result.recordset;
        return queryResult;

    } catch (error) {
        logger.error(`Error al ejecutar listarSolicitudes`)
        logger.error(error);
    }
}

const aprobarSolicitud = async ( formularioId) => {

    try {
        
        logger.info(`Ejecutando aprobarSolicitud`)
        const pool = await sql.connect(MATRICULA_DB_CONF);
        const result = await pool.request()
        .input('p_idFormulario', sql.Int, formularioId)
        .execute(`[dbo].[insertMatricula]`);
        
        logger.info(`aprobarSolicitud finalizada con exito`)
        queryResult = result.recordset;
        return queryResult;

    } catch (error) {
        logger.error(`Error al ejecutar aprobarSolicitud`)
        logger.error(error);
    }

}

const recharzarSolicitud = async ( formularioId) => {

    try {
        
        logger.info(`Ejecutando recharzarSolicitud`)
        const pool = await sql.connect(MATRICULA_DB_CONF);
        const result = await pool.request()
        .input('p_idFormulario', sql.Int, formularioId)
        .execute(`[dbo].[insertDesaprobadoMatricula]`);
        
        logger.info(`recharzarSolicitud finalizada con exito`)
        queryResult = result.recordset;
        return queryResult;

    } catch (error) {
        logger.error(`Error al ejecutar recharzarSolicitud`)
        logger.error(error);
    }
}


const crearSeccion_Colegio = async( formulario ) => {


    try {
        const {
            idColegio,
            p_nivel,
            p_grado,
            p_seccion,
            p_turno,
            p_vacante
        } = formulario;
        console.log("formulario" , formulario)
        logger.info(`Ejecutando crearSeccion_Colegio`)
        const pool = await sql.connect(MATRICULA_DB_CONF);
        const result = await pool.request()

        .input('idColegio', sql.Int, Number(idColegio))
        .input('p_nivel', sql.NVarChar, p_nivel)
        .input('p_grado', sql.NVarChar, p_grado)
        .input('p_seccion', sql.NVarChar, p_seccion)
        .input('p_turno', sql.NVarChar, p_turno)
        .input('p_vacante', sql.Int, p_vacante)

        .execute(`[dbo].[CrearSeccionColegio]`);
        
        logger.info(`crearSeccion_Colegio finalizada con exito`)
        queryResult = result.recordset;
        return queryResult;

    } catch (error) {
        logger.error(`Error al ejecutar crearSeccion_Colegio`)
        logger.error(error);
    }
}


const obtenerColegios = async() => {

    try {
        
        logger.info(`Ejecutando obtenerColegios`)
        const pool = await sql.connect(MATRICULA_DB_CONF);
        const result = await pool.request()
        .execute(`[dbo].[listarColegio]`);
        
        logger.info(`obtenerColegios finalizada con exito`)
        queryResult = result.recordset;
        return queryResult;

    } catch (error) {
        logger.error(`Error al ejecutar obtenerColegios`)
        logger.error(error);
    }
    
}

const obtenerDepartamentos = async() => {

    try {
        
        logger.info(`Ejecutando obtenerDepartamentos`)
        const pool = await sql.connect(MATRICULA_DB_CONF);
        const result = await pool.request()
         .execute(`[dbo].[obtenerDepartamentoColegio]`);
        
        logger.info(`obtenerDepartamentos finalizada con exito`)
        queryResult = result.recordset;
        return queryResult;

    } catch (error) {
        logger.error(`Error al ejecutar obtenerDepartamentos`)
        logger.error(error);
    }
}


const obtenerProvinciaxDeprtamento = async( departamento) => {

    try {
        
        logger.info(`Ejecutando obtenerProvinciaColegioColegio`)
        const pool = await sql.connect(MATRICULA_DB_CONF);
        const result = await pool.request()
        .input('p_departamentoColegio', sql.NVarChar, departamento)
        .execute(`[dbo].[obtenerProvinciaColegioColegio]`);
        
        logger.info(`obtenerProvinciaColegioColegio finalizada con exito`)
        queryResult = result.recordset;
        return queryResult;

    } catch (error) {
        logger.error(`Error al ejecutar obtenerDepartamentos`)
        logger.error(error);
    }
}


const obtenerDistritoxProvincia = async( provincia) => {

    try {
        
        logger.info(`Ejecutando obtenerDistritoColegioColegio`)
        const pool = await sql.connect(MATRICULA_DB_CONF);
        const result = await pool.request()
        .input('p_provinciaColegio', sql.NVarChar, provincia)
        .execute(`[dbo].[obtenerDistritoColegioColegio]`);
        
        logger.info(`obtenerDistritoColegioColegio finalizada con exito`)
        queryResult = result.recordset;
        return queryResult;

    } catch (error) {
        logger.error(`Error al ejecutar obtenerDepartamentos`)
        logger.error(error);
    }
}



 
module.exports = {
    busquedaColegioVacantes,
    insertarContactenos,
    busquedaFormularioxDnixCodigoformulario,
    obtenerUbicacionColegio,
    registrarFormulario,
    listarSolicitudes,

    aprobarSolicitud,
    recharzarSolicitud,

    crearSeccion_Colegio,
    obtenerColegios,

    obtenerDepartamentos,
    obtenerProvinciaxDeprtamento,
    obtenerDistritoxProvincia
} 