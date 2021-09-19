using Dapper;
using DBEntity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace DBContext
{
    public class VacantesRepository : BaseRepository, IVacantesRepository
    {
        public BaseResponse GetVacantes(string distritoColegio, string provinciaColegio, string tipoGradoSeccion, string grado)
        {
            var entityVacantes = new EntityVacantes();
            var returnEntity = new BaseResponse();

            try
            {
                using (var db = GetSqlConnection())
                {
                    const string sql = @"busquedaColegioVacantes";

                    var p = new DynamicParameters();
                    p.Add(name: "@p_distritoColegio", value: distritoColegio, dbType: DbType.String, direction: ParameterDirection.Input);
                    p.Add(name: "@p_provinciaColegio", value: provinciaColegio, dbType: DbType.String, direction: ParameterDirection.Input);
                    p.Add(name: "@p_nivel", value: tipoGradoSeccion, dbType: DbType.String, direction: ParameterDirection.Input);
                    p.Add(name: "@p_grado", value: grado, dbType: DbType.String, direction: ParameterDirection.Input);

                    entityVacantes = db.Query<EntityVacantes>(sql, p, commandType: CommandType.StoredProcedure).FirstOrDefault();

                    if (entityVacantes != null)
                    {
                        returnEntity.isSuccess = true;
                        returnEntity.errorCode = "0000";
                        returnEntity.errorMessage = string.Empty;
                        returnEntity.data = entityVacantes;
                    }
                    else
                    {
                        returnEntity.isSuccess = true;
                        returnEntity.errorCode = "0000";
                        returnEntity.errorMessage = string.Empty;
                        returnEntity.data = null;
                    }
                }
            }
            catch (Exception ex)
            {

                returnEntity.isSuccess = false;
                returnEntity.errorCode = "00001";
                returnEntity.errorMessage = ex.Message;
                returnEntity.data = null;

            }
            return returnEntity;
        }


    }
}
