using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Web.API.Migrations
{
    /// <inheritdoc />
    public partial class CompletePropertyNameRefactor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AccommodationImage_Properties_PropertyId",
                table: "AccommodationImage");

            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Properties_PropertyId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Properties_PropertyId",
                table: "Reservations");

            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_Properties_PropertyId",
                table: "Rooms");

            migrationBuilder.DropForeignKey(
                name: "FK_RoomTypes_Properties_PropertyId",
                table: "RoomTypes");

            migrationBuilder.DropTable(
                name: "PropertyPropertyUtility");

            migrationBuilder.DropTable(
                name: "SavedProperties");

            migrationBuilder.DropTable(
                name: "PropertyUtilities");

            migrationBuilder.DropTable(
                name: "Properties");

            migrationBuilder.RenameColumn(
                name: "PropertyId",
                table: "RoomTypes",
                newName: "AccommodationId");

            migrationBuilder.RenameIndex(
                name: "IX_RoomTypes_PropertyId",
                table: "RoomTypes",
                newName: "IX_RoomTypes_AccommodationId");

            migrationBuilder.RenameColumn(
                name: "PropertyId",
                table: "Rooms",
                newName: "AccommodationId");

            migrationBuilder.RenameIndex(
                name: "IX_Rooms_PropertyId",
                table: "Rooms",
                newName: "IX_Rooms_AccommodationId");

            migrationBuilder.RenameColumn(
                name: "PropertyId",
                table: "Reservations",
                newName: "AccommodationId");

            migrationBuilder.RenameIndex(
                name: "IX_Reservations_PropertyId",
                table: "Reservations",
                newName: "IX_Reservations_AccommodationId");

            migrationBuilder.RenameColumn(
                name: "PropertyId",
                table: "Comments",
                newName: "AccommodationId");

            migrationBuilder.RenameIndex(
                name: "IX_Comments_PropertyId",
                table: "Comments",
                newName: "IX_Comments_AccommodationId");

            migrationBuilder.RenameColumn(
                name: "PropertyId",
                table: "AccommodationImage",
                newName: "AccommodationId");

            migrationBuilder.RenameIndex(
                name: "IX_AccommodationImage_PropertyId",
                table: "AccommodationImage",
                newName: "IX_AccommodationImage_AccommodationId");

            migrationBuilder.CreateTable(
                name: "Accommodations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AverageGrade = table.Column<double>(type: "float(1)", precision: 1, scale: 2, nullable: false, defaultValue: 1.0),
                    ThumbnailImageId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Area = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Latitude = table.Column<double>(type: "float", nullable: false),
                    Longitude = table.Column<double>(type: "float", nullable: false),
                    StartingPrice = table.Column<int>(type: "int", nullable: false),
                    IsVisible = table.Column<bool>(type: "bit", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accommodations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Accommodations_AccommodationImage_ThumbnailImageId",
                        column: x => x.ThumbnailImageId,
                        principalTable: "AccommodationImage",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Accommodations_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Amenities",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AccommodationAmenity = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Amenities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SavedAccommodations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AccommodationId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SavedAccommodations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SavedAccommodations_Accommodations_AccommodationId",
                        column: x => x.AccommodationId,
                        principalTable: "Accommodations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SavedAccommodations_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "AccommodationAmenity",
                columns: table => new
                {
                    AccommodationsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AmenitiesId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccommodationAmenity", x => new { x.AccommodationsId, x.AmenitiesId });
                    table.ForeignKey(
                        name: "FK_AccommodationAmenity_Accommodations_AccommodationsId",
                        column: x => x.AccommodationsId,
                        principalTable: "Accommodations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AccommodationAmenity_Amenities_AmenitiesId",
                        column: x => x.AmenitiesId,
                        principalTable: "Amenities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AccommodationAmenity_AmenitiesId",
                table: "AccommodationAmenity",
                column: "AmenitiesId");

            migrationBuilder.CreateIndex(
                name: "IX_Accommodations_ThumbnailImageId",
                table: "Accommodations",
                column: "ThumbnailImageId");

            migrationBuilder.CreateIndex(
                name: "IX_Accommodations_UserId",
                table: "Accommodations",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Amenities_Id",
                table: "Amenities",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_SavedAccommodations_AccommodationId",
                table: "SavedAccommodations",
                column: "AccommodationId");

            migrationBuilder.CreateIndex(
                name: "IX_SavedAccommodations_Id",
                table: "SavedAccommodations",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_SavedAccommodations_UserId",
                table: "SavedAccommodations",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_AccommodationImage_Accommodations_AccommodationId",
                table: "AccommodationImage",
                column: "AccommodationId",
                principalTable: "Accommodations",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Accommodations_AccommodationId",
                table: "Comments",
                column: "AccommodationId",
                principalTable: "Accommodations",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Accommodations_AccommodationId",
                table: "Reservations",
                column: "AccommodationId",
                principalTable: "Accommodations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_Accommodations_AccommodationId",
                table: "Rooms",
                column: "AccommodationId",
                principalTable: "Accommodations",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RoomTypes_Accommodations_AccommodationId",
                table: "RoomTypes",
                column: "AccommodationId",
                principalTable: "Accommodations",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AccommodationImage_Accommodations_AccommodationId",
                table: "AccommodationImage");

            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Accommodations_AccommodationId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Accommodations_AccommodationId",
                table: "Reservations");

            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_Accommodations_AccommodationId",
                table: "Rooms");

            migrationBuilder.DropForeignKey(
                name: "FK_RoomTypes_Accommodations_AccommodationId",
                table: "RoomTypes");

            migrationBuilder.DropTable(
                name: "AccommodationAmenity");

            migrationBuilder.DropTable(
                name: "SavedAccommodations");

            migrationBuilder.DropTable(
                name: "Amenities");

            migrationBuilder.DropTable(
                name: "Accommodations");

            migrationBuilder.RenameColumn(
                name: "AccommodationId",
                table: "RoomTypes",
                newName: "PropertyId");

            migrationBuilder.RenameIndex(
                name: "IX_RoomTypes_AccommodationId",
                table: "RoomTypes",
                newName: "IX_RoomTypes_PropertyId");

            migrationBuilder.RenameColumn(
                name: "AccommodationId",
                table: "Rooms",
                newName: "PropertyId");

            migrationBuilder.RenameIndex(
                name: "IX_Rooms_AccommodationId",
                table: "Rooms",
                newName: "IX_Rooms_PropertyId");

            migrationBuilder.RenameColumn(
                name: "AccommodationId",
                table: "Reservations",
                newName: "PropertyId");

            migrationBuilder.RenameIndex(
                name: "IX_Reservations_AccommodationId",
                table: "Reservations",
                newName: "IX_Reservations_PropertyId");

            migrationBuilder.RenameColumn(
                name: "AccommodationId",
                table: "Comments",
                newName: "PropertyId");

            migrationBuilder.RenameIndex(
                name: "IX_Comments_AccommodationId",
                table: "Comments",
                newName: "IX_Comments_PropertyId");

            migrationBuilder.RenameColumn(
                name: "AccommodationId",
                table: "AccommodationImage",
                newName: "PropertyId");

            migrationBuilder.RenameIndex(
                name: "IX_AccommodationImage_AccommodationId",
                table: "AccommodationImage",
                newName: "IX_AccommodationImage_PropertyId");

            migrationBuilder.CreateTable(
                name: "Properties",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ThumbnailImageId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Area = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AverageGrade = table.Column<double>(type: "float(1)", precision: 1, scale: 2, nullable: false),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    IsVisible = table.Column<bool>(type: "bit", nullable: false),
                    Latitude = table.Column<double>(type: "float", nullable: false),
                    Longitude = table.Column<double>(type: "float", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartingPrice = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Properties", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Properties_AccommodationImage_ThumbnailImageId",
                        column: x => x.ThumbnailImageId,
                        principalTable: "AccommodationImage",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Properties_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PropertyUtilities",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Utility = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PropertyUtilities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SavedProperties",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PropertyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SavedProperties", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SavedProperties_Properties_PropertyId",
                        column: x => x.PropertyId,
                        principalTable: "Properties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SavedProperties_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PropertyPropertyUtility",
                columns: table => new
                {
                    PropertiesId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UtilitiesId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PropertyPropertyUtility", x => new { x.PropertiesId, x.UtilitiesId });
                    table.ForeignKey(
                        name: "FK_PropertyPropertyUtility_Properties_PropertiesId",
                        column: x => x.PropertiesId,
                        principalTable: "Properties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PropertyPropertyUtility_PropertyUtilities_UtilitiesId",
                        column: x => x.UtilitiesId,
                        principalTable: "PropertyUtilities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Properties_ThumbnailImageId",
                table: "Properties",
                column: "ThumbnailImageId");

            migrationBuilder.CreateIndex(
                name: "IX_Properties_UserId",
                table: "Properties",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_PropertyPropertyUtility_UtilitiesId",
                table: "PropertyPropertyUtility",
                column: "UtilitiesId");

            migrationBuilder.CreateIndex(
                name: "IX_PropertyUtilities_Id",
                table: "PropertyUtilities",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_SavedProperties_Id",
                table: "SavedProperties",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_SavedProperties_PropertyId",
                table: "SavedProperties",
                column: "PropertyId");

            migrationBuilder.CreateIndex(
                name: "IX_SavedProperties_UserId",
                table: "SavedProperties",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_AccommodationImage_Properties_PropertyId",
                table: "AccommodationImage",
                column: "PropertyId",
                principalTable: "Properties",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Properties_PropertyId",
                table: "Comments",
                column: "PropertyId",
                principalTable: "Properties",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Properties_PropertyId",
                table: "Reservations",
                column: "PropertyId",
                principalTable: "Properties",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_Properties_PropertyId",
                table: "Rooms",
                column: "PropertyId",
                principalTable: "Properties",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RoomTypes_Properties_PropertyId",
                table: "RoomTypes",
                column: "PropertyId",
                principalTable: "Properties",
                principalColumn: "Id");
        }
    }
}
