using DBEntity;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace DBContext
{
    public interface IVacantesRepository
    {
        BaseResponse GetVacantes(string distritoColegio, string provinciaColegio, string tipoGradoSeccion, string grado);
    }
}
