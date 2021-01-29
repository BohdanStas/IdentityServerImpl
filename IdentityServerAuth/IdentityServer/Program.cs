using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using System.Threading.Tasks;
using IdentityServer.Data;
using Microsoft.Extensions.DependencyInjection;

namespace IdentityServer
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
          var host = CreateHostBuilder(args).Build();

          using var scope = host.Services.CreateScope();
          var services = scope.ServiceProvider;
          var context = services.GetRequiredService<DataContext>();
         
          //context.Database.Migrate();

          await Initializer.InitData(services);

          host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
