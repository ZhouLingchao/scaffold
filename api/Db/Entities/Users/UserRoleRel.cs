namespace Db.Entities.Users
{
    public class UserRoleRel: PrimaryKey
    {
        public long UserId { get; set; }
        public long RoleId { get; set; }
    }
}
