import React from 'react';
import MathFormula from './MathFormula';
import SotaCharacter from './SotaCharacter';
import internalEnergyMagnifier from './assets/internal-energy-magnifier-ai.png';
import './molecular-internal-energy.css';

function RichText({children}){
 const parts=String(children).split(/(\[\[[^\]]+\]\])/g);
 return parts.map((part,index)=>part.startsWith('[[')&&part.endsWith(']]')?<MathFormula key={index} expression={part.slice(2,-2)}/>:part);
}

function Dialogue({turns}){
 return <div className="concept-dialogue-list internal-dialogue">{turns.map(([speaker,text],index)=><div className={'concept-dialogue-turn '+speaker+(speaker==='owl'?' strong':'')} key={index}>{speaker==='owl'?<img src="/assets/vector-owl.png" alt="案内役のフクロウ"/>:<SotaCharacter/>}<div><p><RichText>{text}</RichText></p></div></div>)}</div>;
}

function StepHeader({number,kicker,title,children}){
 return <header className="internal-step-header"><b>{number}</b><div><span>{kicker}</span><h3>{title}</h3>{children&&<p>{children}</p>}</div></header>;
}

function IceHeatingGraph(){
 return <figure className="ice-heating-graph">
  <header><div><small>物理基礎の復習</small><strong>氷を一定の強さで加熱したとき</strong></div><span>加熱時間が長いほど、加えたエネルギーは増える</span></header>
  <div className="heating-plot">
   <svg viewBox="0 0 920 430" role="img" aria-label="氷を加熱したときの時間と温度のグラフ。氷、水、水蒸気では温度が上昇し、融解中と沸騰中は温度が一定になる">
    <defs>
     <marker id="internal-axis-arrow" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#355f50"/></marker>
     <linearGradient id="heating-line" x1="0" x2="1"><stop offset="0" stopColor="#4b91b1"/><stop offset=".48" stopColor="#3b806b"/><stop offset="1" stopColor="#c17a24"/></linearGradient>
    </defs>
    <path className="heat-grid" d="M95 300H855 M95 120H855"/>
    <path className="heat-axis" d="M95 365V45 M70 340H875" markerEnd="url(#internal-axis-arrow)"/>
    <path className="heat-curve" d="M110 330 L245 300 L390 300 L575 120 L735 120 L840 65"/>
    <g className="heat-points"><circle cx="245" cy="300" r="6"/><circle cx="390" cy="300" r="6"/><circle cx="575" cy="120" r="6"/><circle cx="735" cy="120" r="6"/></g>
    <g className="heat-axis-labels"><text x="56" y="305">0</text><text x="43" y="125">100</text><text x="36" y="55">温度</text><text x="835" y="390">時間</text></g>
    <g className="heat-phase-labels">
     <text x="145" y="315">氷</text><text x="278" y="282">融解中</text><text x="474" y="220">水</text><text x="618" y="102">沸騰中</text><text x="774" y="82">水蒸気</text>
    </g>
    <g className="heat-callouts">
     <path d="M170 260V215"/><rect x="105" y="162" width="175" height="56" rx="14"/><text x="192" y="185">分子運動が激しくなる</text><text x="192" y="204">→ 温度が上がる</text>
     <path d="M320 300V350"/><rect x="217" y="350" width="208" height="60" rx="14"/><text x="321" y="375">位置エネルギーに蓄える</text><text x="321" y="396">→ 温度は変わらない</text>
     <path d="M650 120V180"/><rect x="548" y="180" width="208" height="60" rx="14"/><text x="652" y="205">位置エネルギーに蓄える</text><text x="652" y="226">→ 温度は変わらない</text>
    </g>
   </svg>
  </div>
  <figcaption><strong>どの区間でも、加えたエネルギーは内部エネルギーとして蓄えられる。</strong><span>ただし、内部エネルギーが増えても、いつも温度が上がるとは限らない。</span></figcaption>
 </figure>;
}

function EnergyBoundary(){
 return <figure className="energy-boundary-visual">
  <img src={internalEnergyMagnifier} alt="動いている容器全体を左に、その内部の分子運動を虫眼鏡で拡大して右に示した図"/>
  <figcaption className="energy-boundary-label whole-energy">
   <small>物体全体を俯瞰する</small>
   <strong>力学的エネルギー</strong>
   <MathFormula expression="E=\frac12Mv^2+Mgh" display/>
   <span>容器全体の速さ・高さ</span>
  </figcaption>
  <figcaption className="energy-boundary-label inside-energy">
   <small>虫眼鏡で内部を見る</small>
   <strong>内部エネルギー</strong>
   <MathFormula expression="U=\sum K_{\mathrm{分子}}+\sum E_{\mathrm{分子間}}" display/>
   <span>粒子の運動と相互作用</span>
  </figcaption>
 </figure>;
}

function InternalEnergyDerivation(){
 return <div className="internal-derivation">
  <div className="internal-derivation-row start"><small>分子1個の平均並進運動エネルギー</small><MathFormula expression="\overline{K}=\frac32k_BT" display/></div>
  <b>全分子 <MathFormula expression="N"/> 個ぶんを足す</b>
  <div className="internal-derivation-row"><MathFormula expression="U=N\overline{K}=N\left(\frac32k_BT\right)" display/></div>
  <b><MathFormula expression="N=nN_A"/> と <MathFormula expression="k_B=\frac{R}{N_A}"/> を代入</b>
  <div className="internal-derivation-row working"><MathFormula expression="U=nN_A\cdot\frac32\cdot\frac{R}{N_A}\cdot T" display/><small><MathFormula expression="N_A"/> が約分される</small></div>
  <b>ゆえに</b>
  <div className="internal-derivation-row result"><strong>単原子分子理想気体の内部エネルギー</strong><MathFormula expression="\boxed{U=\frac32nRT}" display/></div>
 </div>;
}

function EnergyChangeDerivation(){
 return <div className="energy-change-card">
  <div><small>はじめ</small><MathFormula expression="U_1=\frac32nRT_1" display/></div>
  <b>温度が変化</b>
  <div><small>あと</small><MathFormula expression="U_2=\frac32nRT_2" display/></div>
  <section><small>変化量は「あと − はじめ」</small><MathFormula expression="\Delta U=U_2-U_1=\frac32nR\Delta T" display/><p><MathFormula expression="\Delta T=T_2-T_1"/></p></section>
 </div>;
}

function DegreesOfFreedomVisual(){
 return <div className="degrees-visual">
  <section><span>単原子分子</span><div className="atom">●</div><b>並進</b><MathFormula expression="U=\frac32nRT" display/></section>
  <section><span>二原子・多原子分子</span><div className="molecule">●—●</div><b>並進 ＋ 回転</b><p><MathFormula expression="\frac32nRT"/> だけでは足りない</p></section>
 </div>;
}

export default function MolecularInternalEnergyLesson(){
 const definitionTurns=[
  ['owl','気体の内部エネルギーを考える前に、まず物理基礎の復習をしておこうか。力学的エネルギーと、物体を熱したときのエネルギーは区別できるよな？'],
  ['ryota','すべて忘れたぜ。'],
  ['owl','威張って言うな。では最初からいくぞ。氷の入った容器を持ち上げる場合と、容器は動かさずに氷を熱する場合を比べてみろ。'],
  ['ryota','どっちも物体にエネルギーを与えているけど、同じエネルギーではないの？'],
  ['owl','そこを混ぜるな。容器全体が動く速さや、地面からの高さで決まるのが「力学的エネルギー」だ。物体を一つのかたまりとして外から眺めている。'],
  ['ryota','じゃあ、容器は動かさずに氷を熱したとき、増えるエネルギーは？'],
  ['owl','それが「内部エネルギー」だ。今度は物体の中を拡大して、粒子一個一個の運動と、粒子同士の結びつきに蓄えられたエネルギーを数える。見る尺度が違うんだよ。'],
  ['ryota','でもグラフを見ると、熱し続けているのに、溶けている時と沸騰している時は温度が上がっていないよ。加えたエネルギーはどこに消えたの？'],
  ['owl','消えたわけじゃない。温度は粒子の運動の激しさと関係しているけれど、内部エネルギーにはもう一つ、粒子同士の位置関係によって決まるエネルギーもある。'],
  ['owl','グラフの斜めの区間では、粒子の熱運動が激しくなる。加えたエネルギーが粒子の運動エネルギーとして蓄えられるから、温度も内部エネルギーも上がる。これは、このあと考える「気体分子の運動エネルギー」へそのままつながる話だ。'],
  ['ryota','じゃあ、融解中や沸騰中の水平な区間では？'],
  ['owl','そのときは、加えたエネルギーが粒子同士の結びつきを変えるために使われる。粒子間の距離や並び方に関係する位置エネルギーとして蓄えられるから、温度は変わらなくても内部エネルギーは増えている。'],
  ['ryota','内部エネルギーには、粒子の運動に蓄える方法と、粒子同士の結びつきに蓄える方法があるんだね。'],
  ['owl','そういうことだ。これは物理基礎で学んだ状態変化の復習だな。内部エネルギー [[U]] は、内部にある粒子の運動エネルギーと、粒子同士の相互作用による位置エネルギーの総和として考える。']
 ];
 const potentialTurns=[
  ['owl','では、気体の内部エネルギーへ戻るぞ。気体でも、分子が飛び回る熱運動の「運動エネルギー」と、分子同士の引力や斥力による「位置エネルギー」の二つを考える。'],
  ['ryota','気体の分子って、ばらばらに飛んでいるんじゃないの？　結びつきなんてあるの？'],
  ['owl','固体のように強く結びついてはいないが、現実の気体の分子同士にも弱い引力や、近づきすぎたときの斥力が働く。だから分子間の距離によって位置エネルギーが変わるんだ。'],
  ['ryota','じゃあ気体の内部エネルギーを求めるには、運動エネルギーだけでなく、その位置エネルギーまで全部足すの？　急に無理ゲーじゃん。'],
  ['owl','だから、今回は理想気体を考えるって言っただろ。理想気体は分子間力を無視すると決めたな。分子間力が働かないなら、分子間の距離が変わっても位置エネルギーは変化しない。そこで位置エネルギーを0とするんだ。'],
  ['ryota','うぇい！　物理ってテキトーで最高だな！'],
  ['owl','つまり理想気体の内部エネルギーは、分子の運動エネルギーの総和だけで表せる。特に単原子分子なら、分子が飛び回る運動だけを考えればいいんだ。']
 ];
 const sumTurns=[
  ['ryota','分子1個なら [[\\overline{K}=\\frac32k_BT]]。気体全体は、これをどうすればいい？'],
  ['owl','全分子ぶん足せばいい。平均点からクラス全員の合計点を出すなら「平均点×人数」だろ。それと同じで、平均運動エネルギーに分子数 [[N]] を掛ける。'],
  ['ryota','[[U=N\\overline{K}=N×\\frac32k_BT]] か。さらに [[N=nN_A]] と [[k_B=R/N_A]] を使えば、アボガドロ定数[[N_A]]が消えるね。'],
  ['owl','そうだ。すると単原子分子理想気体の内部エネルギーは [[U=\\frac32nRT]]。分子一個の世界から、気体全体のエネルギーまでつながった。'],
  ['ryota','行ける気がしてきたぜ！'],  
 ];
 const meaningTurns=[
  ['ryota','式に圧力 [[p]] も体積 [[V]] もない。気体を押し縮めても内部エネルギーは変わらないの？'],
  ['owl','単原子分子理想気体では、物質量 [[n]] が一定なら内部エネルギーは絶対温度 [[T]] だけで決まる。圧縮によって温度が上がれば増えるが、同じ温度に保ったまま体積だけ変えても内部エネルギーは変わらない。'],
  ['owl','ここでもう一つ覚えておけ。熱力学では、内部エネルギーそのものよりも「どれだけ増えたか、減ったか」という変化量を扱うことが多い。温度が [[\\Delta T]] だけ変わったとき、内部エネルギーがどれだけ変わるかも求められるようにしておこう。'],
  ['ryota','はじめの内部エネルギーと、あとの内部エネルギーをそれぞれ求めて引けばいい？'],
  ['owl','そうだ。「あと−はじめ」を取れば、[[\\Delta U=U_2-U_1=\\frac32nR(T_2-T_1)]]。そして [[\\Delta T=T_2-T_1]] だから、[[\\Delta U=\\frac32nR\\Delta T]] と書ける。'],
  ['ryota','温度が増えた分から、内部エネルギーが増えた量を直接求められるんだね。'],
  ['owl','その通り。次に学ぶ熱力学第一法則でも、中心になるのは内部エネルギー [[U]] そのものではなく、その変化量 [[\\Delta U]] だ。ここでしっかり区別しておけ。']
 ];
 const polyatomicTurns=[
  ['ryota','じゃあ酸素や二酸化炭素も、全部 [[U=\\frac32nRT]] でいいんだね。'],
  ['owl','雑に広げるな。[[\\frac32nRT]] は単原子分子理想気体の「並進運動」だけを数えた式だ。酸素のような二原子分子は回転できるし、条件によっては振動もする。'],
  ['ryota','動き方が増えるぶん、エネルギーの貯め場所も増えるのか。'],
  ['owl','その通り。多原子分子では回転や振動のエネルギーも内部エネルギーへ加わる。だから係数 [[\\frac32]] を何にでも使うな。まずは最も単純な単原子分子で、内部エネルギーの考え方をつかめばいい。']
 ];
 return <section className="molecular-internal-lesson">
  <header className="internal-intro"><span>FROM ONE PARTICLE TO THE WHOLE GAS</span><h2>分子一個の運動から、気体全体の内部エネルギーへ。</h2><p>内部と外部を区別し、単原子分子理想気体の <MathFormula expression="U=\frac32nRT"/> を組み立てる。</p></header>
  <section className="internal-step"><StepHeader number="1" kicker="WHAT IS INTERNAL?" title="加えたエネルギーは、どこに蓄えられる？">物理基礎の加熱曲線から、力学的エネルギーと内部エネルギーを分ける。</StepHeader><IceHeatingGraph/><Dialogue turns={definitionTurns}/><EnergyBoundary/></section>
  <section className="internal-step alternate"><StepHeader number="2" kicker="INSIDE A GAS" title="気体の内部エネルギーを、二つに分けて考える">分子の熱運動による運動エネルギーと、分子間の相互作用による位置エネルギーを区別する。</StepHeader><Dialogue turns={potentialTurns}/></section>
  <section className="internal-step"><StepHeader number="3" kicker="SUM ALL PARTICLES" title="平均×分子数で、気体全体へ広げる">分子1個の平均運動エネルギーを、全分子ぶん合計する。</StepHeader><Dialogue turns={sumTurns}/><InternalEnergyDerivation/></section>
  <section className="internal-step alternate"><StepHeader number="4" kicker="WHAT THE FORMULA SAYS" title="内部エネルギーは、物質量と絶対温度で決まる">式に現れない量と、温度変化による内部エネルギーの変化を読む。</StepHeader><Dialogue turns={meaningTurns}/><EnergyChangeDerivation/></section>
  <section className="internal-step"><StepHeader number="5" kicker="DON'T OVERGENERALIZE" title="多原子分子には、回転や振動もある"><MathFormula expression="U=\frac32nRT"/> を使える条件を最後に確認する。</StepHeader><DegreesOfFreedomVisual/><Dialogue turns={polyatomicTurns}/></section>
  <div className="internal-takeaway"><small>このページの結論</small><MathFormula expression="\boxed{\Delta U=\frac32nR\Delta T}" display/><p>単原子分子理想気体では、温度の変化量から内部エネルギーの変化量を求められる。</p></div>
 </section>;
}
