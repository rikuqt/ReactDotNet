using PersonApi.Models;
using PersonApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace PersonApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PersonsController : ControllerBase
{
    private readonly PersonsService _personsService;

    public PersonsController(PersonsService personsService) =>
        _personsService = personsService;

    [HttpGet]
    public async Task<List<Person>> Get() =>
        await _personsService.GetAsync();

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<Person>> Get(string id)
    {
        var book = await _personsService.GetAsync(id);

        if (book is null)
        {
            return NotFound();
        }

        return book;
    }

    [HttpPost]
    public async Task<IActionResult> Post(Person newPerson)
    {
        await _personsService.CreateAsync(newPerson);

        return CreatedAtAction(nameof(Get), new { id = newPerson.Id }, newPerson);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Person updatedPerson)
    {
        var book = await _personsService.GetAsync(id);

        if (book is null)
        {
            return NotFound();
        }

        updatedPerson.Id = book.Id;

        await _personsService.UpdateAsync(id, updatedPerson);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var book = await _personsService.GetAsync(id);

        if (book is null)
        {
            return NotFound();
        }

        await _personsService.RemoveAsync(id);

        return NoContent();
    }
}