using Aevo.ChallengeDev.WebApi.Core;
using Aevo.CommonLib.Results;
using Microsoft.EntityFrameworkCore;

namespace Aevo.ChallengeDev.WebApi.Modulos.Agendamentos.Endpoints;

public record ExcluirAgendamento(Guid AgendamentoId,Guid UsuarioId);

public class ExcluiAgendamentoHandler(Context context) : ICaseHandler<ExcluirAgendamento, Unit>
{
    public async Task<Result<Unit>> Handle(ExcluirAgendamento req, CancellationToken ct)
    {
        var agendamento = await context.Agendamentos.FindAsync(req.AgendamentoId, ct);

        if (agendamento == null)
        {
            return Result.NotFound();
        }

        if (agendamento.UsuarioId != req.UsuarioId)
        {
            return Result.Forbidden();
        }
        context.Agendamentos.Remove(agendamento);
        await context.SaveChangesAsync(ct);

        return Result.NoContent();
    }
}