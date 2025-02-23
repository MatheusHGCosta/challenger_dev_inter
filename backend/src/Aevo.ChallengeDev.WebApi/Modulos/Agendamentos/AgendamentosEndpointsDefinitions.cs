using Aevo.ChallengeDev.WebApi.Modulos.Agendamentos.Endpoints;
using Aevo.CommonLib.Results.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;

namespace Aevo.ChallengeDev.WebApi.Modulos.Agendamentos;
public static class AgendamentosEndpointsDefinitions
{
    private static async Task<IResult> CriarAgendamentoEndpoint([FromServices] CriarAgendamentoHandler handler,
        [FromRoute] Guid salaId, [FromBody] CriarAgendamentoReqBody body, HttpContext httpContext, CancellationToken ct = default)
    {
        return (await handler.Handle(body.ToCriarAgendamento(salaId, Guid.Parse(httpContext.User.FindFirst("sub")!.Value)), ct)).ToApiResult();
    }

    private static async Task<IResult> EditarAgendamentoEndpoint([FromServices] EditarAgendamentoHandler handler,
        [FromRoute] Guid agendamentoId, [FromBody] EditarAgendamentoReqBody body, HttpContext httpContext, CancellationToken ct = default)
    {
        return (await handler.Handle(body.ToEditarAgendamento(agendamentoId, Guid.Parse(httpContext.User.FindFirst("sub")!.Value)), ct)).ToApiResult();
    }

    private static async Task<IResult> ExcluirAgendamentoEndpoint([FromServices] ExcluiAgendamentoHandler handler,
        [FromRoute] Guid agendamentoId, HttpContext httpContext, CancellationToken ct = default)
    {
        return (await handler.Handle(new ExcluirAgendamento(agendamentoId, Guid.Parse(httpContext.User.FindFirst("sub")!.Value)), ct)).ToApiResult();
    }

    private static async Task<IResult> GetAgendamentosSalaEndpoint([FromServices] GetAgendamentosSalaHandler handler,
        [FromRoute] Guid salaId, HttpContext httpContext, CancellationToken ct = default)
    {
        return (await handler.Handle(new GetAgendamentosSala(salaId, Guid.Parse(httpContext.User.FindFirst("sub")!.Value)), ct)).ToApiResult();
    }

    private static async Task<IResult> GetAgendamentosUsuarioLogadoEndpoint(
        [FromServices] GetAgendamentosUsuarioLogadoHandler handler, HttpContext httpContext, CancellationToken ct = default)
    {
        return (await handler.Handle(new GetAgendamentosUsuarioLogado(Guid.Parse(httpContext.User.FindFirst("sub")!.Value)), ct)).ToApiResult();
    }


    public static void MapAgendamentosEndpoints(this IEndpointRouteBuilder endpoints)
    {
        var agendamentosEndpoints = endpoints.MapGroup("agendamentos")
            .RequireAuthorization();
        
        agendamentosEndpoints.MapGet("", GetAgendamentosUsuarioLogadoEndpoint);

        agendamentosEndpoints.MapGet("salas/{salaId:guid}", GetAgendamentosSalaEndpoint);
        
        agendamentosEndpoints.MapPost("salas/{salaId:guid}", CriarAgendamentoEndpoint);
        
        agendamentosEndpoints.MapPut("{agendamentoId:guid}", EditarAgendamentoEndpoint);
        
        agendamentosEndpoints.MapDelete("{agendamentoId:guid}", ExcluirAgendamentoEndpoint);
    }
}