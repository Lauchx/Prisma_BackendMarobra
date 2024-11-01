/*
  Warnings:

  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - Added the required column `height` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_Stock` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `length` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_stock` to the `ProductSold` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Stock" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "outbound" INTEGER NOT NULL,
    "inbound" INTEGER NOT NULL,
    "current_quantity" INTEGER NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "width" DECIMAL NOT NULL,
    "height" DECIMAL NOT NULL,
    "length" DECIMAL NOT NULL,
    "id_Stock" TEXT NOT NULL,
    CONSTRAINT "Product_id_Stock_fkey" FOREIGN KEY ("id_Stock") REFERENCES "Stock" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("id", "name") SELECT "id", "name" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_id_Stock_key" ON "Product"("id_Stock");
CREATE TABLE "new_ProductSold" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "product_id" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_stock" TEXT NOT NULL,
    CONSTRAINT "ProductSold_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductSold_id_stock_fkey" FOREIGN KEY ("id_stock") REFERENCES "Stock" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProductSold" ("createdAt", "id", "product_id") SELECT "createdAt", "id", "product_id" FROM "ProductSold";
DROP TABLE "ProductSold";
ALTER TABLE "new_ProductSold" RENAME TO "ProductSold";
CREATE UNIQUE INDEX "ProductSold_id_stock_key" ON "ProductSold"("id_stock");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
