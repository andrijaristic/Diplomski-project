﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Web.API.Migrations
{
    /// <inheritdoc />
    public partial class PropertyDataModelLogicalDelete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Properties",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Properties");
        }
    }
}
