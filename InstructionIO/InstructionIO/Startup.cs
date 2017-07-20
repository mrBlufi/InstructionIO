
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

using Microsoft.Extensions.FileProviders;
using System.IO;
using InstructionIO.Data;
using InstructionIO.Models;
using InstructionIO.Services;
using Newtonsoft.Json.Serialization;
using Brik.Security.VkontakteMiddleware;
using Microsoft.Extensions.Options;

namespace InstructionIO
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                 .SetBasePath(env.ContentRootPath)
                 .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                 .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            if (env.IsDevelopment())
            {
                // For more details on using the user secret store see https://go.microsoft.com/fwlink/?LinkID=532709
                builder.AddUserSecrets<Startup>();
            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc()
              .AddDataAnnotationsLocalization()
              .AddViewLocalization()
              .AddJsonOptions(options =>
              {
                  options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
              });
            services.AddDbContext<ApplicationDbContext>(options =>
               options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();
            services.Configure<IdentityOptions>(options =>
            {
                options.User.RequireUniqueEmail = false;
            });

            // Add application services.
            services.AddTransient<IEmailSender, AuthMessageSender>();
            services.AddTransient<ISmsSender, AuthMessageSender>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            app.UseDeveloperExceptionPage();

            var locOptions = app.ApplicationServices.GetService<IOptions<RequestLocalizationOptions>>();
            app.UseRequestLocalization(locOptions.Value);

            app.UseIdentity();


            app.UseFacebookAuthentication(new FacebookOptions
            {
                AppId = "1759352080772434",
                AppSecret = "2fb7a5a03b35480e8c4888a2e276d152"
            });
            app.UseTwitterAuthentication(new TwitterOptions()
            {
                ConsumerKey = "KHEPZW0ZGGbvmgP5V9XltcPcb",
                ConsumerSecret = "ryrlys72XFXCdQIrmAaqjfEMRh1dNSTy9GUwrGZb1SOAC18TFj"
            });

            app.UseGoogleAuthentication(new GoogleOptions()
            {
                ClientId = "699427373806-f40rmrjidlkpjnqaaehg9rogvf2mt0nq.apps.googleusercontent.com",
                ClientSecret = "Sla1zfZRk6InvNx3Iiap9Mm9"
            });


            app.UseVkontakteAuthentication(new VkontakteOptions
            {
                ClientId = "6116045",
                ClientSecret = "n4yqgHpACOE1g1qVB4rM",
                SaveTokens = true

            });


            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "node_modules")),
                RequestPath = "/node_modules"
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                // in case multiple SPAs required.
                routes.MapSpaFallbackRoute("spa-fallback", new { controller = "home", action = "index" });
            });
        }
    }
}
