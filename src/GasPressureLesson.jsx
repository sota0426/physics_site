import React from 'react';
import MathFormula from './MathFormula';
import SotaCharacter from './SotaCharacter';

const steps=[
 {
  kicker:'STEP 1 / FORCE PER AREA',title:'圧力は、力の「集中ぐあい」',lead:'同じ力でも、どれだけの面積へ分かれてはたらくかで影響が変わる。',kind:'area',image:'/assets/gas-pressure-area-ai.png',alt:'同じ大きさと重さの黄色い直方体を、広い面と狭い面でそれぞれ机に置いて比べる場面',
  turns:[
   ['ryota','圧力って、結局は押す力のことでしょ？　わざわざ別の名前をつける必要ある？'],
   ['owl','同じ力なら、どんな押し方でも同じ影響になると思っているのか？　同じ重さの直方体を、広い面と狭い面で置いてみろ。'],
   ['ryota','確かに狭い面で置いた方が机に食い込みそう。でも、重さも押す力も同じだよね。力として同じじゃん？'],
   ['owl','だから「力」だけでは足りないんだ。圧力とは面に垂直な力を、単位面積あたりにどれだけ集中しているかを表す量だ。だから、力を面積で割って、[[p=F/S]] と表す。'],
   ['ryota','面積 [[S]] が小さいほど、同じ力 [[F]] が狭い場所に集中するから、圧力 [[p]] は大きくなるんだ。'],
   ['owl','そうだ。圧力は力そのものではなく、「単位面積あたりの力」だ。直感的には力の密度、つまり力の集中ぐあいだと思えばいい。'],
   ['ryota','中学校でやった、物体が床を押す圧力はこれだったね。単位は？'],
   ['owl','[[1［Pa］=1［N/m^2］]] だ。圧力は向きをもつ力ではなく、場所ごとの押し合いの強さを表す量だぞ。']
  ]
 },
 {
  kicker:'STEP 2 / FLUID & PISTON',title:'気体を、どうやって扱う？',lead:'気体分子の集まりを、圧力・温度・体積という人間が扱いやすい量で捉える。',kind:'piston',image:'/assets/gas-pressure-piston-ai.png',alt:'液体と気体が入った透明な円筒に、上下へ動ける金属製のピストンが取り付けられている場面',
  turns:[
   ['ryota','熱力学では何を考えるの？　空気から受ける力とか、空気の運動とか？'],
   ['owl','気体がどんな状態にあり、熱を加えたり押し縮めたりすると、その状態がどう変わるかを考える。だが、お前なら空気の運動をどうやって式にする？'],
   ['ryota','空気の力のつり合いとか、空気全体の運動方程式とか……。いや、「空気全体」ってどこからどこまで？　そもそも空気を一個の物体みたいに見ていいの？'],
   ['owl','そうだろう。空気は一個の固体ではなく、飛び回る大量の気体分子の集まりだ。気体と液体は、決まった形を保たず流れるので、まとめて「流体」と呼ぶ。'],
   ['ryota','分子を全部追いかければ正確そうだけど、数が多すぎて無理だね。'],
   ['owl','そこで熱力学では、分子一個一個ではなく、気体全体の状態を圧力・温度・体積などで表す。細かすぎて追えない運動を、人間が測って計算できる量へまとめるわけだ。'],
   ['ryota','じゃあ、気体そのものに運動方程式を立てないの？'],
   ['owl','立てられないわけではない。ただ、高校の熱力学では、気体を閉じ込める容器や動けるピストンを対象にすると、力の作用が見えやすい。圧力 [[p]] が一様なら、面積 [[S]] のピストンを押す力は [[F=pS]] だ。'],
   ['ryota','なるほど。気体の細かい動きを直接追わなくても、圧力を使えば、ピストンが受ける力として計算できるんだ。'],
   ['owl','その通り。ピストンなら、気体が内側から押す力、外気が押す力、重力などを描いて、静止なら力のつり合い、動くなら運動方程式を考えられる。'],
   ['ryota','ていうかさ、温度や圧力って、そもそも何なんだろうね。気体の何を数字にしているの？ 物体が床に押す圧力はわかるけど、空気の圧力って意味不明だよね。気圧ってなんなの？'],
   ['owl','いいところに目をつけたな。どちらも、見えない気体分子の運動を全体として捉えた量だ。まずは圧力がどう生まれるのか、その正体を見にいくぞ。']
  ]
 },
 {
  kicker:'STEP 3 / MOLECULAR COLLISIONS',title:'見えない衝突が、圧力をつくる',lead:'気体が壁を押し続けられる理由を、分子の運動から考える。',kind:'molecules',image:'/assets/gas-pressure-molecules-ai.png',alt:'透明な容器の中を多数の気体分子が不規則に飛び回り、壁へ衝突して跳ね返っている場面',
  turns:[
   ['ryota','でも、空気は手で押してるわけでもないのに、どうしてピストンを押せるの？'],
   ['owl','空気を何もない空間だと思うな。気体分子があらゆる向きへ飛び回り、壁へ何度も衝突している。'],
   ['ryota','分子が壁にぶつかって跳ね返ると、分子の運動の向きが変わるね。'],
   ['owl','運動量が変わるには、壁から分子へ力が必要だ。すると作用・反作用によって、分子も壁へ力を及ぼす。'],
   ['ryota','一個の衝突なら小さすぎるけど、分子はものすごい数ある。ずっと壁をたたき続けているってことか。'],
   ['owl','そうだ。一つ一つはばらばらでも、多数の衝突を時間と面積で平均すると、壁を押す安定した力として見える。それを面積で割ったものが気体の圧力だ。'],
   ['ryota','目に見える圧力の正体は、目に見えない分子の衝突なんだ。急に気体が「もの」に見えてきた。'],
   ['owl','それが高校で学ぶ気体の圧力だ。次は、空気の圧力がどのように生じるのか、空気の温度や体積とどのような関係があるのかを見ていくぞ。']
  ]
 }
];

function RichText({children}){
 const parts=String(children).split(/(\[\[[^\]]+\]\])/g);
 return parts.map((part,index)=>part.startsWith('[[')&&part.endsWith(']]')?<MathFormula key={index} expression={part.slice(2,-2)}/>:part);
}

function Dialogue({turns}){
 return <div className="concept-dialogue-list gas-pressure-dialogue">{turns.map(([speaker,text],index)=><div className={`concept-dialogue-turn ${speaker} ${speaker==='owl'?'strong':''}`} key={index}>{speaker==='owl'?<img src="/assets/vector-owl.png" alt="案内役のフクロウ"/>:<SotaCharacter/>}<div><p><RichText>{text}</RichText></p></div></div>)}</div>;
}

function Overlay({kind}){
 if(kind==='area')return <svg viewBox="0 0 1536 1024" aria-hidden="true"><defs><marker id="pressure-arrow-area" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#b77828"/></marker></defs><path className="pressure-force-arrow" d="M770 470V610"/><path className="pressure-force-arrow" d="M1110 330V475"/><foreignObject x="920" y="105" width="500" height="190"><div xmlns="http://www.w3.org/1999/xhtml" className="pressure-formula-card"><small>圧力の定義</small><MathFormula expression="p=F/S"/><span><MathFormula expression="1［Pa］=1［N/m^2］"/></span></div></foreignObject><foreignObject x="585" y="805" width="370" height="105"><div xmlns="http://www.w3.org/1999/xhtml" className="pressure-label broad"><small>広い面</small><MathFormula expression="S_1>S_2,\ p_1<p_2"/></div></foreignObject><foreignObject x="1000" y="805" width="300" height="105"><div xmlns="http://www.w3.org/1999/xhtml" className="pressure-label narrow"><small>狭い面</small><MathFormula expression="p_2=F/S_2"/></div></foreignObject></svg>;
 if(kind==='piston')return <svg viewBox="0 0 1536 1024" aria-hidden="true"><defs><marker id="pressure-arrow-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#397b9d"/></marker><marker id="pressure-arrow-gold" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#bd7b2e"/></marker><marker id="pressure-arrow-weight" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#754f74"/></marker></defs><foreignObject x="70" y="55" width="650" height="145"><div xmlns="http://www.w3.org/1999/xhtml" className="piston-target-card"><small>力を考える対象</small><strong>気体自体ではなく<br/>「ピストン」を対象にする</strong></div></foreignObject><path className="piston-arrow fluid" d="M930 675V530"/><path className="piston-arrow outside" d="M860 300V445"/><path className="piston-arrow weight" d="M1010 430V575"/><foreignObject x="1040" y="600" width="390" height="115"><div xmlns="http://www.w3.org/1999/xhtml" className="piston-force-label fluid"><small>内部の気体：気圧 <MathFormula expression="P"/></small><MathFormula expression="PS"/></div></foreignObject><foreignObject x="1050" y="205" width="380" height="115"><div xmlns="http://www.w3.org/1999/xhtml" className="piston-force-label outside"><small>外部の気体：気圧 <MathFormula expression="P'"/></small><MathFormula expression="P'S"/></div></foreignObject><foreignObject x="1110" y="410" width="300" height="105"><div xmlns="http://www.w3.org/1999/xhtml" className="piston-force-label weight"><small>ピストンの重力</small><MathFormula expression="mg"/></div></foreignObject><foreignObject x="1010" y="790" width="440" height="135"><div xmlns="http://www.w3.org/1999/xhtml" className="piston-balance-card"><small>ピストンが静止しているとき</small><MathFormula expression="PS=P'S+mg"/></div></foreignObject></svg>;
 return <svg viewBox="0 0 1536 1024" aria-hidden="true"><foreignObject x="930" y="745" width="475" height="175"><div xmlns="http://www.w3.org/1999/xhtml" className="pressure-formula-card molecules"><small>多数の衝突を平均する</small><MathFormula expression="p=F/S"/><span>壁を押す力 ÷ 壁の面積</span></div></foreignObject><circle className="collision-ring" cx="1340" cy="370" r="42"/><circle className="collision-ring" cx="610" cy="680" r="42"/><circle className="collision-ring" cx="1018" cy="760" r="42"/></svg>;
}

export default function GasPressureLesson(){
 return <section className="gas-pressure-lesson"><header className="gas-pressure-intro"><span>GAS PRESSURE</span><h2>空気は見えないのに、なぜ壁を押せる？</h2><p>床を押す固体の圧力から出発し、流体とピストン、そして分子の衝突までつなげる。</p></header>{steps.map((step,index)=><section className={`gas-pressure-step step-${index+1}`} key={step.kind}><header><span>{step.kicker}</span><h3>{step.title}</h3><p>{step.lead}</p></header><Dialogue turns={step.turns}/><figure className={`gas-pressure-art ${step.kind}`}><img src={step.image} alt={step.alt}/><Overlay kind={step.kind}/></figure></section>)}<div className="dialogue-takeaway gas-pressure-takeaway"><small>二人がつかんだこと</small><strong>圧力は単位面積あたりの垂直な力で、<MathFormula expression="p=F/S"/>。気体と液体は流体であり、力を考えるときは境界や対象を決める。気体の圧力は、多数の分子が壁へ衝突して力を及ぼすことで生まれる。</strong></div></section>;
}
