using Aevo.ChallengeDev.WebApi.Core;
using Aevo.ChallengeDev.WebApi.Modulos.Agendamentos.Models;
using Aevo.CommonLib.Results;
using Microsoft.EntityFrameworkCore;

namespace Aevo.ChallengeDev.WebApi.Modulos.Salas.Endpoints;

public record ExcluirSala(Guid SalaId);

public class ExcluirSalaHandler(Context context) : ICaseHandler<ExcluirSala, Unit>
{
    public async Task<Result<Unit>> Handle(ExcluirSala req, CancellationToken ct)
    {

        var sala = await context.Salas.FindAsync([req.SalaId], ct);

        if (sala == null)
        {
            return Result.NotFound();
        }
        context.Salas.Remove(sala);
        await context.SaveChangesAsync(ct);

        return Result.NoContent();
    }
}