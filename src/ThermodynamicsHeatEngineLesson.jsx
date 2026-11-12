import React from 'react';
import MathFormula from './MathFormula';
import SotaCharacter from './SotaCharacter';
import heatEngineCycleImage from './assets/heat-engine-cycle-ai.png';
import './thermodynamics-first-law.css';
import './thermodynamics-heat-engine.css';

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
 return <figure className="heat-cycle-art">
  <img src={heatEngineCycleImage} alt="ピストン式熱機関が加熱、膨張、放熱、圧縮を繰り返す一サイクルの図"/>
  <div className="cycle-art-steps">
   <div className="cycle-art-label heat"><b>1</b><span><strong>受熱</strong><MathFormula expression="Q_{\mathrm{in}}"/><small>高温側から熱を受け取る</small></span></div>
   <i aria-hidden="true">→</i>
   <div className="cycle-art-label expand"><b>2</b><span><strong>膨張</strong><MathFormula expression="W_{\mathrm{out}}"/><small>ピストンを押して仕事をする</small></span></div>
   <i aria-hidden="true">→</i>
   <div className="cycle-art-label cool"><b>3</b><span><strong>放熱</strong><MathFormula expression="Q_{\mathrm{out}}"/><small>低温側へ熱を放出する</small></span></div>
   <i aria-hidden="true">→</i>
   <div className="cycle-art-label compress"><b>4</b><span><strong>圧縮</strong><small>気体を元の状態へ戻す</small></span></div>
  </div>
  <figcaption><small>一周すると圧力・体積・温度が元へ戻る</small><MathFormula expression="\Delta U_{\mathrm{cycle}}=0" display/><span>だから、同じサイクルを何度も繰り返せる。</span></figcaption>
 </figure>;
}

function EfficiencyFlowVisual(){
 return <figure className="efficiency-flow-visual">
  <div className="efficiency-source hot"><small>高温の熱源</small><MathFormula expression="Q_{\mathrm{in}}=100\,\mathrm{J}" display/><span>熱を受け取る</span></div>
  <b className="efficiency-arrow incoming" aria-hidden="true">→</b>
  <div className="efficiency-engine"><small>熱機関</small><strong>HEAT<br/>ENGINE</strong><span>一部を仕事へ変える</span></div>
  <b className="efficiency-arrow work" aria-hidden="true">→</b>
  <div className="efficiency-output"><small>取り出した仕事</small><MathFormula expression="W_{\mathrm{net}}=40\,\mathrm{J}" display/></div>
  <b className="efficiency-arrow waste" aria-hidden="true">↓</b>
  <div className="efficiency-source cold"><small>低温の熱源へ</small><MathFormula expression="Q_{\mathrm{out}}=60\,\mathrm{J}" display/><span>残りの熱を放出する</span></div>
  <figcaption><MathFormula expression="e=\dfrac{W_{\mathrm{net}}}{Q_{\mathrm{in}}}=\dfrac{40}{100}=0.40" display/><strong>熱効率 40％</strong></figcaption>
 </figure>;
}

function SecondLawPanel(){
 return <div className="second-law-panel">
  <div className="second-law-impossible"><span>実現できない熱機関</span><MathFormula expression="Q_{\mathrm{out}}=0" display/><MathFormula expression="e=1=100\%" display/><b aria-hidden="true">×</b></div>
  <div className="second-law-statement"><small>熱力学第二法則</small><strong>一つの熱源から受け取った熱を、<br/>すべて仕事へ変える周期的な熱機関はつくれない。</strong><p>熱機関が一周して元の状態へ戻るには、受け取った熱の一部を低温側へ放出する必要がある。</p></div>
 </div>;
}

export default function ThermodynamicsHeatEngineLesson(){
 const cycleTurns=[
  ['owl','まずは熱機関の話から始めよう。熱機関とは、高温の物体から熱を受け取り、その一部を仕事へ変える装置だ。蒸気機関や自動車のエンジンが代表例だな。'],
  ['ryota','熱を入れたら、ずっと仕事を取り出せる機械ってこと？'],
  ['owl','一度膨張させるだけでは終わってしまう。気体を膨張させ続けるなら、容器を宇宙まで伸ばすつもりか？'],
  ['ryota','じゃあ、仕事をした気体を元に戻す必要があるのか。戻している間は無駄じゃない？'],
  ['owl','自転車のペダルも、強く踏む場所だけでは一周できないだろ。反対側を戻す過程があるから、次もまた踏める。熱機関も同じだ。'],
  ['ryota','気体を冷やしたり圧縮したりして、温度や体積を元へ戻すんだね。'],
  ['owl','そうだ。受熱・膨張・放熱・圧縮などを組み合わせ、最後に温度・圧力・体積を出発点へ戻す。この一周をサイクルと呼ぶ。']
 ];
 const balanceTurns=[
  ['ryota','でも、行きの膨張で外へ仕事をしても、帰りの圧縮で同じだけ仕事を受け取ったら、結局トータルの仕事は0になって意味がないんじゃないの？'],
  ['owl','いいところに気づいたな。同じ圧力で膨張して、同じ道をそのまま圧縮して戻れば、確かに行きと帰りの仕事は打ち消し合って0になる。'],
  ['ryota','じゃあ、どうやって仕事を残すの？　行きと帰りで負荷を変えるの？'],
  ['owl','考え方は近い。ただし実際には、単に外の負荷を付け替えるというより、加熱と冷却によって気体の圧力を変える。高い圧力で膨張して大きな仕事を外へ渡し、熱を捨てて圧力を下げてから、小さな仕事で圧縮して戻すんだ。'],
  ['ryota','自転車のペダルで、強く踏んで進める側は重いけれど、反対側を元へ戻すときは軽い、みたいな感じ？'],
  ['owl','そういうイメージだ。膨張で得た仕事から、圧縮に使った仕事を引いても残りがある。その差が、一サイクルで外へ取り出せる正味の仕事になる。'],
  ['owl','一サイクルの初めと終わりは同じ状態だ。内部エネルギーは状態だけで決まるから、一周全体では [[\\Delta U_{\\mathrm{cycle}}=0]] になる。'],
  ['owl','この1サイクルで気体が外へした正味の仕事を [[W_{\\mathrm{net}}]] と表す。第一法則から [[W_{\\mathrm{net}}=Q_{\\mathrm{in}}-Q_{\\mathrm{out}}]] だ。'],
  ['ryota','ちょっと待って。その数式が急に出てきて意味不明なんだけど。どうして受け取った熱から、捨てた熱を引くの？'],
  ['owl','一周すると内部エネルギーは増えも減りもしない。だから高温側から受け取った熱 [[Q_{\\mathrm{in}}]] は、外へ取り出した仕事 [[W_{\\mathrm{net}}]] と、低温側へ捨てた熱 [[Q_{\\mathrm{out}}]] の二つに分かれるんだ。'],
  ['owl','まずエネルギーの行き先をそのまま書けば、[[Q_{\\mathrm{in}}=W_{\\mathrm{net}}+Q_{\\mathrm{out}}]]。ここで [[Q_{\\mathrm{out}}]] は、外へ捨てた熱の大きさを正の数で表している。'],
  ['ryota','受け取った熱は、「仕事になった分」と「捨てた分」に分かれるということか。'],
  ['owl','そうだ。仕事だけを知りたいから式を移項すると、[[W_{\\mathrm{net}}=Q_{\\mathrm{in}}-Q_{\\mathrm{out}}]] になる。受け取った熱から、仕事にできず捨てた熱を引いた残りが正味の仕事だ。'],
  ['ryota','受け取った熱から、外へ捨てた熱を引いた残りが仕事になるんだね。'],
  ['owl','その通り。そして、受け取った熱のうち何割を正味の仕事へ変えられたかを表すのが熱効率だ。']
 ];
 const efficiencyTurns=[
  ['owl','熱効率 [[e]] は、受け取った熱 [[Q_{\\mathrm{in}}]] に対する正味の仕事 [[W_{\\mathrm{net}}]] の割合だから、[[e=\\frac{W_{\\mathrm{net}}}{Q_{\\mathrm{in}}}=1-\\frac{Q_{\\mathrm{out}}}{Q_{\\mathrm{in}}}]] と表せる。'],
  ['ryota','100 Jの熱を受け取って40 Jの仕事を取り出せたなら、熱効率は40％。残りの60 Jは低温側へ捨てる熱になるんだね。'],
  ['ryota','じゃあ、捨てる熱を0にできれば、効率100％になる？'],
  ['owl','式だけ見ればそう思える。第一法則はエネルギーの量が合うかを示す法則だから、[[Q_{\\mathrm{out}}=0]] をそれだけでは禁止していない。ここで必要になるのが熱力学第二法則だ。']
 ];
 const secondLawTurns=[
  ['ryota','第二法則は、何を禁止しているの？'],
  ['owl','一つの熱源から熱を受け取り、それを残らず仕事へ変えるだけの周期的な熱機関はつくれない、としている。熱機関を何度も動かすには、必ず一部の熱を低温側へ捨てなければならない。'],
  ['ryota','エネルギーが消えるわけではなく、全部を仕事に変えられないということか。'],
  ['owl','その通り。熱には自然に高温側から低温側へ流れる向きがある。量の保存だけでなく、その変化の向きまで決めるのが第二法則だ。だから実際の熱機関では [[Q_{\\mathrm{out}}>0]] となり、[[e<1]]。熱効率は100％にはならない。'],
  ['ryota','熱効率を上げるとは、捨てる熱をできるだけ減らし、受け取った熱から多くの仕事を取り出すことなんだね。'],
  ['owl','そうだ。ただし0にはできない。その限界の中で、どうすればより効率のよい熱機関を作れるかを考えるのが熱力学なんだ。']
 ];
 return <section className="thermodynamics-first-law-lesson heat-engine-efficiency-lesson">
  <header className="first-law-intro"><span>HEAT ENGINE & EFFICIENCY</span><h2>熱を仕事へ変える「熱機関」を考える。</h2><p>熱機関のサイクルから熱効率をつくり、なぜ100％にできないのかを考える。</p></header>
  <section className="first-law-step alternate"><StepHeader number="1" kicker="WHAT IS A HEAT ENGINE?" title="熱機関は、熱の一部を仕事へ変える">一度きりではなく、何度も仕事を取り出せる装置を考える。</StepHeader><Dialogue turns={cycleTurns}/></section>
  <section className="first-law-step"><StepHeader number="2" kicker="ONE COMPLETE CYCLE" title="一周全体で取り出した仕事を考える">一周すると内部エネルギーの変化量は0になる。</StepHeader><CycleVisual/><Dialogue turns={balanceTurns}/></section>
  <section className="first-law-step alternate"><StepHeader number="3" kicker="THERMAL EFFICIENCY" title="受け取った熱の、どれだけを仕事にできたか">熱効率は、熱機関の性能を表す割合。</StepHeader><EfficiencyFlowVisual/><Dialogue turns={efficiencyTurns}/></section>
  <section className="first-law-step"><StepHeader number="4" kicker="THE SECOND LAW" title="熱効率を100％にはできない">第一法則だけでは分からない、熱現象の向きと限界を考える。</StepHeader><SecondLawPanel/><Dialogue turns={secondLawTurns}/></section>
  <div className="first-law-takeaway"><small>熱機関と熱効率の結論</small><MathFormula expression="\boxed{W_{\mathrm{net}}=Q_{\mathrm{in}}-Q_{\mathrm{out}}}" display/><MathFormula expression="\boxed{e=\frac{W_{\mathrm{net}}}{Q_{\mathrm{in}}}=1-\frac{Q_{\mathrm{out}}}{Q_{\mathrm{in}}}<1}" display/></div>
 </section>;
}
