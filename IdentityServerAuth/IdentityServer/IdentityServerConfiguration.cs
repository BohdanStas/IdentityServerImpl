using IdentityServer4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityModel;
using IdentityServer4;

namespace IdentityServer
{
    public class IdentityServerConfiguration
    {
        public static IEnumerable<ApiResource> GetApiResources() =>
         new List<ApiResource>()
        {
            new ApiResource("ApiOne")
            {
                Scopes = { "ApiOne"}
            }
        };

        public static IEnumerable<ApiScope> GetScopes() =>
            new List<ApiScope>()
            {
            new ApiScope("ApiOne")
            };

        public static IEnumerable<Client> Clients() =>
                new List<Client>()
                {
                new Client()
                {
                    // uses for identification client app
                    ClientId = "client_id_mvc",
                    ClientSecrets = {new Secret("client_secret_mvc".ToSha256())},

                    // the way of retrieving access token
                    AllowedGrantTypes = GrantTypes.Code, // code???

                    AllowedScopes =
                    {
                        "ApiOne", IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile
                    },
                    RedirectUris = {"https://localhost:44328/signin-oidc"},

                    RequireConsent = false
                }
                };

        public static IEnumerable<IdentityResource> GetIdentityResources() =>
        new List<IdentityResource>()
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile()
        };
    }
}
