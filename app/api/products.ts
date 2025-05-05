export const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 1000 },
  { id: 2, name: "Phone", category: "Electronics", price: 500 },
  { id: 3, name: "Shoes", category: "Fashion", price: 100 },
  { id: 4, name: "Watch", category: "Accessories", price: 200 },
];

export function searchProducts(query: string, category?: string) {
  return products.filter((product) => {
    const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category ? product.category === category : true;
    return matchesQuery && matchesCategory;
  });
}