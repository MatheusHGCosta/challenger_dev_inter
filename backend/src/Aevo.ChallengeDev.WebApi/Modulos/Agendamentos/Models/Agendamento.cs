namespace Aevo.ChallengeDev.WebApi.Modulos.Agendamentos.Models
{
    public class Agendamento
    {
        public required Guid Id { get; init; }
        public required Guid SalaId { get; init; }
        public required Guid UsuarioId { get; init; }
        public required DateTime Inicio { get; set; }
        public required DateTime Fim { get; set; }
    }
}
