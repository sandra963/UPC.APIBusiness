using DBContext;
using DBEntity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using NSwag.Annotations;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;

namespace UPC.Business.API.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Produces("application/json")]
    [Route("api/User")]
    public class VancantesController : Controller
    {

        /// <summary>
        /// Constructor
        /// </summary>
        protected readonly IVacantesRepository _VacantesRepository;


        /// <summary>
        /// 
        /// </summary>
        /// <param name="VacantesRepository"></param>
        public VancantesController(IVacantesRepository VacantesRepository)
        {
            _VacantesRepository = VacantesRepository;

        }

        /// <summary>
        /// GetListUser
        /// </summary>
        /// <returns></returns>
        [Produces("application/json")]
        [SwaggerOperation("GetListVacantes")]
        [AllowAnonymous]
        [HttpGet]
        [Route("GetListVacantes")]
        public ActionResult Get(string distritoColegio, string provinciaColegio, string tipoGradoSeccion, string grado)
        {
            var ret = _VacantesRepository.GetVacantes(distritoColegio, provinciaColegio, tipoGradoSeccion, grado);

            if (ret == null)
                return StatusCode(401);

            return Json(ret);
        }
    }
}