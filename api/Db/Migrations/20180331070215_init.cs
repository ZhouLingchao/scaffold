using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Db.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Account",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AccountName = table.Column<string>(maxLength: 64, nullable: false),
                    CreateAccountId = table.Column<long>(nullable: false),
                    CreateTime = table.Column<DateTime>(nullable: false),
                    NickName = table.Column<string>(maxLength: 32, nullable: false),
                    Password = table.Column<string>(maxLength: 256, nullable: false),
                    SecuritySeed = table.Column<string>(maxLength: 64, nullable: false),
                    Status = table.Column<int>(nullable: false),
                    UpdateAccountId = table.Column<long>(nullable: false),
                    UpdateTime = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Account", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Birthday = table.Column<DateTime>(nullable: false),
                    EMail = table.Column<string>(maxLength: 128, nullable: true),
                    Gender = table.Column<int>(nullable: false),
                    Mobile = table.Column<string>(maxLength: 16, nullable: true),
                    RealName = table.Column<string>(maxLength: 64, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Account");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
