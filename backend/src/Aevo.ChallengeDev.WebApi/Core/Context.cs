using Aevo.ChallengeDev.WebApi.Core.EfConfigs;
using Aevo.ChallengeDev.WebApi.Modulos.Agendamentos.Models;
using Aevo.ChallengeDev.WebApi.Modulos.Salas;
using Aevo.ChallengeDev.WebApi.Modulos.Salas.Models;
using Aevo.ChallengeDev.WebApi.Modulos.Usuarios;
using Aevo.ChallengeDev.WebApi.Modulos.Usuarios.Models;
using Microsoft.EntityFrameworkCore;

namespace Aevo.ChallengeDev.WebApi.Core;

public class Context(DbContextOptions<Context> options) : DbContext(options)
{
    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Sala> Salas { get; set; }
    public DbSet<Agendamento> Agendamentos{ get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(UsuarioEntityTypeConfiguration).Assembly);
    }
}