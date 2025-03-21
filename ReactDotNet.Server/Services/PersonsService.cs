using PersonApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace PersonApi.Services;

public class PersonsService
{
    private readonly IMongoCollection<Person> _booksCollection;

    public PersonsService(
        IOptions<PersonDatabaseSettings> PersonDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            PersonDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            PersonDatabaseSettings.Value.DatabaseName);

        _booksCollection = mongoDatabase.GetCollection<Person>(
            PersonDatabaseSettings.Value.PersonsCollectionName);
    }

    public async Task<List<Person>> GetAsync() =>
        await _booksCollection.Find(_ => true).ToListAsync();

    public async Task<Person?> GetAsync(string id) =>
        await _booksCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Person newPerson) =>
        await _booksCollection.InsertOneAsync(newPerson);

    public async Task UpdateAsync(string id, Person updatedPerson) =>
        await _booksCollection.ReplaceOneAsync(x => x.Id == id, updatedPerson);

    public async Task RemoveAsync(string id) =>
        await _booksCollection.DeleteOneAsync(x => x.Id == id);
}