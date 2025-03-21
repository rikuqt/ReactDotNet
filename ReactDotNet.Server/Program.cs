using Microsoft.OpenApi.Models;
using PersonStore.DB;
using PersonApi.Models;
using PersonApi.Services;

var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<PersonDatabaseSettings>(
    builder.Configuration.GetSection("PersonDatabase"));

builder.Services.AddControllers()
    .AddJsonOptions(
        options => options.JsonSerializerOptions.PropertyNamingPolicy = null);

builder.Services.AddSingleton<PersonsService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy  =>
                      {
                          policy.WithOrigins("https://localhost:53691",
                                                "https://localhost:27017")
                                              .AllowAnyHeader()
                                              .AllowAnyMethod();
                      });
});
builder.Services.AddSwaggerGen(c =>
    {
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "FORM API", Description = "Keeps track of name, surname and age", Version = "v1" });
    });


var app = builder.Build();

        app.UseSwagger();
app.UseSwaggerUI(c =>
    {
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Form V1");
    });


app.UseCors(MyAllowSpecificOrigins);

app.MapControllers();

// app.MapGet("/", () => "Hello World!");
// app.MapGet("/persons/{id}", (int id) => PersonDB.GetPerson(id));
// app.MapGet("/persons", () => PersonDB.GetPersons());
// app.MapPost("/persons", (Person person) => PersonDB.CreatePerson(person));
// app.MapPut("/persons", (Person person) => PersonDB.UpdatePerson(person));
// app.MapDelete("/persons/{id}", (int id) => PersonDB.RemovePerson(id));

app.Run();