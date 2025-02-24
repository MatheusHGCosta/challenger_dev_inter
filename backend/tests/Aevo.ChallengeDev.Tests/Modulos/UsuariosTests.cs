using Aevo.ChallengeDev.Tests.Core;
using Aevo.ChallengeDev.WebApi.Modulos.Salas.Endpoints;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Aevo.ChallengeDev.WebApi.Modulos.Usuarios.Endpoints;

namespace Aevo.ChallengeDev.Tests.Modulos
{
    public class UsuariosTests(IntegrationTestFactory factory) : TestBase(factory) 
    {
        [Fact]
        public async Task Usuario_DevePermitirLogar()
        {
            // Arrange
            var usuario = UsuariosDeTestePredefinidos.JohnDoe;


            var login = new Login
            {
                Email = usuario.Email,
                Password = usuario.Password
            };
            // Act
            var response = await Http.PostAsJsonAsync($"usuarios/login/", login, cancellationToken: TestContext.Current.CancellationToken);

            //Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task Usuario_NaoDevePermitirLogar()
        {
            // Arrange
            var usuario = UsuariosDeTestePredefinidos.JohnDoe;


            var login = new Login
            {
                Email = usuario.Email,
                Password = "1289731973"
            };
            // Act
            var response = await Http.PostAsJsonAsync($"usuarios/login/", login, cancellationToken: TestContext.Current.CancellationToken);

            //Assert
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }


        [Fact]
        public async Task Usuario_DevePermitirRegistrar()
        {
            // Arrange
            var usuario = UsuariosDeTestePredefinidos.JohnDoe;


            var criar = new RegistrarUsuario
            {
                Email = "MatheusEmail@gmail.com.br",
                Nome = "Matheus",
                Idioma = "pt-BR",
                FusoHorario = "America/Sao_Paulo",
                Password = "SenhaSuperSegura123"
            };
            // Act
            var response = await Http.PostAsJsonAsync($"usuarios/", criar, cancellationToken: TestContext.Current.CancellationToken);

            //Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }
    }
}
