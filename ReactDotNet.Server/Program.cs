using Microsoft.OpenApi.Models;
using PersonStore.DB;

var client = "https://localhost:53691/";
var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy  =>
                      {
                          policy.WithOrigins("http://example.com",
                                              "http://www.contoso.com");
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
app.MapGet("/", () => "Hello World!");

app.MapGet("/persons/{id}", (int id) => PersonDB.GetPerson(id));
app.MapGet("/persons", () => PersonDB.GetPersons());
app.MapPost("/persons", (Person person) => PersonDB.CreatePerson(person));
app.MapPut("/persons", (Person person) => PersonDB.UpdatePerson(person));
app.MapPut("/persons/{id}", (int id) => PersonDB.RemovePerson(id));


app.Run();