import React from 'react';
import MathFormula from './MathFormula';
import SotaCharacter from './SotaCharacter';
import joulePaddleWheel from './assets/joule-paddle-wheel-ai.png';
import gasExpansionCompression from './assets/gas-expansion-compression-ai.png';
import firstLawPistonEngine from './assets/first-law-piston-engine-ai.png';
import industrialSteamEngine from './assets/industrial-revolution-steam-engine-ai.png';
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

function JouleExperiment(){
 return <figure className="joule-experiment-ai">
  <img src={joulePaddleWheel} alt="落下するおもりが回転軸を動かし、水中の羽根車を回転させて水の温度を上げるジュールの実験"/>
  <div className="joule-energy-overlay">
   <small>内部エネルギーの増加</small>
   <MathFormula expression="\boxed{\Delta U=Q_{\mathrm{in}}+W_{\mathrm{in}}}" display/>
   <div className="joule-inputs">
    <span><MathFormula expression="Q_{\mathrm{in}}"/><b>熱を加える</b></span>
    <em>＋</em>
    <span><MathFormula expression="W_{\mathrm{in}}"/><b>仕事を与える</b></span>
   </div>
   <p>どちらも物体の中へ入るエネルギー</p>
  </div>
  <figcaption><strong>ジュールの羽根車の実験</strong><span>おもりの落下による仕事で水をかき混ぜると、内部エネルギーが増えて温度が上がる。</span></figcaption>
 </figure>;
}

function FirstLawBalance(){
 return <figure className="first-law-balance-visual">
  <div className="first-law-visual-stage">
   <img src={firstLawPistonEngine} alt="熱を受け取った気体の分子運動が激しくなり、膨張する気体がピストンを押してフライホイールを回す熱機関"/>
   <div className="first-law-visual-label heat"><small>熱として入る</small><MathFormula expression="Q_{\mathrm{in}}"/><span>熱源から気体へ</span></div>
   <div className="first-law-visual-label internal"><small>気体の中に残る</small><MathFormula expression="\Delta U"/><span>分子運動が激しくなる</span></div>
   <div className="first-law-visual-label work"><small>仕事として出る</small><MathFormula expression="W_{\mathrm{out}}"/><span>ピストンが機械を動かす</span></div>
  </div>
  <figcaption className="energy-flow-caption">
   <small>エネルギーの流れ</small>
   <div className="energy-flow-equation">
    <span><MathFormula expression="Q_{\mathrm{in}}"/><em>受け取った熱</em></span>
    <b aria-hidden="true">→</b>
    <span><MathFormula expression="\Delta U"/><em>内部に残る</em></span>
    <i aria-hidden="true">＋</i>
    <span><MathFormula expression="W_{\mathrm{out}}"/><em>仕事として外へ</em></span>
   </div>
  </figcaption>
 </figure>;
}

function SteamEngineVisual(){
 return <figure className="steam-engine-visual">
  <img src={industrialSteamEngine} alt="石炭炉で水を熱し、蒸気でピストンと大きなフライホイールを動かす産業革命期の熱機関"/>
  <figcaption><strong>石炭の熱を、機械を動かす仕事へ。</strong><span>石炭炉で生まれた蒸気がピストンを押し、フライホイールを回して工場の機械を動かす。</span></figcaption>
 </figure>;
}

function AirWorkVisual(){
 return <figure className="air-work-visual">
  <img src={gasExpansionCompression} alt="ピストンでフラスコ内の空気を膨張させて白い霧をつくる実験と、空気入れでタイヤの空気を圧縮して温める実験"/>
  <figcaption>
   <div><strong>気体が膨張する</strong><span>温度が下がり、水蒸気の一部が水滴になる</span><MathFormula expression="W_{\mathrm{out}}>0\quad\Rightarrow\quad\Delta U<0"/></div>
   <div><strong>気体を圧縮する</strong><span>外から仕事を受け取り、温度が上がる</span><MathFormula expression="W_{\mathrm{in}}>0\quad\Rightarrow\quad\Delta U>0"/></div>
  </figcaption>
 </figure>;
}

export default function ThermodynamicsFirstLawLesson(){
 const waterWorkTurns=[
  ['owl','前のページでは、気体の内部エネルギーを分子の運動から求めたな。では、その内部エネルギーを増やすにはどうすればいいと思う？'],
  ['ryota','そんなの簡単だよ。火で温めればいいんでしょ？'],
  ['owl','もちろんだ。では、寒いときに両手をこすり合わせると温かくなるのはなぜだ？'],
  ['ryota','摩擦で熱くなるからでしょ。当たり前じゃん。'],
  ['owl','まあな、今なら「動かせば摩擦で熱くなるなんて当たり前」に思える。でも当時は、熱が何なのかさえ分かっていなかった。ジュールは、おもりを落として水をかき混ぜ、した仕事の量と水の温度上昇を精密に測ることで、その“当たり前”を実験で確かめたんだ。'],
  ['ryota','へえ！ 水をかき混ぜるだけでも温かくなるんだ。'],
  ['owl','そういうことだ。水へ仕事を与えることで、水の内部エネルギーを増やせると実験で示したわけだな。']
 ];
 const airWorkTurns=[
  ['ryota','でも、今のは手や水の話でしょ？ 気体に仕事をするって、どういうこと？ 気体をこするの？'],
  ['owl','気体をどうやってこするんだ。気体では、体積を変えることで仕事をやり取りできる。まずは、気体を膨張させる場合から見てみよう。'],
  ['owl','中学理科で、密閉したフラスコにつないだピストンを引き、フラスコ内に白い霧をつくる実験をしなかったか？'],
  ['ryota','圧力を下げると、急に白くなるやつ？　ほとんど覚えていないけど。'],
  ['owl','ピストンを引くと、中の空気が膨張してピストンを押す。つまり気体が外へ仕事 [[W_{\\mathrm{out}}]] をする。その分だけ気体の内部エネルギーが減って温度が下がり、水蒸気の一部が細かな水滴へ変わる。それが白い霧だ。'],
  ['ryota','空気が膨張すると、仕事をした分だけ冷えるんだ。では反対に押し縮めたら？'],
  ['owl','今度は外部が気体へ仕事 [[W_{\\mathrm{in}}]] をする。自転車のタイヤへ空気を入れるとき、ピストンで空気を素早く圧縮すると、空気入れの筒が温かくなることがあるだろう？'],
  ['ryota','何回もシュコシュコ押していると、確かに温かくなるね。'],
  ['owl','圧縮では仕事を受け取って内部エネルギーが増え、膨張では仕事をして内部エネルギーが減る。熱を直接加えなくても、仕事によって気体の温度を変えられるんだ。'],
  ['ryota','なるほど！ 熱を加えても、仕事をしても、内部エネルギーは増えるんだね。'],
  ['owl','そうだ。ただし膨張して外へ仕事をしたときは、内部エネルギーが減る場合もある。この熱と仕事と内部エネルギーの関係を、次の蒸気機関で一つの式にまとめていくぞ。']
 ];

 const engineLawTurns=[
  ['owl','熱力学が大きく発展した出発点は、産業革命の蒸気機関だ。石炭を燃やして熱を入れ、そのエネルギーから機械を動かす仕事を取り出したかったんだ。'],
  ['ryota','熱でお湯を沸かして、それで機械が動くの？'],
  ['owl','水を熱して蒸気をつくり、膨張する蒸気でピストンを押す。その往復運動でポンプや工場の機械、のちには車輪を動かした。これが蒸気機関だ。'],
  ['ryota','要は、お湯が沸いたときに蒸気が鍋のふたを持ち上げる、あの感じ？'],
  ['owl','その通りだ。蒸気がふたを押し上げる現象を、もっと強力にして、同じ動きを何度も繰り返せる機械にしたと考えればいい。鍋のふたの代わりがピストンだ。'],
  ['ryota','つまり、石炭から熱 [[Q_{\\mathrm{in}}]] を受け取り、蒸気がピストンを押して仕事 [[W_{\\mathrm{out}}]] をする。熱を仕事へ変える機械なんだね。'],
  ['owl','そうだ。だから当時の大きな問いは、「入れた熱 [[Q_{\\mathrm{in}}]] から、どれだけの仕事 [[W_{\\mathrm{out}}]] を取り出せるのか」だった。'],
  ['ryota','じゃあ、受け取った熱が全部そのまま仕事になるの？'],
  ['owl','そう都合よくはいかない。ピストンが動く前に、水や蒸気の温度が上がり、ボイラーも温まる。受け取った熱の一部は、装置の内部エネルギーを増やす分 [[\\Delta U]] として残るんだ。'],
  ['ryota','熱の行き先は、「内部に残る分」と「外へ仕事として出る分」の二つなんだ。'],
  ['owl','その通り。だからエネルギーの帳簿は [[Q_{\\mathrm{in}}=\\Delta U+W_{\\mathrm{out}}]] となる。「入ってきた熱＝内部に残った分＋外へ取り出した仕事」だ。これが熱力学第一法則の、このページで使う形だ。'],
  ['ryota','最初に出てきた [[W_{\\mathrm{in}}]] と、今の [[W_{\\mathrm{out}}]] は何が違うの？'],
  ['owl','仕事の向きだ。[[W_{\\mathrm{in}}]] は外部が気体へ与える仕事、[[W_{\\mathrm{out}}]] は気体が外部へする仕事だ。同じ境界を反対向きに見るので、[[W_{\\mathrm{in}}=-W_{\\mathrm{out}}]] となる。蒸気機関では、気体から仕事を取り出したいから [[W_{\\mathrm{out}}]] を使う方が話を追いやすい。'],
  ['ryota','なるほど。同じ「仕事」でも、気体から見てエネルギーが入ってくるなら [[W_{\\mathrm{in}}]]、外へ出ていくなら [[W_{\\mathrm{out}}]] と分けているんだね。蒸気機関では、外へ取り出せる仕事の方を知りたいわけだ。'],
  ['owl','そうだ。熱からどれだけ仕事を取り出せるのか、もっとよい熱機関をどう作るのか。その問いが、熱力学を大きく発展させた。']
 ];
 const nextTurns=[
  ['owl','ここまでで、熱・仕事・内部エネルギーを一つの式で数えられるようになった。次はこの第一法則を、気体の具体的な変化へ使っていくぞ。'],
  ['ryota','定積変化とか定圧変化とか、名前がたくさん出てくるところ？'],
  ['owl','そうだ。体積・圧力・温度のうち何を一定にするかで、熱が内部エネルギーと仕事へどう分かれるかが変わる。等温変化や断熱変化も、同じエネルギーの帳簿で比べれば整理できる。']
 ];
 return <section className="thermodynamics-first-law-lesson">
  <header className="first-law-intro"><span>HEAT, WORK & ENERGY</span><h2>熱と仕事を、同じエネルギーの帳簿で数える。</h2><p>仕事による温度上昇から、熱力学第一法則までを一つにつなぐ。</p></header>
  <section className="first-law-step"><StepHeader number="1" kicker="WORK ON WATER" title="水へ仕事をすると、内部エネルギーが増える">ジュールの羽根車で、仕事と温度上昇を結びつける。</StepHeader><JouleExperiment/><Dialogue turns={waterWorkTurns}/></section>
  <section className="first-law-step alternate"><StepHeader number="2" kicker="WORK ON A GAS" title="気体の圧縮と膨張でも、温度が変わる">気体が仕事を受け取る場合と、外へ仕事をする場合を比べる。</StepHeader><AirWorkVisual/><Dialogue turns={airWorkTurns}/></section>
  <section className="first-law-step"><StepHeader number="3" kicker="INDUSTRIAL REVOLUTION & THE FIRST LAW" title="蒸気機関の発明">入れた熱から、どれだけの仕事を取り出せるのか。</StepHeader><SteamEngineVisual/><Dialogue turns={engineLawTurns}/><FirstLawBalance/></section>
  <section className="first-law-step alternate"><StepHeader number="4" kicker="NEXT: GAS PROCESSES" title="第一法則を、さまざまな状態変化へ">何を一定にするかで、熱・内部エネルギー・仕事の分かれ方が変わる。</StepHeader><Dialogue turns={nextTurns}/></section>
  <div className="first-law-takeaway"><small>このページの原理原則</small><MathFormula expression="\boxed{Q_{\mathrm{in}}=\Delta U+W_{\mathrm{out}}}" display/><p>熱は「蓄えられた物質」ではなく、仕事と同じくエネルギーが移動する方法。物体の中に蓄えられるのは内部エネルギーである。</p></div>
 </section>;
}
