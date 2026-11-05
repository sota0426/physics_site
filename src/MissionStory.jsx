import React from 'react';
import {ArrowRight,MapPin} from 'lucide-react';
import {missionStories} from './mission-stories';
import {lessonDialogues} from './lesson-dialogues';
import MathFormula from './MathFormula';
import SotaCharacter from './SotaCharacter';

function VelocityRoadFigure({title}){
 return <figure className="mission-diagram velocity-road-scene" aria-label={`${title}。東向きを正とし、東へ進む車Aと西へ進む車Bの速度を符号付きで表した図`}>
  <div className="velocity-road-art">
   <img src="/assets/velocity-road-ai.png" alt="緑の多い郊外の直線道路を、黄色い車Aは東へ、水色の車Bは西へ走っている"/>
   <svg viewBox="0 0 1672 941" role="img" aria-hidden="true">
    <defs>
     <marker id="velocity-road-arrow-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#28684a"/></marker>
     <marker id="velocity-road-arrow-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#3f7193"/></marker>
    </defs>
    <path d="M520 395 H1120" className="velocity-road-arrow car-a"/>
    <path d="M1135 650 H535" className="velocity-road-arrow car-b"/>
    <g className="velocity-car-tag car-a"><rect x="205" y="292" width="175" height="64" rx="30"/><text x="292" y="336">車 A</text></g>
    <g className="velocity-car-tag car-b"><rect x="1270" y="735" width="175" height="64" rx="30"/><text x="1357" y="779">車 B</text></g>
    <foreignObject x="635" y="300" width="390" height="80"><div xmlns="http://www.w3.org/1999/xhtml" className="velocity-road-equation car-a"><MathFormula expression="v_A=+5［m/s］"/></div></foreignObject>
    <foreignObject x="640" y="665" width="390" height="80"><div xmlns="http://www.w3.org/1999/xhtml" className="velocity-road-equation car-b"><MathFormula expression="v_B=-3［m/s］"/></div></foreignObject>
    <g className="velocity-east-tag"><rect x="1282" y="839" width="300" height="64" rx="30"/><text x="1432" y="883">東（＋）</text><path d="M1495 871 H1550"/></g>
   </svg>
  </div>
 </figure>;
}

function MissionDiagram({type,title}){
 if(type==='velocity')return <VelocityRoadFigure title={title}/>;
 const common=<defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/></marker><linearGradient id="river" x1="0" x2="1"><stop stopColor="#cfe8e3"/><stop offset="1" stopColor="#acd7d1"/></linearGradient></defs>;
 const ground=<path d="M40 245 H600" stroke="#7c9874" strokeWidth="3" strokeLinecap="round"/>;
 let scene;
 if(type==='displacement')scene=<>{ground}<path d="M90 225 C150 225 145 130 230 140 S300 230 370 202 S455 95 535 118" fill="none" stroke="#d6b75e" strokeWidth="10" strokeLinecap="round" strokeDasharray="2 16"/><circle cx="90" cy="225" r="12" fill="#3d7254"/><circle cx="535" cy="118" r="15" fill="#d49c43"/><path d="M105 213 L520 125" className="diagram-vector"/><text x="75" y="270">START</text><text x="505" y="92">SAMPLE</text><text x="275" y="145" className="diagram-label">変位</text></>;
 else if(type==='acceleration')scene=<><path d="M110 250 V135 Q110 75 175 75 H540" fill="none" stroke="#ccd8c5" strokeWidth="30" strokeLinecap="round"/><rect x="90" y="150" width="40" height="62" rx="9" fill="#f5e5ae" stroke="#315c48" strokeWidth="3"/><rect x="250" y="55" width="62" height="40" rx="9" fill="#f5e5ae" stroke="#315c48" strokeWidth="3"/><path d="M70 185 V100" className="diagram-vector"/><path d="M275 35 H385" className="diagram-vector"/><path d="M160 130 L250 105" stroke="#d29c45" strokeWidth="4" strokeDasharray="7 7" markerEnd="url(#arrow)"/><text x="170" y="158" className="diagram-label">Δv</text></>;
 else if(type==='components')scene=<><path d="M105 245 H565 M105 245 V45" stroke="#8ca395" strokeWidth="2"/><path d="M105 245 L465 75" className="diagram-vector"/><path d="M105 245 H465" className="diagram-component"/><path d="M465 245 V75" className="diagram-component"/><path d="M435 245 V215 H465" fill="none" stroke="#8ca395" strokeWidth="2"/><text x="270" y="272">x 成分</text><text x="478" y="165">y 成分</text><text x="275" y="135" className="diagram-label">もとのベクトル</text></>;
 else if(type==='river')scene=<><rect x="40" y="50" width="560" height="200" rx="28" fill="url(#river)"/><path d="M80 90 H555 M80 210 H555" stroke="#fff" strokeWidth="3" strokeDasharray="12 14" opacity=".65"/><path d="M300 210 V105" className="diagram-vector"/><path d="M300 210 H450" className="diagram-component"/><path d="M300 210 L450 105" className="diagram-result"/><path d="M275 225 L300 190 L325 225 Z" fill="#fff7dc" stroke="#315c48" strokeWidth="3"/><text x="210" y="145">船 4［m/s］</text><text x="355" y="235">流れ 3［m/s］</text><text x="390" y="135" className="diagram-label">岸から見た速度</text></>;
 else if(type==='forces')scene=<>
  <text x="42" y="38" className="diagram-label">実験台を上から見る</text>
  <path d="M70 258 H575 M70 258 V45" stroke="#c7d4c0" strokeWidth="2" strokeDasharray="6 8"/>
  <text x="548" y="282">東（x）</text><text x="38" y="58">北（y）</text>
  <path d="M250 50 H385 V230" fill="none" stroke="#9aada0" strokeWidth="2.5" strokeDasharray="7 8"/>
  <g aria-label="上から見た小型ローバー">
   <rect x="202" y="188" width="96" height="76" rx="20" fill="#f5e5ae" stroke="#315c48" strokeWidth="3"/>
   <rect x="215" y="199" width="70" height="45" rx="13" fill="#fff8db" stroke="#8aa08c" strokeWidth="2"/>
   <rect x="190" y="198" width="15" height="22" rx="6" fill="#315c48"/><rect x="190" y="235" width="15" height="22" rx="6" fill="#315c48"/>
   <rect x="295" y="198" width="15" height="22" rx="6" fill="#315c48"/><rect x="295" y="235" width="15" height="22" rx="6" fill="#315c48"/>
   <circle cx="250" cy="222" r="8" fill="#d39c43"/>
  </g>
  <path d="M250 230 V50" className="diagram-component"/>
  <path d="M250 230 H385" className="diagram-component"/>
  <path d="M250 230 L385 50" className="diagram-result"/>
  <foreignObject x="85" y="96" width="165" height="44"><div xmlns="http://www.w3.org/1999/xhtml" className="mission-diagram-equation"><MathFormula expression="F_y=4［N］"/></div></foreignObject>
  <foreignObject x="385" y="200" width="175" height="44"><div xmlns="http://www.w3.org/1999/xhtml" className="mission-diagram-equation"><MathFormula expression="F_x=3［N］"/></div></foreignObject>
  <foreignObject x="365" y="68" width="210" height="48"><div xmlns="http://www.w3.org/1999/xhtml" className="mission-diagram-equation"><MathFormula expression="F⃗=5［N］"/></div></foreignObject>
 </>;
 else if(type==='horizontal')scene=<><path d="M40 80 H190 V250 H600" fill="#dce7d5"/><circle cx="190" cy="78" r="12" fill="#d49c43"/><path d="M202 78 H310" className="diagram-vector"/><path d="M190 78 Q350 82 510 242" fill="none" stroke="#315c48" strokeWidth="4" strokeDasharray="8 8"/><g fill="#d49c43">{[[270,92],[350,125],[430,180],[510,242]].map(([x,y])=><circle key={x} cx={x} cy={y} r="7"/>)}</g><path d="M350 125 H430" className="diagram-component"/><path d="M350 125 V205" className="diagram-component"/><text x="335" y="285">縦と横を同時に見る</text></>;
 else if(type==='projectile')scene=<>{ground}<circle cx="100" cy="238" r="12" fill="#d49c43"/><path d="M100 238 Q310 35 535 238" fill="none" stroke="#315c48" strokeWidth="4" strokeDasharray="8 8"/><path d="M100 238 L235 105" className="diagram-result"/><path d="M100 238 H235" className="diagram-component"/><path d="M235 238 V105" className="diagram-component"/><text x="155" y="212">v₀ cosθ</text><text x="245" y="175">v₀ sinθ</text><text x="278" y="55" className="diagram-label">最高点</text></>;
 else scene=<>
  <text x="65" y="35" className="diagram-label">落下方向を＋とする</text>
  <path d="M220 42 V260" stroke="#b6c7ad" strokeWidth="3" strokeDasharray="8 10"/>
  <circle cx="220" cy="150" r="44" fill="#f5e5ae" stroke="#315c48" strokeWidth="3"/>
  <path d="M220 106 V42" className="diagram-component"/><path d="M220 194 V268" className="diagram-result"/>
  <foreignObject x="40" y="62" width="170" height="45"><div xmlns="http://www.w3.org/1999/xhtml" className="mission-diagram-equation"><MathFormula expression="f=kv"/></div></foreignObject>
  <foreignObject x="235" y="220" width="170" height="45"><div xmlns="http://www.w3.org/1999/xhtml" className="mission-diagram-equation"><MathFormula expression="mg"/></div></foreignObject>
  <rect x="345" y="58" width="250" height="72" rx="14" fill="#fff9e9" stroke="#dfd5b6"/>
  <foreignObject x="365" y="70" width="210" height="48"><div xmlns="http://www.w3.org/1999/xhtml" className="mission-diagram-equation"><MathFormula expression="ma=mg-kv"/></div></foreignObject>
  <rect x="325" y="158" width="285" height="82" rx="14" fill="#eef6fb" stroke="#cadde8"/>
  <foreignObject x="335" y="175" width="265" height="48"><div xmlns="http://www.w3.org/1999/xhtml" className="mission-diagram-equation"><MathFormula expression="a=g-\frac{k}{m}v"/></div></foreignObject>
 </>;
 return <figure className="mission-diagram"><svg viewBox="0 0 640 300" role="img" aria-label={`${title}の状況を表す図`}>{common}{scene}</svg></figure>;
}

function DialogueText({children}){
 const parts=String(children).split(/(\[\[[^\]]+\]\])/g);
 return parts.map((part,index)=>part.startsWith('[[')&&part.endsWith(']]')?<MathFormula key={index} expression={part.slice(2,-2)}/>:part);
}

function VelocityDecompositionFigure(){
 return <figure className="velocity-decomposition velocity-plane-scene" aria-label="北東へ飛ぶドローンの速度を、東向きの速度成分と北向きの速度成分に分解する図">
  <div className="velocity-plane-art">
   <img src="/assets/velocity-plane-ai.png" alt="川沿いの公園で、小型ドローンが北東へ向かって飛んでいる"/>
   <svg viewBox="0 0 1672 941" role="img" aria-hidden="true">
    <defs>
     <marker id="velocity-plane-arrow-main" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#285d40"/></marker>
     <marker id="velocity-plane-arrow-x" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#bd822b"/></marker>
     <marker id="velocity-plane-arrow-y" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#39779f"/></marker>
    </defs>
    <path d="M455 205 H1220 V710" className="velocity-plane-guide"/>
    <path d="M455 710 L600 710 A145 145 0 0 0 576 630 Z" className="velocity-plane-angle-zone"/>
    <path d="M455 710 L1220 205" className="velocity-plane-vector main"/>
    <path d="M455 710 H1220" className="velocity-plane-vector x"/>
    <path d="M455 710 V205" className="velocity-plane-vector y"/>
    <circle cx="455" cy="710" r="18" className="velocity-plane-origin"/>
    <g className="velocity-plane-direction east"><rect x="1280" y="675" width="235" height="68" rx="30"/><text x="1398" y="721">東（x方向）</text></g>
    <g className="velocity-plane-direction north"><rect x="330" y="94" width="255" height="68" rx="30"/><text x="458" y="140">北（y方向）</text></g>
    <foreignObject x="760" y="310" width="270" height="80"><div xmlns="http://www.w3.org/1999/xhtml" className="velocity-plane-equation main"><MathFormula expression="v⃗"/></div></foreignObject>
    <foreignObject x="670" y="730" width="430" height="82"><div xmlns="http://www.w3.org/1999/xhtml" className="velocity-plane-equation x"><MathFormula expression="v_x=v cosθ"/></div></foreignObject>
    <foreignObject x="485" y="340" width="365" height="82"><div xmlns="http://www.w3.org/1999/xhtml" className="velocity-plane-equation y"><MathFormula expression="v_y=v sinθ"/></div></foreignObject>
    <path d="M680 590 L566 662" className="velocity-plane-theta-pointer"/>
    <foreignObject x="565" y="500" width="410" height="90"><div xmlns="http://www.w3.org/1999/xhtml" className="velocity-plane-theta-note">この角度を <MathFormula expression="θ"/> とする</div></foreignObject>
   </svg>
  </div>
 </figure>;
}

function DialogueTurns({turns,startIndex=0}){
 return <div className="concept-dialogue-list">{turns.map(([speaker,text],index)=><div className={`concept-dialogue-turn ${speaker} ${speaker==='owl'?'strong':''}`} key={`${speaker}-${startIndex+index}`}>{speaker==='owl'?<img src="/assets/vector-owl.png" alt="案内役のフクロウ"/>:<SotaCharacter/>}<div><p><DialogueText>{text}</DialogueText></p></div></div>)}</div>;
}

function VelocityStory({story,dialogue}){
 const lineTurns=dialogue.turns.slice(0,5),planeTurns=dialogue.turns.slice(5);
 return <section className="velocity-story">
  <header className="velocity-story-intro"><span className="mission-number"><MapPin size={14}/>{story.number}</span><h2>{dialogue.title}</h2><p>{story.setting}</p></header>
  <section className="velocity-topic velocity-topic-line" aria-labelledby="line-velocity-title"><header><span>物理基礎</span><div><small>STRAIGHT-LINE VELOCITY</small><h3 id="line-velocity-title">一直線上の速度</h3><p>一つの軸の上では、正負の符号で向きを表す。</p></div></header><div className="velocity-topic-body"><div className="velocity-topic-dialogue"><DialogueTurns turns={lineTurns}/></div><MissionDiagram type="velocity" title="一直線上の速度"/></div></section>
  <section className="velocity-topic velocity-topic-plane" aria-labelledby="plane-velocity-title"><header><span>物理</span><div><small>VELOCITY IN A PLANE</small><h3 id="plane-velocity-title">平面上の速度</h3><p>二つの軸を用意し、斜めの速度をx成分とy成分へ分ける。</p></div><a className="trig-guide-link" href="#/trigonometry">sin・cosが初めてなら<br/><b>三角関数の準備ページへ</b><ArrowRight size={16}/></a></header><div className="velocity-topic-body"><div className="velocity-topic-dialogue"><DialogueTurns turns={planeTurns} startIndex={5}/></div><VelocityDecompositionFigure/></div></section>
  <div className="dialogue-takeaway velocity-story-takeaway"><small>二人がつかんだこと</small><strong>{dialogue.takeaway}</strong></div>
 </section>;
}

function AccelerationFigure({kind}){
 const isLine=kind==='line';
 return <figure className={`acceleration-art acceleration-art-${kind}`} aria-label={isLine?'一直線上で車の速度が時間とともに大きくなる様子と、平均加速度の計算':'同じ速さで45度カーブを曲がる車の、速度変化と力から加速度を考える図'}>
  <img src={isLine?'/assets/acceleration-line-ai.png':'/assets/acceleration-plane-ai.png'} alt={isLine?'同じ時間ごとの車の位置の間隔が次第に広がる直線道路':'直線道路から右上へ45度曲がる道路を、黄色い車が走っている場面'}/>
  <svg viewBox="0 0 1536 1024" role="img" aria-hidden="true">
   <defs>
    <marker id={`accel-green-${kind}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#285d40"/></marker>
    <marker id={`accel-gold-${kind}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#bd822b"/></marker>
    <marker id={`accel-blue-${kind}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#39779f"/></marker>
   </defs>
   {isLine?<>
    <path d="M215 690 H470" className="accel-vector green" markerEnd="url(#accel-green-line)"/>
    <path d="M1030 690 H1435" className="accel-vector gold" markerEnd="url(#accel-gold-line)"/>
    <foreignObject x="225" y="565" width="300" height="105"><div xmlns="http://www.w3.org/1999/xhtml" className="accel-label green"><small>はじめの速度</small><MathFormula expression="v_1=2［m/s］"/></div></foreignObject>
    <foreignObject x="1080" y="565" width="330" height="105"><div xmlns="http://www.w3.org/1999/xhtml" className="accel-label gold"><small>3［s］後の速度</small><MathFormula expression="v_2=8［m/s］"/></div></foreignObject>
    <foreignObject x="455" y="125" width="650" height="225"><div xmlns="http://www.w3.org/1999/xhtml" className="accel-equation"><p>平均加速度</p><MathFormula expression="\bar{a}=\frac{Δv}{Δt}=\frac{8-2}{3}=2［m/s^2］"/></div></foreignObject>
    <foreignObject x="590" y="455" width="360" height="76"><div xmlns="http://www.w3.org/1999/xhtml" className="accel-time"><MathFormula expression="Δt=3［s］"/></div></foreignObject>
   </>:<>
    <circle cx="865" cy="690" r="16" className="accel-origin"/>
    <path d="M865 690 H1265" className="accel-vector green" markerEnd="url(#accel-green-plane)"/>
    <path d="M865 690 L1148 407" className="accel-vector gold" markerEnd="url(#accel-gold-plane)"/>
    <path d="M1265 690 L1148 407" className="accel-vector difference" markerEnd="url(#accel-blue-plane)"/>
    <path d="M1010 690 A145 145 0 0 0 968 587" className="accel-angle-arc"/>
    <foreignObject x="990" y="600" width="135" height="70"><div xmlns="http://www.w3.org/1999/xhtml" className="accel-angle"><MathFormula expression="45°"/></div></foreignObject>
    <foreignObject x="1010" y="725" width="270" height="100"><div xmlns="http://www.w3.org/1999/xhtml" className="accel-label green"><small>曲がる前</small><MathFormula expression="\vec{v}_1"/></div></foreignObject>
    <foreignObject x="760" y="405" width="270" height="100"><div xmlns="http://www.w3.org/1999/xhtml" className="accel-label gold"><small>曲がった後</small><MathFormula expression="\vec{v}_2"/></div></foreignObject>
    <foreignObject x="1225" y="485" width="275" height="100"><div xmlns="http://www.w3.org/1999/xhtml" className="accel-label blue"><small>速度の変化</small><MathFormula expression="Δ\vec{v}"/></div></foreignObject>
    <foreignObject x="560" y="830" width="480" height="145"><div xmlns="http://www.w3.org/1999/xhtml" className="accel-equation plane"><p>速度の変化</p><MathFormula expression="Δ\vec{v}=\vec{v}_2-\vec{v}_1"/>
    </div></foreignObject>
   </>}
  </svg>
 </figure>;
}

function AccelerationStory({story,dialogue}){
 return <section className="velocity-story acceleration-story">
  <header className="velocity-story-intro"><span className="mission-number"><MapPin size={14}/>{story.number}</span><h2>{dialogue.title}</h2><p>{story.setting}</p></header>
  {dialogue.steps.map((step,index)=><section className={`velocity-topic acceleration-topic acceleration-topic-${index===0?'line':'plane'} ${index===1?'velocity-topic-plane':''}`} key={step.title}><header><span>{step.level}</span><div><small>{index===0?'STRAIGHT-LINE ACCELERATION':'ACCELERATION IN A PLANE'}</small><h3>{step.title}</h3><p>{step.lead}</p></div></header><div className="velocity-topic-body"><div className="velocity-topic-dialogue"><DialogueTurns turns={step.turns}/></div><AccelerationFigure kind={index===0?'line':'plane'}/></div></section>)}
  <div className="dialogue-takeaway velocity-story-takeaway"><small>二人がつかんだこと</small><strong><DialogueText>{dialogue.takeaway}</DialogueText></strong></div>
 </section>;
}

function UniformMotionFigure({kind}){
 const isTrack=kind==='track';
 return <figure className={`uniform-motion-art uniform-motion-art-${kind}`} aria-label={isTrack?'エアトラック上の台車が、同じ時間ごとに同じ距離だけ右へ進む図':'水中を一定速度で沈む球にはたらく重力と、浮力・水の抵抗がつり合う図'}>
  <img src={isTrack?'/assets/uniform-motion-track-ai.png':'/assets/uniform-motion-water-ai.png'} alt={isTrack?'理科室のエアトラック上を、黄色い台車が等間隔の位置を通って右へ進む':'透明な水槽の中を、金属球が等間隔の位置を通って鉛直下向きに沈む'}/>
  <svg viewBox="0 0 1536 1024" role="img" aria-hidden="true">
   <defs>
    <marker id={`uniform-green-${kind}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#285d40"/></marker>
    <marker id={`uniform-blue-${kind}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#39779f"/></marker>
    <marker id={`uniform-gold-${kind}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#bd822b"/></marker>
   </defs>
   {isTrack?<>
    <path d="M1265 720 H1465" className="uniform-vector velocity" markerEnd="url(#uniform-green-track)"/>
    <foreignObject x="690" y="185" width="700" height="155"><div xmlns="http://www.w3.org/1999/xhtml" className="uniform-formula-card"><small>等速直線運動の公式</small><MathFormula expression="x=vt"/></div></foreignObject>
    {[495,820,1145].map((x,index)=><foreignObject key={x} x={x-65} y="690" width="130" height="60"><div xmlns="http://www.w3.org/1999/xhtml" className="uniform-time-chip"><MathFormula expression="Δt"/></div></foreignObject>)}
   </>:<>
    <path d="M900 500 V330" className="uniform-vector upward" markerEnd="url(#uniform-blue-water)"/>
    <path d="M1045 415 V590" className="uniform-vector downward" markerEnd="url(#uniform-gold-water)"/>
    <foreignObject x="550" y="335" width="320" height="90"><div xmlns="http://www.w3.org/1999/xhtml" className="uniform-force-label upward"><MathFormula expression="浮力・水の抵抗力"/></div></foreignObject>
    <foreignObject x="1050" y="475" width="240" height="90"><div xmlns="http://www.w3.org/1999/xhtml" className="uniform-force-label downward"><MathFormula expression="mg"/></div></foreignObject>
    <foreignObject x="1160" y="690" width="330" height="220"><div xmlns="http://www.w3.org/1999/xhtml" className="uniform-balance-card"><p>一定速度になった後</p><span><MathFormula expression="F=0"/> ⇨<MathFormula expression="a=0"/></span></div></foreignObject>
   </>}
  </svg>
 </figure>;
}

function UniformMotionStory({story,dialogue}){
 return <section className="uniform-motion-story">
  <header className="velocity-story-intro"><span className="mission-number"><MapPin size={14}/>{story.number}</span><h2>{dialogue.title}</h2><p>{story.setting}</p></header>
  {dialogue.steps.map((step,index)=><section className={`uniform-motion-step uniform-motion-step-${index+1}`} key={step.title}>
   <header><span>STEP {index+1}</span><div><small>{step.level}</small><h3>{step.title}</h3><p>{step.lead}</p></div></header>
   <div className="uniform-motion-dialogue"><DialogueTurns turns={step.turns}/></div>
   <UniformMotionFigure kind={index===0?'track':'water'}/>
  </section>)}
  <div className="dialogue-takeaway uniform-motion-takeaway"><small>二人がつかんだこと</small><strong><DialogueText>{dialogue.takeaway}</DialogueText></strong></div>
 </section>;
}

function RelativeVelocityFigure({step}){
 const art=[
  {src:'/assets/velocity-composition-ai.png',alt:'船首を北へ向けた船が東向きの川に流され、航跡が北東へ曲がっている場面'},
  {src:'/assets/relative-velocity-line-ai.png',alt:'同じ直線道路を東向きに走る黄色い車Aと青い車B'},
  {src:'/assets/relative-velocity-plane-ai.png',alt:'東へ走る電車の窓から、雨が斜め後ろへ流れて見える場面'}
 ][step];
 const marker=<defs>
  <marker id={`rv-green-${step}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#285d40"/></marker>
  <marker id={`rv-gold-${step}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#bd822b"/></marker>
  <marker id={`rv-blue-${step}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#39779f"/></marker>
 </defs>;
 let vectors;
 if(step===0)vectors=<>
  <circle cx="900" cy="760" r="15" className="rv-origin"/>
  <path d="M900 760 V380" className="rv-vector blue" markerEnd="url(#rv-blue-0)"/>
  <path d="M900 380 H1230" className="rv-vector gold" markerEnd="url(#rv-gold-0)"/>
  <path d="M900 760 L1230 380" className="rv-vector green" markerEnd="url(#rv-green-0)"/>
  <foreignObject x="600" y="485" width="290" height="105"><div xmlns="http://www.w3.org/1999/xhtml" className="rv-label blue"><small>水に対する船</small><MathFormula expression="\vec{V}_1"/></div></foreignObject>
  <foreignObject x="975" y="255" width="330" height="105"><div xmlns="http://www.w3.org/1999/xhtml" className="rv-label gold"><small>岸に対する水</small><MathFormula expression="\vec{V}_2"/></div></foreignObject>
  <foreignObject x="1030" y="550" width="350" height="105"><div xmlns="http://www.w3.org/1999/xhtml" className="rv-label green"><small>岸から見た船</small><MathFormula expression="\vec{V}"/></div></foreignObject>
  <foreignObject x="640" y="850" width="760" height="105"><div xmlns="http://www.w3.org/1999/xhtml" className="rv-equation"><MathFormula expression="\vec{V}=\vec{V}_1+\vec{V}_2"/></div></foreignObject>
 </>;
 else if(step===1)vectors=<>
  <g className="rv-car-tag"><rect x="165" y="640" width="255" height="66" rx="28"/><text x="292" y="684">車A（観測者）</text></g>
  <g className="rv-car-tag"><rect x="1100" y="640" width="180" height="66" rx="28"/><text x="1190" y="684">車B</text></g>
  <circle cx="600" cy="260" r="15" className="rv-origin"/>
  <path d="M600 260 H900" className="rv-vector gold" markerEnd="url(#rv-gold-1)"/>
  <path d="M900 260 H1100" className="rv-vector blue" markerEnd="url(#rv-blue-1)"/>
  <path d="M600 390 H1100" className="rv-vector green" markerEnd="url(#rv-green-1)"/>
  <foreignObject x="625" y="125" width="290" height="105"><div xmlns="http://www.w3.org/1999/xhtml" className="rv-label gold"><small>車Aの速度</small><MathFormula expression="\vec{V}_A"/></div></foreignObject>
  <foreignObject x="900" y="125" width="310" height="105"><div xmlns="http://www.w3.org/1999/xhtml" className="rv-label blue"><small>Aから見たB</small><MathFormula expression="\vec{V}_{AB}"/></div></foreignObject>
  <foreignObject x="745" y="380" width="290" height="105"><div xmlns="http://www.w3.org/1999/xhtml" className="rv-label green"><small>車Bの速度</small><MathFormula expression="\vec{V}_B"/></div></foreignObject>
  <foreignObject x="430" y="735" width="810" height="205"><div xmlns="http://www.w3.org/1999/xhtml" className="rv-equation rv-equation-pair"><MathFormula expression="\vec{V}_{AB}=\vec{V}_B-\vec{V}_A"/><small>あるいは（移項すると）</small><MathFormula expression="\vec{V}_B=\vec{V}_A+\vec{V}_{AB}"/></div></foreignObject>
 </>;
 else vectors=<>
  <circle cx="965" cy="250" r="15" className="rv-origin"/>
  <path d="M965 250 H1260" className="rv-vector gold" markerEnd="url(#rv-gold-2)"/>
  <path d="M1260 250 L965 650" className="rv-vector blue" markerEnd="url(#rv-blue-2)"/>
  <path d="M965 250 V650" className="rv-vector green" markerEnd="url(#rv-green-2)"/>
  <foreignObject x="970" y="120" width="370" height="110"><div xmlns="http://www.w3.org/1999/xhtml" className="rv-label gold"><small>電車Aの速度</small><MathFormula expression="\vec{V}_A"/></div></foreignObject>
  <foreignObject x="1100" y="410" width="390" height="110"><div xmlns="http://www.w3.org/1999/xhtml" className="rv-label blue"><small>電車Aから見た雨B</small><MathFormula expression="\vec{V}_{AB}"/></div></foreignObject>
  <foreignObject x="650" y="415" width="390" height="110"><div xmlns="http://www.w3.org/1999/xhtml" className="rv-label green"><small>雨Bの速度</small><MathFormula expression="\vec{V}_B"/></div></foreignObject>
  <foreignObject x="625" y="735" width="870" height="205"><div xmlns="http://www.w3.org/1999/xhtml" className="rv-equation rv-equation-pair"><MathFormula expression="\vec{V}_{AB}=\vec{V}_B-\vec{V}_A"/><small>あるいは（移項すると）</small><MathFormula expression="\vec{V}_B=\vec{V}_A+\vec{V}_{AB}"/></div></foreignObject>
 </>;
 return <figure className={`relative-step-art relative-step-art-${step+1}`}><img src={art.src} alt={art.alt}/><svg viewBox="0 0 1536 1024" role="img" aria-label="場面の速度をベクトルの足し算で表した図">{marker}{vectors}</svg></figure>;
}

function RelativeVelocityStory({story,dialogue}){
 return <section className="drag-story relative-story">
  <header className="drag-story-intro"><span className="mission-number"><MapPin size={14}/>{story.number}</span><h2>{dialogue.title}</h2><p>{story.setting}</p></header>
  {dialogue.steps.map((step,index)=><section className={`drag-step relative-step relative-step-${index+1}`} key={step.title}><header><span>STEP {index+1}</span><div><h3>{step.title}</h3><p>{step.lead}</p></div></header><RelativeVelocityFigure step={index}/><div className="drag-step-dialogue"><DialogueTurns turns={step.turns}/></div></section>)}
  <div className="dialogue-takeaway drag-story-takeaway"><small>二人がつかんだこと</small><strong><DialogueText>{dialogue.takeaway}</DialogueText></strong></div>
 </section>;
}

function DragStory({story,dialogue}){
 const stepArt=[
  {src:'/assets/air-drag-step-1-ai.png',alt:'理科室で、同じ大きさの発泡スチロール球と金属球を同じ高さから落とし、少年とフクロウが観察している'},
  {src:'/assets/air-drag-step-2-ai.png',alt:'自転車で速く走る少年が、進行方向と反対向きに強く受ける空気の流れを感じている'},
  {src:'/assets/air-drag-step-3-ai.png',alt:'空気中を落下する同じ大きさの軽い球と重い球を比べると、軽い球が空気抵抗によって遅れている'}
 ];
 return <section className="drag-story">
  <header className="drag-story-intro"><span className="mission-number"><MapPin size={14}/>{story.number}</span><h2>{dialogue.title}</h2><p>{story.setting}</p></header>
  {dialogue.steps.map((step,index)=><section className={`drag-step drag-step-${index+1}`} key={step.title}><header><span>STEP {index+1}</span><div><h3>{step.title}</h3><p>{step.lead}</p></div></header><figure className="drag-step-art"><img src={stepArt[index].src} alt={stepArt[index].alt}/></figure><div className="drag-step-dialogue"><DialogueTurns turns={step.turns}/>{index===2&&<MissionDiagram type={story.diagram} title={story.title}/>}</div></section>)}
  <div className="dialogue-takeaway drag-story-takeaway"><small>二人がつかんだこと</small><strong><DialogueText>{dialogue.takeaway}</DialogueText></strong></div>
 </section>;
}

export default function MissionStory({unit}){
 const story=missionStories[unit.id],dialogue=lessonDialogues[unit.id];
 if(!story||!dialogue)return null;
 if(story.diagram==='velocity')return <VelocityStory story={story} dialogue={dialogue}/>;
 if(story.diagram==='acceleration')return <AccelerationStory story={story} dialogue={dialogue}/>;
 if(story.diagram==='uniform')return <UniformMotionStory story={story} dialogue={dialogue}/>;
 if(story.diagram==='relative')return <RelativeVelocityStory story={story} dialogue={dialogue}/>;
 if(story.diagram==='drag')return <DragStory story={story} dialogue={dialogue}/>;
 return <section className={`mission-story dialogue-story diagram-${story.diagram}`}>
  <div className="mission-copy"><span className="mission-number"><MapPin size={14}/>{story.number}</span><h2>{dialogue.title}</h2><p className="dialogue-setting">{story.setting}</p><DialogueTurns turns={dialogue.turns}/><div className="dialogue-takeaway"><small>二人がつかんだこと</small><strong>{dialogue.takeaway}</strong></div></div>
  <MissionDiagram type={story.diagram} title={story.title}/>
 </section>;
}
