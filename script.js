const products = [
    { id: 1, name: "Gaming Laptop", description: "High-performance laptop", price: 999, category: "Electronics", sku: "LAP123" },
    { name: "Running Shoe", description: "Comfortable athletic shoe", price: 75, category: "Clothing", sku: "SHO456" },
    { name: "Wireless Mouse", description: "Ergonomic mouse", price: 25, category: "Electronics", sku: "MOU789" },
    { name: "T-Shirt", description: "Casual cotton shirt", price: 20, category: "Clothing", sku: "TSH012" }
];

let currentPage = 1;
const resultsPerPage = 2; // For demo purposes

function searchProducts() {
    const query = document.getElementById("searchInput").value.toLowerCase().replace(/[^a-z0-9 ]/g, '');
    const sort = document.getElementById("sortOption").value;
    const category = document.getElementById("categoryFilter").value;

    // Filter products
    let filtered = products.filter(p => 
        (p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)) &&
        (category === "" || p.category === category)
    );

    // Sort products
    if (sort === "priceAsc") filtered.sort((a, b) => a.price - b.price);
    if (sort === "priceDesc") filtered.sort((a, b) => b.price - a.price);
    if (sort === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));

    // Pagination
    const start = (currentPage - 1) * resultsPerPage;
    const paginated = filtered.slice(start, start + resultsPerPage);

    // Render results
    const resultsDiv = document.getElementById("results");
    if (paginated.length > 0) {
        resultsDiv.innerHTML = paginated.map(p => `
            <div class="product-card">
                <h3>${p.name}</h3>
                <p>${p.description}</p>
                <p><strong>Price:</strong> $${p.price}</p>
                <p><strong>Category:</strong> ${p.category}</p>
                <p><strong>SKU:</strong> ${p.sku}</p>
            </div>
        `).join("");
    } else {
        resultsDiv.innerHTML = `<p>No results found</p>`;
    }

    // Pagination button states
    document.querySelector("button[onclick='prevPage()']").disabled = currentPage === 1;
    document.querySelector("button[onclick='nextPage()']").disabled = start + resultsPerPage >= filtered.length;
}

function nextPage() {
    currentPage++;
    searchProducts();
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        searchProducts();
    }
}

// Attach auto-refresh events
document.getElementById("searchInput").addEventListener("input", () => {
    currentPage = 1;
    searchProducts();
});
document.getElementById("sortOption").addEventListener("change", () => {
    currentPage = 1;
    searchProducts();
});
document.getElementById("categoryFilter").addEventListener("change", () => {
    currentPage = 1;
    searchProducts();
});

// Initial load
searchProducts();
