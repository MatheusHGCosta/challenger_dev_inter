using Aevo.ChallengeDev.WebApi.Core;
using Aevo.ChallengeDev.WebApi.Modulos.Salas.Models;
using Aevo.CommonLib.Results;
using Microsoft.EntityFrameworkCore;

namespace Aevo.ChallengeDev.WebApi.Modulos.Agendamentos.Endpoints;

public record GetAgendamentosSala(Guid SalaId);

public class AgendamentoView
{
    public required Guid Id { get; init; }
    public required Guid UsuarioId { get; init; }
    public required Guid SalaId { get; init; }
    public required string UsuarioNome { get; set; }
    public required string SalaNome { get; set; }
    public required DateTime Inicio { get; set; }
    public required DateTime Fim { get; set; }
}

public class GetAgendamentosSalaHandler(Context context) : ICaseHandler<GetAgendamentosSala, AgendamentoView[]>
{
    public async Task<Result<AgendamentoView[]>> Handle(GetAgendamentosSala req, CancellationToken ct)
    {
        return await context.Agendamentos
                    .Join(context.Salas,
                        agendamento => agendamento.SalaId,
                        sala => sala.Id,
                        (agendamento, sala) => new { agendamento, sala })
                    .Where(temp => temp.sala.Id == req.SalaId)
                    .Join(context.Usuarios,
                        temp => temp.agendamento.UsuarioId,
                        usuario => usuario.Id,
                        (temp, usuario) => new AgendamentoView
                    {
                        Id = temp.agendamento.Id,
                        SalaId = temp.sala.Id,
                        SalaNome = temp.sala.Nome,
                        UsuarioId = usuario.Id,
                        UsuarioNome = usuario.Nome,
                        Inicio = temp.agendamento.Inicio,
                        Fim = temp.agendamento.Fim
                    })
                    .ToArrayAsync(cancellationToken: ct);
    }
}