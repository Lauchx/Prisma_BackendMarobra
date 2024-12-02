/*
  Warnings:

  - You are about to drop the column `month` on the `Historical` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[product_id]` on the table `ProductSold` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `Historical` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_Stock` to the `Historical` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Historical" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "product_id" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "id_Stock" TEXT NOT NULL,
    CONSTRAINT "Historical_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Historical_id_Stock_fkey" FOREIGN KEY ("id_Stock") REFERENCES "Stock" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Historical" ("id", "product_id") SELECT "id", "product_id" FROM "Historical";
DROP TABLE "Historical";
ALTER TABLE "new_Historical" RENAME TO "Historical";
CREATE UNIQUE INDEX "Historical_product_id_key" ON "Historical"("product_id");
CREATE UNIQUE INDEX "Historical_id_Stock_key" ON "Historical"("id_Stock");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "ProductSold_product_id_key" ON "ProductSold"("product_id");
