using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Db.Migrations
{
    public partial class changeFKIdToEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoleFunctions_Role_RoleId",
                table: "RoleFunctions");

            migrationBuilder.DropForeignKey(
                name: "FK_UserRoleRel_Role_RoleId",
                table: "UserRoleRel");

            migrationBuilder.DropForeignKey(
                name: "FK_UserRoleRel_User_UserId",
                table: "UserRoleRel");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserRoleRel",
                table: "UserRoleRel");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RoleFunctions",
                table: "RoleFunctions");

            migrationBuilder.AlterColumn<long>(
                name: "UserId",
                table: "UserRoleRel",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AlterColumn<long>(
                name: "RoleId",
                table: "UserRoleRel",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AddColumn<long>(
                name: "Id",
                table: "UserRoleRel",
                nullable: false,
                defaultValue: 0L)
                .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AlterColumn<long>(
                name: "RoleId",
                table: "RoleFunctions",
                nullable: true,
                oldClrType: typeof(long));

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

            migrationBuilder.AddForeignKey(
                name: "FK_RoleFunctions_Role_RoleId",
                table: "RoleFunctions",
                column: "RoleId",
                principalTable: "Role",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserRoleRel_Role_RoleId",
                table: "UserRoleRel",
                column: "RoleId",
                principalTable: "Role",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserRoleRel_User_UserId",
                table: "UserRoleRel",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoleFunctions_Role_RoleId",
                table: "RoleFunctions");

            migrationBuilder.DropForeignKey(
                name: "FK_UserRoleRel_Role_RoleId",
                table: "UserRoleRel");

            migrationBuilder.DropForeignKey(
                name: "FK_UserRoleRel_User_UserId",
                table: "UserRoleRel");

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

            migrationBuilder.AlterColumn<long>(
                name: "UserId",
                table: "UserRoleRel",
                nullable: false,
                oldClrType: typeof(long),
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "RoleId",
                table: "UserRoleRel",
                nullable: false,
                oldClrType: typeof(long),
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "RoleId",
                table: "RoleFunctions",
                nullable: false,
                oldClrType: typeof(long),
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserRoleRel",
                table: "UserRoleRel",
                columns: new[] { "RoleId", "UserId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_RoleFunctions",
                table: "RoleFunctions",
                columns: new[] { "RoleId", "FunctionCode" });

            migrationBuilder.AddForeignKey(
                name: "FK_RoleFunctions_Role_RoleId",
                table: "RoleFunctions",
                column: "RoleId",
                principalTable: "Role",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserRoleRel_Role_RoleId",
                table: "UserRoleRel",
                column: "RoleId",
                principalTable: "Role",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserRoleRel_User_UserId",
                table: "UserRoleRel",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
