import React from 'react';
import MathFormula from './MathFormula';
import SotaCharacter from './SotaCharacter';
import './thermodynamics-first-law.css';

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

function CycleVisual(){
 return <figure className="heat-cycle-visual">
  <div className="cycle-center"><small>一周すると</small><MathFormula expression="p,V,T" display/><span>が元に戻る</span><MathFormula expression="\Delta U_{\mathrm{cycle}}=0" display/></div>
  <div className="cycle-node heat"><b>1</b><strong>受熱</strong><MathFormula expression="Q_{\mathrm{in}}"/><span>高温側から熱を受け取る</span></div>
  <div className="cycle-node expand"><b>2</b><strong>膨張</strong><MathFormula expression="W_{\mathrm{out}}"/><span>ピストンを押して仕事をする</span></div>
  <div className="cycle-node cool"><b>3</b><strong>放熱</strong><MathFormula expression="Q_{\mathrm{out}}"/><span>低温側へ熱を捨てる</span></div>
  <div className="cycle-node compress"><b>4</b><strong>圧縮</strong><span>次の膨張に備えて元へ戻す</span></div>
  <span className="cycle-link one">→</span><span className="cycle-link two">↓</span><span className="cycle-link three">←</span><span className="cycle-link four">↑</span>
 </figure>;
}

export default function ThermodynamicsHeatEngineLesson(){
 const cycleTurns=[
  ['ryota','熱して気体を膨張させ続ければ、ずっと仕事を取り出せるんじゃない？'],
  ['owl','どこまで膨張させる気だ。容器を宇宙まで伸ばすのか？　一度膨張したら、次に使うため元の状態へ戻さなければならない。'],
  ['ryota','戻している間は仕事を取り出せないし、無駄じゃない？'],
  ['owl','自転車のペダルも、強く踏む場所だけでは一周できないだろ。反対側を戻す過程があるから、次もまた踏める。熱機関も同じだ。'],
  ['ryota','気体を冷やしたり圧縮したりして、温度や体積を元へ戻すのか。'],
  ['owl','そうだ。受熱・膨張・放熱・圧縮などを組み合わせ、最後に温度・圧力・体積を出発点へ戻す。この一周をサイクルと呼ぶ。']
 ];
 const balanceTurns=[
  ['owl','一サイクルの初めと終わりは同じ状態だ。内部エネルギーは状態だけで決まるから、一周全体では [[\\Delta U_{\\mathrm{cycle}}=0]] になる。'],
  ['owl','この1サイクルで気体が外へした正味の仕事を [[W_{\\mathrm{net}}]] と表す。第一法則から [[W_{\\mathrm{net}}=Q_{\\mathrm{in}}-Q_{\\mathrm{out}}]] だ。'],
  ['ryota','受け取った熱から、外へ捨てた熱を引いた残りが仕事になるんだね。'],
  ['owl','その通り。そして、受け取った熱のうち何割を正味の仕事へ変えられたかを表すのが熱効率だ。']
 ];
 const efficiencyTurns=[
  ['owl','熱効率 [[\\eta]] は、受け取った熱 [[Q_{\\mathrm{in}}]] に対する正味の仕事 [[W_{\\mathrm{net}}]] の割合だから、[[\\eta=\\frac{W_{\\mathrm{net}}}{Q_{\\mathrm{in}}}=1-\\frac{Q_{\\mathrm{out}}}{Q_{\\mathrm{in}}}]] と表せる。'],
  ['ryota','じゃあ、捨てる熱を0にできれば、効率100％になる？'],
  ['owl','そこが次の問題だ。受け取った熱を残らず仕事に変えられるのか。その限界を考えるのが熱力学第二法則なんだ。']
 ];
 return <section className="thermodynamics-first-law-lesson heat-engine-efficiency-lesson">
  <header className="first-law-intro"><span>HEAT ENGINE & EFFICIENCY</span><h2>一度の膨張を、何度も働けるサイクルへ。</h2><p>熱機関が元の状態へ戻る理由と、受け取った熱から取り出せる仕事を考える。</p></header>
  <section className="first-law-step alternate"><StepHeader number="1" kicker="WHY A CYCLE?" title="一度の膨張では、熱機関は止まってしまう">次も仕事を取り出すため、気体を出発点へ戻す。</StepHeader><Dialogue turns={cycleTurns}/></section>
  <section className="first-law-step"><StepHeader number="2" kicker="ONE COMPLETE CYCLE" title="一周全体で取り出した仕事を考える">一周すると内部エネルギーの変化量は0になる。</StepHeader><CycleVisual/><Dialogue turns={balanceTurns}/></section>
  <section className="first-law-step alternate"><StepHeader number="3" kicker="THERMAL EFFICIENCY" title="受け取った熱の、どれだけを仕事にできたか">熱効率から、熱力学第二法則の問いへ進む。</StepHeader><Dialogue turns={efficiencyTurns}/></section>
  <div className="first-law-takeaway"><small>熱機関の一サイクル</small><MathFormula expression="\boxed{W_{\mathrm{net}}=Q_{\mathrm{in}}-Q_{\mathrm{out}}}" display/><MathFormula expression="\boxed{\eta=\frac{W_{\mathrm{net}}}{Q_{\mathrm{in}}}}" display/></div>
 </section>;
}
