using Aevo.ChallengeDev.WebApi.Core;
using Aevo.CommonLib.Results;
using Microsoft.EntityFrameworkCore;

namespace Aevo.ChallengeDev.WebApi.Modulos.Agendamentos.Endpoints;

public record ExcluirAgendamento(Guid AgendamentoId);

public class ExcluiAgendamentoHandler(Context context) : ICaseHandler<ExcluirAgendamento, Unit>
{
    public async Task<Result<Unit>> Handle(ExcluirAgendamento req, CancellationToken ct)
    {
        await context.Agendamentos.Where(s => s.Id == req.AgendamentoId)
            .ExecuteDeleteAsync(cancellationToken: ct);

        return Result.NoContent();
    }
}