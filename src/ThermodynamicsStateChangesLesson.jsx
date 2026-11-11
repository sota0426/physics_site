import React from 'react';
import MathFormula from './MathFormula';
import SotaCharacter from './SotaCharacter';
import isobaricImage from './assets/isobaric-piston-process-ai.png';
import isochoricImage from './assets/isochoric-piston-process-ai.png';
import isothermalImage from './assets/isothermal-piston-process-ai.png';
import adiabaticImage from './assets/adiabatic-compression-process-ai.png';
import './thermodynamics-first-law.css';
import './thermodynamics-state-changes.css';
import './thermodynamics-process-details.css';

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

function StateEquationMap(){
 const items=[
  ['定圧変化','p','一定','\\dfrac{V}{T}=\\mathrm{一定}'],
  ['定積変化','V','一定','\\dfrac{p}{T}=\\mathrm{一定}'],
  ['等温変化','T','一定','pV=\\mathrm{一定}']
 ];
 return <figure className="state-equation-map">
  <div className="state-source"><small>出発点</small><MathFormula expression="pV=nRT" display/><span>物質量 <MathFormula expression="n"/> は一定</span></div>
  <div className="state-map-arrow" aria-hidden="true">↓</div>
  <div className="state-condition-grid">{items.map(([title,symbol,word,result])=><div className="state-condition-card" key={title}><strong>{title}</strong><div><MathFormula expression={symbol}/><b>{word}</b></div><span>すると</span><MathFormula expression={result} display/></div>)}</div>
 </figure>;
}

function FirstLawZeroMap(){
 const items=[
  ['Q_{\\mathrm{in}}=0','断熱変化','新しく加わる'],
  ['\\Delta U=0','等温変化','T一定と重なる'],
  ['W_{\\mathrm{out}}=0','定積変化','V一定と重なる']
 ];
 return <figure className="first-law-zero-map">
  <div className="state-source"><small>もう一つの出発点</small><MathFormula expression="Q_{\mathrm{in}}=\Delta U+W_{\mathrm{out}}" display/><span>三つの項のどれかを0にする</span></div>
  <div className="state-zero-grid">{items.map(([formula,title,note],index)=><div className={'state-zero-card '+(index===0?'new':'overlap')} key={title}><MathFormula expression={formula} display/><strong>{title}</strong><span>{note}</span></div>)}</div>
 </figure>;
}

function ProcessSummary(){
 const items=[
  ['定圧変化','p=\\mathrm{一定}','Q_{\\mathrm{in}}=\\Delta U+W_{\\mathrm{out}}'],
  ['定積変化','V=\\mathrm{一定}','Q_{\\mathrm{in}}=\\Delta U'],
  ['等温変化','T=\\mathrm{一定}','Q_{\\mathrm{in}}=W_{\\mathrm{out}}'],
  ['断熱変化','Q_{\\mathrm{in}}=0','\\Delta U=-W_{\\mathrm{out}}']
 ];
 return <div className="process-summary-grid">{items.map(([title,condition,result],index)=><article className={`process-summary-card process-${index+1}`} key={title}><b>{index+1}</b><h4>{title}</h4><MathFormula expression={condition} display/><span>第一法則では</span><strong><MathFormula expression={result}/></strong></article>)}</div>;
}

function ProcessDeepDive({image,alt,tag,formulae,example,children}){
 return <div className="process-deep-dive">
  <figure className="process-scene">
   <img src={image} alt={alt}/>
   <figcaption><span>{tag}</span><strong>{example}</strong></figcaption>
  </figure>
  <div className="process-law-strip">{formulae.map(([label,formula])=><div key={label}><small>{label}</small><MathFormula expression={formula} display/></div>)}</div>
  {children}
 </div>;
}

export default function ThermodynamicsStateChangesLesson(){
 const equationTurns=[
  ['owl','気体の状態変化には名前がいくつもあるが、いきなり暗記するな。まずは一番シンプルに、状態方程式 [[pV=nRT]] から考えるぞ。気体の物質量 [[n]] は一定とする。'],
  ['ryota','式にある [[p]]、[[V]]、[[T]] のどれか一つを一定にしてみるってこと？'],
  ['owl','その通り。圧力 [[p]] を一定にすれば定圧変化、体積 [[V]] を一定にすれば定積変化、温度 [[T]] を一定にすれば等温変化だ。名前もそのままだろ。'],
  ['ryota','いや、温度だけ名前が違うじゃん。一定の温度なら「定温変化」じゃないの？　どうして「等温」なの？'],
  ['owl','本当はどちらでもいいんだよ。大学の物理では「定温変化」と呼ぶこともある。高校物理では「等温変化」という名前をよく使うから、ここでもそう呼ぶだけだ。'],
  ['ryota','へえ、まあいいや。じゃあ、この三つの状態変化について考えればいいわけだ。'],
  ['owl','いや、まだ終わりじゃない。気体についての原理原則は状態方程式だけではないだろ。もう一つ、熱力学第一法則がある。こちらから作れる状態変化も検討するぞ。']
 ];
 const zeroTurns=[
  ['owl','次は熱力学第一法則 [[Q_{\\mathrm{in}}=\\Delta U+W_{\\mathrm{out}}]] を見る。この三つの項のどれかを0にした変化を考えてみよう。'],
  ['ryota','また三種類増えるの？　さっきの三つと合わせて六種類？'],
  ['owl','慌てるな。まず [[Q_{\\mathrm{in}}=0]]、つまり熱の出入りがない変化を断熱変化と呼ぶ。これは状態方程式の三種類にはなかったから、新しく加わる。'],
  ['ryota','じゃあ [[\\Delta U=0]] は？'],
  ['owl','理想気体の内部エネルギーは温度だけで決まったな。だから [[\\Delta U=0]] なら温度変化も0。これはさっきの等温変化と同じだ。'],
  ['ryota','残りの [[W_{\\mathrm{out}}=0]] は、気体が仕事をしない変化か。'],
  ['owl','気体の体積が変わらなければ、ピストンを動かさないので仕事は0になる。つまり定積変化と重なる。だから新しく増えるのは断熱変化だけだ。'],
  ['ryota','状態方程式から三つ、第一法則から重ならない一つを足して、定圧・定積・等温・断熱の四つになるんだね。']
 ];
 const summaryTurns=[
  ['owl','四つを見分けたら、あとは第一法則のどの項が0になるかを見る。定積では仕事が0、等温では内部エネルギー変化が0、断熱では熱が0だ。'],
  ['ryota','定圧変化だけは、第一法則の項を0にするわけではないんだ。'],
  ['owl','その通り。定圧変化では、加えた熱が内部エネルギーの増加と、膨張して外へする仕事の両方に分かれる。ここからは、四つを具体的な装置と分子の動きで一つずつ見ていくぞ。']
 ];
 const isobaricTurns=[
  ['ryota','定圧変化って、上から押さえつけて圧力を固定する感じ？　名前だけだと、動けないように固めているイメージがある。'],
  ['owl','逆だ。ピストンは自由に動けるようにしておく。上に同じ重りを載せておけば、気体が押し返す相手の圧力、つまり外圧はほぼ一定だ。'],
  ['ryota','下から熱を加えると分子が速くなって、最初は内側からピストンを強く押す。だからピストンが上がるのか。'],
  ['owl','そうだ。ピストンが少し上がると体積が増え、分子が壁へ衝突する密度が下がる。やがて内圧と外圧が再びつり合う。だから圧力はほぼ同じまま、体積が増える。'],
  ['ryota','でも、勢いよく熱したらピストンが跳ねて、ずっとつり合ってはいないよね。'],
  ['owl','いいところに気づいたな。そこで、ほんの少し熱してはつり合い、また少し熱してはつり合うほどゆっくり進める。このように、つり合いに近い状態を順番に通る変化を「準静的過程」という。'],
  ['owl','数式では [[p=\\mathrm{一定}]] だから [[V/T=\\mathrm{一定}]]。第一法則では、受け取った熱は温度を上げる分だけでなく、ピストンを持ち上げる仕事にも使われる。']
 ];
 const isochoricTurns=[
  ['owl','次はピストンを固定して、容器の体積を変えられなくする。これが定積変化だ。'],
  ['ryota','同じ広さの中で温度を上げたら、分子の速さが上がる。壁までの距離は同じだから、強く、何度もぶつかって圧力が上がりそう。'],
  ['owl','その分子のイメージで正解だ。状態方程式でも [[V=\\mathrm{一定}]] だから、[[p/T=\\mathrm{一定}]]。温度を上げれば圧力も上がる。'],
  ['ryota','ピストンが動かないなら、気体は外へ仕事をしないね。'],
  ['owl','だから [[W_{\\mathrm{out}}=0]]。第一法則は [[Q_{\\mathrm{in}}=\\Delta U]] になり、加えた熱はすべて内部エネルギーの増加に回る。密閉された硬い容器を温める状況が近い。ただし実際には圧力が上がるから、むやみに加熱するなよ。']
 ];
 const isothermalTurns=[
  ['ryota','等温変化は温度が一定なんだよね。それなら、熱は出入りしていないんじゃないの？'],
  ['owl','そこがよくある勘違いだ。水槽に蛇口から水を入れながら、同じ量を排水口から流したら、水は動いていても水位は変わらないだろ。一定なのは「中にある量」であって、出入りがないわけではない。'],
  ['ryota','気体も同じで、熱を受け取りながら、同じ分だけピストンを押す仕事として外へ出せばいい。内部エネルギーが増えないから、温度も一定に保てるんだね。'],
  ['owl','そうだ。大きな水槽のような熱浴に触れさせ、ピストンを非常にゆっくり動かすと、必要な熱が周囲から出入りして温度を保ちやすい。[[\\Delta U=0]] だから [[Q_{\\mathrm{in}}=W_{\\mathrm{out}}]] だ。'],
  ['ryota','分子の速さは同じままなのに、体積が増えたら壁まで遠くなる。単位時間あたりの衝突が減るから、圧力が下がるんだね。'],
  ['owl','状態方程式でも [[T=\\mathrm{一定}]] だから [[pV=\\mathrm{一定}]]。体積が増えた分だけ圧力は下がる。分子像と数式が同じ結論を出している。']
 ];
 const adiabaticTurns=[
  ['owl','最後は断熱変化だ。断熱材で囲むか、熱が移動する暇もないほど素早く変化させて、外との熱のやり取りをほぼ0にする。'],
  ['ryota','「断熱」って、温度が変わらないことじゃないの？'],
  ['owl','むしろ温度は変わる。断熱圧縮では、外からピストンを押して気体に仕事を与える。そのエネルギーの逃げ道がないから、内部エネルギーが増えて温度が上がる。'],
  ['ryota','狭いところへ押し込むだけじゃなく、ピストンから何度も押し返されて分子の速さも上がる。だから図の中の分子が熱そうなんだ。'],
  ['owl','その通り。熱の流入は [[Q_{\\mathrm{in}}=0]]。圧縮では外部がした仕事 [[W_{\\mathrm{in}}]] の分だけ [[\\Delta U]] が増えるので、[[\\Delta U=W_{\\mathrm{in}}]] と読める。'],
  ['ryota','自転車の空気入れを素早く押すと筒が温かくなるのも、これに近い？'],
  ['owl','よい具体例だ。ディーゼルエンジンも、空気を強く断熱圧縮して高温にする性質を利用している。断熱とは「熱が出入りしない」であって、「温度が変わらない」ではないぞ。']
 ];
 const engineBridgeTurns=[
  ['owl','これで、熱を加えて膨張させる変化、仕事を与えて圧縮する変化、温度を保つ変化、熱を出入りさせない変化がそろった。'],
  ['ryota','この四つは、別々の現象として覚えるだけじゃないんだ。'],
  ['owl','そうだ。これらの状態変化をうまく組み合わせ、気体を元の状態まで一周させながら、受け取った熱の一部を外への仕事として取り出す。そんな装置が「熱機関」だ。'],
  ['ryota','熱を受け取って終わりじゃなくて、気体を何度も使えるように元へ戻しながら、仕事を取り出す仕組みを考えるわけか。'],
  ['owl','その通り。次は、どのような一周をつくれば仕事を取り出せるのか、そして受け取った熱をどれだけ仕事に変えられるのかを考えていこう。']
 ];
 return <section className="thermodynamics-first-law-lesson thermodynamics-state-changes-lesson">
  <header className="first-law-intro"><span>FOUR GAS PROCESSES</span><h2>二つの基本式から、四つの状態変化を見つける。</h2><p>名前を暗記する前に、何を一定にし、何を0にした変化なのかを整理する。</p></header>
  <section className="first-law-step"><StepHeader number="1" kicker="FROM THE EQUATION OF STATE" title="p・V・Tを、一つずつ一定にする">状態方程式から、最初の三つを見つける。</StepHeader><StateEquationMap/><Dialogue turns={equationTurns}/></section>
  <section className="first-law-step alternate"><StepHeader number="2" kicker="FROM THE FIRST LAW" title="熱・内部エネルギー・仕事を、一つずつ0にする">重複を除くと、断熱変化だけが新しく加わる。</StepHeader><FirstLawZeroMap/><Dialogue turns={zeroTurns}/></section>
  <section className="first-law-step"><StepHeader number="3" kicker="FOUR PROCESSES" title="四つの状態変化を、第一法則で比べる">定圧・定積・等温・断熱を一枚にまとめる。</StepHeader><ProcessSummary/><Dialogue turns={summaryTurns}/></section>
  <section className="first-law-step alternate process-detail-section"><StepHeader number="4" kicker="ISOBARIC PROCESS" title="定圧変化──自由に動くから、圧力を保てる">一定の重りを載せたピストンを、ゆっくり加熱する。</StepHeader><ProcessDeepDive image={isobaricImage} alt="一定の重りを載せた自由なピストンが、加熱された気体に押されて上昇する定圧変化" tag="具体例" example="一定の重りを載せた、自由に動くピストン" formulae={[["条件","p=\\mathrm{一定}"],["状態方程式","\\dfrac{V}{T}=\\mathrm{一定}"],["第一法則","Q_{\\mathrm{in}}=\\Delta U+W_{\\mathrm{out}}"]]}><Dialogue turns={isobaricTurns}/></ProcessDeepDive></section>
  <section className="first-law-step process-detail-section"><StepHeader number="5" kicker="ISOCHORIC PROCESS" title="定積変化──逃げ場がなければ、圧力が上がる">ピストンを固定し、同じ体積のまま加熱する。</StepHeader><ProcessDeepDive image={isochoricImage} alt="固定具で動かないピストンの中で、加熱により速く動く分子が壁へ衝突する定積変化" tag="具体例" example="密閉された硬い容器を加熱する" formulae={[["条件","V=\\mathrm{一定}"],["状態方程式","\\dfrac{p}{T}=\\mathrm{一定}"],["第一法則","Q_{\\mathrm{in}}=\\Delta U"]]}><Dialogue turns={isochoricTurns}/></ProcessDeepDive></section>
  <section className="first-law-step alternate process-detail-section"><StepHeader number="6" kicker="ISOTHERMAL PROCESS" title="等温変化──熱は入るが、温度は変えない">熱浴に触れた気体を、ゆっくり膨張させる。</StepHeader><ProcessDeepDive image={isothermalImage} alt="大きな水槽に浸したピストンがゆっくり上がり、温度を一定に保ちながら膨張する等温変化" tag="具体例" example="大きな熱浴に触れた気体を、ゆっくり膨張させる" formulae={[["条件","T=\\mathrm{一定}"],["状態方程式","pV=\\mathrm{一定}"],["第一法則","Q_{\\mathrm{in}}=W_{\\mathrm{out}}"]]}><Dialogue turns={isothermalTurns}/></ProcessDeepDive></section>
  <section className="first-law-step process-detail-section"><StepHeader number="7" kicker="ADIABATIC PROCESS" title="断熱変化──熱ではなく、仕事で温度が変わる">熱を逃がさず、ピストンを素早く押し込む。</StepHeader><ProcessDeepDive image={adiabaticImage} alt="断熱材に囲まれたシリンダーのピストンを素早く押し込み、分子運動が激しくなる断熱圧縮" tag="具体例" example="自転車の空気入れを、素早く押し込む" formulae={[["条件","Q_{\\mathrm{in}}=0"],["断熱圧縮","\\Delta U=W_{\\mathrm{in}}"],["分子の変化","V\\downarrow\\quad T\\uparrow\\quad p\\uparrow"]]}><Dialogue turns={adiabaticTurns}/></ProcessDeepDive></section>
  <section className="state-engine-bridge">
   <span>NEXT DISCOVERY</span>
   <h3>四つの変化を組み合わせて、熱から仕事を取り出す。</h3>
   <div className="state-engine-flow" aria-label="状態変化を一周させて熱機関をつくる流れ">
    <div><small>熱を受け取る</small><MathFormula expression="Q_{\mathrm{in}}" display/></div>
    <b aria-hidden="true">→</b>
    <div><small>状態変化を組み合わせる</small><strong>一周して元の状態へ</strong></div>
    <b aria-hidden="true">→</b>
    <div><small>仕事を取り出す</small><MathFormula expression="W_{\mathrm{net}}" display/></div>
   </div>
   <Dialogue turns={engineBridgeTurns}/>
  </section>
 </section>;
}
