using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Db.Migrations
{
    public partial class modifyToId : Migration
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

            migrationBuilder.DropColumn(
                name: "Timespan",
                table: "Role");

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

            migrationBuilder.AlterColumn<long>(
                name: "RoleId",
                table: "RoleFunctions",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AddColumn<byte[]>(
                name: "Timespan",
                table: "Role",
                rowVersion: true,
                nullable: true);

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
    }
}
