﻿// <auto-generated />
using System;
using Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Web.API.Migrations
{
    [DbContext(typeof(ProjectDbContext))]
    partial class ProjectDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Domain.Models.Comment", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Content")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Grade")
                        .HasColumnType("float");

                    b.Property<string>("Header")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("PropertyId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("Id");

                    b.HasIndex("PropertyId");

                    b.HasIndex("UserId");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("Domain.Models.Image", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("ImageURL")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("PropertyId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("PropertyId");

                    b.ToTable("Image");
                });

            modelBuilder.Entity("Domain.Models.Property", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<double>("AverageGrade")
                        .HasPrecision(1, 2)
                        .HasColumnType("float(1)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsVerified")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("StartingPrice")
                        .HasColumnType("int");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("VerificationStatus")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Properties");
                });

            modelBuilder.Entity("Domain.Models.PropertyUtility", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Utility")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("Id");

                    b.ToTable("PropertyUtilities");
                });

            modelBuilder.Entity("Domain.Models.Reservation", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("ArrivalDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DepartureDate")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsCancelled")
                        .HasColumnType("bit");

                    b.Property<bool>("IsPayed")
                        .HasColumnType("bit");

                    b.Property<double>("Price")
                        .HasPrecision(4, 2)
                        .HasColumnType("float(4)");

                    b.Property<Guid>("PropertyId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("RoomId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("Id");

                    b.HasIndex("PropertyId");

                    b.HasIndex("RoomId");

                    b.HasIndex("UserId");

                    b.ToTable("Reservations");
                });

            modelBuilder.Entity("Domain.Models.ReservedDays", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("ArrivalDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DepartureDate")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("RoomId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("Id");

                    b.HasIndex("RoomId");

                    b.ToTable("ReservedDays");
                });

            modelBuilder.Entity("Domain.Models.Room", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("PropertyId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("RoomTypeId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("Id");

                    b.HasIndex("PropertyId");

                    b.HasIndex("RoomTypeId");

                    b.ToTable("Rooms");
                });

            modelBuilder.Entity("Domain.Models.RoomType", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Adults")
                        .HasColumnType("int");

                    b.Property<int>("Children")
                        .HasColumnType("int");

                    b.Property<Guid>("PropertyId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("Id");

                    b.HasIndex("PropertyId");

                    b.ToTable("RoomTypes");
                });

            modelBuilder.Entity("Domain.Models.SavedProperty", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("PropertyId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("Id");

                    b.HasIndex("PropertyId");

                    b.HasIndex("UserId");

                    b.ToTable("SavedProperties");
                });

            modelBuilder.Entity("Domain.Models.SeasonalPricing", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("Price")
                        .HasColumnType("int");

                    b.Property<Guid>("RoomTypeId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Season")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("Id");

                    b.HasIndex("RoomTypeId");

                    b.ToTable("SeasonalPricings");
                });

            modelBuilder.Entity("Domain.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Country")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsVerified")
                        .HasColumnType("bit");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("VerificationStatus")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("Username")
                        .IsUnique()
                        .HasFilter("[Username] IS NOT NULL");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("PropertyPropertyUtility", b =>
                {
                    b.Property<Guid>("PropertiesId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("UtilitiesId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("PropertiesId", "UtilitiesId");

                    b.HasIndex("UtilitiesId");

                    b.ToTable("PropertyPropertyUtility");
                });

            modelBuilder.Entity("Domain.Models.Comment", b =>
                {
                    b.HasOne("Domain.Models.Property", "Property")
                        .WithMany("Comments")
                        .HasForeignKey("PropertyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Models.User", "User")
                        .WithMany("Comments")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Property");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain.Models.Image", b =>
                {
                    b.HasOne("Domain.Models.Property", null)
                        .WithMany("Images")
                        .HasForeignKey("PropertyId");
                });

            modelBuilder.Entity("Domain.Models.Property", b =>
                {
                    b.HasOne("Domain.Models.User", "User")
                        .WithMany("Properties")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain.Models.Reservation", b =>
                {
                    b.HasOne("Domain.Models.Property", "Property")
                        .WithMany("Reservations")
                        .HasForeignKey("PropertyId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Domain.Models.Room", "Room")
                        .WithMany("Reservations")
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Domain.Models.User", "User")
                        .WithMany("Reservations")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Property");

                    b.Navigation("Room");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain.Models.ReservedDays", b =>
                {
                    b.HasOne("Domain.Models.Room", "Room")
                        .WithMany("OccupiedDates")
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Room");
                });

            modelBuilder.Entity("Domain.Models.Room", b =>
                {
                    b.HasOne("Domain.Models.Property", "Property")
                        .WithMany("Rooms")
                        .HasForeignKey("PropertyId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Domain.Models.RoomType", "RoomType")
                        .WithMany("Rooms")
                        .HasForeignKey("RoomTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Property");

                    b.Navigation("RoomType");
                });

            modelBuilder.Entity("Domain.Models.RoomType", b =>
                {
                    b.HasOne("Domain.Models.Property", "Property")
                        .WithMany("RoomTypes")
                        .HasForeignKey("PropertyId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Property");
                });

            modelBuilder.Entity("Domain.Models.SavedProperty", b =>
                {
                    b.HasOne("Domain.Models.Property", "Property")
                        .WithMany("SavedProperties")
                        .HasForeignKey("PropertyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Models.User", "User")
                        .WithMany("SavedProperties")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Property");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain.Models.SeasonalPricing", b =>
                {
                    b.HasOne("Domain.Models.RoomType", "RoomType")
                        .WithMany("SeasonalPricing")
                        .HasForeignKey("RoomTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("RoomType");
                });

            modelBuilder.Entity("PropertyPropertyUtility", b =>
                {
                    b.HasOne("Domain.Models.Property", null)
                        .WithMany()
                        .HasForeignKey("PropertiesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Models.PropertyUtility", null)
                        .WithMany()
                        .HasForeignKey("UtilitiesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.Models.Property", b =>
                {
                    b.Navigation("Comments");

                    b.Navigation("Images");

                    b.Navigation("Reservations");

                    b.Navigation("RoomTypes");

                    b.Navigation("Rooms");

                    b.Navigation("SavedProperties");
                });

            modelBuilder.Entity("Domain.Models.Room", b =>
                {
                    b.Navigation("OccupiedDates");

                    b.Navigation("Reservations");
                });

            modelBuilder.Entity("Domain.Models.RoomType", b =>
                {
                    b.Navigation("Rooms");

                    b.Navigation("SeasonalPricing");
                });

            modelBuilder.Entity("Domain.Models.User", b =>
                {
                    b.Navigation("Comments");

                    b.Navigation("Properties");

                    b.Navigation("Reservations");

                    b.Navigation("SavedProperties");
                });
#pragma warning restore 612, 618
        }
    }
}
