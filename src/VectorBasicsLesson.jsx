import React,{useState} from 'react';
import {ArrowRight,Minus,Plus} from 'lucide-react';
import MathFormula from './MathFormula';
import SotaCharacter from './SotaCharacter';

function VectorFigure({type}){
 const markerId=`vector-basic-arrow-${type}`,marker=<defs><marker id={markerId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10Z" fill="currentColor"/></marker></defs>,arrowId=`url(#${markerId})`;
 if(type==='meaning')return <svg viewBox="0 0 520 230" role="img" aria-label="一直線上で台車を東向きに4ニュートンの力で引くベクトル">{marker}<line x1="45" y1="185" x2="475" y2="185" className="vb-ground"/><rect x="105" y="115" width="120" height="62" rx="13" className="vb-object"/><circle cx="135" cy="184" r="13"/><circle cx="195" cy="184" r="13"/><line x1="225" y1="143" x2="430" y2="143" className="vb-main-arrow" markerEnd={arrowId}/><text x="270" y="116">力：東向き 4［N］</text><text x="395" y="208">東（＋）</text></svg>;
 if(type==='line')return <svg viewBox="0 0 520 230" role="img" aria-label="一直線上の最初の位置2メートルと最後の位置7メートルの差">{marker}<line x1="55" y1="170" x2="475" y2="170" className="vb-axis" markerEnd={arrowId}/><line x1="75" y1="145" x2="185" y2="145" className="vb-position-one" markerEnd={arrowId}/><line x1="75" y1="105" x2="415" y2="105" className="vb-position-two" markerEnd={arrowId}/><line x1="185" y1="62" x2="415" y2="62" className="vb-main-arrow" markerEnd={arrowId}/><text x="88" y="198">原点</text><text x="105" y="135">最初 2［m］</text><text x="255" y="95">最後 7［m］</text><text x="220" y="42">差：東へ 5［m］</text></svg>;
 if(type==='addition')return <svg viewBox="0 0 520 230" role="img" aria-label="平面上で東へ3メートルと北へ4メートルを足して北東へのベクトルを作る図">{marker}<line x1="95" y1="185" x2="310" y2="185" className="vb-add-a" markerEnd={arrowId}/><line x1="310" y1="185" x2="310" y2="45" className="vb-add-b" markerEnd={arrowId}/><line x1="95" y1="185" x2="310" y2="45" className="vb-main-arrow" markerEnd={arrowId}/><text x="165" y="211">東へ 3［m］</text><text x="325" y="120">北へ 4［m］</text><text x="120" y="95">和：北東へ 5［m］</text><circle cx="95" cy="185" r="7"/><circle cx="310" cy="45" r="8"/></svg>;
 return <svg viewBox="0 0 520 230" role="img" aria-label="平面上の二つの位置ベクトルと、その差である変位の図">{marker}<line x1="75" y1="190" x2="465" y2="190" className="vb-axis" markerEnd={arrowId}/><line x1="75" y1="190" x2="75" y2="30" className="vb-axis" markerEnd={arrowId}/><line x1="75" y1="190" x2="190" y2="150" className="vb-position-one" markerEnd={arrowId}/><line x1="75" y1="190" x2="390" y2="55" className="vb-position-two" markerEnd={arrowId}/><line x1="190" y1="150" x2="390" y2="55" className="vb-main-arrow" markerEnd={arrowId}/><text x="115" y="160">最初の位置</text><text x="295" y="48">最後の位置</text><text x="245" y="125">差＝変位</text><text x="445" y="213">東</text><text x="44" y="42">北</text></svg>;
}

function Concept({number,icon,title,formula,children,type}){
 return <article className="vector-basic-card"><header><span>{number}</span>{icon}<h3>{title}</h3></header><VectorFigure type={type}/><div className="vector-basic-formula"><MathFormula expression={formula}/></div><p>{children}</p></article>;
}

function MiniCheck({label,prompt,choices,answer,explanation}){
 const [selected,setSelected]=useState(null),answered=selected!==null;
 return <section className="vector-mini-check"><span>{label}</span><h3>{prompt}</h3><div>{choices.map((choice,index)=><button key={choice} disabled={answered} className={answered&&index===answer?'correct':answered&&index===selected?'wrong':''} onClick={()=>setSelected(index)}><i>{String.fromCharCode(65+index)}</i>{choice}</button>)}</div>{answered&&<p className={selected===answer?'correct':'wrong'}><b>{selected===answer?'その通り！':'ここを確認しよう'}</b>{explanation}</p>}</section>;
}

export default function VectorBasicsLesson(){
 return <section className="vector-basics">
  <div className="vector-basics-intro"><div className="vector-basics-cast"><SotaCharacter/><img src="/assets/vector-owl.png" alt="案内役のフクロウ"/></div><div><span className="eyebrow">VECTOR PREPARATION</span><h2>まず一直線、次に平面。矢印の計算を広げよう。</h2><p>いきなり斜めの矢印を計算するのは難しそう。</p><p>いきなり平面へ飛ぶな！　まず東西だけの一直線だ。符号で考えられたら、次に東西と南北がある平面へ進むぞ。</p></div></div>

  <section className="vector-case-section line-case"><header><span>STEP 1</span><div><h2>一直線上の場合</h2><p>東を＋、西を－と決めれば、同じ直線上のベクトルは符号付きの数として足し引きできます。</p></div></header><div className="vector-case-grid"><Concept number="01" icon={<ArrowRight size={19}/>} title="大きさと向き" formula="F⃗ = +4［N］" type="meaning">ベクトルは大きさと向きをもつ量です。東向きを＋と決めると、東向き4［N］の力は＋4［N］、西向きなら－4［N］と表せます。</Concept><Concept number="02" icon={<Minus size={19}/>} title="足し算と引き算" formula="Δr⃗ = r⃗₂ − r⃗₁ = +5［m］" type="line">同じ向きは足し、反対向きは符号を変えて足します。引き算は「最後－最初」。東へ7［m］から東へ2［m］を引くと、東へ5［m］です。</Concept></div><MiniCheck label="一直線上のミニクイズ" prompt="台車に東向き6［N］と西向き2［N］の力が同時にはたらく。合わせた力は？" choices={['東向き4［N］','東向き8［N］','西向き4［N］']} answer={0} explanation="東を＋とすると、＋6＋（－2）＝＋4。＋なので東向きです。"/></section>

  <section className="vector-case-section plane-case"><header><span>STEP 2</span><div><h2>平面上の場合</h2><p>東西と南北の二方向があるため、数字だけでは足せません。矢印をつなぐ、または先端どうしを結んで考えます。</p></div></header><div className="vector-case-grid"><Concept number="03" icon={<Plus size={19}/>} title="平面上の足し算" formula="a⃗ + b⃗ = c⃗" type="addition">二本目の始点を一本目の先端へつなぎます。東へ3［m］、北へ4［m］なら、最初から最後までの和は北東へ5［m］です。</Concept><Concept number="04" icon={<Minus size={19}/>} title="平面上の引き算" formula="Δr⃗ = r⃗₂ − r⃗₁" type="plane-subtraction">二本の位置ベクトルの始点をそろえ、最初の矢印の先端から最後の矢印の先端へ引きます。その矢印が差であり、次に学ぶ変位です。</Concept></div><MiniCheck label="平面上のミニクイズ" prompt="東へ3［m］、続けて北へ4［m］進んだ。最初から最後までのベクトルは？" choices={['北東へ5［m］','北東へ7［m］','南西へ5［m］']} answer={0} explanation={<>二本の矢印を順につなぐと直角三角形になります。向きは北東、大きさは <MathFormula expression="√{3² + 4²}=5［m］"/> です。</>}/></section>

  <div className="vector-basic-summary"><span>次の「変位」へ</span><p>変位は、最後の位置ベクトルから最初の位置ベクトルを引いたもの。一直線でも平面でも、「最後－最初」という考え方は同じです。</p></div>
 </section>;
}
