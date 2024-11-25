using backend_dotnet.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace backend_dotnet.Data
{
    public class ContactlyDbContext : DbContext
    {
        public ContactlyDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Contact> Contacts { get; set; }
    }
}