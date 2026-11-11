const products = [
  { sku: "INF-001", name: "Portátil Dell Latitude 5420", category: "Informática", quantity: 42, minimum: 8, price: 98500, note: "Core i5 · 16 GB RAM" },
  { sku: "INF-002", name: "Monitor LED 24″", category: "Informática", quantity: 36, minimum: 8, price: 32400, note: "Full HD · HDMI" },
  { sku: "INF-003", name: "Teclado sem fios Logitech", category: "Informática", quantity: 64, minimum: 12, price: 7800, note: "Layout PT · USB" },
  { sku: "INF-004", name: "Rato óptico Logitech", category: "Informática", quantity: 83, minimum: 15, price: 3200, note: "USB · Preto" },
  { sku: "INF-005", name: "Toner HP LaserJet 59A", category: "Informática", quantity: 4, minimum: 8, price: 11800, note: "Compatível com M404" },
  { sku: "ESC-001", name: "Papel A4 80 g/m²", category: "Material de escritório", quantity: 5, minimum: 15, price: 650, note: "Resma · 500 folhas" },
  { sku: "INF-006", name: "Cabo HDMI 2 m", category: "Informática", quantity: 3, minimum: 8, price: 1850, note: "Alta velocidade" },
  { sku: "MOB-001", name: "Cadeira ergonómica", category: "Mobiliário", quantity: 18, minimum: 5, price: 28500, note: "Apoio lombar ajustável" },
  { sku: "MOB-002", name: "Secretária de trabalho 140 cm", category: "Mobiliário", quantity: 12, minimum: 4, price: 38700, note: "Tampo em madeira clara" },
  { sku: "INF-007", name: "Projector Epson EB-E20", category: "Informática", quantity: 6, minimum: 2, price: 112000, note: "3.400 lúmenes" },
  { sku: "INF-008", name: "Hub USB-C 7 em 1", category: "Informática", quantity: 21, minimum: 6, price: 8500, note: "HDMI · USB 3.0" },
  { sku: "INF-009", name: "Router Wi-Fi dual band", category: "Informática", quantity: 10, minimum: 3, price: 14600, note: "AC1200 · 4 portas" },
  { sku: "ESC-002", name: "Caderno pautado A4", category: "Material de escritório", quantity: 400, minimum: 40, price: 280, note: "Capa dura · 96 folhas" },
  { sku: "ESC-003", name: "Esferográfica azul", category: "Material de escritório", quantity: 260, minimum: 50, price: 75, note: "Ponta média · caixa de 50" },
  { sku: "ESC-004", name: "Resma de papel reciclado", category: "Material de escritório", quantity: 500, minimum: 30, price: 720, note: "A4 · 80 g/m²" },
  { sku: "ESC-005", name: "Pasta de arquivo lombada larga", category: "Material de escritório", quantity: 150, minimum: 20, price: 480, note: "Cartão revestido" },
  { sku: "ESC-006", name: "Dossier de argolas", category: "Material de escritório", quantity: 250, minimum: 30, price: 390, note: "A4 · lombada de 4 cm" },
  { sku: "INF-010", name: "Pen drive USB 32 GB", category: "Informática", quantity: 60, minimum: 12, price: 2450, note: "USB 3.0" },
  { sku: "INF-011", name: "Adaptador USB-C para HDMI", category: "Informática", quantity: 20, minimum: 5, price: 3900, note: "Resolução até 4K" },
  { sku: "INF-012", name: "Impressora laser mono", category: "Informática", quantity: 5, minimum: 2, price: 64500, note: "Duplex · rede" },
  { sku: "INF-013", name: "Telefone IP de secretária", category: "Informática", quantity: 18, minimum: 4, price: 12600, note: "Ecrã LCD · PoE" },
  { sku: "MOB-003", name: "Armário metálico de arquivo", category: "Mobiliário", quantity: 8, minimum: 2, price: 45800, note: "4 gavetas · cinzento" },
  { sku: "INF-014", name: "Cabo de rede Cat6 3 m", category: "Informática", quantity: 80, minimum: 15, price: 950, note: "Conector RJ45" },
  { sku: "ESC-007", name: "Marcador permanente preto", category: "Material de escritório", quantity: 431, minimum: 40, price: 160, note: "Ponta redonda" },
];

const movements = [
  { type: "entry", product: "Portátil Dell Latitude 5420", quantity: 12, actor: "Marta Lopes", date: "Hoje, 09:12", reference: "ENT-2026-114" },
  { type: "exit", product: "Papel A4 80 g/m²", quantity: -20, actor: "João Tavares", date: "Hoje, 08:46", reference: "REQ-2026-083" },
  { type: "entry", product: "Cadeira ergonómica", quantity: 6, actor: "Marta Lopes", date: "Ontem, 16:20", reference: "ENT-2026-113" },
  { type: "adjustment", product: "Toner HP LaserJet 59A", quantity: -1, actor: "Ana Pires", date: "Ontem, 14:05", reference: "AJU-2026-021" },
  { type: "exit", product: "Teclado sem fios Logitech", quantity: -8, actor: "João Tavares", date: "10 Nov, 11:32", reference: "REQ-2026-082" },
  { type: "entry", product: "Caderno pautado A4", quantity: 80, actor: "Marta Lopes", date: "10 Nov, 09:18", reference: "ENT-2026-112" },
];

const typeLabels = { entry: "Entrada", exit: "Saída", adjustment: "Ajuste" };
const pageNames = {
  overview: "Visão geral",
  inventory: "Inventário",
  movements: "Movimentos",
  suppliers: "Fornecedores",
  reports: "Relatórios",
  settings: "Configurações",
};
const pageSize = 8;
let currentFilter = "all";
let currentPage = 1;
let toastTimer;

const byId = (id) => document.getElementById(id);
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
}[char]));
const formatNumber = (value) => new Intl.NumberFormat("pt-PT").format(value);
const normalize = (value) => String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-PT");

function getStockState(product) {
  if (product.quantity <= 0) return { label: "Esgotado", className: "empty" };
  if (product.quantity <= product.minimum) return { label: "Stock baixo", className: "low" };
  return { label: "Normal", className: "ok" };
}

function productIcon(category) {
  const icon = category === "Mobiliário"
    ? '<path d="M5 10h14v4H5zM7 14v5m10-5v5M7 7h10v3H7z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>'
    : category === "Material de escritório"
      ? '<path d="M6 3.8h8l4 4V20H6V3.8Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M14 4v4h4M9 12h6m-6 3h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>'
      : '<rect x="3.5" y="5" width="17" height="12" rx="1.8" stroke="currentColor" stroke-width="1.5"/><path d="M8 20h8m-4-3v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>';
  return `<span class="product-thumb" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none">${icon}</svg></span>`;
}

function productCell(product) {
  return `<div class="product-cell">${productIcon(product.category)}<span><strong>${escapeHtml(product.name)}</strong><small>${escapeHtml(product.note || product.sku)}</small></span></div>`;
}

function renderInventory() {
  const search = normalize(byId("inventorySearch").value || byId("globalSearch").value);
  const filtered = products.filter((product) => {
    const matchesText = !search || normalize(`${product.name} ${product.sku} ${product.category}`).includes(search);
    const state = getStockState(product).className;
    const matchesFilter = currentFilter === "all" || (currentFilter === "low" && state === "low") || (currentFilter === "out" && state === "empty");
    return matchesText && matchesFilter;
  });
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  currentPage = Math.min(currentPage, pageCount);
  const start = (currentPage - 1) * pageSize;
  const visible = filtered.slice(start, start + pageSize);

  byId("inventoryRows").innerHTML = visible.length
    ? visible.map((product) => {
      const state = getStockState(product);
      return `<tr>
        <td><input type="checkbox" aria-label="Selecionar ${escapeHtml(product.name)}"></td>
        <td>${productCell(product)}</td>
        <td><span class="category-tag">${escapeHtml(product.category)}</span></td>
        <td><span class="sku">${escapeHtml(product.sku)}</span></td>
        <td><span class="stock-value">${formatNumber(product.quantity)} <small>un.</small></span></td>
        <td>${formatNumber(product.minimum)} <span class="category-tag">un.</span></td>
        <td>${formatNumber(product.price)} <span class="category-tag">CVE</span></td>
        <td><span class="status-pill status-${state.className}">${state.label}</span></td>
        <td><button class="table-action" type="button" data-row-action="${escapeHtml(product.sku)}" aria-label="Mais opções para ${escapeHtml(product.name)}"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg></button></td>
      </tr>`;
    }).join("")
    : '<tr><td class="table-empty" colspan="9">Não foram encontrados produtos com estes critérios.</td></tr>';

  const first = filtered.length ? start + 1 : 0;
  const last = Math.min(start + pageSize, filtered.length);
  byId("tableRange").textContent = `A mostrar ${first}–${last} de ${filtered.length} produtos`;
  renderPagination(pageCount);
}

function renderPagination(pageCount) {
  const pagination = byId("pagination");
  if (!pagination) return;
  const buttons = [
    `<button type="button" data-page-number="${currentPage - 1}" aria-label="Página anterior" ${currentPage === 1 ? "disabled" : ""}>‹</button>`,
  ];
  for (let page = 1; page <= pageCount; page += 1) {
    buttons.push(`<button type="button" data-page-number="${page}" class="${page === currentPage ? "current-page" : ""}" ${page === currentPage ? 'aria-current="page"' : ""}>${page}</button>`);
  }
  buttons.push(`<button type="button" data-page-number="${currentPage + 1}" aria-label="Página seguinte" ${currentPage === pageCount ? "disabled" : ""}>›</button>`);
  pagination.innerHTML = buttons.join("");
}

function renderLowStock() {
  const lowProducts = products.filter((product) => getStockState(product).className === "low").slice(0, 4);
  byId("lowStockRows").innerHTML = lowProducts.map((product) => `
    <tr>
      <td>${productCell(product)}</td>
      <td>${escapeHtml(product.category)}</td>
      <td><span class="stock-value">${formatNumber(product.quantity)} <small>un.</small></span></td>
      <td><span class="status-pill status-low">Repor</span></td>
    </tr>`).join("");
}

function movementIcon(type) {
  const path = type === "entry"
    ? '<path d="M12 19V5m0 0L6.5 10.5M12 5l5.5 5.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>'
    : type === "exit"
      ? '<path d="M12 5v14m0 0 5.5-5.5M12 19l-5.5-5.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>'
      : '<path d="M5 12h14m0 0-5.5-5.5M19 12l-5.5 5.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>';
  return `<span class="activity-icon ${type}" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none">${path}</svg></span>`;
}

function renderActivity() {
  byId("recentActivity").innerHTML = movements.slice(0, 4).map((movement) => `
    <div class="activity-item">
      ${movementIcon(movement.type)}
      <div class="activity-copy"><strong>${escapeHtml(typeLabels[movement.type])} · ${escapeHtml(movement.product)}</strong><small>${escapeHtml(movement.actor)} · ${escapeHtml(movement.reference)}</small></div>
      <span class="activity-time">${escapeHtml(movement.date.split(",")[0])}</span>
    </div>`).join("");
}

function renderMovements() {
  const query = normalize(byId("movementSearch").value);
  const filtered = movements.filter((movement) => normalize(`${movement.product} ${movement.actor} ${movement.reference} ${typeLabels[movement.type]}`).includes(query));
  byId("movementRows").innerHTML = filtered.length
    ? filtered.map((movement) => {
      const positive = movement.quantity > 0;
      return `<tr>
        <td><span class="movement-type">${movementIcon(movement.type)}${typeLabels[movement.type]}</span></td>
        <td>${escapeHtml(movement.product)}</td>
        <td class="${positive ? "quantity-positive" : "quantity-negative"}">${positive ? "+" : "−"}${formatNumber(Math.abs(movement.quantity))} un.</td>
        <td>${escapeHtml(movement.actor)}</td>
        <td>${escapeHtml(movement.date)}</td>
        <td><span class="sku">${escapeHtml(movement.reference)}</span></td>
      </tr>`;
    }).join("")
    : '<tr><td class="table-empty" colspan="6">Não foram encontrados movimentos.</td></tr>';
}

function updateMetrics() {
  const lowCount = products.filter((product) => getStockState(product).className === "low").length;
  const outCount = products.filter((product) => getStockState(product).className === "empty").length;
  const units = products.reduce((sum, product) => sum + product.quantity, 0);
  const count = products.length;

  byId("totalUnits").textContent = formatNumber(units);
  byId("totalProducts").textContent = formatNumber(count);
  byId("lowStockCount").textContent = String(lowCount).padStart(2, "0");
  byId("inventoryCount").textContent = formatNumber(count);
  byId("healthyCount").textContent = formatNumber(count - lowCount - outCount);
  byId("inventoryLowCount").textContent = formatNumber(lowCount);
  byId("filterAllCount").textContent = formatNumber(count);
  byId("filterLowCount").textContent = formatNumber(lowCount);
  byId("filterOutCount").textContent = formatNumber(outCount);
  byId("navProductCount").textContent = formatNumber(count);
}

function renderAll() {
  updateMetrics();
  renderInventory();
  renderLowStock();
  renderActivity();
  renderMovements();
  updateMovementProductOptions();
}

function showPage(name) {
  const pageName = pageNames[name] ? name : "overview";
  document.querySelectorAll(".page-view").forEach((page) => {
    page.hidden = page.id !== `page-${pageName}`;
  });
  document.querySelectorAll(".nav-item[data-page]").forEach((item) => {
    const active = item.dataset.page === pageName;
    item.classList.toggle("is-active", active);
    if (active) item.setAttribute("aria-current", "page");
    else item.removeAttribute("aria-current");
  });
  byId("breadcrumbCurrent").textContent = pageNames[pageName];
  document.title = `${pageNames[pageName]} · IGRP Stock`;
  document.body.classList.remove("sidebar-open");
  byId("notificationPopover").hidden = true;
  byId("notificationToggle").setAttribute("aria-expanded", "false");
}

function showToast(message) {
  byId("toastMessage").textContent = message;
  byId("toast").hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    byId("toast").hidden = true;
  }, 3000);
}

function updateMovementProductOptions() {
  const select = byId("movementProduct");
  const currentValue = select.value;
  select.innerHTML = products.map((product) => `<option value="${escapeHtml(product.sku)}">${escapeHtml(product.name)} · ${escapeHtml(product.sku)}</option>`).join("");
  if (products.some((product) => product.sku === currentValue)) select.value = currentValue;
}

function setThemePreference(preference) {
  const validPreference = ["system", "light", "dark"].includes(preference) ? preference : "system";
  localStorage.setItem("igrp-stock-theme", validPreference);
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const effectiveTheme = validPreference === "system" ? (systemDark ? "dark" : "light") : validPreference;
  document.documentElement.dataset.theme = effectiveTheme;
  byId("themePreference").value = validPreference;
}

function exportInventory() {
  const rows = [
    ["SKU", "Produto", "Categoria", "Quantidade", "Stock mínimo", "Preço unitário (CVE)", "Estado"],
    ...products.map((product) => [product.sku, product.name, product.category, product.quantity, product.minimum, product.price, getStockState(product).label]),
  ];
  const csv = `\uFEFF${rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(";")).join("\n")}`;
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "inventario-igrp-stock.csv";
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast("Inventário exportado para CSV.");
}

document.querySelectorAll(".nav-item[data-page]").forEach((item) => {
  item.addEventListener("click", () => showPage(item.dataset.page));
});

document.querySelectorAll("[data-page-link]").forEach((item) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();
    showPage(item.dataset.pageLink);
  });
});

document.querySelectorAll("[data-open-product]").forEach((button) => {
  button.addEventListener("click", () => byId("productDialog").showModal());
});

document.querySelectorAll("[data-open-movement]").forEach((button) => {
  button.addEventListener("click", () => {
    updateMovementProductOptions();
    byId("movementDialog").showModal();
  });
});

document.querySelectorAll("[data-close-dialog]").forEach((button) => {
  button.addEventListener("click", () => button.closest("dialog").close());
});

document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});

byId("productForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const values = new FormData(form);
  const sku = String(values.get("sku")).trim().toUpperCase();
  const skuField = form.elements.sku;
  const duplicate = products.some((product) => product.sku.toLocaleLowerCase() === sku.toLocaleLowerCase());

  skuField.setCustomValidity(duplicate ? "Já existe um produto com este SKU." : "");
  if (!form.reportValidity()) return;

  products.unshift({
    sku,
    name: String(values.get("name")).trim(),
    category: String(values.get("category")),
    quantity: Number(values.get("quantity")),
    minimum: Number(values.get("minimum")),
    price: Number(values.get("price")) || 0,
    note: "Novo artigo",
  });
  form.reset();
  byId("productDialog").close();
  currentFilter = "all";
  currentPage = 1;
  document.querySelectorAll("[data-stock-filter]").forEach((button) => button.classList.toggle("is-selected", button.dataset.stockFilter === "all"));
  renderAll();
  showPage("inventory");
  showToast("Produto adicionado ao inventário.");
});

byId("movementForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const values = new FormData(form);
  const product = products.find((item) => item.sku === values.get("product"));
  const quantity = Number(values.get("quantity"));
  const type = String(values.get("type"));
  if (!product || !Number.isInteger(quantity) || quantity <= 0) return;

  const delta = type === "exit" ? -quantity : quantity;
  if (product.quantity + delta < 0) {
    form.elements.quantity.setCustomValidity("A quantidade de saída não pode exceder o stock disponível.");
    form.elements.quantity.reportValidity();
    form.elements.quantity.setCustomValidity("");
    return;
  }

  product.quantity += delta;
  movements.unshift({
    type,
    product: product.name,
    quantity: delta,
    actor: "Marta Lopes",
    date: "Agora",
    reference: String(values.get("reference")).trim() || `MOV-${String(movements.length + 1).padStart(4, "0")}`,
  });
  form.reset();
  byId("movementDialog").close();
  renderAll();
  showPage("movements");
  showToast("Movimento registado com sucesso.");
});

document.querySelectorAll("[data-stock-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.stockFilter;
    currentPage = 1;
    document.querySelectorAll("[data-stock-filter]").forEach((item) => item.classList.toggle("is-selected", item === button));
    renderInventory();
  });
});

byId("inventorySearch").addEventListener("input", () => {
  currentPage = 1;
  byId("globalSearch").value = "";
  renderInventory();
});

byId("globalSearch").addEventListener("input", () => {
  const query = byId("globalSearch").value.trim();
  if (query && !byId("page-inventory").hidden) byId("inventorySearch").value = query;
  if (query) {
    showPage("inventory");
    byId("inventorySearch").value = query;
  } else {
    byId("inventorySearch").value = "";
  }
  currentPage = 1;
  renderInventory();
});

byId("movementSearch").addEventListener("input", renderMovements);

byId("pagination").addEventListener("click", (event) => {
  const button = event.target.closest("[data-page-number]");
  if (!button || button.disabled) return;
  currentPage = Number(button.dataset.pageNumber);
  renderInventory();
});

byId("inventoryRows").addEventListener("click", (event) => {
  const button = event.target.closest("[data-row-action]");
  if (!button) return;
  const product = products.find((item) => item.sku === button.dataset.rowAction);
  if (product) showToast(`${product.name} · ${product.sku}`);
});

document.querySelectorAll("[data-export]").forEach((button) => button.addEventListener("click", exportInventory));

document.querySelectorAll("[data-toast]").forEach((button) => {
  button.addEventListener("click", () => showToast(button.dataset.toast));
});

byId("menuToggle").addEventListener("click", () => document.body.classList.toggle("sidebar-open"));
byId("sidebarScrim").addEventListener("click", () => document.body.classList.remove("sidebar-open"));

byId("notificationToggle").addEventListener("click", () => {
  const popover = byId("notificationPopover");
  popover.hidden = !popover.hidden;
  byId("notificationToggle").setAttribute("aria-expanded", String(!popover.hidden));
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".notification-wrap")) {
    byId("notificationPopover").hidden = true;
    byId("notificationToggle").setAttribute("aria-expanded", "false");
  }
});

byId("themePreference").addEventListener("change", (event) => setThemePreference(event.target.value));
byId("themeToggle").addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  setThemePreference(nextTheme);
});
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
  if (localStorage.getItem("igrp-stock-theme") === "system" || !localStorage.getItem("igrp-stock-theme")) setThemePreference("system");
});
byId("settingsForm").addEventListener("submit", (event) => {
  event.preventDefault();
  showToast("Preferências guardadas neste protótipo.");
});

document.querySelectorAll(".settings-link").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".settings-link").forEach((item) => item.classList.toggle("is-current", item === link));
  });
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    byId("globalSearch").focus();
  }
});

document.querySelector(".warehouse-switch").addEventListener("click", () => showToast("Armazém central · dados de demonstração."));
document.querySelector(".user-card").addEventListener("click", () => showToast("Perfil de demonstração: Marta Lopes."));
document.querySelector(".topbar-profile").addEventListener("click", () => showToast("Perfil de demonstração: Marta Lopes."));
document.querySelectorAll(".select-button").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.closest(".stock-chart-panel")) {
      const ranges = ["Esta semana", "Este mês", "Este trimestre"];
      const current = ranges.indexOf(button.firstChild.textContent.trim());
      button.firstChild.textContent = `${ranges[(current + 1) % ranges.length]} `;
      showToast(`Período: ${ranges[(current + 1) % ranges.length]}.`);
    } else {
      showToast("Filtro de período demonstrativo.");
    }
  });
});
document.querySelectorAll(".table-options, .subtle-button").forEach((button) => {
  button.addEventListener("click", () => showToast("Opções de visualização disponíveis em breve."));
});

const savedTheme = localStorage.getItem("igrp-stock-theme") || "system";
setThemePreference(savedTheme);
renderAll();
