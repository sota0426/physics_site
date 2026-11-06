import React from 'react';
import MathFormula from './MathFormula';
import SotaCharacter from './SotaCharacter';
import './ideal-gas.css';

function RichText({children}){
 const parts=String(children).split(/(\[\[[^\]]+\]\])/g);
 return parts.map((part,index)=>part.startsWith('[[')&&part.endsWith(']]')?<MathFormula key={index} expression={part.slice(2,-2)}/>:part);
}

function Dialogue({turns}){
 return <div className="concept-dialogue-list ideal-gas-dialogue">{turns.map(([speaker,text],index)=><div className={`concept-dialogue-turn ${speaker} ${speaker==='owl'?'strong':''}`} key={index}>{speaker==='owl'?<img src="/assets/vector-owl.png" alt="案内役のフクロウ"/>:<SotaCharacter/>}<div><p><RichText>{text}</RichText></p></div></div>)}</div>;
}

const particles=[
 [18,24],[38,18],[65,25],[82,19],[26,49],[51,48],[76,54],[16,76],[43,78],[68,74],[86,80],[57,29],[33,35],[72,40],[30,66]
];

function ParticleChamber({mode='normal',count=8}){
 const visible=particles.slice(0,count);
 return <div className={`particle-chamber ${mode}`} aria-hidden="true"><div className="particle-space">{visible.map(([x,y],index)=><i key={index} className={mode==='hot'?'fast':''} style={{left:`${x}%`,top:`${y}%`}}/>)}</div><span className="collision-wall left"/><span className="collision-wall right"/></div>;
}

function PressureIntuition(){
 return <section className="ideal-pressure-section"><header><span>MOLECULE VIEW</span><h3>圧力を上げるには、壁への衝突を増やせばよい</h3><p>圧力は、気体分子が容器の壁へ衝突することで生まれる。ほかの条件を固定し、一つずつ変えて比べよう。</p></header><div className="pressure-master-formula"><small>状態方程式を圧力について解く</small><MathFormula expression="p=\frac{nRT}{V}" display/><div><span><MathFormula expression="n"/> 粒子の量</span><span><MathFormula expression="T"/> 分子運動の激しさ</span><span><MathFormula expression="V"/> 分子が動ける広さ</span></div></div><div className="pressure-change-grid"><article><b>1</b><h4>体積を小さくする</h4><ParticleChamber mode="small" count={8}/><MathFormula expression="V↓⇒p↑" display/><p>壁までの距離が短くなり、分子が壁へ衝突する回数が増える。</p><small>ほかの条件は同じ</small></article><article><b>2</b><h4>温度を上げる</h4><ParticleChamber mode="hot" count={8}/><MathFormula expression="T↑⇒p↑" display/><p>分子の動きが激しくなり、壁へ強く、何度も衝突する。</p><small>ほかの条件は同じ</small></article><article><b>3</b><h4>粒子の数を増やす</h4><ParticleChamber mode="many" count={12}/><MathFormula expression="n↑⇒p↑" display/><p>同じ広さに分子が増え、壁への衝突回数が増える。</p><small>ほかの条件は同じ</small></article></div></section>;
}

function EquationOrigin(){
 return <section className="ideal-origin-section"><header><span>FROM GAS LAWS TO ONE EQUATION</span><h3>別々の実験結果が、一つの式になった</h3><p>圧力・体積・温度だけでなく、「気体を何 mol 入れたか」まで表せる式へ広げる。</p></header><div className="equation-origin-flow"><section><b>1</b><div><small>同じ量の気体を追う</small><MathFormula expression="\frac{pV}{T}=一定" display/><p>ボイル・シャルルの法則。気体の物質量 <MathFormula expression="n"/> は変わらない。</p></div></section><i>↓</i><section><b>2</b><div><small>気体の量も変えたい</small><MathFormula expression="V∝n" display/><p>同じ圧力・同じ温度なら、物質量を2倍にすると体積も2倍になる。これはアボガドロの法則。</p><p>※「∝」は比例を表す記号</p></div></section><i>↓</i><section><b>3</b><div><small>「一定」の大きさは物質量に比例する</small><MathFormula expression="\frac{pV}{T}=nR" display/><p><MathFormula expression="R"/> は、気体の種類によらない気体定数。</p></div></section><i>↓</i><section className="origin-goal"><b>4</b><div><small>理想気体の状態方程式</small><MathFormula expression="pV=nRT" display/><p>圧力・体積・物質量・絶対温度を、一つの状態で結びつける。</p></div></section></div></section>;
}

function FormulaBoard(){
 const entries=[['p','圧力','Pa'],['V','体積','m^3'],['n','物質量','mol'],['R','気体定数','J/(mol·K)'],['T','絶対温度','K']];
 return <section className="ideal-formula-board"><div className="ideal-formula-main"><small>IDEAL GAS EQUATION</small><h3>理想気体の状態方程式</h3><MathFormula expression="pV=nRT" display/><p><MathFormula expression="R=8.31［J/(mol·K)］"/></p></div><div className="ideal-symbols">{entries.map(([symbol,name,unit])=><div key={symbol}><MathFormula expression={symbol}/><span>{name}</span><small>単位：{unit}</small></div>)}</div><aside><b>使う前に確認</b><p>温度は必ず絶対温度 <MathFormula expression="T［K］"/>。圧力は絶対圧力、量は <MathFormula expression="n［mol］"/> でそろえる。</p></aside></section>;
}

export default function IdealGasLesson(){
 const originTurns=[
  ['ryota','ボイル・シャルルの法則を覚えたのに、また新しい公式？　前の式じゃだめなの？'],
  ['owl','前の式は「同じ気体を入れたまま」状態を変える式だ。途中で空気を追加したら、物質量が変わる。そこを表せない。'],
  ['ryota','確かに、自転車のタイヤへ空気を足せば圧力が上がるよね。温度も体積も同じなら、粒子が増えた影響としか考えられない。'],
  ['owl','そこで物質量 [[n［mol］]] を式へ入れる。同じ圧力・温度なら体積は物質量に比例するから、ボイル・シャルルの「一定」は [[n]] に比例して大きくなる。'],
  ['ryota','だから [[pV/T=nR]] になるのか。両辺に [[T]] を掛ければ、[[pV=nRT]]！'],
  ['owl','そうだ。別々に見つかった気体の法則を、物質量まで含めて一つにまとめたものが理想気体の状態方程式だ。']
 ];
 const moleculeTurns=[
  ['owl','今度は式を分子の目で読め。気体の圧力は、分子が壁へ衝突することで生まれていたな。では、圧力を上げる方法を三つ考えろ。'],
  ['ryota','壁への衝突を増やせばいいんだよね。まず容器を小さくすれば、すぐ壁に当たるから体積 [[V]] を小さくする。'],
  ['owl','一つ目。次は？'],
  ['ryota','温度 [[T]] を上げる。温度は分子運動の激しさを表すから、粒が速くなって、強く何度もぶつかる。'],
  ['owl','二つ目。まだあるぞ。'],
  ['ryota','粒子の数、つまり物質量 [[n]] を増やす！　同じ広さに粒が増えれば、壁へ当たる回数も増える。'],
  ['owl','その三つが [[p=\\frac{nRT}{V}]] に全部入っている。分子のイメージと式が同じことを言っているだろう。']
 ];
 const meaningTurns=[
  ['ryota','じゃあ、ボイル・シャルルの法則と状態方程式は、別の法則じゃないの？'],
  ['owl','状態方程式を [[T]] で割れば [[pV/T=nR]]。同じ気体を追うなら [[n]] は変わらず、[[R]] も一定だから、右辺の [[nR]] 全体が一定になる。'],
  ['ryota','つまり [[pV/T=一定]]。そのままボイル・シャルルの法則になる！'],
  ['owl','そうだ。状態方程式は、ボイル・シャルルの法則へ「気体の量」を加えた拡張版だ。'],
  ['ryota','圧力・体積・温度・物質量のうち、三つが分かれば残り一つを求められる。熱力学の神の公式って感じだね。'],
  ['owl','その呼び方は大げさだが、重要さはその通りだ。変化の途中を細かく知らなくても、ある瞬間の平衡状態ごとに使える。熱力学で何度も戻ってくる原理原則だ。'],
  ['owl','ただし「理想気体として扱える」という条件は忘れるな。低温・高圧で液化に近づく実在気体では、ずれが大きくなる。神にも適用範囲はある。']
 ];
 return <section className="ideal-gas-lesson"><header className="ideal-gas-intro"><span>IDEAL GAS EQUATION</span><h2>気体のすべてを、一つの式へ。</h2><p>実験で見つかった法則と、分子が壁へ衝突するイメージをつなげて、<MathFormula expression="pV=nRT"/> の意味を読み解く。</p></header><EquationOrigin/><Dialogue turns={originTurns}/><PressureIntuition/><Dialogue turns={moleculeTurns}/><FormulaBoard/><section className="ideal-connection-section"><header><span>THE SAME LAW, WIDER VIEW</span><h3>ボイル・シャルルは、状態方程式の中にある</h3></header><div className="ideal-connection-formula"><MathFormula expression="pV=nRT" display/><i>両辺を <MathFormula expression="T"/> で割る</i><MathFormula expression="\frac{pV}{T}=nR" display/><i><MathFormula expression="n"/> が同じなら <MathFormula expression="nR"/> は一定</i><MathFormula expression="\frac{pV}{T}=一定" display/></div></section><Dialogue turns={meaningTurns}/><div className="dialogue-takeaway ideal-gas-takeaway"><small>二人がつかんだこと</small><strong><MathFormula expression="pV=nRT"/> は、一つの平衡状態にある理想気体の圧力・体積・物質量・絶対温度を結ぶ。<MathFormula expression="n"/> が一定なら、ボイル・シャルルの法則 <MathFormula expression="pV/T=一定"/> になる。</strong></div></section>;
}
