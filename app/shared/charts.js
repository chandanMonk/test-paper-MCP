// Chart helpers. Polaris web components have no charts, so all SVG drawing lives here.
window.WishlistCharts = (() => {
  const W = 440, H = 260, LEFT = 40, RIGHT = 432, TOP = 8, BOTTOM = 236;

  // Smooth curve: horizontal tangents at each point (matches the Paper chart style).
  function smoothPath(points) {
    return points.map(([x, y], i) => {
      if (i === 0) return `M${x} ${y}`;
      const [px, py] = points[i - 1], mx = (px + x) / 2;
      return `C${mx} ${py} ${mx} ${y} ${x} ${y}`;
    }).join(' ');
  }

  /**
   * lineChart(el, { yTicks: [0, 10, 20, 30], yFormat, xLabels, series: [{ values, dashed }], label })
   */
  function lineChart(el, { yTicks, yFormat = v => v, xLabels, series, label }) {
    const max = yTicks[yTicks.length - 1];
    const y = v => BOTTOM - (v / max) * (BOTTOM - TOP);
    const xStep = (RIGHT - LEFT) / xLabels.length;

    const grid = yTicks.map(t => `<line x1="${LEFT}" x2="${RIGHT}" y1="${y(t)}" y2="${y(t)}"/>`).join('');
    const yAxis = yTicks.map(t => `<text x="32" y="${y(t) + 4}" text-anchor="end">${yFormat(t)}</text>`).join('');
    const xAxis = xLabels.map((l, i) => `<text x="${LEFT + xStep * (i + 0.5)}" y="254" text-anchor="middle">${l}</text>`).join('');
    const lines = series.map(s => {
      const step = (RIGHT - LEFT) / (s.values.length - 1);
      const d = smoothPath(s.values.map((v, i) => [LEFT + i * step, y(v)]));
      const stroke = s.dashed ? 'var(--chart-secondary)' : 'var(--chart-primary)';
      return `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="2" stroke-linecap="round"${s.dashed ? ' stroke-dasharray="4 4"' : ''}/>`;
    }).join('');

    el.innerHTML = `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${label}">
      <g class="grid">${grid}</g><g class="axis">${yAxis}${xAxis}</g>${lines}</svg>`;
  }

  /**
   * funnel(el, [{ label, tip, value }]) — bars scaled to the first stage, % pills between stages.
   */
  function funnel(el, stages) {
    const FW = 928, FH = 360, PLOT_TOP = 40, colW = FW / stages.length, barW = 153;
    const max = Math.max(...stages.map(s => s.value)) || 1;
    const bars = stages.map((s, i) => {
      const h = (s.value / max) * (FH - PLOT_TOP);
      return { ...s, x: i * colW, y: FH - h, h };
    });

    const out = [`<defs><linearGradient id="flow-gradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1974B1" stop-opacity="0.28"/><stop offset="1" stop-color="#1974B1" stop-opacity="0"/>
    </linearGradient></defs>`];

    bars.forEach((b, i) => {
      if (i > 0) out.push(`<line class="divider" x1="${b.x}" x2="${b.x}" y1="0" y2="${FH}"/>`);
      out.push(`<rect class="bar" x="${b.x}" y="${b.y}" width="${barW}" height="${b.h}"/>`);
      const tip = `${b.tip} :  ${b.value}`;
      out.push(`<g class="tip"><rect x="${b.x}" y="${b.y - 40}" width="${tip.length * 7 + 20}" height="28" rx="6"/>
        <text x="${b.x + 10}" y="${b.y - 21}">${tip}</text></g>`);

      const next = bars[i + 1];
      if (!next) return;
      const pct = b.value ? Math.round((next.value / b.value) * 100) : 0;
      out.push(`<polygon fill="url(#flow-gradient)" points="${b.x + barW},${b.y} ${next.x},${next.y} ${next.x},${FH} ${b.x + barW},${FH}"/>`);
      const cx = (b.x + barW + next.x) / 2, cy = (b.y + next.y) / 2 + 30;
      out.push(`<g class="pill"><title>${pct}% move from ${b.label} to ${next.label}</title>
        <rect x="${cx - 23}" y="${cy - 14}" width="46" height="28" rx="6"/>
        <text x="${cx}" y="${cy + 5}" text-anchor="middle">${pct}%</text></g>`);
    });

    el.innerHTML = `<div class="funnel"><svg viewBox="0 0 ${FW} ${FH}" role="img" aria-label="Conversion pipeline funnel">${out.join('')}</svg></div>`;
  }

  return { lineChart, funnel };
})();
