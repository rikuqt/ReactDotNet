 namespace PersonStore.DB; 

 public record Person
 {
   public int Id {get; set;} 
   public string ? Name { get; set; }
   public string ? Surname { get; set; }
   public int ? Age { get; set; }
 }

 public class PersonDB
 {
    private static List<Person> _Persons = new List<Person>()
    {
        new Person { Id = 1, Name = "John", Surname = "Doe", Age = 30 },
        new Person { Id = 2, Name = "Jane", Surname = "Smith", Age = 25 },
        new Person { Id = 3, Name = "Michael", Surname = "Johnson", Age = 40 },
        new Person { Id = 4, Name = "Emily", Surname = "Davis", Age = 35 },
        new Person { Id = 5, Name = "David", Surname = "Wilson", Age = 28 }
    };

   public static List<Person> GetPersons() 
   {
     return _Persons;
   } 

   public static Person ? GetPerson(int id) 
   {
     return _Persons.SingleOrDefault(Person => Person.Id == id);
   } 

   public static Person CreatePerson(Person Person) 
   {
     _Persons.Add(Person);
     return Person;
   }

   public static Person UpdatePerson(Person update) 
   {
     _Persons = _Persons.Select(Person =>
     {
       if (Person.Id == update.Id)
       {
         Person.Name = update.Name;
       }
       return Person;
     }).ToList();
     return update;
   }

   public static void RemovePerson(int id)
   {
     _Persons = _Persons.FindAll(Person => Person.Id != id).ToList();
   }
 }