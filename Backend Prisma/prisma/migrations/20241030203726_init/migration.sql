-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "ProductSold" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "product_id" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ProductSold_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Historical" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "product_id" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    CONSTRAINT "Historical_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Historical_product_id_key" ON "Historical"("product_id");
