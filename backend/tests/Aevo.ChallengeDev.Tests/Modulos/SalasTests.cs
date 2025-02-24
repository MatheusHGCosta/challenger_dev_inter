using Aevo.ChallengeDev.Tests.Core;
using Aevo.ChallengeDev.WebApi.Modulos.Agendamentos.Endpoints;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Aevo.ChallengeDev.WebApi.Modulos.Salas.Endpoints;

namespace Aevo.ChallengeDev.Tests.Modulos
{
    public class SalasTests(IntegrationTestFactory factory) : TestBase(factory)
    {
        [Fact]
        public async Task CriarSala_DevePermitirCriacao()
        {
            var salaId = SalasDeTestePredefinidas.SalaReuniaoSP.Id;

            // Arrange
            LoginAs(UsuariosDeTestePredefinidos.JoaoSilva);

            var req = new CriarSala
            {
                Nome = "Sala de Governador Valadares",
                Descricao = "Sala de Governador Valadares bem localizada no centro da cidade.",
                Capacidade=20,
                FusoHorario= "America/Sao_Paulo"
            };

            // Act
            var response = await Http.PostAsJsonAsync($"salas", req, cancellationToken: TestContext.Current.CancellationToken);

            //Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task EditarSala_DevePermitirEditar()
        {
            var salaId = SalasDeTestePredefinidas.SalaReuniaoSP.Id;

            // Arrange
            LoginAs(UsuariosDeTestePredefinidos.JoaoSilva);

            var req = new CriarSala
            {
                Nome = "Sala de Governador Valadares",
                Descricao = "Sala de Governador Valadares bem localizada no centro da cidade.",
                Capacidade = 20,
                FusoHorario = "America/Sao_Paulo"
            };

            // Act
            var response = await Http.PutAsJsonAsync($"salas/{salaId}", req, cancellationToken: TestContext.Current.CancellationToken);

            //Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }


        [Fact]
        public async Task EditarSala_NaoDevePermitirEditar()
        {
            var salaId = new Guid();

            // Arrange
            LoginAs(UsuariosDeTestePredefinidos.JoaoSilva);

            var req = new CriarSala
            {
                Nome = "Sala de Governador Valadares",
                Descricao = "Sala de Governador Valadares bem localizada no centro da cidade.",
                Capacidade = 20,
                FusoHorario = "America/Sao_Paulo"
            };

            // Act
            var response = await Http.PutAsJsonAsync($"salas/{salaId}", req, cancellationToken: TestContext.Current.CancellationToken);

            //Assert
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Fact]
        public async Task ExcluirSala_DevePermitirExclusao()
        {
            var salaId = SalasDeTestePredefinidas.SalaReuniaoSP.Id;

            // Arrange
            LoginAs(UsuariosDeTestePredefinidos.JoaoSilva);

            // Act
            var response = await Http.DeleteAsync($"salas/{salaId}", cancellationToken: TestContext.Current.CancellationToken);

            //Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task ExcluirSala_NaoDevePermitirExclusao()
        {
            var salaId = new Guid();

            // Arrange
            LoginAs(UsuariosDeTestePredefinidos.JoaoSilva);

            // Act
            var response = await Http.DeleteAsync($"salas/{salaId}", cancellationToken: TestContext.Current.CancellationToken);

            //Assert
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Fact]
        public async Task ListarSalar_DevePermitirListar()
        {
            // Act
            var response = await Http.GetAsync($"salas/", cancellationToken: TestContext.Current.CancellationToken);

            //Assert
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task ListarSalar_NaoDevePermitirListar()
        {
            // Arrange
            LoginAs(UsuariosDeTestePredefinidos.JoaoSilva);

            // Act
            var response = await Http.GetAsync($"salas/", cancellationToken: TestContext.Current.CancellationToken);

            //Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }
    }
}
