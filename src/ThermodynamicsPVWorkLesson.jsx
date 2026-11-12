import React from 'react';
import MathFormula from './MathFormula';
import SotaCharacter from './SotaCharacter';
import './thermodynamics-first-law.css';
import './thermodynamics-pv-work.css';
import './thermodynamics-pv-work-refinements.css';

function RichText({children}){
 const parts=String(children).split(/(\[\[[^\]]+\]\])/g);
 return parts.map((part,index)=>part.startsWith('[[')&&part.endsWith(']]')?<MathFormula key={index} expression={part.slice(2,-2)}/>:part);
}

function Dialogue({turns}){
 return <div className="concept-dialogue-list first-law-dialogue">{turns.map(([speaker,text],index)=><div className={'concept-dialogue-turn '+speaker+(speaker==='owl'?' strong':'')} key={index}>{speaker==='owl'?<img src="/assets/vector-owl.png" alt="案内役のフクロウ"/>:<SotaCharacter/>}<div><p><RichText>{text}</RichText></p></div></div>)}</div>;
}

function StepHeader({number,kicker,title,children}){
 return <header className="first-law-step-header"><b>{number}</b><div><span>{kicker}</span><h3>{title}</h3>{children&&<p>{children}</p>}</div></header>;
}

function StateReadingGraph(){
 return <figure className="pv-figure pv-state-figure">
  <svg viewBox="0 0 820 430" role="img" aria-labelledby="pv-state-title pv-state-desc">
   <title id="pv-state-title">P-Vグラフ上の定積変化と定圧変化</title>
   <desc id="pv-state-desc">同じ体積で圧力が上がる縦向きの変化と、同じ圧力で体積が増える横向きの変化。背景は右上ほど高温になり、温度の等しい状態は反比例の曲線で結ばれる。</desc>
   <defs>
    <marker id="pv-green-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10z" fill="#2f6a54"/></marker>
    <marker id="pv-amber-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10z" fill="#b87721"/></marker>
    <linearGradient id="pv-temperature-field" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#d9eef2"/><stop offset=".55" stopColor="#fff7df"/><stop offset="1" stopColor="#f6b46b"/></linearGradient>
   </defs>
   <rect className="pv-temperature-field" x="110" y="60" width="625" height="290" fill="url(#pv-temperature-field)"/>
   <path className="pv-axis" d="M110 350V60M110 350H735"/>
   <text className="pv-axis-label" x="78" y="62">p</text><text className="pv-axis-label" x="738" y="380">V</text>
   <g className="pv-grid"><path d="M110 275H735M110 200H735M110 125H735M260 60V350M410 60V350M560 60V350M710 60V350"/></g>
   <path className="pv-isotherm cool" d="M165 175C240 235 405 292 690 320"/><path className="pv-isotherm warm" d="M165 115C275 185 445 247 705 279"/><path className="pv-isotherm hot" d="M205 72C320 126 490 188 720 223"/>
   <text className="pv-temp-label cool" x="628" y="325">T₁</text><text className="pv-temp-label warm" x="650" y="277">T₂</text><text className="pv-temp-label hot" x="674" y="215">T₃</text><text className="pv-hot-corner" x="580" y="90">右上ほど高温</text>
   <path className="pv-change pv-state-path vertical" d="M285 300V120" markerEnd="url(#pv-green-arrow)"/>
   <circle className="pv-point start pv-state-point" cx="285" cy="300" r="6"/><circle className="pv-point end pv-state-point" cx="285" cy="120" r="6"/>
   <g className="pv-state-note green" transform="translate(200 170)"><rect width="170" height="76" rx="13"/><text x="16" y="27">（体積一定）</text><text x="16" y="55">圧力増加→温度増加</text></g>
   <path className="pv-change pv-state-path horizontal" d="M420 250H660" markerEnd="url(#pv-amber-arrow)"/>
   <circle className="pv-point start pv-state-point" cx="420" cy="250" r="6"/><circle className="pv-point amber pv-state-point" cx="660" cy="250" r="6"/>
   <g className="pv-state-note amber" transform="translate(450 211)"><rect width="160" height="76" rx="13"/><text x="16" y="27">（圧力一定）</text><text x="16" y="55">体積増加→温度増加</text></g>
  </svg>
  <figcaption><MathFormula expression="T=\dfrac{pV}{nR}" display/><p><MathFormula expression="T_1<T_2<T_3"/>。同じ温度を結ぶ線は <MathFormula expression="pV=\mathrm{一定}"/> の反比例曲線になる。</p></figcaption>
 </figure>;
}

function ConstantPressureWorkGraph(){
 return <figure className="pv-figure pv-work-figure">
  <svg viewBox="0 0 820 430" role="img" aria-labelledby="pv-work-title pv-work-desc">
   <title id="pv-work-title">定圧膨張で気体がする仕事</title>
   <desc id="pv-work-desc">圧力一定で体積がV1からV2へ増え、グラフの下の長方形の面積pかけるV2ひくV1が仕事を表す。</desc>
   <defs><marker id="pv-work-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10z" fill="#a96d1d"/></marker></defs>
   <path className="pv-axis" d="M105 350V55M105 350H745"/>
   <text className="pv-axis-label" x="72" y="62">p</text><text className="pv-axis-label" x="746" y="380">V</text>
   <rect className="pv-work-area" x="240" y="135" width="370" height="215"/>
   <path className="pv-pressure-line" d="M240 135H610" markerEnd="url(#pv-work-arrow)"/>
   <path className="pv-guide" d="M240 135V350M610 135V350"/>
   <circle className="pv-point amber" cx="240" cy="135" r="8"/><circle className="pv-point amber" cx="610" cy="135" r="8"/>
   <text className="pv-value" x="70" y="143">p</text><text className="pv-value" x="222" y="380">V₁</text><text className="pv-value" x="592" y="380">V₂</text>
   <text className="pv-area-label" x="425" y="235">気体がした仕事</text><text className="pv-area-formula" x="425" y="278">p × (V₂ − V₁)</text>
  </svg>
  <figcaption><MathFormula expression="W_{\mathrm{out}}=p\Delta V=p(V_2-V_1)" display/><p>一定の圧力 × 増えた体積。これが長方形の面積と一致する。</p></figcaption>
 </figure>;
}

function PistonWorkDerivation(){
 return <figure className="pv-figure pv-piston-derivation">
  <svg viewBox="0 0 900 470" role="img" aria-labelledby="piston-work-title piston-work-desc">
   <title id="piston-work-title">気体がピストンを押してする仕事の導出</title>
   <desc id="piston-work-desc">圧力pの気体が断面積Sのピストンを力pSで押し、ピストンが距離デルタxだけゆっくり動く。体積の増加はSデルタxとなる。</desc>
   <defs>
    <linearGradient id="piston-gas-fill" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#f3bd58"/><stop offset="1" stopColor="#fff1bd"/></linearGradient>
    <marker id="piston-up-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#b66b1c"/></marker>
    <marker id="piston-down-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#477665"/></marker>
    <marker id="piston-dimension-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#677c72"/></marker>
   </defs>
   <text className="piston-panel-title" x="238" y="38">ゆっくり膨張するピストン</text>
   <text className="piston-panel-subtitle" x="238" y="64">初めと終わりは静止（ΔK = 0）</text>
   <path className="piston-cylinder" d="M85 90V405H390V90"/>
   <rect className="piston-gas" x="91" y="185" width="293" height="214" fill="url(#piston-gas-fill)"/>
   <g className="piston-particles"><circle cx="130" cy="240" r="8"/><circle cx="187" cy="285" r="8"/><circle cx="252" cy="225" r="8"/><circle cx="326" cy="276" r="8"/><circle cx="146" cy="350" r="8"/><circle cx="230" cy="345" r="8"/><circle cx="340" cy="355" r="8"/></g>
   <rect className="piston-old-position" x="91" y="285" width="293" height="24" rx="4"/>
   <rect className="piston-body" x="91" y="170" width="293" height="30" rx="5"/>
   <rect className="piston-rod" x="224" y="72" width="27" height="98" rx="5"/>
   <path className="piston-force gas-force" d="M238 260V205" markerEnd="url(#piston-up-arrow)"/>
   <g className="pv-piston-force-card gas-card" transform="translate(104 218)"><rect width="116" height="55" rx="11"/><text x="58" y="21">気体が押す力</text><text className="formula" x="58" y="43">F = pS</text></g>
   <path className="piston-force outside-force" d="M238 75V153" markerEnd="url(#piston-down-arrow)"/>
   <g className="pv-piston-force-card outside-card" transform="translate(96 94)"><rect width="125" height="55" rx="11"/><text x="62.5" y="21">外から押す力</text><text x="62.5" y="43">大気圧・おもり</text></g>
   <path className="piston-dimension" d="M425 185V297" markerStart="url(#piston-dimension-arrow)" markerEnd="url(#piston-dimension-arrow)"/>
   <path className="piston-dimension-guide" d="M382 185H440M382 297H440"/>
   <text className="piston-dimension-label" x="445" y="247">Δx</text>
   <path className="piston-width" d="M100 425H375" markerStart="url(#piston-dimension-arrow)" markerEnd="url(#piston-dimension-arrow)"/>
   <text className="piston-dimension-label centered" x="238" y="455">断面積 S</text>
   <g className="piston-derivation-box">
    <rect x="515" y="82" width="320" height="300" rx="24"/>
    <text className="piston-box-kicker" x="675" y="125">気体がした仕事</text>
    <text className="piston-box-formula" x="675" y="175">仕事 ＝ 力 × 距離</text>
    <text className="piston-box-formula math" x="675" y="224">W = pS × Δx</text>
    <path d="M565 253H785"/>
    <text className="piston-box-note" x="675" y="286">増えた体積</text>
    <text className="piston-box-formula math" x="675" y="326">ΔV = SΔx</text>
    <text className="piston-box-result" x="675" y="365">W = pΔV</text>
   </g>
  </svg>
  <figcaption><MathFormula expression="W_{\mathrm{out}}=F\Delta x=pS\Delta x=p\Delta V" display/><p><MathFormula expression="\Delta V=S\Delta x"/> なので、圧力 × 増えた体積が気体のした仕事になる。</p></figcaption>
 </figure>;
}

function MiniAxes({children,label}){
 return <svg viewBox="0 0 400 290" role="img" aria-label={label}><path className="pv-axis" d="M65 245V35M65 245H360"/><text className="pv-axis-label" x="38" y="40">p</text><text className="pv-axis-label" x="362" y="274">V</text>{children}</svg>;
}

function CompareWorkGraphs(){
 return <div className="pv-compare-grid four-process-graphs">
  <figure className="pv-mini-card"><MiniAxes label="定圧変化は水平方向の直線"><path className="pv-mini-area isobaric" d="M110 245V105H315V245Z"/><path className="pv-change horizontal" d="M110 105H315"/><circle className="pv-point amber" cx="110" cy="105" r="7"/><circle className="pv-point amber" cx="315" cy="105" r="7"/></MiniAxes><figcaption><strong>定圧変化</strong><p>水平な直線。長方形の面積を求める。</p></figcaption></figure>
  <figure className="pv-mini-card"><MiniAxes label="定積変化は垂直方向の直線"><path className="pv-change vertical" d="M215 218V70"/><circle className="pv-point start" cx="215" cy="218" r="7"/><circle className="pv-point end" cx="215" cy="70" r="7"/></MiniAxes><figcaption><strong>定積変化</strong><p>垂直な直線。横幅がないので仕事は0。</p></figcaption></figure>
  <figure className="pv-mini-card curved"><MiniAxes label="等温変化は反比例の曲線"><path className="pv-curve-area" d="M105 245V65C132 112 175 157 315 213V245Z"/><path className="pv-curve isothermal" d="M105 65C132 112 175 157 315 213"/></MiniAxes><figcaption><strong>等温変化</strong><p><MathFormula expression="pV=\mathrm{一定}"/>。反比例の曲線。</p><p className="pv-work-limit">面積は仕事を表すが、この範囲では気体がする仕事の値は求められない。</p></figcaption></figure>
  <figure className="pv-mini-card curved"><MiniAxes label="断熱膨張は等温変化より急に圧力が下がる曲線"><path className="pv-curve-area adiabatic" d="M105 245V65C123 125 160 185 315 232V245Z"/><path className="pv-reference-isotherm" d="M105 65C132 112 175 157 315 213"/><path className="pv-curve adiabatic" d="M105 65C123 125 160 185 315 232"/></MiniAxes><figcaption><strong>断熱変化</strong><p>膨張では等温曲線より急に圧力が下がる。</p><p className="pv-work-limit">面積は仕事を表すが、この範囲では気体がする仕事の値は求められない。</p></figcaption></figure>
 </div>;
}

function InternalEnergyPanel(){
 return <div className="pv-internal-panel">
  <div className="pv-internal-temperature"><span>低温</span><div><i/><i/><i/></div><span>高温</span></div>
  <div className="pv-internal-formulas">
   <div><small>単原子分子理想気体</small><MathFormula expression="U=\dfrac32nRT" display/></div>
   <b aria-hidden="true">→</b>
   <div><small>温度変化から</small><MathFormula expression="\Delta U=\dfrac32nR\Delta T" display/></div>
  </div>
  <p>P-Vグラフで温度が上がったか下がったかを読めれば、内部エネルギーが増えたか減ったかもすぐ分かる。</p>
 </div>;
}

export default function ThermodynamicsPVWorkLesson(){
 const graphTurns=[
  ['owl','四つの状態変化を学んだら、次はそれを一枚の図で見比べる。横軸を体積 [[V]]、縦軸を圧力 [[p]] にしたものがP-Vグラフ（圧力–体積グラフ）だ。'],
  ['ryota','温度 [[T]] が軸にないなら、温度の変化は分からなくない？'],
  ['owl','状態方程式 [[pV=nRT]] があるだろ。物質量 [[n]] が同じなら、[[T=pV/(nR)]]。圧力と体積の積を見れば、温度も読める。'],
  ['ryota','体積が同じまま上へ動けば、圧力が上がるから [[pV]] も大きくなる。だから温度が上がる。'],
  ['owl','そうだ。圧力一定で右へ動く場合も、体積が増えて [[pV]] が大きくなるから温度が上がる。P-Vグラフは圧力と体積だけでなく、温度の変化まで考えられるんだ。'],
 ];
 const areaLead=[
  ['ryota','でも、どうしてグラフの面積が仕事になるの？　急に図形の話が出てきた。']
 ];
 const areaTurns=[
  ['owl','ピストンの面積を [[S]]、押す力を [[F=pS]]、動いた距離を [[\\Delta x]] としよう。気体がした仕事は [[W_{\\mathrm{out}}=F\\Delta x=pS\\Delta x]] だ。'],
  ['ryota','[[S\\Delta x]] は、ピストンが動いて増えた体積 [[\\Delta V]] だ。だから [[W_{\\mathrm{out}}=p\\Delta V]] になるのか。'],
  ['ryota','それならピストンは仕事を受け取って、運動エネルギーが生じるってことだよね。ピストンが走り続けるってこと？'],
  ['owl','素晴らしい着眼点だ。だが、気体が押す向きとは反対に、大気圧や外部の負荷もピストンを押し、負の仕事をしている。結局、ピストンの運動エネルギーの変化は0となり、ピストンは静止したままだ。'],
  ['ryota','気体がした仕事は、ピストンの運動エネルギーとして残るのではなく、外の大気やおもりを押し返すために使われたんだね。'],
 ];
 const limitTurns=[
  ['owl','では、四つの状態変化で仕事をどう扱うのか整理するぞ。まず定圧変化では、圧力 [[p]] が一定なので、長方形の面積から [[W_{\\mathrm{out}}=p\\Delta V]] と簡単に求められる。'],
  ['ryota','定積変化は縦に動くから横幅 [[\\Delta V]] が0。だから仕事も0だね。'],
  ['owl','等温変化は [[pV=\\mathrm{一定}]] だから反比例の曲線だ。断熱膨張では熱が入らず温度も下がるため、同じ出発点の等温曲線より急に圧力が下がる。'],
  ['ryota','どちらも曲線の下の面積が仕事だけど、長方形みたいには計算できないのか。'],
  ['owl','まあ、「積分」という技を使えば求められなくもない。だが、それは高校物理の範囲を超えるため、ここでは使わない。だから、曲線になる等温変化や断熱変化では、「気体がする仕事の値は求められない」と考えておいてよい。'],
  ['owl','今は、「定圧なら [[p\\Delta V]]」「定積なら0」「曲線でも下側の面積が仕事を表す」──この三つを押さえておけば十分だ。']
 ];
 const internalTurns=[
  ['ryota','P-Vグラフから仕事は分かった。でも、内部エネルギーの変化はどうやったら分かるの？'],
  ['owl','内部エネルギーは温度で決まると学んだだろ。まずグラフ上の二つの状態で [[pV]] を比べ、温度が増えたか減ったかを読む。'],
  ['ryota','[[pV]] が大きくなれば [[T]] も上がる。なら内部エネルギーも増えるって、すぐ判断できるね。'],
  ['owl','特に単原子分子理想気体なら、[[U=\\frac32nRT]]。したがって [[\\Delta U=\\frac32nR\\Delta T]] だ。温度変化が分かれば、内部エネルギー変化はそのまま計算できる。'],
  ['ryota','P-Vグラフから温度と内部エネルギーを読み、面積から仕事を読む。そうすれば第一法則で熱までつながるわけか。'],
  ['owl','その通り。P-Vグラフは、状態方程式と熱力学第一法則を一枚の図でつなぐ道具なんだ。']
 ];
 return <section className="thermodynamics-first-law-lesson thermodynamics-pv-work-lesson">
  <header className="first-law-intro"><span>READ THE P–V DIAGRAM</span><h2>P-Vグラフ（圧力–体積グラフ）から、温度と仕事を読み取る。</h2><p>点は気体の状態を、移動は状態変化を、グラフの面積は気体がした仕事を表す。</p></header>
  <section className="first-law-step"><StepHeader number="1" kicker="STATE ON A GRAPH" title="圧力と体積から、温度まで読む">P-Vグラフには温度の軸がなくても、状態方程式で温度を考えられる。</StepHeader><StateReadingGraph/><Dialogue turns={graphTurns}/></section>
  <section className="first-law-step alternate"><StepHeader number="2" kicker="AREA BECOMES WORK" title="定圧変化なら、長方形の面積が仕事になる">ピストンの力と移動距離から、面積の意味を導く。</StepHeader><Dialogue turns={areaLead}/><PistonWorkDerivation/><Dialogue turns={areaTurns}/><ConstantPressureWorkGraph/></section>
  <section className="first-law-step"><StepHeader number="3" kicker="FOUR SHAPES" title="四つの状態変化を、P-Vグラフで見分ける">定積は0。等温と断熱は反比例に近い曲線になり、断熱膨張の方が急に圧力が下がる。</StepHeader><CompareWorkGraphs/><Dialogue turns={limitTurns}/><div className="pv-final-rule"><span>仕事についての結論</span><div><MathFormula expression="W_{\mathrm{out}}=p\Delta V" display/><small>定圧変化</small></div><div><MathFormula expression="W_{\mathrm{out}}=0" display/><small>定積変化</small></div><p>等温・断熱などの曲線では、下側の面積が仕事を表す。ただし正確な数値計算には積分が必要。</p></div></section>
  <section className="first-law-step alternate"><StepHeader number="4" kicker="READ INTERNAL ENERGY" title="温度が分かれば、内部エネルギーも分かる">単原子分子理想気体なら、温度変化をそのまま公式へ入れられる。</StepHeader><InternalEnergyPanel/><Dialogue turns={internalTurns}/></section>
 </section>;
}
