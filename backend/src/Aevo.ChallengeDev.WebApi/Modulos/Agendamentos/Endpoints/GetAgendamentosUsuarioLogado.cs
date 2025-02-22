using Aevo.ChallengeDev.WebApi.Core;
using Aevo.ChallengeDev.WebApi.Modulos.Usuarios.Models;
using Aevo.ChallengeDev.WebApi.Services;
using Aevo.CommonLib.Results;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Aevo.ChallengeDev.WebApi.Modulos.Agendamentos.Endpoints;
public record GetAgendamentosUsuarioLogado(Guid UsuarioId);

public class GetAgendamentosUsuarioLogadoHandler(Context context) : ICaseHandler<GetAgendamentosUsuarioLogado, AgendamentoView[]>
{
    public async Task<Result<AgendamentoView[]>> Handle(GetAgendamentosUsuarioLogado req, CancellationToken ct)
    {
        return await context.Agendamentos
                    .Join(context.Usuarios,
                        agendamento => agendamento.UsuarioId,
                        usuario => usuario.Id,
                        (agendamento, usuario) => new { agendamento, usuario })
                    .Where(temp => temp.usuario.Id == req.UsuarioId)
                    .Join(context.Salas,
                        temp => temp.agendamento.SalaId,
                        sala => sala.Id,
                        (temp, sala) => new AgendamentoView
                        {
                            Id = temp.agendamento.Id,
                            SalaId = sala.Id,
                            SalaNome = sala.Nome,
                            UsuarioId = temp.usuario.Id,
                            UsuarioNome = temp.usuario.Nome,
                            Inicio = FusoHorarioService.ConverterFuso(temp.agendamento.Inicio, sala.FusoHorario, temp.usuario.FusoHorario),
                            Fim = FusoHorarioService.ConverterFuso(temp.agendamento.Fim, sala.FusoHorario, temp.usuario.FusoHorario)
                        })
                    .ToArrayAsync(cancellationToken: ct);

    }
}