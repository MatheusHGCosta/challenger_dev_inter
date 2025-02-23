using System.Net;
using System.Net.Http.Json;
using Aevo.ChallengeDev.Tests.Core;
using Aevo.ChallengeDev.WebApi.Modulos.Agendamentos.Endpoints;

namespace Aevo.ChallengeDev.Tests.Modulos;

public class AgendamentosTests(IntegrationTestFactory factory) : TestBase(factory)
{
    [Fact]
    public async Task CriarAgendamento_DevePermitirCriacao()
    {
        var salaId = SalasDeTestePredefinidas.SalaReuniaoSP.Id;
        
        // Arrange
        LoginAs(UsuariosDeTestePredefinidos.JoaoSilva);

        var req = new CriarAgendamentoReqBody
        {
            Inicio = new DateTime(2025, 02, 14, 10, 00, 00),
            Fim =  new DateTime(2025, 02, 14, 10, 45, 00)
        };

        // Act
        var response = await Http.PostAsJsonAsync($"agendamentos/salas/{salaId}", req, cancellationToken: TestContext.Current.CancellationToken);

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
    
    [Fact]
    public async Task EditarAgendamento_DeveFuncionar_ParaCriador()
    {
        var salaId = SalasDeTestePredefinidas.SalaReuniaoSP.Id;
        
        // Arrange
        LoginAs(UsuariosDeTestePredefinidos.JoaoSilva);

        var criarRequest = new CriarAgendamentoReqBody
        {
            Inicio = new DateTime(2025, 02, 14, 10, 00, 00),
            Fim =  new DateTime(2025, 02, 14, 10, 45, 00)
        };

        var criarResponse = await Http.PostAsJsonAsync($"agendamentos/salas/{salaId}", criarRequest, cancellationToken: TestContext.Current.CancellationToken);
        var criarResult = await criarResponse.Content.ReadFromJsonAsync<CriarAgendamentoResponse>(cancellationToken: TestContext.Current.CancellationToken);
        Assert.NotNull(criarResult);

        var editarRequest = new EditarAgendamentoReqBody
        {
            Inicio = criarRequest.Inicio.AddHours(1),
            Fim = criarRequest.Fim.AddHours(1)
        };

        // Act
        var response = await Http.PutAsJsonAsync($"agendamentos/{criarResult.AgendamentoId}", editarRequest, cancellationToken: TestContext.Current.CancellationToken);

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
    
    [Fact]
    public async Task EditarAgendamento_DeveFalhar_ParaOutroUsuario()
    {
        var salaId = SalasDeTestePredefinidas.SalaReuniaoSP.Id;
        
        // Arrange
        LoginAs(UsuariosDeTestePredefinidos.JoaoSilva);

        var criarRequest = new CriarAgendamentoReqBody
        {
            Inicio = new DateTime(2025, 02, 14, 10, 00, 00),
            Fim =  new DateTime(2025, 02, 14, 10, 45, 00)
        };

        var criarResponse = await Http.PostAsJsonAsync($"agendamentos/salas/{salaId}", criarRequest, cancellationToken: TestContext.Current.CancellationToken);
        var criarResult = await criarResponse.Content.ReadFromJsonAsync<CriarAgendamentoResponse>(cancellationToken: TestContext.Current.CancellationToken);
        Assert.NotNull(criarResult);
        
        LoginAs(UsuariosDeTestePredefinidos.JohnDoe);

        var editarRequest = new EditarAgendamentoReqBody
        {
            Inicio = criarRequest.Inicio.AddHours(1),
            Fim = criarRequest.Fim.AddHours(1)
        };

        // Act
        var response = await Http.PutAsJsonAsync($"agendamentos/{criarResult.AgendamentoId}", editarRequest, cancellationToken: TestContext.Current.CancellationToken);

        // Assert
        Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
    }
    
    [Fact]
    public async Task ExcluirAgendamento_DeveFuncionar_ParaCriador()
    {
        var salaId = SalasDeTestePredefinidas.SalaReuniaoSP.Id;
        
        // Arrange
        LoginAs(UsuariosDeTestePredefinidos.JoaoSilva);

        var criarRequest = new CriarAgendamentoReqBody
        {
            Inicio = new DateTime(2025, 02, 14, 10, 00, 00),
            Fim =  new DateTime(2025, 02, 14, 10, 45, 00)
        };

        var criarResponse = await Http.PostAsJsonAsync($"agendamentos/salas/{salaId}", criarRequest, cancellationToken: TestContext.Current.CancellationToken);
        var criarResult = await criarResponse.Content.ReadFromJsonAsync<CriarAgendamentoResponse>(cancellationToken: TestContext.Current.CancellationToken);
        Assert.NotNull(criarResult);

        // Act
        var response = await Http.DeleteAsync($"agendamentos/{criarResult.AgendamentoId}", TestContext.Current.CancellationToken);

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
    
    [Fact]
    public async Task ExcluirAgendamento_DeveFalhar_ParaOutroUsuario()
    {
        var salaId = SalasDeTestePredefinidas.SalaReuniaoSP.Id;
        
        // Arrange
        LoginAs(UsuariosDeTestePredefinidos.JoaoSilva);

        var criarRequest = new CriarAgendamentoReqBody
        {
            Inicio = new DateTime(2025, 02, 14, 10, 00, 00),
            Fim =  new DateTime(2025, 02, 14, 10, 45, 00)
        };

        var criarResponse = await Http.PostAsJsonAsync($"agendamentos/salas/{salaId}", criarRequest, cancellationToken: TestContext.Current.CancellationToken);
        var criarResult = await criarResponse.Content.ReadFromJsonAsync<CriarAgendamentoResponse>(cancellationToken: TestContext.Current.CancellationToken);
        Assert.NotNull(criarResult);

        // Estava faltando logar como outro usuário para o teste "falhar" com sucesso.
        LoginAs(UsuariosDeTestePredefinidos.JohnDoe);

        // Act
        var response = await Http.DeleteAsync($"agendamentos/{criarResult.AgendamentoId}", TestContext.Current.CancellationToken);

        // Assert
        Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
    }
    
    public static IEnumerable<object[]> GetCenariosDeConflito()
    {
        var baseInicio = new DateTime(2025, 02, 14, 10, 00, 00);
        var baseFim = new DateTime(2025, 02, 14, 10, 45, 00);

        return new List<object[]>
        {
            new object[] { baseInicio.AddMinutes(-15), baseFim.AddMinutes(-5) }, // Termina dentro do intervalo existente
            new object[] { baseInicio.AddMinutes(5), baseFim.AddMinutes(-5) },   // Totalmente dentro do intervalo existente
            new object[] { baseInicio, baseFim },                                 // Exatamente igual ao intervalo existente
            new object[] { baseInicio.AddMinutes(-10), baseFim.AddMinutes(10) }, // Começa antes e termina depois do existente
            new object[] { baseInicio.AddMinutes(5), baseFim.AddMinutes(10) },   // Começa dentro e termina depois
        };
    }
    
    [Theory]
    [MemberData(nameof(GetCenariosDeConflito))]
    public async Task CriarAgendamento_DeveFalhar_SeSobrepuser(DateTime inicio, DateTime fim)
    {
        var salaId = SalasDeTestePredefinidas.SalaReuniaoSP.Id;
        
        // Arrange
        LoginAs(UsuariosDeTestePredefinidos.JoaoSilva);

        var criarRequest = new CriarAgendamentoReqBody
        {
            Inicio = new DateTime(2025, 02, 14, 10, 00, 00),
            Fim = new DateTime(2025, 02, 14, 10, 45, 00)
        };

        var criarResponse = await Http.PostAsJsonAsync($"agendamentos/salas/{salaId}", criarRequest, cancellationToken: TestContext.Current.CancellationToken);
        Assert.Equal(HttpStatusCode.OK, criarResponse.StatusCode);
        
        var req = new CriarAgendamentoReqBody
        {
            Inicio = inicio,
            Fim = fim
        };

        // Act
        var response = await Http.PostAsJsonAsync($"agendamentos/salas/{salaId}", req, cancellationToken: TestContext.Current.CancellationToken);

        // Assert
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }
    
    // TODO: Expanda os casos de teste, e teste os endpoints faltantes.
}