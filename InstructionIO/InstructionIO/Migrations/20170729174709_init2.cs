using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace InstructionIO.Migrations
{
    public partial class init2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "Rating",
                table: "Instructions",
                nullable: false,
                oldClrType: typeof(int));

            migrationBuilder.CreateTable(
                name: "RatingRelation",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    InstructionId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: true),
                    Value = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RatingRelation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RatingRelation_Instructions_InstructionId",
                        column: x => x.InstructionId,
                        principalTable: "Instructions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RatingRelation_UserInfos_UserId",
                        column: x => x.UserId,
                        principalTable: "UserInfos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RatingRelation_InstructionId",
                table: "RatingRelation",
                column: "InstructionId");

            migrationBuilder.CreateIndex(
                name: "IX_RatingRelation_UserId",
                table: "RatingRelation",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RatingRelation");

            migrationBuilder.AlterColumn<int>(
                name: "Rating",
                table: "Instructions",
                nullable: false,
                oldClrType: typeof(double));
        }
    }
}
