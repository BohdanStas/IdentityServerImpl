using IdentityServer4.Models;
using System;
using System.Collections.Generic;
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
                    ClientId = "client_id_react",
                    RequireClientSecret = false,
                    RequirePkce = true,
                    AllowedCorsOrigins = {"https://clientapp321.azurewebsites.net"},
                    AllowedGrantTypes = GrantTypes.Code,

                    AllowedScopes =
                    {
                        "ApiOne", IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile
                    },

                    RedirectUris = {"https://clientapp321.azurewebsites.net/callback"},
                    PostLogoutRedirectUris = {"https://clientapp321.azurewebsites.net/logout"},

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
