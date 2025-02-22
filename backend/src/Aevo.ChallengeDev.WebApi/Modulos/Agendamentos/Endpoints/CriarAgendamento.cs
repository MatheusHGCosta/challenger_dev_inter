using Aevo.ChallengeDev.WebApi.Core;
using Aevo.ChallengeDev.WebApi.Modulos.Agendamentos.Models;
using Aevo.ChallengeDev.WebApi.Services;
using Aevo.CommonLib.Results;

namespace Aevo.ChallengeDev.WebApi.Modulos.Agendamentos.Endpoints;

public record CriarAgendamentoReqBody
{
    public required DateTime Inicio { get; init; }
    public required DateTime Fim { get; init; }

    public CriarAgendamento ToCriarAgendamento(Guid salaId,Guid UsuarioId)
    {
        return new CriarAgendamento()
        {
            Inicio = Inicio,
            Fim = Fim,
            SalaId = salaId,
            UsuarioId = UsuarioId
        };
    }
}

public record CriarAgendamento : CriarAgendamentoReqBody
{
    public required Guid SalaId { get; init; }
    public required Guid UsuarioId{ get; init; }
}

public record CriarAgendamentoResponse
{
    public required Guid AgendamentoId { get; init; }
}

public class CriarAgendamentoHandler(Context context) : ICaseHandler<CriarAgendamento, CriarAgendamentoResponse>
{
    public async Task<Result<CriarAgendamentoResponse>> Handle(CriarAgendamento req, CancellationToken ct)
    {
        var usuario = await context.Usuarios.FindAsync(req.UsuarioId, ct);
        var sala = await context.Salas.FindAsync(req.SalaId, ct);

        var agendamento = new Agendamento()
        {
            Id = Guid.NewGuid(),
            UsuarioId = req.UsuarioId,
            Inicio = FusoHorarioService.ConverterFuso(req.Inicio, usuario.FusoHorario, sala.FusoHorario),
            Fim = FusoHorarioService.ConverterFuso(req.Fim, usuario.FusoHorario, sala.FusoHorario),
            SalaId = req.SalaId,
        };

        context.Agendamentos.Add(agendamento);

        await context.SaveChangesAsync(ct);

        return new CriarAgendamentoResponse()
        {
            AgendamentoId = agendamento.Id,
        };
    }
}