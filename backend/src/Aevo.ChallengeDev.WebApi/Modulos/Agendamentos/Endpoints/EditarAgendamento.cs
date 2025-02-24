using Aevo.ChallengeDev.WebApi.Core;
using Aevo.ChallengeDev.WebApi.Modulos.Salas.Endpoints;
using Aevo.ChallengeDev.WebApi.Services;
using Aevo.CommonLib.Results;
using Microsoft.EntityFrameworkCore;

namespace Aevo.ChallengeDev.WebApi.Modulos.Agendamentos.Endpoints;

public record EditarAgendamentoReqBody
{
    public required DateTime Inicio { get; init; }
    public required DateTime Fim { get; init; }

    public EditarAgendamento ToEditarAgendamento(Guid agendamentoId, Guid usuarioId)
    {
        return new EditarAgendamento
        {
            Inicio = Inicio,
            Fim = Fim,
            AgendamentoId = agendamentoId,
            usuarioId = usuarioId,
        };
    }
}

public record EditarAgendamento : EditarAgendamentoReqBody
{
    public required Guid AgendamentoId { get; init; }
    public required Guid usuarioId { get; init; }
}

public class EditarAgendamentoHandler(Context context) : ICaseHandler<EditarAgendamento, Unit>
{

    public async Task<bool> VerificaConflito(Guid salaId, Guid agendamentoId, DateTime inicio, DateTime fim)
    {
        return await context.Agendamentos
            .AnyAsync(a =>
                a.SalaId == salaId &&
                ((inicio >= a.Inicio && inicio < a.Fim) ||
                 (fim > a.Inicio && fim <= a.Fim) ||
                 (inicio <= a.Inicio && fim >= a.Fim))
                 && a.Id != agendamentoId);
    }

    public async Task<Result<Unit>> Handle(EditarAgendamento req, CancellationToken ct)
    {
        var agendamento = await context.Agendamentos.FindAsync(req.AgendamentoId, ct);

        if (agendamento == null)
        {
            return Result.NotFound();
        }

        if (agendamento.UsuarioId != req.usuarioId)
        {
            return Result.Forbidden();
        }

        var usuario = await context.Usuarios.FindAsync(agendamento.UsuarioId, ct);
        var sala = await context.Salas.FindAsync(agendamento.SalaId, ct);

        if (usuario == null || sala == null)
        {
            return Result.Error("Usuário ou sala não encontrados.");
        }

        

        agendamento.Inicio = FusoHorarioService.ConverterFuso(req.Inicio, usuario.FusoHorario, sala.FusoHorario);
        agendamento.Fim = FusoHorarioService.ConverterFuso(req.Fim, usuario.FusoHorario, sala.FusoHorario);

        if (agendamento.Inicio > agendamento.Fim)
        {

            return Result.Invalid(new AppError()
            {
                ErrorCode = "400",
                ErrorMessage = "ALERTAS.AGENDAMENTO_INVALIDO_DATAINICIAL_MENOR"
            });
        }

        if (await VerificaConflito(agendamento.SalaId,agendamento.Id,agendamento.Inicio,agendamento.Fim))
        {
            
            return Result.Invalid(new AppError()
            {
                ErrorCode = "400",
                ErrorMessage = "ALERTAS.AGENDAMENTO_EXISTENTE"
            });
        }

        await context.SaveChangesAsync(ct);

        return Result.Ok();
    }
}
