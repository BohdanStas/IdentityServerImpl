using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace IdentityServer.Data
{
    public class Initializer
    {
        public static async Task InitData(IServiceProvider provider)
        {
            var manager = provider.GetRequiredService<UserManager<IdentityUser>>();

            if (!manager.Users.Any())
            {
                var users = new List<IdentityUser>()
                {
                    new IdentityUser()
                    {
                        Email = "test@gmail.com",
                        UserName = "test",
                    },
                    new IdentityUser()
                    {
                        Email = "test2@gmail.com",
                        UserName = "test2",
                    },
                    new IdentityUser()
                    {
                        Email = "test3@gmail.com",
                        UserName = "test3",
                    },
                };

                foreach (var user in users)
                {
                    await manager.CreateAsync(user, "Pa$$w0rd");
                }
            }
        }
    }
}
