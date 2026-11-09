import React from 'react';
import MathFormula from './MathFormula';
import SotaCharacter from './SotaCharacter';
import './molecular-temperature.css';

function RichText({children}){
 const parts=String(children).split(/(\[\[[^\]]+\]\])/g);
 return parts.map((part,index)=>part.startsWith('[[')&&part.endsWith(']]')?<MathFormula key={index} expression={part.slice(2,-2)}/>:part);
}

function Dialogue({turns}){
 return <div className="concept-dialogue-list temperature-dialogue">{turns.map(([speaker,text],index)=><div className={'concept-dialogue-turn '+speaker+(speaker==='owl'?' strong':'')} key={index}>{speaker==='owl'?<img src="/assets/vector-owl.png" alt="案内役のフクロウ"/>:<SotaCharacter/>}<div><p><RichText>{text}</RichText></p></div></div>)}</div>;
}

function StepHeader({number,kicker,title,children}){
 return <header className="temperature-step-header"><b>{number}</b><div><span>{kicker}</span><h3>{title}</h3>{children&&<p>{children}</p>}</div></header>;
}

function TwoRoutes(){
 return <div className="temperature-two-routes">
  <section><small>分子運動論から導いた圧力</small><b>分子の衝突を計算</b><MathFormula expression="p=\frac{Nm\overline{v^2}}{3V}" display/></section>
  <i>ここから <MathFormula expression="\overline{K}=\frac12m\overline{v^2}"/> を取り出す</i>
  <section><small>実験から確立した式</small><b>最後に照らし合わせる</b><MathFormula expression="pV=nRT" display/></section>
 </div>;
}

function EnergyReveal(){
 return <div className="temperature-derivation energy-derivation">
  <div className="derivation-row start"><small>前ページで導いた圧力の式</small><MathFormula expression="p=\frac{Nm\overline{v^2}}{3V}" display/></div>
  <b className="derivation-arrow">両辺に <MathFormula expression="V"/> を掛ける</b>
  <div className="derivation-row"><MathFormula expression="pV=\frac13Nm\overline{v^2}" display/></div>
  <b className="derivation-arrow">運動エネルギーの形をつくる</b>
  <div className="derivation-row emphasis"><MathFormula expression="pV=\frac23\cdot N\cdot\left(\frac12m\overline{v^2}\right)" display/></div>
  <p><MathFormula expression="\frac13=\frac23\times\frac12"/> と分けただけなので、式の値は変わらない。</p>
 </div>;
}

function ParticleEquation(){
 return <div className="temperature-derivation substitution-derivation">
  <div className="derivation-equation-pair">
   <section><small>分子運動論</small><MathFormula expression="pV=\frac23\cdot N\cdot\left(\frac12m\overline{v^2}\right)" display/></section>
   <b>同じ <MathFormula expression="pV"/></b>
   <section><small>理想気体の状態方程式</small><MathFormula expression="pV=nRT" display/></section>
  </div>
  <b className="derivation-arrow">二つの右辺を等しく置く</b>
  <div className="derivation-row"><MathFormula expression="nRT=\frac23\cdot N\cdot\left(\frac12m\overline{v^2}\right)" display/></div>
  <div className="derivation-note"><small>ここで分子数と物質量の関係を使う</small><MathFormula expression="N=nN_A" display/><p><MathFormula expression="N_A"/> は1 molあたりの分子数。</p></div>
  <b className="derivation-arrow"><MathFormula expression="N=nN_A"/> を右辺へ代入</b>
  <div className="derivation-row emphasis"><MathFormula expression="nRT=\frac23\cdot nN_A\cdot\left(\frac12m\overline{v^2}\right)" display/></div>
  <b className="derivation-arrow">両辺を <MathFormula expression="n"/> で割る</b>
  <div className="derivation-row"><MathFormula expression="RT=\frac23N_A\left(\frac12m\overline{v^2}\right)" display/></div>
 </div>;
}

function FinalComparison(){
 return <div className="temperature-derivation final-derivation">
  <b className="derivation-arrow">運動エネルギー＝の形にするため、両辺に <MathFormula expression="\frac32\cdot\frac1{N_A}"/> を掛ける</b>
  <div className="derivation-row"><MathFormula expression="\frac32\cdot\frac{R}{N_A}\cdot T=\frac12m\overline{v^2}" display/></div>
  <b className="derivation-arrow">左右を入れ替える</b>
  <div className="derivation-row"><MathFormula expression="\frac12m\overline{v^2}=\frac32\cdot\frac{R}{N_A}\cdot T" display/></div>
  <div className="derivation-note boltzmann-definition result-definition">
   <small><MathFormula expression="R"/> と <MathFormula expression="N_A"/> は定数なので、この二つを一つの定数「ボルツマン定数」として定義する。</small>
   <MathFormula expression="k_B=\frac{R}{N_A}" display/>
   <b>ゆえに</b>
   <MathFormula expression="\overline{K}=\frac12m\overline{v^2}=\frac32k_BT" display/>
  </div>
 </div>;
}

function MolecularSpeedTable(){
 const rows=[
  {formula:'\\mathrm{H_2}',name:'水素',mass:'2.0',speed:'約 1,930'},
  {formula:'\\mathrm{O_2}',name:'酸素',mass:'32',speed:'約 484'},
  {formula:'\\mathrm{CO_2}',name:'二酸化炭素',mass:'44',speed:'約 412'}
 ];
 return <div className="molecular-speed-comparison">
  <header><span>SAME TEMPERATURE, DIFFERENT SPEED</span><h4>同じ300 K（27℃）でも、軽い分子ほど速く動く</h4><p>二乗平均平方根速度 <MathFormula expression="v_{\mathrm{rms}}=\sqrt{\frac{3RT}{M}}"/> で比較する。</p></header>
  <div className="speed-table-wrap"><table>
   <thead><tr><th>気体</th><th>モル質量（g/mol）</th><th>300 Kでの速度（m/s）</th></tr></thead>
   <tbody>{rows.map(row=><tr key={row.name}><th><MathFormula expression={row.formula}/><span>{row.name}</span></th><td>{row.mass}</td><td><b>{row.speed}</b></td></tr>)}</tbody>
  </table></div>
  <p className="speed-table-note"><MathFormula expression="\overline{K}=\frac32k_BT"/> は3種類とも同じ。質量が小さい水素は、その分だけ速く動く。</p>
 </div>;
}

export default function MolecularTemperatureLesson(){
 const reviewTurns=[
  ['ryota','前のページで、気体の圧力は [[p=\\frac{Nm\\overline{v^2}}{3V}]] まで導いたね。今度はここから温度を出すの？'],
  ['owl','そうだ。目標は「分子の熱運動の激しさが温度の正体ではないか」という考えを、式として確かめることだ。'],
  ['ryota','先にゴールを決めて、その形へ無理やり持っていくの？　ちょっとずるくない？'],
  ['owl','仮説を立てて、確かめやすい形へ式を書き換えるのはずるではない。等式を壊さず変形し、別の実験法則と一致するかを確かめる。合わなければ仮説の方を捨てる。それが物理だ。']
 ];
 const revealTurns=[
  ['owl','運動エネルギーは [[K=\\frac12mv^2]] だったな。圧力の式には [[m\\overline{v^2}]] がある。そこで、わざと [[\\frac12m\\overline{v^2}]] が見える形をつくる。'],
  ['ryota','わざとって、本当に言っちゃった。'],
  ['owl','[[\\frac13=\\frac23\\times\\frac12]] と分けただけだ。値は一切変えていない。式の中に隠れていた平均運動エネルギーを見えるようにしたんだ。'],
  ['ryota','まず [[pV=\\frac13Nm\\overline{v^2}]] にしてから、[[pV=\\frac23N\\left(\\frac12m\\overline{v^2}\\right)]] と直すんだね。これなら運動エネルギーが式の中にはっきり見える。']
 ];
 const empiricalTurns=[
  ['owl','運動エネルギーの形は見えた。次は、この分子運動論の式と、前に学んだ理想気体の状態方程式 [[pV=nRT]] を組み合わせるぞ。'],
  ['ryota','ちょっと待って。状態方程式も、ここでもう一度導出するの？'],
  ['owl','しない。ボイルの法則、シャルルの法則、アボガドロの法則をまとめて、前の単元で導いただろ。忘れるのが早すぎる。'],
  ['ryota','ああ、あれか。でも、その状態方程式って本当に正しいと言えるの？　今回は分子の運動から計算していないよね。'],
  ['owl','いい質問だ。これはボイル、シャルル、アボガドロらの気体の測定結果をまとめた経験則だ。理想気体として扱える範囲では、実験によって先に正しいと確かめられている。だから理論を確かめる基準として使える。'],
  ['ryota','経験則って、「理由はまだ分からないけれど、測ると確かにそうなる」という法則か。'],
  ['owl','その通り。ただし、どんな現実の気体にも完全に成り立つ魔法の式ではない。低密度で分子間力を無視できる理想気体の模型で使う。今回の前提とそろっているから比較できるんだ。'],
  ['ryota','でも状態方程式は物質量 [[n]]（モル）、分子運動論の式は分子数 [[N]]（個数）。文字がそろっていないよ。'],
  ['owl','まず、分子運動論の [[pV=\\frac23N\\left(\\frac12m\\overline{v^2}\\right)]] と状態方程式 [[pV=nRT]] は、同じ気体の同じ [[pV]] を表している。だから先に二つを等しく置く。'],
  ['ryota','すると [[nRT=\\frac23N\\left(\\frac12m\\overline{v^2}\\right)]]。まだ左辺は物質量 [[n]]、右辺は分子数 [[N]] のままだね。'],
  ['owl','そこで初めて [[N=nN_A]] を使う。１molに含まれる粒子数は [[N_A]]（=6.0×[[10^{23}]]）だから、右辺の [[N]] を [[nN_A]] に置き換えるんだ。ボルツマン定数はまだ使わないぞ。']
 ];
 const conclusionTurns=[
  ['ryota','なんだか一気に式が進んだけど、改めて何をしたのか説明してくれよ。'],
  ['owl','最初に、分子運動論の圧力の式を、平均運動エネルギー [[\\overline{K}=\\frac12m\\overline{v^2}]] が見える形へ直した。次に、同じ気体を表す状態方程式 [[pV=nRT]] と結びつけたんだ。'],
  ['ryota','それで [[N=nN_A]] を使って分子数を物質量に直し、両辺の [[n]] を消した。最後は運動エネルギー＝の形になるように整理したんだね。'],
  ['owl','そうだ。すると式の中に、気体定数 [[R]] とアボガドロ定数 [[N_A]] の組 [[R/N_A]] が現れた。どちらも定数だから、毎回二つを書くのは面倒だ。そこで一つの新しい定数にまとめる。'],
  ['ryota','それが [[k_B=R/N_A]]、ボルツマン定数か。この証明をしたボルツマンが、自分で名前をつけたの？　ウケる。'],
  ['owl','んなわけあるか。分子の運動を統計的に考える理論を築いたボルツマンにちなみ、後世の物理学者がそう呼ぶようになったんだ。'],
  ['ryota','でも、わざわざ新しい定数を作らなくても、ずっと [[R/N_A]] と書けばよくない？　たった２つの文字を書くのが面倒だなんて物理学者ってワガママすぎない？'],
  ['owl','いや、そうじゃない。[[R/N_A]] は「温度」と「粒子一個あたりのエネルギー」を結ぶ組み合わせとして、この先の熱力学や統計力学に何度も現れる。だから [[k_B]] という一つの定数にまとめて、意味ごと名前をつけたんだ。'],
  ['ryota','それで式が [[\\overline{K}=\\frac32k_BT]] になった。つまり、温度 [[T]] を決めれば、分子一個の運動エネルギー [[\\overline{K}]] も一つに決まる。温度が高いほど、運動エネルギーも大きくなるんだね。'],
  ['owl','その通り。[[k_B]] は、その異なる二つの物理量を結ぶ比例定数だ。ただしこれは「並進」運動エネルギーの話だ。回転や振動もある一般の分子では、温度をこれだけで説明することはできないからぞ。']
 ];
 const consequenceTurns=[
  ['ryota','まあとにかく、これで同じ温度なら、すべての分子が同じ速さだということがわかったわけだ。'],
  ['owl','違う。何を聞いていたんだ。いま同じになると分かったのは「速さ」ではなく、分子1個あたりの「平均運動エネルギー」だ。[[\\frac12m\\overline{v^2}=\\frac32k_BT]] を見ろ。'],
  ['ryota','あ、軽い分子と重い分子で、平均運動エネルギーが同じになるのか。質量が違うなら、速さは変わるのか。'],
  ['owl','そうだ。同じ温度なら、軽い分子は速く、重い分子はゆっくり動く。だが「質量×速さの二乗」で決まる平均運動エネルギーは等しい。具体的な値で比べてみろ。'],
  ['ryota','表では、分子の速さをどうやって一つの値で表すの？　式には [[\\overline{v^2}]] が出ているよ。'],
  ['owl','そこで、速度を一つずつ二乗して平均し、最後に平方根をつけた「二乗平均平方根速度」を使う。[[v_{\\mathrm{rms}}=\\sqrt{\\overline{v^2}}]] だ。平方根をつければ、単位も速さと同じになる。'],
  ['ryota','二乗した後に平方根とったらもとに戻るじゃん。数学できないの？　ウケる。'],
  ['owl','初めにも言っただろ。分子はあらゆる向きに動くから、向きをもつ速度やその成分をそのまま平均すると、正負が打ち消し合ってほぼ0になる。二乗して向きの符号を消し、平均してから平方根をとることで、運動の激しさを速さの単位で表せるんだ。']
 ];
 return <section className="molecular-temperature-lesson">
  <header className="temperature-intro"><span>MOLECULAR MOTION & TEMPERATURE</span><h2>温度の正体を、運動エネルギーで読む。</h2><p>分子運動論と経験則の状態方程式を、同じ <MathFormula expression="pV"/> を手がかりに結びつける。</p></header>
  <section className="temperature-step"><StepHeader number="1" kicker="REVIEW & HYPOTHESIS" title="圧力の式に、温度は隠れている？">まず、前ページで導いた圧力の式と今回の仮説を確認する。</StepHeader><TwoRoutes/><Dialogue turns={reviewTurns}/></section>
  <section className="temperature-step alternate"><StepHeader number="2" kicker="REVEAL THE ENERGY" title="運動エネルギーの形を、意図的につくる">等式を変えずに、見つけたい量が見える形へ書き換える。</StepHeader><EnergyReveal/><Dialogue turns={revealTurns}/></section>
  <section className="temperature-step"><StepHeader number="3" kicker="COMPARE, THEN SUBSTITUTE" title="二つのpVを結び、その後で分子数を物質量に直す">まず二つの <MathFormula expression="pV"/> を等しく置き、次に <MathFormula expression="N=nN_A"/> を代入する。</StepHeader><Dialogue turns={empiricalTurns}/><ParticleEquation/></section>
  <section className="temperature-step alternate"><StepHeader number="4" kicker="ARRANGE" title="運動エネルギー＝の形をつくり、ボルツマン定数でまとめる">係数を整理してから、<MathFormula expression="k_B=R/N_A"/> を導入する。</StepHeader><FinalComparison/><Dialogue turns={conclusionTurns}/></section>
  <section className="temperature-step"><StepHeader number="5" kicker="CONSEQUENCE" title="同じ温度でも、分子の速さは同じとは限らない">温度と平均運動エネルギーの関係から、一歩先を考える。</StepHeader><Dialogue turns={consequenceTurns}/><MolecularSpeedTable/></section>
  <div className="temperature-takeaway"><small>このページの結論</small><MathFormula expression="\boxed{\overline{K}=\frac12m\overline{v^2}=\frac32k_BT}" display/><p>単原子理想気体では、分子1個の平均並進運動エネルギーは絶対温度だけで決まる。</p></div>
 </section>;
}
