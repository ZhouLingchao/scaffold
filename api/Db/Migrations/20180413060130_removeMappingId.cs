using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Db.Migrations
{
    public partial class removeMappingId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UserRoleRel",
                table: "UserRoleRel");

            migrationBuilder.DropIndex(
                name: "IX_UserRoleRel_RoleId",
                table: "UserRoleRel");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RoleFunctions",
                table: "RoleFunctions");

            migrationBuilder.DropIndex(
                name: "IX_RoleFunctions_RoleId",
                table: "RoleFunctions");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "UserRoleRel");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "RoleFunctions");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserRoleRel",
                table: "UserRoleRel",
                columns: new[] { "RoleId", "UserId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_RoleFunctions",
                table: "RoleFunctions",
                columns: new[] { "RoleId", "FunctionCode" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UserRoleRel",
                table: "UserRoleRel");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RoleFunctions",
                table: "RoleFunctions");

            migrationBuilder.AddColumn<long>(
                name: "Id",
                table: "UserRoleRel",
                nullable: false,
                defaultValue: 0L)
                .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddColumn<long>(
                name: "Id",
                table: "RoleFunctions",
                nullable: false,
                defaultValue: 0L)
                .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserRoleRel",
                table: "UserRoleRel",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RoleFunctions",
                table: "RoleFunctions",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoleRel_RoleId",
                table: "UserRoleRel",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_RoleFunctions_RoleId",
                table: "RoleFunctions",
                column: "RoleId");
        }
    }
}
