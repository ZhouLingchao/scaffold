﻿// <auto-generated />
using Db;
using Infrastructrue.Constants.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;

namespace Db.Migrations
{
    [DbContext(typeof(ApiDbContext))]
    [Migration("20180427070830_modifyToId")]
    partial class modifyToId
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.2-rtm-10011")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Db.Entities.Users.Role", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(64);

                    b.HasKey("Id");

                    b.ToTable("Role");
                });

            modelBuilder.Entity("Db.Entities.Users.RoleFunctions", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("FunctionCode")
                        .IsRequired()
                        .HasMaxLength(128);

                    b.Property<long>("RoleId");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("RoleFunctions");
                });

            modelBuilder.Entity("Db.Entities.Users.User", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccountStatus");

                    b.Property<DateTime>("Birthday");

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasMaxLength(64);

                    b.Property<string>("EMail")
                        .HasMaxLength(128);

                    b.Property<int>("Gender");

                    b.Property<string>("Mobile")
                        .HasMaxLength(16);

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.Property<string>("RealName")
                        .IsRequired()
                        .HasMaxLength(64);

                    b.Property<string>("SecuritySeed")
                        .IsRequired()
                        .HasMaxLength(64);

                    b.HasKey("Id");

                    b.ToTable("User");
                });

            modelBuilder.Entity("Db.Entities.Users.UserRoleRel", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<long>("RoleId");

                    b.Property<long>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.HasIndex("UserId");

                    b.ToTable("UserRoleRel");
                });

            modelBuilder.Entity("Db.Entities.Users.RoleFunctions", b =>
                {
                    b.HasOne("Db.Entities.Users.Role")
                        .WithMany("RoleFunctions")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Db.Entities.Users.UserRoleRel", b =>
                {
                    b.HasOne("Db.Entities.Users.Role")
                        .WithMany("UserRoleRel")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Db.Entities.Users.User")
                        .WithMany("UserRoleRel")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}