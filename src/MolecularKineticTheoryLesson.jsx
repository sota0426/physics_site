import React, {useState} from 'react';
import MathFormula from './MathFormula';
import SotaCharacter from './SotaCharacter';
import './molecular-kinetic-theory.css';

function RichText({children}){
 const parts=String(children).split(/(\[\[[^\]]+\]\])/g);
 return parts.map((part,index)=>part.startsWith('[[')&&part.endsWith(']]')?<MathFormula key={index} expression={part.slice(2,-2)}/>:part);
}

function Dialogue({turns}){
 return <div className="concept-dialogue-list kinetic-dialogue">{turns.map(([speaker,text],index)=><div className={`concept-dialogue-turn ${speaker} ${speaker==='owl'?'strong':''}`} key={index}>{speaker==='owl'?<img src="/assets/vector-owl.png" alt="案内役のフクロウ"/>:<SotaCharacter/>}<div><p><RichText>{text}</RichText></p></div></div>)}</div>;
}

function StepHeader({number,kicker,title,children}){
 return <header className="kinetic-step-header"><b>{number}</b><div><span>{kicker}</span><h3>{title}</h3>{children&&<p>{children}</p>}</div></header>;
}

function MacroMicroBridge(){
 return <div className="macro-micro-bridge"><section><small>目に見える世界</small><h4>圧力・体積・温度</h4><MathFormula expression="pV=nRT" display/><p>状態の変化は計算できる。</p></section><i>でも、なぜ？</i><section><small>分子の世界</small><h4>個数・質量・速さ</h4><MathFormula expression="N,\ m,\ \overline{v^2}" display/><p>目に見える量の正体を説明する。</p></section></div>;
}

function BoltzmannProfile(){
 return <div className="boltzmann-profile"><div className="boltzmann-portrait" aria-label="ルートヴィヒ・ボルツマンをイメージした肖像"><span className="portrait-hair"/><span className="portrait-face"/><span className="portrait-beard"/><span className="portrait-coat"/></div><div className="boltzmann-copy"><span>1844–1906 / AUSTRIA</span><h4>ルートヴィヒ・ボルツマン</h4><p>無数の分子を一個ずつ追う代わりに、平均と確率で物質全体を説明する「統計力学」を築いた物理学者。</p><div><b>すごいところ</b><p>見えない原子・分子の運動と、圧力・温度・エントロピーのような目に見える量を結びつけた。</p></div><div className="quirk"><b>ちょっと変わったところ</b><p>原子の存在を疑う研究者が多い時代に、見えない粒を前提に激しく議論した。理論家なのに実験も得意で、大学も何度も移った。墓石には、本人がこの形で書いたわけではない式 <MathFormula expression="S=k\log W"/> まで刻まれている。</p></div></div></div>;
}

function AssumptionTriptych(){
 return <figure className="assumption-triptych"><img src="/assets/kinetic-assumptions-triptych-ai-v2.png" alt="単原子には丸、二原子分子と重力にはバツを付け、弾性衝突を示した三つの説明図"/><figcaption><span><b>① 単原子の理想気体</b>単原子は○。回転・振動する二原子分子は今回は考えない</span><span><b>② 弾性衝突</b>壁で跳ね返る前後で速さは同じ</span><span><b>③ 重力を無視</b>下向きの重力は×。衝突の間は等速直線運動</span></figcaption></figure>;
}

function ElasticCollisionNote(){
 return <aside className="elastic-collision-note"><small>小さな補足</small><div><b>なぜ弾性衝突と考えてよい？</b><p>衝突のたびに原子が速さを失うだけなら、密閉した気体はやがて止まり、圧力も消えるはず。しかし熱平衡の気体は勝手に止まらない。そこで、壁とのエネルギーのやり取りは平均するとつり合うと考える。</p></div></aside>;
}

function ProofRoadmap(){
 const stages=[
  ['① まず単純化','多数の粒子の三次元運動から、一粒子の一次元運動だけを取り出す'],
  ['② 一回の衝突','衝突前後の運動量変化から、壁が受け取る力積を求める'],
  ['③ 平均の力','力積を次の衝突までの時間で割り、壁が受ける平均の力にする'],
  ['④ 気体の圧力','全粒子の力を足し、壁の面積で割って圧力にする']
 ];
 return <figure className="proof-roadmap"><img src="/assets/kinetic-proof-roadmap-ai.png" alt="多数の分子の三次元運動を一粒子の一次元運動へ単純化し、衝突、平均の力、圧力へ進む流れ"/><figcaption>{stages.map(([title,text])=><span key={title}><b>{title}</b>{text}</span>)}</figcaption></figure>;
}

function ImpulseDialogueQuiz(){
 const questions=[
  {
   owl:'質量 [[m]] の粒子が、右向きの速度 [[+v_x]] で壁へ進み、左向きの [[-v_x]] で跳ね返った。粒子が壁から受けた力積は？',
   choices:[
    '速さは同じだから、力積は [[0]] かな。',
    '運動量は [[+mv_x]] から [[-mv_x]]。だから [[I_{粒子}=-2mv_x]] だ。',
    '向きだけ変わるから、[[I_{粒子}=-mv_x]] だと思う。'
   ],
   correct:1,
   feedback:'力積は運動量の変化に等しい。右向きを正とすると、[[I_{粒子}=(-mv_x)-(+mv_x)=-2mv_x]] だ。'
  },
  {
   owl:'では反対に、壁が粒子から受ける力積の「大きさ」は、粒子が壁から受けたものと比べてどうなる？',
   choices:[
    '粒子が受ける力積と同じ大きさになる。',
    '重い壁の方が、大きな力積を受ける。',
    '壁はほとんど動かないから、受ける力積は小さい。'
   ],
   correct:0,
   feedback:'壁はほとんど動かなくても、受ける力積が小さいわけではない。粒子と壁が受ける力積は、同じ大きさで向きが反対だ。'
  },
  {
   owl:'二つの力積が「同じ大きさで反対向き」と言い切れるのは、どの法則があるからだ？',
   choices:[
    '作用・反作用の法則。粒子と壁が及ぼし合う力は、同じ大きさで反対向きだから。',
    '慣性の法則。動いている粒子は、そのまま動き続けるから。',
    '力学的エネルギー保存則。速さが変わらないから。'
   ],
   correct:0,
   feedback:'作用・反作用の二つの力は同じ時間だけ働く。だから、その力を時間で積み重ねた力積も同じ大きさで反対向きになる。'
  }
 ];
 const [answers,setAnswers]=useState([]);
 const [step,setStep]=useState(0);
 const finished=step===questions.length;
 const visibleQuestions=questions.slice(0,finished?questions.length:step+1);
 const choose=(questionIndex,choiceIndex)=>{
  if(questionIndex!==step||answers[questionIndex]!==undefined||finished)return;
  setAnswers(previous=>{const next=[...previous];next[questionIndex]=choiceIndex;return next;});
 };
 const next=()=>setStep(previous=>previous+1);
 const restart=()=>{setAnswers([]);setStep(0);};
 return <div className="impulse-dialogue-quiz">
  <figure className="impulse-collision-figure"><div className="impulse-figure-canvas"><img src="/assets/particle-wall-collision-quiz-ai.png" alt="質量mの粒子が速さvで右側の壁へ衝突し、同じ速さで反対向きに跳ね返る図"/><span className="figure-goal">壁が受ける力積を求める</span><span className="figure-mass"><b>質量</b><MathFormula expression="m"/></span><span className="figure-speed before"><b>衝突前の速さ</b><MathFormula expression="+v_x"/></span><span className="figure-speed after"><b>衝突後の速さ</b><MathFormula expression="-v_x"/></span></div></figure>
  <div className="concept-dialogue-turn owl strong impulse-intro"><img src="/assets/vector-owl.png" alt="案内役のフクロウ"/><div><p>ではここから、クイズ形式で話を進めていこうじゃないか。リョウタなら何と答えるか、セリフを選んでみろ。</p></div></div>
  <div className="impulse-history">{visibleQuestions.map((question,questionIndex)=>{const selected=answers[questionIndex];const answered=selected!==undefined;const active=questionIndex===step&&!finished;return <section className="impulse-exchange" key={question.owl}><div className="impulse-question-number">【質問{questionIndex+1}】</div><div className="concept-dialogue-turn owl strong impulse-question"><img src="/assets/vector-owl.png" alt="案内役のフクロウ"/><div><p><RichText>{question.owl}</RichText></p></div></div><div className="concept-dialogue-turn ryota impulse-choices"><SotaCharacter/><div><b className="choice-prompt">リョウタのセリフを選ぼう</b>{question.choices.map((choice,index)=>{const state=answered?(index===question.correct?'correct':index===selected?'wrong':'muted'):'';return <button className={state} type="button" onClick={()=>choose(questionIndex,index)} disabled={!active||answered} key={choice}><RichText>{choice}</RichText></button>})}</div></div>{answered&&<div className="impulse-feedback"><img src="/assets/vector-owl.png" alt=""/><p><RichText>{question.feedback}</RichText></p>{active&&<button type="button" onClick={next}>{questionIndex===questions.length-1?'結論を見る':'次の問いへ'}</button>}</div>}</section>})}</div>
  {finished&&<div className="impulse-final"><small>壁が粒子から受ける力積の大きさ</small><MathFormula expression="I_{壁}=2mv_x" display/><p>粒子が受ける力積と同じ大きさで、向きは反対。これは作用・反作用の法則から言える。</p><button type="button" onClick={restart}>もう一度考える</button></div>}
 </div>;
}

function CollisionCountQuiz(){
 const questions=[
  {
   owl:'粒子の速さを [[v_x]] で何往復もしているとする。[[Δt]] 秒間に進む、粒子の総移動距離はいくらだ？',
   choices:['速さ×時間だから、[[v_xΔt]]。','往復するから、[[2Lv_xΔt]]。','時間で割って、[[\\frac{v_x}{Δt}]]。'],
   correct:0,
   feedback:'途中で何度向きが変わっても、速さは [[v_x]] のまま。したがって総移動距離は [[v_xΔt]] だ。'
  },
  {
   owl:'同じ右側の壁へもう一度ぶつかるには、左の壁まで行って戻る。総移動距離は[[v_xΔt]] で、1回ぶんの往復距離は [[2L]] だ。では、[[Δt]] 秒間に右壁へ衝突する回数は？',
   choices:['総移動距離を [[L]] で割って、[[\\frac{v_xΔt}{L}]]。','総移動距離を [[2L]] で割って、[[\\frac{v_xΔt}{2L}]]。','往復距離を総移動距離で割って、[[\\frac{2L}{v_xΔt}]]。'],
   correct:1,
   feedback:'衝突回数は「総移動距離÷1往復の距離」だから、[[n_{衝突}=\\frac{v_xΔt}{2L}]] となる。'
  }
 ];
 const [answers,setAnswers]=useState([]);
 const [step,setStep]=useState(0);
 const finished=step===questions.length;
 const visibleQuestions=questions.slice(0,finished?questions.length:step+1);
 const choose=(questionIndex,choiceIndex)=>{
  if(questionIndex!==step||answers[questionIndex]!==undefined||finished)return;
  setAnswers(previous=>{const next=[...previous];next[questionIndex]=choiceIndex;return next;});
 };
 const next=()=>setStep(previous=>previous+1);
 const restart=()=>{setAnswers([]);setStep(0);};
 return <div className="collision-count-quiz">
  <figure className="count-collision-figure"><div className="count-figure-canvas"><img src="/assets/repeated-wall-collisions-ai.png" alt="同じ粒子が距離Lの区間を何度も往復し、右側の壁へ繰り返し衝突する図"/><span className="count-goal">Δt 秒間の衝突回数を求める</span><span className="count-length"><b>壁の間隔</b><MathFormula expression="L"/></span><span className="count-speed"><b>粒子の速さ</b><MathFormula expression="v_x"/></span><span className="count-time"><b>観測時間</b><MathFormula expression="Δt"/></span></div></figure>
  <div className="concept-dialogue-turn owl strong count-intro"><img src="/assets/vector-owl.png" alt="案内役のフクロウ"/><div><p>ステップ2だ。今度は、決められた時間の中で同じ壁へ何回ぶつかるかを、二つの問いで求めるぞ。</p></div></div>
  <div className="impulse-history">{visibleQuestions.map((question,questionIndex)=>{const selected=answers[questionIndex];const answered=selected!==undefined;const active=questionIndex===step&&!finished;return <section className="impulse-exchange" key={question.owl}><div className="impulse-question-number">【質問{questionIndex+1}】</div><div className="concept-dialogue-turn owl strong impulse-question"><img src="/assets/vector-owl.png" alt="案内役のフクロウ"/><div><p><RichText>{question.owl}</RichText></p></div></div><div className="concept-dialogue-turn ryota impulse-choices"><SotaCharacter/><div><b className="choice-prompt">リョウタのセリフを選ぼう</b>{question.choices.map((choice,index)=>{const state=answered?(index===question.correct?'correct':index===selected?'wrong':'muted'):'';return <button className={state} type="button" onClick={()=>choose(questionIndex,index)} disabled={!active||answered} key={choice}><RichText>{choice}</RichText></button>})}</div></div>{answered&&<div className="impulse-feedback"><img src="/assets/vector-owl.png" alt=""/><p><RichText>{question.feedback}</RichText></p>{active&&<button type="button" onClick={next}>{questionIndex===questions.length-1?'結論を見る':'次の問いへ'}</button>}</div>}</section>})}</div>
  {finished&&<div className="impulse-final count-final"><small>Δt 秒間に、同じ壁へ衝突する回数</small><MathFormula expression="n_{衝突}=\frac{v_xΔt}{2L}" display/><p>総移動距離 <MathFormula expression="v_xΔt"/> を、1往復の距離 <MathFormula expression="2L"/> で割った。</p><button type="button" onClick={restart}>もう一度考える</button></div>}
 </div>;
}

function ForceTimeGraph(){
 return <figure className="force-time-graph"><svg viewBox="0 0 760 330" role="img" aria-label="衝突の瞬間に鋭いピークが現れる実際の力と、時間でならした平均の力を重ねたF-tグラフ"><defs><linearGradient id="average-force-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#d89a36" stopOpacity=".46"/><stop offset="1" stopColor="#d89a36" stopOpacity=".16"/></linearGradient></defs><line x1="66" y1="282" x2="728" y2="282" className="graph-axis"/><line x1="66" y1="282" x2="66" y2="34" className="graph-axis"/><path d="M66 282 L135 282 L145 64 L155 282 L276 282 L286 45 L296 282 L417 282 L427 72 L437 282 L558 282 L568 52 L578 282 L728 282" className="force-spikes"/><rect x="66" y="260" width="662" height="22" rx="4" fill="url(#average-force-fill)"/><line x1="66" y1="260" x2="728" y2="260" className="average-force-line"/><text x="32" y="39">F</text><text x="720" y="310">t</text><text x="82" y="251" className="average-label">平均の力</text><text x="120" y="88" className="spike-label">衝突の瞬間だけ大きな力</text><text x="580" y="279" className="quiet-label">ほぼ 0</text></svg><figcaption><span><b>実際の力</b>衝突時だけ鋭いピークが立つ</span><span><b>平均の力</b>同じ力積になるよう、時間全体へ長方形としてならす</span></figcaption></figure>;
}


function ProofGoal(){
 return <section className="kinetic-proof-goal"><header><h4>分子の運動から、圧力と温度を導く。</h4></header><div className="known-facts"><span><b>圧力</b>分子が壁へ衝突して生まれる</span><span><b>温度</b>分子の熱運動の激しさを表す</span></div><figure className="proof-goal-illustration"><img src="/assets/molecular-theory-goal-ai.png" alt="分子が容器の壁へ衝突し、圧力計と温度計の値として現れる様子"/></figure><div className="proof-target"><div><small>分子の世界</small><MathFormula expression="m,\ v" display/><span>質量と速度</span></div><i><b>力学で</b><strong>→</strong><b>説明する</b></i><div><small>目に見える世界</small><MathFormula expression="p,\ T" display/><span>圧力と温度</span></div></div></section>;
}

function ContainerModel(){
 const dots=[[18,24],[39,17],[68,24],[81,42],[27,55],[55,47],[75,69],[35,79],[61,82]];
 return <div className="kinetic-container-visual" aria-label="一辺Lの立方体容器内をN個の分子が飛び回る模型"><div className="kinetic-box"><span className="box-depth"/>{dots.map(([x,y],index)=><i key={index} style={{left:`${x}%`,top:`${y}%`}}/>)}<em className="axis-x">x</em><em className="axis-y">y</em><em className="axis-z">z</em><strong className="length-x">L</strong><strong className="length-y">L</strong><strong className="length-z">L</strong></div><div className="kinetic-model-labels"><span><MathFormula expression="V=L^3"/> 容器の体積</span><span><MathFormula expression="N"/> 分子の個数</span><span><MathFormula expression="m"/> 分子1個の質量</span></div></div>;
}

function CollisionVisual(){
 return <div className="collision-visual" aria-label="分子が右側の壁で弾性衝突する図"><div className="collision-lane"><span className="collision-wall-model">壁</span><i className="molecule-before"/><span className="velocity-before"><MathFormula expression="v_x"/></span><span className="velocity-after"><MathFormula expression="-v_x"/></span><span className="momentum-note before"><MathFormula expression="mv_x"/></span><span className="momentum-note after"><MathFormula expression="-mv_x"/></span></div><div className="collision-caption"><span>衝突前</span><b>弾性衝突</b><span>衝突後</span></div></div>;
}

function DirectionVisual(){
 return <div className="direction-visual" aria-label="分子速度をx、y、zの3方向へ分ける図"><div className="direction-axis"><i/><span className="dir-x"><MathFormula expression="v_x"/></span><span className="dir-y"><MathFormula expression="v_y"/></span><span className="dir-z"><MathFormula expression="v_z"/></span><strong><MathFormula expression="v"/></strong></div><div className="direction-equality"><MathFormula expression="\overline{v_x^2}=\overline{v_y^2}=\overline{v_z^2}=\frac13\overline{v^2}" display/><p>分子は特定の方向に偏らず、三方向へ同じように運動する。</p></div></div>;
}

function FormulaBridge(){
 return <section className="kinetic-formula-bridge"><div><small>分子の衝突から得た式</small><MathFormula expression="pV=\frac13Nm\overline{v^2}" display/></div><i>形を変える</i><div className="energy-form"><small>分子1個の平均運動エネルギーが見える</small><MathFormula expression="pV=\frac23N\left(\frac12m\overline{v^2}\right)" display/></div></section>;
}

export default function MolecularKineticTheoryLesson(){
 const introTurns=[
  ['ryota','状態方程式 [[pV=nRT]] があれば、圧力も体積も計算できるよね。わざわざ見えない分子まで考える必要ある？'],
  ['owl','式で温度や圧力が「どう変化するか」は分かっても、そもそも「なぜ圧力が生まれるのか」「温度とは何なのか」は説明できていない。このままでいいわけないだろ。'],
  ['ryota','ふうん。僕はテストで問題を解ければ、それでいいんだけど。'],
  ['owl','アホ、ボケ、カス。点を取った瞬間に全部忘れる気か。結局、あらゆる物質は原子や分子からできている。そして原子や分子も、質量をもち、速度をもって動く「物体」だ。ならば力学で扱えるはずだろう。'],
  ['ryota','確かに。ものすごく小さいだけで、質量と速度があるなら、今までの力学を使えるのか。'],
  ['owl','そうだ。この世界を細かく分けていった根っこにある粒の運動だけで、目に見える圧力や温度を説明しようとした物理学者がいた。ここからは公式を使う側ではなく、公式の意味をつくる側へ回るぞ。']
 ];
 const historyTurns=[
  ['ryota','でもその時代、原子を見た人はいないんでしょ。「世界の根っこは粒です」って、だいぶ強引じゃない？'],
  ['owl','その通り。当時は原子が本当に存在するのか、まだ決着していなかった。それでもボルツマンは「ある」と仮定して強行突破した。仮定から計算し、現実の法則を説明できるかで勝負したんだ。'],
  ['ryota','見つけてから理論を作ったんじゃなく、あると信じて先に計算したの？　攻めるなあ。'],
  ['owl','しかも一個一個の分子を追う無茶はしなかった。そんな数は追えるわけがないからな。大量の分子を平均と確率で扱う「統計」の考えを、力学へ持ち込んだ。'],
  ['ryota','一個の動きは分からなくても、集団なら予測できる。クラス全員の身長を、一人ずつ未来予知するんじゃなく平均で見る感じ？'],
  ['owl','たとえは雑だが発想は近い。分子の細かな違いを平均すれば、圧力や温度という安定した量が現れる。そこがボルツマンの本当にすごいところだ。']
 ];
 const premiseTurns=[
  ['ryota','計算を始める前に、どんな気体を考えるの？'],
  ['owl','ヘリウムやネオンのような「単原子の理想気体」だ。一つの粒子が一個の原子でできた、最も単純な気体だと思えばいい。'],
  ['ryota','単原子って聞き慣れないな。普通の酸素じゃだめなの？'],
  ['owl','酸素分子 [[O_2]] は二つの原子が結びついている。空間を移動するだけでなく、回転したり振動したりするから、そのぶん考える運動が増える。単原子なら、小さなボールが飛ぶ運動だけに集中できる。'],
  ['ryota','「理想気体」の理想って、都合よく単純にするってこと？'],
  ['owl','そうだ。原子自身の大きさと原子間の力を無視し、今回の計算では壁へ着くまで原子同士も衝突しないとする。衝突と衝突の間は、まっすぐ一定の速さで進む。'],
  ['ryota','壁にぶつかったら速さは落ちないの？'],
  ['owl','落ちないものとして、壁とは弾性衝突すると考える。速さは変わらず、壁に垂直な速度成分の向きだけが反転する。'],
  ['ryota','原子にも重力は働くよね？'],
  ['owl','働く。だが原子は非常に軽く、しかも高速だ。小さな容器を移動する短い時間なら、重力による速度変化は無視できる。全部、原子を小さなボールの単純な運動として計算するための準備だ。']
 ];
 const strategyTurns=[
  ['owl','計算へ入る前に、これから何をするのか、ゴールから逆向きにたどっておこう。'],
  ['ryota','ゴールは、分子の運動から気体の圧力を求めることだよね。'],
  ['owl','そうだ。圧力の定義は [[p=\\frac{F}{S}]]。圧力を求めるには、まず分子が壁へ与える力が必要になる。だが分子は壁をずっと押し続けているわけではない。ぶつかった一瞬だけ力を与える。'],
  ['ryota','一瞬の力なんて、どうやって求めるの？'],
  ['owl','そこで以前学んだ「運動量と力積」だ。直接力を求められなくても、衝突前後の運動量の変化から、物体が受けた力積を求められる。なかなか便利な考え方だろ？'],
  ['ryota','力積は [[I=FΔt]] だから、時間で割れば力になる。でも衝撃を与えている時間なんて、一瞬すぎて測れないでしょ。'],
  ['owl','衝突している一瞬の時間を測る必要はない。粒子は同じ壁へ何度もぶつかり、そのたびに力積を与える。そこで、ある程度長い時間に与えた力積の合計を、その時間で割る。すると壁が受ける平均の力になる。'],
  ['ryota','力を与えていない時間まで含めて割るの？　そんなのずるじゃん。'],
  ['owl','いいんだよ。アニメだって静止画を何枚も順番に見せると、連続して動いているように見えるだろ。気体も、ものすごい数の粒子が短い間隔で衝突するから、細かな「押す・押さない」をならして、ずっと平均の力を受けているように扱える。'],
  ['ryota','へえ。物理って、なんだか適当だな。'],
  ['owl','適当ではなく「見る時間の尺度を変えた」んだ。細かな変化を全部追わず、平均で全体を見る。まず式を立てて本質をつかみ、ずれが問題になるなら、もっと詳しい模型へ改善すればいい。'],
  ['ryota','つまり、力積の合計を時間で割って平均の力にし、その力を面積で割れば圧力になるんだ。'],
  ['owl','その通り。最後に、それを全粒子ぶんを足せばよい。'],
  ['ryota','でも、たくさんの分子を考えるのってとても難しそうだな。'],
  ['owl','だから最初は、無数の粒子の三次元運動から「一個の粒子」かつ「壁に垂直な一次元運動」だけを取り出す。そこで一回の衝突を解き、あとから粒子の数と三方向へ広げる。これが全体の作戦だ。'],
  ['ryota','どちらにせよ、難しそうだぜ。'],
 ];
 const momentumTurns=[
  ['ryota','壁で跳ね返ると、右向きの [[v_x]] が左向きの [[-v_x]] になるんだね。'],
  ['owl','そうだ。分子の運動量は [[mv_x]] から [[-mv_x]] へ変わる。だから分子の運動量変化は [[-2mv_x]]。'],
  ['ryota','マイナスは分子が左向きの運動量を受け取ったということ？'],
  ['owl','その通り。作用・反作用で、壁は反対向きに大きさ [[2mv_x]] の運動量を受け取る。壁を押す力の材料は、これだ。']
 ];
 const averageForceTurns=[
  ['ryota','ステップ1で、1回の衝突によって壁が受ける力積は [[2mv_x]]。ステップ2で、[[Δt]] 秒間の衝突回数は [[\\frac{v_xΔt}{2L}]] だったね。'],
  ['owl','その二つを掛ければ、[[Δt]] 秒間に壁が受ける力積の合計になる。[[I_{合計}=2mv_x×\\frac{v_xΔt}{2L}=\\frac{mv_x^2}{L}Δt]] だ。'],
  ['ryota','でも実際の力は、衝突の瞬間だけ大きくて、それ以外はほぼ0なんだよね。グラフにすると、かなりギザギザだ。'],
  ['owl','そうだ。だが、その複雑な力を一瞬ごとに追う必要はない。グラフの面積、つまり力積が同じになるように、時間全体へ長方形としてならす。これが平均の力だ。'],
  ['ryota','とがった山を全部まとめて、同じ面積の長方形に置き換えるんだ。'],
  ['owl','その通り。力積の定義式は「[[I=FΔt]]」だったよな。力積の合計を [[Δt]] で割れば、[[F_{平均}=\\frac{I_{合計}}{Δt}=\\frac{mv_x^2}{L}]]。複雑な衝突から、時間でならした平均の力を求められるわけだ。']
 ];
 const manyTurns=[
  ['ryota','でも実際には分子が大量にあるよ。全部の速度を足すの？'],
  ['owl','力は足せる。ただし速度そのものではなく、式に現れた [[v_x^2]] を足す。[[F=m/L(v_{1x}^2+v_{2x}^2+…+v_{Nx}^2)]] だ。'],
  ['ryota','長すぎる。これを毎回書くのは嫌だ。'],
  ['owl','だから平均を使う。[[\\overline{v_x^2}]] を「x方向の速度の二乗の平均」とすれば、和は [[N\\overline{v_x^2}]] と書ける。圧力は力を面積 [[L^2]] で割るから、[[p=Nm\\overline{v_x^2}/V]] だ。']
 ];
 const directionTurns=[
  ['ryota','急にx方向だけで気体全部の圧力を決めていいの？　分子は上下や奥行きにも飛んでいるよ。'],
  ['owl','いいところに目をつけたな。分子はx・y・zのどれか一方向だけへ偏っていない。三方向へ同じように運動すると考える。'],
  ['ryota','全体の速さは [[v^2=v_x^2+v_y^2+v_z^2]]。三方向が平等なら、x方向の分は全体の3分の1になるのか。'],
  ['owl','その通り。[[\\overline{v_x^2}=\\frac13\\overline{v^2}]] を代入すれば、ついに [[pV=\\frac13Nm\\overline{v^2}]]。目に見える圧力を、見えない分子の質量と運動で表せた。']
 ];
 return <section className="kinetic-lesson">
  <header className="kinetic-intro"><span>MOLECULES TO PRESSURE</span><h2>見えない衝突から、圧力の式をつくる。</h2><p>「なぜ分子を考えるのか」から始め、分子1個の衝突を気体全体へ広げる。</p></header>
  <section className="kinetic-step kinetic-why"><StepHeader number="1" kicker="WHY MOLECULES?" title="状態方程式だけでは、「なぜ」は分からない">目に見える気体の法則を、見えない分子の運動から説明する。</StepHeader><MacroMicroBridge/><Dialogue turns={introTurns}/></section>
  <section className="kinetic-step alternate"><StepHeader number="2" kicker="HISTORY" title="平均と確率で、見えない世界を計算した人">一個ずつ予測できなくても、無数の粒の集団なら規則を見つけられる。</StepHeader><BoltzmannProfile/><Dialogue turns={historyTurns}/><ProofGoal/></section>
  <section className="kinetic-step"><StepHeader number="3" kicker="ASSUMPTIONS" title="まず、計算できる簡単な気体を考える">複雑な現実から、衝突と圧力の関係だけを取り出す。</StepHeader><Dialogue turns={premiseTurns}/><AssumptionTriptych/><ElasticCollisionNote/></section>
  <section className="kinetic-step alternate"><StepHeader number="4" kicker="ROADMAP" title="ゴールから逆算して、計算の作戦を立てる">圧力を求めるには何が必要かを、先に見通しておく。</StepHeader><Dialogue turns={strategyTurns}/><ProofRoadmap/></section>
  <section className="kinetic-step"><StepHeader number="5" kicker="STEP 1 / ONE COLLISION" title="ステップ1｜1回の衝突で壁が受ける力積">質量 <MathFormula expression="m"/> の粒子が、右向きの速度 <MathFormula expression="v_x"/> で壁へ衝突する。リョウタのセリフを選び、壁が受ける力積まで導こう。</StepHeader><ImpulseDialogueQuiz/></section>
  <section className="kinetic-step alternate"><StepHeader number="6" kicker="STEP 2 / COLLISION COUNT" title="ステップ2｜Δt秒間の衝突回数">壁の間隔は <MathFormula expression="L"/>。粒子が同じ壁へ戻るまでの往復距離 <MathFormula expression="2L"/> を使い、衝突回数を求める。</StepHeader><CollisionCountQuiz/></section>
  <section className="kinetic-step"><StepHeader number="7" kicker="STEP 3 / AVERAGE FORCE" title="ステップ3｜力積の合計から平均の力へ">ステップ1の「1回の力積」と、ステップ2の「衝突回数」を掛け合わせる。</StepHeader><Dialogue turns={averageForceTurns}/><ForceTimeGraph/><div className="kinetic-calculation average-force-result"><small>一粒子が壁へ及ぼす平均の力</small><MathFormula expression="F_{平均}=\frac{mv_x^2}{L}" display/></div></section>
  <section className="kinetic-step alternate"><StepHeader number="8" kicker="ALL MOLECULES" title="N個の分子へ広げ、力を圧力へ変える">分子ごとの力を足し、壁の面積で割る。</StepHeader><Dialogue turns={manyTurns}/><div className="kinetic-derivation"><section><small>すべての分子の力</small><MathFormula expression="F=\frac{m}{L}\sum_{i=1}^{N}v_{ix}^2=\frac{Nm}{L}\overline{v_x^2}" display/></section><i>面積 <MathFormula expression="S=L^2"/> で割る</i><section><small>壁が受ける圧力</small><MathFormula expression="p=\frac{F}{L^2}=\frac{Nm}{V}\overline{v_x^2}" display/></section></div></section>
  <section className="kinetic-step"><StepHeader number="9" kicker="THREE DIRECTIONS" title="x・y・zの三方向を一つにまとめる">x方向の運動を、分子の速さ全体へ置き換える。</StepHeader><DirectionVisual/><Dialogue turns={directionTurns}/><FormulaBridge/></section>
  <section className="kinetic-next"><img src="/assets/vector-owl.png" alt="案内役のフクロウ"/><div><small>NEXT QUESTION</small><h3>分子が速くなると、温度も上がるのか？</h3><p>次はこの式と <MathFormula expression="pV=nRT"/> を比べ、分子の運動エネルギーと絶対温度を結びつける。</p></div></section>
  <div className="dialogue-takeaway kinetic-takeaway"><small>二人がつかんだこと</small><strong>気体分子運動論は、目に見える圧力を分子の集団運動で説明する。理想化した模型では、<MathFormula expression="pV=\frac13Nm\overline{v^2}"/> となり、分子が多いほど、重いほど、速く動くほど圧力は大きい。</strong></div>
 </section>;
}
