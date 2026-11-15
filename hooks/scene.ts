// A whole cafe drawn around the edges of the app, leaving the middle quiet for words.
//
// The root has no viewBox, so its units are the screen's own pixels. Each piece is
// pinned to a spot given in percent (a corner, an edge, the counter line) and drawn at
// a fixed pixel size around that spot, so nothing stretches or gets cropped as the
// window changes shape. Media rules shrink or hide pieces on small screens.
//
// Rotations use SMIL (they pivot in the piece's own units); fades and drifts use CSS.

const COUNTER = 90 // percent down the screen where the counter top sits: low, behind the prompt
const TOP = 56 // pixels the app's title bar covers; nothing that matters goes above it

// String lights in three sagging spans across the top, built from short segments,
// since a path can't take percentages but a line can.
function stringLights(): string {
  const hooks = [0, 34, 66, 100]
  const pts: { x: number; y: number; isHook: boolean }[] = []
  for (let s = 0; s < 3; s++) {
    const a = hooks[s]!
    const b = hooks[s + 1]!
    for (let i = s === 0 ? 0 : 1; i <= 6; i++) {
      const f = i / 6
      pts.push({ x: a + (b - a) * f, y: TOP + 8 + 34 * Math.sin(Math.PI * f), isHook: i === 0 || i === 6 })
    }
  }
  let wire = ''
  let bulbs = ''
  pts.forEach((p, i) => {
    const x = `${p.x.toFixed(2)}%`
    if (i > 0) {
      const q = pts[i - 1]!
      wire += `<line x1="${q.x.toFixed(2)}%" y1="${q.y.toFixed(1)}" x2="${x}" y2="${p.y.toFixed(1)}"/>`
    }
    if (p.isHook) return
    const cy = (p.y + 12).toFixed(1)
    const delay = ((i * 0.83) % 5).toFixed(2)
    bulbs +=
      `<line class="cord" x1="${x}" y1="${p.y.toFixed(1)}" x2="${x}" y2="${(p.y + 7).toFixed(1)}"/>` +
      `<circle class="bulb-glow" cx="${x}" cy="${cy}" r="34" style="animation-delay:-${delay}s"/>` +
      `<ellipse class="bulb" cx="${x}" cy="${cy}" rx="4" ry="5.5" style="animation-delay:-${delay}s"/>`
  })
  return `<g class="lights"><g class="wire">${wire}</g>${bulbs}</g>`
}

function lamp(x: string, cord: number, cls: string): string {
  const y = cord
  return `<svg x="${x}" y="0" overflow="visible" class="${cls}"><g class="art">
    <line class="cord" x1="0" y1="0" x2="0" y2="${y}"/>
    <path class="lamp-cone" d="M-34 ${y + 46} L-190 ${y + 420} L190 ${y + 420} L34 ${y + 46} Z"/>
    <circle class="lamp-glow" cx="0" cy="${y + 44}" r="190"/>
    <path class="shade" d="M-40 ${y + 42} C-40 ${y + 12} -22 ${y} 0 ${y} C22 ${y} 40 ${y + 12} 40 ${y + 42} Z"/>
    <rect class="shade-rim" x="-42" y="${y + 40}" width="84" height="5" rx="2"/>
    <ellipse class="lamp-bulb" cx="0" cy="${y + 49}" rx="10" ry="7"/>
  </g></svg>`
}

function leaf(x: number, y: number, r: number): string {
  return `<ellipse class="leaf" cx="${x}" cy="${y}" rx="7" ry="4" transform="rotate(${r} ${x} ${y})"/>`
}

// Top left: two shelves of jars, cups, a teapot and a trailing ivy.
const SHELF = `<svg x="0" y="${TOP - 16}" overflow="visible"><g class="art">
  <g class="board1">
    <rect class="wood-dark" x="24" y="190" width="310" height="10" rx="2"/>
    <path class="wood-dark" d="M52 200 h12 l-12 22 z M292 200 h12 l0 22 z"/>
    <rect class="glass" x="40" y="128" width="46" height="62" rx="8"/>
    <rect class="beans" x="45" y="156" width="36" height="30" rx="5"/>
    <rect class="lid" x="37" y="120" width="52" height="10" rx="3"/>
    <rect class="glass" x="96" y="140" width="40" height="50" rx="8"/>
    <rect class="beans" x="101" y="166" width="30" height="20" rx="5"/>
    <rect class="lid" x="93" y="132" width="46" height="10" rx="3"/>
    <rect class="glass" x="146" y="116" width="34" height="74" rx="8"/>
    <rect class="sugar-fill" x="150" y="140" width="26" height="46" rx="5"/>
    <rect class="lid" x="143" y="108" width="40" height="10" rx="3"/>
    <path class="cup-a" d="M196 190 h44 l-5 -22 h-34 z"/>
    <path class="cup-b" d="M199 168 h38 l-4 -20 h-30 z"/>
    <path class="cup-a" d="M202 148 h32 l-4 -18 h-24 z"/>
    <path class="pot" d="M256 190 h44 l6 -36 h-56 z"/>
    <rect class="pot-rim" x="248" y="148" width="60" height="9" rx="2"/>
    <g>
      <animateTransform attributeName="transform" type="rotate" values="-2 280 152; 2 280 152; -2 280 152" dur="9s" repeatCount="indefinite"/>
      <path class="vine" d="M262 152 C246 190 252 250 240 300"/>
      <path class="vine" d="M290 152 C312 196 300 246 318 290"/>
      <path class="vine" d="M276 150 C270 190 284 220 278 262"/>
      ${leaf(250, 186, -60)}${leaf(242, 214, 40)}${leaf(250, 240, -50)}${leaf(240, 268, 30)}
      ${leaf(238, 296, -40)}
      ${leaf(304, 184, 50)}${leaf(310, 214, -30)}${leaf(302, 244, 60)}${leaf(314, 272, -40)}
      ${leaf(318, 288, 50)}
      ${leaf(270, 176, -70)}${leaf(284, 204, 60)}${leaf(276, 234, -50)}${leaf(282, 260, 40)}
      ${leaf(268, 140, -20)}${leaf(288, 138, 30)}${leaf(278, 132, 80)}
    </g>
  </g>
  <g class="board2">
    <rect class="wood-dark" x="24" y="330" width="190" height="10" rx="2"/>
    <path class="wood-dark" d="M52 340 h12 l-12 22 z M172 340 h12 l0 22 z"/>
    <ellipse class="teapot" cx="76" cy="304" rx="32" ry="26"/>
    <path class="teapot-line" d="M108 296 C124 290 128 280 136 276" fill="none"/>
    <path class="teapot-line" d="M44 290 C28 290 28 316 46 316" fill="none"/>
    <ellipse class="lid" cx="76" cy="280" rx="16" ry="5"/>
    <circle class="lid" cx="76" cy="273" r="4"/>
    <rect class="teapot" x="56" y="326" width="40" height="4" rx="2"/>
    <path class="mug-a" d="M130 330 h28 v-30 h-28 z"/>
    <path class="mug-handle" d="M158 306 c10 0 10 16 0 16" fill="none"/>
    <path class="mug-b" d="M172 330 h26 v-26 h-26 z"/>
    <path class="mug-handle" d="M198 310 c9 0 9 14 0 14" fill="none"/>
  </g>
</g></svg>`

// Left wall: a chalkboard of the day's drinks.
const CHALK = `<svg x="0" y="45%" overflow="visible" class="chalk"><g class="art"><g transform="translate(0 -51)">
  <rect class="wood" x="36" y="40" width="240" height="196" rx="6"/>
  <rect class="board" x="46" y="50" width="220" height="176" rx="3"/>
  <g class="chalk-text">
    <text x="156" y="86" text-anchor="middle" font-size="25">Today</text>
    <text x="66" y="120" font-size="17">espresso</text><text x="246" y="120" font-size="17" text-anchor="end">3</text>
    <text x="66" y="148" font-size="17">cortado</text><text x="246" y="148" font-size="17" text-anchor="end">3.5</text>
    <text x="66" y="176" font-size="17">oat latte</text><text x="246" y="176" font-size="17" text-anchor="end">4.5</text>
    <text x="66" y="204" font-size="17">chai</text><text x="246" y="204" font-size="17" text-anchor="end">4</text>
  </g>
  <path class="chalk-line" d="M88 92 h136"/>
  <path class="chalk-line" d="M214 72 c-4 -6 -12 -2 -8 4 l8 8 l8 -8 c4 -6 -4 -10 -8 -4 z"/>
  <rect class="chalk-tray" x="46" y="226" width="220" height="7" rx="2"/>
  <rect class="chalk-stick" x="210" y="222" width="22" height="5" rx="2"/>
</g></g></svg>`

function clockTicks(): string {
  let t = ''
  for (let i = 0; i < 12; i++) {
    const a = (i * Math.PI) / 6
    const r1 = i % 3 === 0 ? 46 : 50
    const x1 = (Math.sin(a) * r1).toFixed(1)
    const y1 = (-Math.cos(a) * r1).toFixed(1)
    const x2 = (Math.sin(a) * 55).toFixed(1)
    const y2 = (-Math.cos(a) * 55).toFixed(1)
    t += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`
  }
  return t
}

// Right wall: a round clock whose hands really turn, slowly.
const CLOCK = `<svg x="100%" y="45%" overflow="visible" class="clock"><g class="art">
  <g transform="translate(-160 108)">
    <circle class="clock-rim" r="68"/>
    <circle class="clock-face" r="60"/>
    <g class="clock-ticks">${clockTicks()}</g>
    <line class="clock-hand" x1="0" y1="6" x2="0" y2="-30" stroke-width="5">
      <animateTransform attributeName="transform" type="rotate" from="300 0 0" to="660 0 0" dur="43200s" repeatCount="indefinite"/>
    </line>
    <line class="clock-hand" x1="0" y1="8" x2="0" y2="-46" stroke-width="3.5">
      <animateTransform attributeName="transform" type="rotate" from="60 0 0" to="420 0 0" dur="3600s" repeatCount="indefinite"/>
    </line>
    <line class="clock-sec" x1="0" y1="10" x2="0" y2="-50">
      <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="60s" repeatCount="indefinite"/>
    </line>
    <circle class="clock-hand-dot" r="4"/>
  </g>
</g></svg>`

// Top right: an arched window onto the street; day sky or night sky by the mode.
const WINDOW = `<svg x="100%" y="${TOP - 16}" overflow="visible" class="window"><g class="art">
  <defs>
    <clipPath id="pane"><path d="M-370 390 V200 A140 110 0 0 1 -90 200 V390 Z"/></clipPath>
    <linearGradient id="sky-day" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b9dcec"/><stop offset="1" stop-color="#f4e9d6"/></linearGradient>
    <linearGradient id="sky-night" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#141b30"/><stop offset="1" stop-color="#3b2a36"/></linearGradient>
  </defs>
  <g clip-path="url(#pane)">
    <rect class="day" x="-380" y="80" width="300" height="320" fill="url(#sky-day)"/>
    <rect class="night" x="-380" y="80" width="300" height="320" fill="url(#sky-night)"/>
    <circle class="day sun" cx="-150" cy="170" r="22"/>
    <g class="night">
      <circle class="moon" cx="-150" cy="170" r="20"/>
      <circle class="sky" cx="-140" cy="164" r="17"/>
      <circle class="star" cx="-320" cy="150" r="1.6"/><circle class="star s2" cx="-260" cy="120" r="1.3"/>
      <circle class="star s3" cx="-200" cy="200" r="1.5"/><circle class="star" cx="-110" cy="230" r="1.2"/>
      <circle class="star s2" cx="-300" cy="220" r="1.1"/><circle class="star s3" cx="-230" cy="160" r="1.4"/>
    </g>
    <g class="cloud c1"><ellipse cx="-300" cy="190" rx="34" ry="12"/><ellipse cx="-280" cy="181" rx="20" ry="12"/></g>
    <g class="cloud c2"><ellipse cx="-180" cy="236" rx="40" ry="11"/><ellipse cx="-196" cy="228" rx="18" ry="10"/></g>
    <path class="roof" d="M-380 400 V318 h46 v-24 h34 v24 h20 v-40 l26 -18 l26 18 v40 h30 v-30 h52 v30 h24 v-22 h40 V400 Z"/>
    <g class="lit">
      <rect x="-362" y="330" width="8" height="10"/><rect x="-326" y="306" width="8" height="10"/>
      <rect x="-270" y="296" width="8" height="10"/><rect x="-254" y="322" width="8" height="10"/>
      <rect x="-210" y="342" width="8" height="10"/><rect x="-176" y="350" width="8" height="10"/>
      <rect x="-128" y="330" width="8" height="10"/>
    </g>
  </g>
  <path class="frame" d="M-370 390 V200 A140 110 0 0 1 -90 200 V390 Z"/>
  <path class="mullion" d="M-230 92 V390 M-370 272 H-90"/>
  <rect class="wood" x="-392" y="386" width="324" height="14" rx="3"/>
  <path class="pot" d="M-350 386 h30 l4 -24 h-38 z"/>
  <path class="succ" d="M-335 362 c-10 -6 -14 -16 -6 -22 c2 8 6 12 6 22 c0 -12 4 -20 12 -24 c2 10 -4 18 -12 24"/>
  <path class="pot" d="M-140 386 h26 l3 -20 h-32 z"/>
  <path class="cactus" d="M-127 366 v-38 c0 -8 10 -8 10 0 v38 M-127 350 c-8 0 -10 -4 -10 -12 M-117 346 c8 0 10 -4 10 -10"/>
</g></svg>`

// Bottom left, on the counter: the espresso machine, pouring, and a cake under glass.
const MACHINE = `<svg x="0" y="${COUNTER}%" overflow="visible"><g class="art">
  <path class="cup-a" d="M76 -214 h26 l-3 -14 h-20 z"/><path class="cup-b" d="M120 -214 h26 l-3 -14 h-20 z"/><path class="cup-a" d="M164 -214 h26 l-3 -14 h-20 z"/>
  <rect class="chrome-dark" x="52" y="-214" width="176" height="8" rx="3"/>
  <rect class="chrome" x="40" y="-206" width="200" height="150" rx="14"/>
  <rect class="panel" x="58" y="-190" width="164" height="52" rx="6"/>
  <circle class="gauge" cx="140" cy="-164" r="17"/>
  <line class="needle" x1="140" y1="-164" x2="140" y2="-178">
    <animateTransform attributeName="transform" type="rotate" values="-20 140 -164; 25 140 -164; 10 140 -164; 30 140 -164; -20 140 -164" dur="11s" repeatCount="indefinite"/>
  </line>
  <circle class="knob" cx="82" cy="-164" r="7"/><circle class="knob" cx="198" cy="-164" r="7"/>
  <rect class="chrome-dark" x="80" y="-134" width="36" height="14" rx="3"/>
  <rect class="chrome-dark" x="164" y="-134" width="36" height="14" rx="3"/>
  <rect class="chrome-dark" x="76" y="-122" width="44" height="9" rx="4"/>
  <rect class="handle" x="40" y="-120" width="40" height="6" rx="3"/>
  <rect class="chrome-dark" x="160" y="-122" width="44" height="9" rx="4"/>
  <rect class="handle" x="200" y="-120" width="40" height="6" rx="3"/>
  <line class="pour" x1="98" y1="-112" x2="98" y2="-66"/>
  <line class="pour p2" x1="182" y1="-112" x2="182" y2="-66"/>
  <path class="cup-a" d="M84 -46 h28 l-3 -22 h-22 z"/><path class="cup-b" d="M168 -46 h28 l-3 -22 h-22 z"/>
  <rect class="chrome-dark" x="54" y="-46" width="172" height="10" rx="3"/>
  <rect class="chrome" x="40" y="-36" width="200" height="36" rx="6"/>
  <path class="wand" d="M236 -140 C252 -136 254 -100 250 -70" fill="none"/>
  <circle class="puff" cx="250" cy="-66" r="7"/><circle class="puff pf2" cx="250" cy="-66" r="9"/><circle class="puff pf3" cx="250" cy="-66" r="6"/>
  <g class="cake">
    <ellipse class="plate" cx="330" cy="-6" rx="58" ry="8"/>
    <rect class="plate" x="326" y="-20" width="8" height="14"/>
    <ellipse class="plate" cx="330" cy="-22" rx="50" ry="7"/>
    <path class="sponge" d="M296 -26 v-34 h68 v34 z"/>
    <path class="frosting" d="M296 -60 h68 v10 c-6 6 -10 -2 -16 4 c-6 6 -10 -2 -18 4 c-6 6 -10 -2 -16 4 c-6 6 -12 -2 -18 2 z"/>
    <rect class="jam" x="296" y="-42" width="68" height="5"/>
    <circle class="berry" cx="316" cy="-64" r="5"/><circle class="berry" cx="340" cy="-65" r="5"/>
    <path class="dome" d="M282 -24 V-74 C282 -118 378 -118 378 -74 V-24"/>
    <circle class="dome-knob" cx="330" cy="-108" r="6"/>
    <path class="dome-shine" d="M292 -40 V-76 C292 -96 304 -104 314 -106"/>
  </g>
</g></svg>`

// Bottom right, on the counter: a latte with a heart, a croissant, a little vase.
const LATTE = `<svg x="100%" y="${COUNTER}%" overflow="visible"><g class="art">
  <g transform="translate(-330 -224)">
    <path class="steam" d="M132 104 c-14 -16 12 -28 0 -46 c-10 -14 8 -24 2 -40"/>
    <path class="steam st2" d="M152 102 c-12 -18 14 -30 2 -50 c-8 -12 10 -22 4 -38"/>
    <path class="steam st3" d="M172 104 c-14 -14 10 -28 -2 -44 c-10 -14 6 -22 0 -36"/>
    <ellipse class="cupware" cx="150" cy="202" rx="110" ry="22"/>
    <ellipse class="well" cx="150" cy="199" rx="66" ry="12"/>
    <path class="spoon" d="M226 205 L284 222 L282 227 L223 211 Z"/>
    <ellipse class="spoon" cx="221" cy="203" rx="15" ry="7" transform="rotate(16 221 203)"/>
    <path class="handle-o" d="M210 136 C252 130 252 182 198 182"/>
    <path class="handle-i" d="M210 136 C252 130 252 182 198 182"/>
    <path class="cupware" d="M85 120 H215 C213 160 200 190 175 197 H125 C100 190 87 160 85 120 Z"/>
    <path class="shine" d="M98 132 C100 156 108 176 120 187"/>
    <ellipse class="cupware" cx="150" cy="120" rx="65" ry="13"/>
    <ellipse class="coffee" cx="150" cy="121" rx="58" ry="10"/>
    <ellipse class="crema" cx="150" cy="121.5" rx="53" ry="8.5"/>
    <path class="milk" d="M150 129 C137 122 130 116 136 113 C141 111 147 113 150 116.5 C153 113 159 111 164 113 C170 116 163 122 150 129 Z"/>
    <path class="milk" d="M126 120 C134 117 140 118 143 121 C138 124 131 124 126 120 Z" opacity=".85"/>
    <path class="milk" d="M174 120 C166 117 160 118 157 121 C162 124 169 124 174 120 Z" opacity=".85"/>
  </g>
  <g class="croissant">
    <ellipse class="plate" cx="-440" cy="-8" rx="76" ry="12"/>
    <ellipse class="well" cx="-440" cy="-10" rx="52" ry="7"/>
    <path class="pastry" d="M-500 -16 C-506 -30 -494 -38 -482 -32 L-470 -22 Z"/>
    <path class="pastry" d="M-380 -16 C-374 -30 -386 -38 -398 -32 L-410 -22 Z"/>
    <path class="pastry" d="M-484 -20 C-486 -44 -464 -52 -452 -40 L-446 -22 Z"/>
    <path class="pastry" d="M-396 -20 C-394 -44 -416 -52 -428 -40 L-434 -22 Z"/>
    <path class="pastry" d="M-456 -22 C-460 -54 -420 -54 -424 -22 Z"/>
    <path class="pastry-line" d="M-450 -30 C-446 -44 -434 -44 -430 -30 M-478 -26 C-474 -38 -466 -40 -460 -32 M-402 -26 C-406 -38 -414 -40 -420 -32"/>
  </g>
  <g class="vase">
    <path class="vase-body" d="M-62 0 h28 c4 -10 4 -26 -4 -34 v-14 h-20 v14 c-8 8 -8 24 -4 34 z"/>
    <path class="stem" d="M-48 -48 C-50 -80 -44 -100 -46 -124 M-48 -60 C-60 -76 -66 -90 -70 -100 M-48 -64 C-38 -78 -30 -86 -24 -92"/>
    <ellipse class="leaf" cx="-56" cy="-80" rx="8" ry="4" transform="rotate(40 -56 -80)"/>
    <g class="flower"><circle cx="-46" cy="-132" r="6"/><circle cx="-38" cy="-126" r="6"/><circle cx="-54" cy="-126" r="6"/><circle cx="-42" cy="-118" r="6"/><circle cx="-50" cy="-118" r="6"/></g>
    <circle class="flower-mid" cx="-46" cy="-125" r="4"/>
    <g class="flower"><circle cx="-70" cy="-104" r="4.5"/><circle cx="-64" cy="-100" r="4.5"/><circle cx="-76" cy="-100" r="4.5"/><circle cx="-70" cy="-95" r="4.5"/></g>
    <circle class="flower-mid" cx="-70" cy="-100" r="3"/>
    <g class="flower"><circle cx="-24" cy="-96" r="4.5"/><circle cx="-18" cy="-92" r="4.5"/><circle cx="-30" cy="-92" r="4.5"/><circle cx="-24" cy="-87" r="4.5"/></g>
    <circle class="flower-mid" cx="-24" cy="-92" r="3"/>
  </g>
</g></svg>`

// Measured from the desktop app: the sidebar's width, half the conversation column
// (plus a little air), and how wide each side's pieces are drawn.
const SIDEBAR = 290
const HALF_COLUMN = 350
const LEFT_WIDTH = 380
const RIGHT_WIDTH = 520
// How far a piece may tuck under the edge of the text column, where the veil keeps
// the words readable: lets the pieces stay larger than a strict fit would.
const TUCK = 80

// One rule per 100px of window width: how much each side shrinks to fit its strip,
// worked out a little inside the step's narrow end.
//   left strip:  from the sidebar's edge to the column, with the sidebar open or not
//   right strip: from the column (pushed right when the sidebar is open) to the edge
function fitRules(): string {
  let css = ''
  for (let w = 2400; w >= 1000; w -= 100) {
    const narrow = w - 60
    const left = (narrow / 2 - HALF_COLUMN + TUCK - SIDEBAR) / LEFT_WIDTH
    const right = (narrow / 2 - HALF_COLUMN - SIDEBAR / 2 + TUCK) / RIGHT_WIDTH
    const fit = (x: number) => Math.min(1, Math.max(0.45, x)).toFixed(2)
    css += `@media (max-width: ${w}px) { :root { --sl: ${fit(left)}; --sr: ${fit(right)}; } }\n`
  }
  // Below this the app hides its sidebar anyway: back to the edge.
  css += `@media (max-width: 999px) { :root { --inset: 0px; } .tall-plant { display: none; } }\n`
  return css
}

// Far left, in the room the sidebar covers when it's open: a tall plant that's
// fine to lose, so the strip isn't bare when the sidebar is closed.
const TALL_PLANT = `<svg x="0" y="${COUNTER}%" overflow="visible" class="tall-plant"><g>
  <path class="pot" d="M60 0 h120 l14 -86 h-148 z"/>
  <rect class="pot-rim" x="40" y="-98" width="160" height="16" rx="3"/>
  <path class="stem" d="M120 -98 C116 -200 128 -300 118 -420 M120 -160 C90 -220 70 -260 56 -300 M122 -230 C156 -280 176 -320 190 -360 M118 -320 C96 -360 84 -400 80 -440"/>
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-1.2 120 -98; 1.2 120 -98; -1.2 120 -98" dur="11s" repeatCount="indefinite"/>
    <ellipse class="big-leaf" cx="56" cy="-300" rx="34" ry="20" transform="rotate(-35 56 -300)"/>
    <ellipse class="big-leaf" cx="190" cy="-360" rx="36" ry="21" transform="rotate(30 190 -360)"/>
    <ellipse class="big-leaf" cx="80" cy="-440" rx="32" ry="19" transform="rotate(-50 80 -440)"/>
    <ellipse class="big-leaf" cx="118" cy="-430" rx="30" ry="18" transform="rotate(10 118 -430)"/>
    <ellipse class="big-leaf" cx="150" cy="-250" rx="32" ry="19" transform="rotate(25 150 -250)"/>
    <ellipse class="big-leaf" cx="84" cy="-200" rx="30" ry="18" transform="rotate(-30 84 -200)"/>
    <ellipse class="big-leaf" cx="160" cy="-150" rx="28" ry="17" transform="rotate(35 160 -150)"/>
    <ellipse class="big-leaf" cx="150" cy="-390" rx="28" ry="17" transform="rotate(40 150 -390)"/>
  </g>
</g></svg>`

const STYLE = `<style>
  /* The app draws this across the whole window, lays its sidebar over the left and
     centres a fixed-width conversation column in what's left, and tells a scene
     nothing when the sidebar opens or closes. So the side pieces live in the strips
     that stay clear either way: the left ones start past the sidebar, and each side
     shrinks (--sl, --sr, set by window width below) to fit beside the column. */
  :root { --base: 1; --sl: 1; --sr: 1; --inset: ${SIDEBAR}px; }
  .art { transform: scale(var(--base)); }
  .from-left { transform: translateX(var(--inset)); }
  .from-left .art { transform: scale(calc(var(--base) * var(--sl))); }
  .from-right .art { transform: scale(calc(var(--base) * var(--sr))); }
  ${fitRules()}
  /* Daylight cafe. */
  .wall { fill: url(#wall-day); }
  .paper { fill: url(#stripes); }
  .wainscot { fill: url(#planks); }
  .plank { fill: #d8c09f; } .plank-gap { fill: #8a5a36; opacity: .22; } .plank-hl { fill: #ffffff; opacity: .12; }
  .plank-grain { fill: none; stroke: #8a5a36; stroke-width: 1.5; opacity: .12; }
  .rail { fill: #8a5a36; } .rail-shadow { fill: #5a3019; opacity: .18; }
  .wood { fill: #a87a52; } .wood-dark { fill: #8a5a36; }
  .cord, .wire line { stroke: #6b4a33; stroke-width: 1.5; }
  .bulb { fill: #fff0c8; stroke: #e0a94a; stroke-width: 1; animation: twinkle 5s ease-in-out infinite; }
  .bulb-glow { fill: url(#bulb-halo); opacity: 1; animation: glow 5s ease-in-out infinite; }
  .shade { fill: #5c7a3a; } .shade-rim { fill: #4a6430; }
  .lamp-bulb { fill: #fff6dc; } .lamp-glow { fill: url(#halo); opacity: .8; }
  .lamp-cone { fill: url(#cone); opacity: .6; }
  .glass { fill: #ffffff; fill-opacity: .45; stroke: #8a5a36; stroke-width: 2; }
  .beans { fill: #6b3d22; } .sugar-fill { fill: #fffaf2; }
  .lid { fill: #8a5a36; }
  .cup-a { fill: #fbf5ea; stroke: #8a5a36; stroke-width: 2; }
  .cup-b { fill: #c4704a; stroke: #8a5a36; stroke-width: 2; }
  .mug-a { fill: #8fa77a; stroke: #5c6e4c; stroke-width: 2; }
  .mug-b { fill: #e9c58f; stroke: #a8834a; stroke-width: 2; }
  .mug-handle { stroke: #8a5a36; stroke-width: 3; }
  .teapot { fill: #c4704a; } .teapot-line { stroke: #c4704a; stroke-width: 7; stroke-linecap: round; }
  .pot { fill: #c4704a; } .pot-rim { fill: #b0603d; }
  .vine { fill: none; stroke: #5c7a3a; stroke-width: 2; }
  .leaf { fill: #6f9147; } .big-leaf { fill: #6f9147; stroke: #5c7a3a; stroke-width: 2; }
  .board { fill: #2f3b35; } .chalk-tray { fill: #8a5a36; } .chalk-stick { fill: #f4f1e8; }
  .chalk-text text { fill: #f1eee6; font-family: 'Chalkboard SE', 'Marker Felt', 'Comic Sans MS', cursive; opacity: .92; }
  .chalk-line { fill: none; stroke: #f1eee6; stroke-width: 2; stroke-linecap: round; opacity: .8; }
  .clock-rim { fill: #8a5a36; } .clock-face { fill: #fbf5ea; }
  .clock-ticks line { stroke: #4a3020; stroke-width: 2.5; stroke-linecap: round; }
  .clock-hand { stroke: #2b1d14; stroke-linecap: round; } .clock-sec { stroke: #b2392e; stroke-width: 1.5; }
  .clock-hand-dot { fill: #2b1d14; }
  .frame { fill: none; stroke: #8a5a36; stroke-width: 12; }
  .mullion { stroke: #8a5a36; stroke-width: 6; }
  .sun { fill: #ffe7a0; } .moon { fill: #f3e6c4; } .sky { fill: #1c2540; }
  .cloud ellipse { fill: #ffffff; opacity: .9; }
  .c1 { animation: drift 46s linear infinite; } .c2 { animation: drift 64s linear infinite -20s; }
  .roof { fill: #d2bb9b; } .lit rect { fill: #efe4d0; }
  .succ, .cactus { fill: none; stroke: #5c7a3a; stroke-width: 5; stroke-linecap: round; }
  .chrome { fill: #d7cdc1; stroke: #8a5a36; stroke-width: 2; }
  .chrome-dark { fill: #a99a8a; } .panel { fill: #8a5a36; }
  .gauge { fill: #fbf5ea; stroke: #4a3020; stroke-width: 2; } .needle { stroke: #b2392e; stroke-width: 2; stroke-linecap: round; }
  .knob { fill: #2b1d14; } .handle { fill: #2b1d14; }
  .pour { stroke: #5a3019; stroke-width: 3; stroke-dasharray: 6 8; animation: pour 1.2s linear infinite; }
  .p2 { animation-delay: -.6s; }
  .wand { stroke: #a99a8a; stroke-width: 5; stroke-linecap: round; }
  .puff { fill: #ffffff; opacity: 0; animation: puff 6s ease-out infinite; transform-box: fill-box; transform-origin: center; }
  .pf2 { animation-delay: -2s; } .pf3 { animation-delay: -4s; }
  .plate { fill: #fbf5ea; stroke: #8a5a36; stroke-width: 2; }
  .sponge { fill: #e7c48f; } .frosting { fill: #fbf5ea; } .jam { fill: #b2392e; } .berry { fill: #b2392e; }
  .dome { fill: #ffffff; fill-opacity: .22; stroke: #8a5a36; stroke-width: 2; } .dome-knob { fill: #8a5a36; }
  .dome-shine { fill: none; stroke: #ffffff; stroke-width: 4; stroke-linecap: round; opacity: .7; }
  .cupware { fill: #f9f2e6; stroke: #8a4b2a; stroke-width: 3; stroke-linejoin: round; }
  .well { fill: #efe3d1; }
  .handle-o { fill: none; stroke: #8a4b2a; stroke-width: 13; stroke-linecap: round; }
  .handle-i { fill: none; stroke: #f9f2e6; stroke-width: 7; stroke-linecap: round; }
  .coffee { fill: #5a3019; } .crema { fill: #c48a5a; } .milk { fill: #fbf5ea; }
  .shine { fill: none; stroke: #ffffff; stroke-width: 4; stroke-linecap: round; opacity: .55; }
  .spoon { fill: #b9aa98; stroke: #8a4b2a; stroke-width: 2; }
  .steam { fill: none; stroke: #8a4b2a; stroke-width: 4; stroke-linecap: round; opacity: 0; animation: rise 7s ease-in-out infinite; }
  .st2 { animation-delay: -2.3s; } .st3 { animation-delay: -4.6s; }
  .pastry { fill: #d9a35b; stroke: #a8692e; stroke-width: 2; stroke-linejoin: round; }
  .pastry-line { fill: none; stroke: #a8692e; stroke-width: 2; stroke-linecap: round; }
  .vase-body { fill: #8fa77a; stroke: #5c6e4c; stroke-width: 2; }
  .stem { fill: none; stroke: #5c7a3a; stroke-width: 2.5; stroke-linecap: round; }
  .flower circle { fill: #e9a4a0; } .flower-mid { fill: #e5b04a; }
  .night { display: none; }

  @keyframes twinkle { 0%, 100% { opacity: 1; } 50% { opacity: .75; } }
  @keyframes glow { 0%, 100% { opacity: 1; } 50% { opacity: .7; } }
  @keyframes drift { from { transform: translateX(-120px); } to { transform: translateX(260px); } }
  @keyframes rise { 0% { opacity: 0; transform: translateY(18px); } 35% { opacity: .45; } 100% { opacity: 0; transform: translateY(-60px); } }
  @keyframes puff { 0% { opacity: 0; transform: translate(0, 0); } 10% { opacity: .7; } 100% { opacity: 0; transform: translate(14px, -70px) scale(2.4); } }
  @keyframes pour { to { stroke-dashoffset: -14; } }
  @keyframes star { 0%, 100% { opacity: 1; } 50% { opacity: .25; } }

  /* Evening: the lamps are on and the street outside is dark. */
  @media (prefers-color-scheme: dark) {
    .wall { fill: url(#wall-night); }
    .paper { opacity: .5; }
    .rail { fill: #4d3322; } .rail-shadow { fill: #000; opacity: .35; }
    .plank { fill: #2a1d14; } .plank-gap { fill: #120b07; opacity: .45; } .plank-hl { fill: #d49a6a; opacity: .04; }
    .plank-grain { stroke: #120b07; opacity: .25; }
    .wood { fill: #5a3d28; } .wood-dark { fill: #4d3322; }
    .cord, .wire line { stroke: #8a6a50; }
    .bulb { fill: #ffd27a; stroke: #ffb347; }
    .bulb-glow { opacity: 1; animation-name: glow-night; }
    .shade { fill: #3f5a2a; } .shade-rim { fill: #344a22; }
    .lamp-bulb { fill: #fff0c0; } .lamp-glow { opacity: 1; } .lamp-cone { opacity: .7; }
    .glass { fill: #f3e6d4; fill-opacity: .12; stroke: #a07050; }
    .beans { fill: #4a2a16; } .sugar-fill { fill: #d8cbb8; } .lid { fill: #6b4a33; }
    .cup-a { fill: #d9c9b3; stroke: #6b4a33; } .cup-b { fill: #9a5536; stroke: #6b4a33; }
    .mug-a { fill: #5f7350; stroke: #43523a; } .mug-b { fill: #a8834a; stroke: #7a5f35; }
    .mug-handle { stroke: #6b4a33; }
    .teapot { fill: #9a5536; } .teapot-line { stroke: #9a5536; }
    .pot { fill: #9a5536; } .pot-rim { fill: #82462c; }
    .vine { stroke: #4a6430; } .leaf, .big-leaf { fill: #4f6b34; } .big-leaf { stroke: #3f5a2a; }
    .chalk-text text { opacity: .85; }
    .clock-rim { fill: #5a3d28; } .clock-face { fill: #cdbfa9; }
    .frame, .mullion { stroke: #5a3d28; }
    .day { display: none; } .night { display: inline; }
    .star { fill: #f3e6d4; animation: star 4s ease-in-out infinite; } .s2 { animation-delay: -1.3s; } .s3 { animation-delay: -2.6s; }
    .cloud ellipse { fill: #8c8aa0; opacity: .35; }
    .roof { fill: #1e1612; } .lit rect { fill: #ffcf7a; }
    .lit rect:nth-child(2n) { fill: #2a201a; }
    .succ, .cactus { stroke: #4f6b34; }
    .chrome { fill: #6a5c50; stroke: #a07050; } .chrome-dark { fill: #4d4038; } .panel { fill: #3a271a; }
    .gauge { fill: #e8dccb; } .knob, .handle { fill: #120b07; }
    .pour { stroke: #2a160b; }
    .wand { stroke: #6a5c50; } .puff { fill: #f3e6d4; }
    .plate { fill: #d9c9b3; stroke: #6b4a33; }
    .sponge { fill: #a8834a; } .frosting { fill: #e8dccb; } .jam, .berry { fill: #8f2d25; }
    .dome { fill: #f3e6d4; fill-opacity: .08; stroke: #a07050; } .dome-knob { fill: #6b4a33; }
    .dome-shine { stroke: #f3e6d4; opacity: .3; }
    .cupware { fill: #3a2b20; stroke: #d49a6a; } .well { fill: #312419; }
    .handle-o { stroke: #d49a6a; } .handle-i { stroke: #3a2b20; }
    .coffee { fill: #150c07; } .crema { fill: #9a6236; } .milk { fill: #ead9c2; }
    .shine { stroke: #f3e6d4; opacity: .18; }
    .spoon { fill: #8c7b68; stroke: #d49a6a; }
    .steam { stroke: #f3e6d4; }
    .pastry { fill: #b07a3a; stroke: #7a4e22; } .pastry-line { stroke: #7a4e22; }
    .vase-body { fill: #5f7350; stroke: #43523a; } .stem { stroke: #4a6430; }
    .flower circle { fill: #b9706c; } .flower-mid { fill: #c48a2e; }
  }
  @keyframes glow-night { 0%, 100% { opacity: 1; } 50% { opacity: .7; } }

  /* Smaller windows: fewer, smaller pieces, so the words keep their room. */
  @media (max-width: 1150px) { .lamp1 { display: none; } }
  @media (max-width: 1000px) { .lamp2 { display: none; } }
  @media (max-width: 900px) { .clock { display: none; } :root { --base: .8; } }
  @media (max-width: 640px) { :root { --base: .55; } .chalk, .board2 { display: none; } }
  @media (max-height: 930px) { .board2 { display: none; } }
  @media (max-height: 900px) { .clock, .chalk { display: none; } }
  @media (max-height: 700px) { .lamp1, .lamp2 { display: none; } }
  @media (prefers-reduced-motion: reduce) { * { animation: none !important; } .steam { opacity: .25; } }
</style>`

const DEFS = `<defs>
  <linearGradient id="wall-day" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f1e6d4"/><stop offset="1" stop-color="#e6d5bc"/></linearGradient>
  <linearGradient id="wall-night" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a110c"/><stop offset="1" stop-color="#26190f"/></linearGradient>
  <radialGradient id="halo"><stop offset="0" stop-color="#ffd690" stop-opacity=".85"/><stop offset=".35" stop-color="#ffcf7a" stop-opacity=".35"/><stop offset="1" stop-color="#ffcf7a" stop-opacity="0"/></radialGradient>
  <radialGradient id="bulb-halo"><stop offset="0" stop-color="#ffd98a" stop-opacity="1"/><stop offset=".3" stop-color="#ffbf4d" stop-opacity=".55"/><stop offset="1" stop-color="#ffbf55" stop-opacity="0"/></radialGradient>
  <linearGradient id="cone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffdc96" stop-opacity=".6"/><stop offset="1" stop-color="#ffdc96" stop-opacity="0"/></linearGradient>
  <pattern id="stripes" width="56" height="56" patternUnits="userSpaceOnUse"><rect width="28" height="56" fill="#8a5a36" opacity=".045"/></pattern>
  <pattern id="planks" width="84" height="600" patternUnits="userSpaceOnUse">
    <rect class="plank" width="84" height="600"/>
    <rect class="plank-gap" width="3" height="600"/>
    <rect class="plank-hl" x="3" width="2" height="600"/>
    <path class="plank-grain" d="M30 40 c6 30 -4 60 2 90 M58 220 c-6 40 6 70 0 110"/>
  </pattern>
</defs>`

// `isPhone` drops the sidebar room: nothing docks beside the conversation there.
export function cafeScene(isPhone = false): string {
  const vars = isPhone ? `<style>:root { --inset: 0px; --sl: 1; --sr: 1; } .tall-plant { display: none; }</style>` : ''
  return (
  `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">` +
  STYLE +
  vars +
  DEFS +
  `<rect class="wall" width="100%" height="100%"/>` +
  `<rect class="paper" width="100%" height="${COUNTER}%"/>` +
  `<rect class="wainscot" y="${COUNTER}%" width="100%" height="${100 - COUNTER}%"/>` +
  `<rect class="rail-shadow" y="${COUNTER}%" width="100%" height="16" transform="translate(0 8)"/>` +
  `<rect class="rail" y="${COUNTER}%" width="100%" height="9"/>` +
  TALL_PLANT +
  `<g class="from-right">` + WINDOW + CLOCK + `</g>` +
  `<g class="from-left">` + SHELF + CHALK + `</g>` +
  lamp('37%', 140, 'lamp1') +
  lamp('58%', 110, 'lamp2') +
  stringLights() +
  `<g class="from-left">` + MACHINE + `</g>` +
  `<g class="from-right">` + LATTE + `</g>` +
  `</svg>`
  )
}
