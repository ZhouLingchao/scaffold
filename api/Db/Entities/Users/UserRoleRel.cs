namespace Db.Entities.Users
{
    public class UserRoleRel: PrimaryKey
    {
        public User User { get; set; }
        public Role Role { get; set; }
    }
}
