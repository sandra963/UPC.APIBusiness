const { Router } = require('express');
const { check  } = require('express-validator');

// Controllers
const { buscarColegioVacantes , crearContactenos , busquedaFormulario, getUbigeo, 
    crearFormulario , getSolicitudesPendientes, aprobarSolicitudes,
    rechazarSolicitudes , crearSalon, listarColegios, getDepartamentos,
    getProvincias,  getDistritos  } = require('../controllers/matriculaController')
const { validarCampos } = require('../utils/valida-routes')

const router = Router();

router.post('/busqueda_colegio_vacantes' , [
    check('p_distritoColegio' , 'El distrito es requerido').not().isEmpty(),
    check('p_provinciaColegio' , 'La provincia es requerida').not().isEmpty(),
    check('p_departamentoColegio' , 'El departamento es requerido').not().isEmpty(),
    check('p_nivel' , 'El nivel es requerido').not().isEmpty(),
    check('p_grado' , 'El grado es requerido').not().isEmpty(),
    validarCampos
], buscarColegioVacantes);

router.post('/crear_contactenos' ,  [
    check('p_motivo' , 'El motivo es requerido').not().isEmpty(),
    check('p_nombres' , 'Los nombres son requeridos').not().isEmpty(),
    check('p_numero' , 'El numero es requerido').not().isEmpty(),
    check('p_correo' , 'El correo es requerido').not().isEmpty(),
    check('p_mensaje' , 'El mensaje es requerido').not().isEmpty(),
    validarCampos
], crearContactenos)

router.post('/busqueda_formulario' , [
    check('p_dni_alumno' , 'El Dni es requerido').not().isEmpty(),
    check('p_tipo_dni_alumno' , 'El tipo de dni alumno es requerido').not().isEmpty(),
    check('p_dni_apoderado' , 'El dni del apoderado es requerido').not().isEmpty(),
    check('p_tipo_dni_apoderado' , 'El tipo de dni apoderado es requerido').not().isEmpty(),
    validarCampos
] ,busquedaFormulario )

router.get('/getUbigeo' , getUbigeo )

router.post('/registrar_formulario' , crearFormulario )
router.get('/listar-solicitudes-pendientes' , getSolicitudesPendientes)

router.post('/aprobar-solicitud'  , aprobarSolicitudes )
router.post('/rechazar-solicitud' , rechazarSolicitudes )
router.post('/crear-salon' , crearSalon );
router.get('/listar-colegios' , listarColegios )

router.get('/listar-departamentos', getDepartamentos)
router.post('/listar-provincias', getProvincias)
router.post('/listar-distritos', getDistritos)

module.exports = router;
