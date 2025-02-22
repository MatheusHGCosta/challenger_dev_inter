namespace Aevo.ChallengeDev.WebApi.Services
{
    using System;
    using TimeZoneConverter;

    public class FusoHorarioService
    {
        public static DateTime ConverterFuso(DateTime dataBase, string fusoDe, string fusoPara)
        {
            try
            {
                TimeZoneInfo tzUsuario = TZConvert.GetTimeZoneInfo(fusoDe);
                TimeZoneInfo tzSala = TZConvert.GetTimeZoneInfo(fusoPara);

                DateTime horarioUtc = TimeZoneInfo.ConvertTimeToUtc(dataBase, tzUsuario);

                DateTime horarioSala = TimeZoneInfo.ConvertTimeFromUtc(horarioUtc, tzSala);

                return horarioSala;
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
