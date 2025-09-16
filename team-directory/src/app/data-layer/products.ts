export async function createProduct(product: {
  name: string;
  sku: string;
  price: string;
  stock: string;
}) {
  await fetch("http://localhost/team-api/index.php/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
}

export async function editProduct(
  id: number,
  product: {
    name: string;
    sku: string;
    price: string;
    stock: string;
  }
) {
  await fetch(`http://localhost/team-api/index.php/api/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
}

export async function deleteProduct(id: number) {
  await fetch(`http://localhost/team-api/index.php/api/products/${id}`, {
    method: "DELETE",   
  });
}