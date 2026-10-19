// Small HTML helpers for article content.
const tbl = (head, rows, numCols = []) => `<div class="tbl"><table><thead><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${
  rows.map(r => `<tr>${r.map((c, i) => `<td${numCols.includes(i) ? ' class="num"' : ''}>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const stats = items => `<div class="stats">${items.map(([v, t, d]) => `<div class="stat${d ? ' d' : ''}"><b>${v}</b><span>${t}</span></div>`).join('')}</div>`;
const callout = (kind, label, html) => `<div class="callout ${kind}"><span class="k">${label}</span>${html}</div>`;
const lanes = '<span class="pill g">Good</span> <span class="pill e">Even</span> <span class="pill h">Hard</span> <span class="pill vh">Very hard</span>';
module.exports = { tbl, stats, callout, lanes };
