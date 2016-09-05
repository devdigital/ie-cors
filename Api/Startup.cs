using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Cors.Internal;

namespace Api
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
          var builder = new ConfigurationBuilder()
              .SetBasePath(env.ContentRootPath)
              .AddEnvironmentVariables();

          Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
          loggerFactory.AddConsole(Configuration.GetSection("Logging"));
          loggerFactory.AddDebug();

          app.UseCors("AllowAllOrigins");
          app.UseMvc();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc();
            services.AddCors(options => {
              options.AddPolicy("AllowAllOrigins", builder => builder.AllowAnyOrigin());   
            });
            services.AddSingleton<IValuesRepository, DefaultValuesRepository>();
        }
    }
}
