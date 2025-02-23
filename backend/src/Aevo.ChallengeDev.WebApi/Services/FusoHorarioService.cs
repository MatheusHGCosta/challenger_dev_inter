namespace Aevo.ChallengeDev.WebApi.Services
{
    using Aevo.ChallengeDev.WebApi.Core;
    using System;
    using TimeZoneConverter;

    public class FusoHorarioService()
    {
        public static DateTime ConverterFuso(DateTime dataBase, string fusoDe, string fusoPara)
        {
            try
            {
                TimeZoneInfo tzDe = TZConvert.GetTimeZoneInfo(fusoDe);
                TimeZoneInfo tzPara = TZConvert.GetTimeZoneInfo(fusoPara);


                DateTime horarioUtc;
                switch (dataBase.Kind)
                {
                    case DateTimeKind.Utc:
                        horarioUtc = dataBase;
                        break;
                    case DateTimeKind.Local:
                        dataBase = DateTime.SpecifyKind(dataBase, DateTimeKind.Unspecified);
                        horarioUtc = TimeZoneInfo.ConvertTimeToUtc(dataBase, tzDe);
                        break;
                    default:
                        horarioUtc = TimeZoneInfo.ConvertTimeToUtc(dataBase, tzDe);
                        break;
                }

                DateTime horarioFinal = TimeZoneInfo.ConvertTimeFromUtc(horarioUtc, tzPara);

                return horarioFinal;
            }
            catch (TimeZoneNotFoundException)
            {
                throw new Exception("Fuso horário não encontrado.");
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao converter fuso horário: {ex.Message}");
            }
        }
    }
}
