using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Web.API.Migrations
{
    /// <inheritdoc />
    public partial class CommentDataModelUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Properties_Image_ThumbnailImageId",
                table: "Properties");

            migrationBuilder.DropTable(
                name: "Image");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreationDate",
                table: "Comments",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "AccommodationImage",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ImageURL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PropertyId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccommodationImage", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AccommodationImage_Properties_PropertyId",
                        column: x => x.PropertyId,
                        principalTable: "Properties",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AccommodationImage_PropertyId",
                table: "AccommodationImage",
                column: "PropertyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Properties_AccommodationImage_ThumbnailImageId",
                table: "Properties",
                column: "ThumbnailImageId",
                principalTable: "AccommodationImage",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Properties_AccommodationImage_ThumbnailImageId",
                table: "Properties");

            migrationBuilder.DropTable(
                name: "AccommodationImage");

            migrationBuilder.DropColumn(
                name: "CreationDate",
                table: "Comments");

            migrationBuilder.CreateTable(
                name: "Image",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ImageURL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PropertyId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Image", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Image_Properties_PropertyId",
                        column: x => x.PropertyId,
                        principalTable: "Properties",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Image_PropertyId",
                table: "Image",
                column: "PropertyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Properties_Image_ThumbnailImageId",
                table: "Properties",
                column: "ThumbnailImageId",
                principalTable: "Image",
                principalColumn: "Id");
        }
    }
}
