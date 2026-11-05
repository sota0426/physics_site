import React,{useState} from 'react';
import {ArrowLeft,ArrowRight,Check,Lightbulb} from 'lucide-react';
import MathFormula from './MathFormula';
import SotaCharacter from './SotaCharacter';
import './trigonometry.css';

function ForceComponentsFigure(){
 return <figure className="trig-force-figure" aria-labelledby="force-components-caption"><svg viewBox="0 0 720 410" role="img" aria-label="斜めの力Fを水平方向F cosθと鉛直方向F sinθに分解する図">
  <defs><marker id="trig-arrow-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#315f49"/></marker><marker id="trig-arrow-gold" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#c1872e"/></marker><marker id="trig-arrow-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#4f80a4"/></marker></defs>
  <path d="M75 325 H650 M150 360 V55" className="trig-axis"/>
  <rect x="92" y="272" width="116" height="52" rx="15" className="trig-cart"/><circle cx="120" cy="334" r="12"/><circle cx="180" cy="334" r="12"/>
  <path d="M150 78 H545 V272" className="trig-guide-box"/>
  <path d="M150 272 L545 78" className="trig-force"/>
  <path d="M150 272 H545" className="trig-horizontal"/>
  <path d="M150 272 V78" className="trig-vertical"/>
  <path d="M226 272 A76 76 0 0 0 218 239" className="trig-theta"/>
  <text x="230" y="257">θ</text><text x="632" y="351">水平</text><text x="104" y="65">鉛直</text>
  <foreignObject x="330" y="104" width="150" height="46"><div xmlns="http://www.w3.org/1999/xhtml" className="trig-svg-formula force"><MathFormula expression="F⃗"/></div></foreignObject>
  <foreignObject x="295" y="278" width="235" height="48"><div xmlns="http://www.w3.org/1999/xhtml" className="trig-svg-formula horizontal"><MathFormula expression="F_x=F cosθ"/></div></foreignObject>
  <foreignObject x="165" y="145" width="210" height="48"><div xmlns="http://www.w3.org/1999/xhtml" className="trig-svg-formula vertical"><MathFormula expression="F_y=F sinθ"/></div></foreignObject>
 </svg><figcaption id="force-components-caption">斜めの力は、水平方向と鉛直方向の二つの「影」に分けられる。</figcaption></figure>;
}

function ForceFormulaPanel(){
 return <aside className="trig-force-formulas" aria-label="角度とコサイン・サインの対応">
  <article className="cos-card"><small>角度 <MathFormula expression="θ"/> に隣り合う成分</small><h3>角度を挟む側は cos</h3><div className="trig-card-formula"><MathFormula expression="F_x=F cosθ" display/></div><p>水平成分 <MathFormula expression="F_x"/> は、角度 <MathFormula expression="θ"/> と斜辺 <MathFormula expression="F"/> の間にある成分です。</p></article>
  <article className="sin-card"><small>角度 <MathFormula expression="θ"/> の向かい側の成分</small><h3>角度の向かい側は sin</h3><div className="trig-card-formula"><MathFormula expression="F_y=F sinθ" display/></div><p>鉛直成分 <MathFormula expression="F_y"/> は、角度 <MathFormula expression="θ"/> を挟まず、その向かい側にある成分です。</p></article>
 </aside>;
}

function Dialogue({speaker,children}){
 const owl=speaker==='owl';
 return <div className={`trig-dialogue ${owl?'owl':'ryota'}`}>{owl?<img src="/assets/vector-owl.png" alt="案内役のフクロウ"/>:<SotaCharacter/>}<div><p>{children}</p></div></div>;
}

function TrigDefinition(){
 return <section className="trig-definition" aria-labelledby="trig-definition-title">
  <header><span>まずは定義</span><h2 id="trig-definition-title">sin・cos・tanは、直角三角形の辺の割合</h2><p>角度 <MathFormula expression="θ"/> を水平な辺から測り、向かい側を <MathFormula expression="a"/>、隣り合う辺を <MathFormula expression="b"/>、斜辺を <MathFormula expression="c"/> とします。三角関数が表すのは辺の長さそのものではなく、斜辺に対する横・縦の割合です。</p></header>
  <div className="trig-definition-body">
   <figure><svg viewBox="0 0 420 285" role="img" aria-label="斜辺cと水平な辺bと鉛直な辺aからなる直角三角形">
    <defs><marker id="definition-green-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#315f49"/></marker><marker id="definition-gold-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#bd822b"/></marker><marker id="definition-blue-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#39779f"/></marker></defs>
    <path d="M65 62 H350 V232" className="definition-guide"/><path d="M65 232 L350 62" className="definition-vector c"/><path d="M65 232 H350" className="definition-vector b"/><path d="M65 232 V62" className="definition-vector a"/><path d="M128 232 A63 63 0 0 0 119 200" className="definition-angle"/><text x="132" y="219">θ</text>
    <foreignObject x="71" y="108" width="135" height="38"><div xmlns="http://www.w3.org/1999/xhtml" className="definition-label a">向かい側 <MathFormula expression="a"/></div></foreignObject><foreignObject x="165" y="235" width="155" height="38"><div xmlns="http://www.w3.org/1999/xhtml" className="definition-label b">隣り合う辺 <MathFormula expression="b"/></div></foreignObject><foreignObject x="225" y="98" width="105" height="38"><div xmlns="http://www.w3.org/1999/xhtml" className="definition-label c">斜辺 <MathFormula expression="c"/></div></foreignObject>
   </svg></figure>
   <div className="trig-definition-formulas"><article><small>横の割合</small><MathFormula expression="cosθ=b/c" display/></article><article><small>縦の割合</small><MathFormula expression="sinθ=a/c" display/></article><article><small>縦 ÷ 横</small><MathFormula expression="tanθ=a/b" display/></article></div>
  </div>
 </section>;
}

const specialAngles=[
 {angle:30,origin:[35,280],end:[305,124],ratio:{f:'2',fx:'√{3}',fy:'1'},fx:'F_x=F cos 30°=\\frac{√{3}}{2}F',fy:'F_y=F sin 30°=\\frac{1}{2}F'},
 {angle:45,origin:[78,280],end:[268,90],ratio:{f:'√{2}',fx:'1',fy:'1'},fx:'F_x=F cos 45°=\\frac{√{2}}{2}F',fy:'F_y=F sin 45°=\\frac{√{2}}{2}F'},
 {angle:60,origin:[100,280],end:[250,20],ratio:{f:'2',fx:'1',fy:'√{3}'},fx:'F_x=F cos 60°=\\frac{1}{2}F',fy:'F_y=F sin 60°=\\frac{√{3}}{2}F'}
];

function SpecialAngleCard({data}){
 const {angle,origin:[ox,oy],end:[fx,fy],ratio}=data;
 const length=58,arcEndX=ox+length*Math.cos(angle*Math.PI/180),arcEndY=oy-length*Math.sin(angle*Math.PI/180);
 const viewTop=Math.max(0,fy-45);
 const id=`ratio-${angle}`;
 return <article className="trig-angle-card"><header><p>辺の比 <MathFormula expression={`F:F_x:F_y=${ratio.f}:${ratio.fx}:${ratio.fy}`}/></p></header><figure className="trig-ratio-rectangle"><svg viewBox={`0 ${viewTop} 365 ${330-viewTop}`} role="img" aria-label={`${angle}度の力Fを水平成分Fxと鉛直成分Fyに分解した図`}>
  <defs><marker id={`${id}-green`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#315f49"/></marker><marker id={`${id}-gold`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#bd822b"/></marker><marker id={`${id}-blue`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#39779f"/></marker></defs>
  <path d={`M${ox} ${fy} H${fx} V${oy}`} className="ratio-guide"/><path d={`M${ox} ${oy} L${fx} ${fy}`} className="ratio-vector c" style={{markerEnd:`url(#${id}-green)`}}/><path d={`M${ox} ${oy} H${fx}`} className="ratio-vector b" style={{markerEnd:`url(#${id}-gold)`}}/><path d={`M${ox} ${oy} V${fy}`} className="ratio-vector a" style={{markerEnd:`url(#${id}-blue)`}}/><path d={`M${ox+length} ${oy} A${length} ${length} 0 0 0 ${arcEndX} ${arcEndY}`} className="ratio-angle"/><text x={ox+62} y={oy-10}>{angle}°</text>
  <foreignObject x={(ox+fx)/2-58} y={oy+8} width="142" height="38"><div xmlns="http://www.w3.org/1999/xhtml" className="ratio-label b"><MathFormula expression={`F_x(${ratio.fx})`}/></div></foreignObject><foreignObject x={Math.max(8,ox-55)} y={(oy+fy)/2-18} width="120" height="38"><div xmlns="http://www.w3.org/1999/xhtml" className="ratio-label a"><MathFormula expression={`F_y(${ratio.fy})`}/></div></foreignObject><foreignObject x={(ox+fx)/2} y={(oy+fy)/2-34} width="110" height="38"><div xmlns="http://www.w3.org/1999/xhtml" className="ratio-label c"><MathFormula expression={`F(${ratio.f})`}/></div></foreignObject>
 </svg></figure><div className="trig-angle-equations"><div><small>水平成分</small><MathFormula expression={data.fx} display/></div><div><small>鉛直成分</small><MathFormula expression={data.fy} display/></div></div></article>;
}

function SpecialAngleRectangles(){
 const [selectedAngle,setSelectedAngle]=useState(30);
 const selected=specialAngles.find(data=>data.angle===selectedAngle);
 return <section className="trig-special-angles" aria-labelledby="special-angles-title"><header><span>図と式を一緒に確認</span><h2 id="special-angles-title">よく使う角度の <MathFormula expression="F_x"/> と <MathFormula expression="F_y"/></h2><p>角度を一つ選ぶと、斜めの力 <MathFormula expression="F"/> と二つの成分の比、実際の式をまとめて確認できます。</p></header><fieldset className="trig-angle-selector"><legend>表示する角度</legend>{specialAngles.map(data=><label key={data.angle} className={selectedAngle===data.angle?'selected':''}><input type="radio" name="special-angle" value={data.angle} checked={selectedAngle===data.angle} onChange={()=>setSelectedAngle(data.angle)}/><span><MathFormula expression={`${data.angle}°`}/></span></label>)}</fieldset><div className="trig-angle-selected"><SpecialAngleCard data={selected}/></div></section>;
}

function MiniCheck(){
 const [choice,setChoice]=useState(null),answer=1,answered=choice!==null;
 const choices=['v_0 sinθ','v_0 cosθ','v_0 tanθ'];
 return <section className="trig-check"><span>QUICK CHECK</span><h2>物体を水平方向から角度 <MathFormula expression="θ"/>、初速度 <MathFormula expression="v_0"/> で発射する。このとき、初速度の水平方向の成分 <MathFormula expression="v_x"/> は？</h2><div>{choices.map((item,index)=><button key={item} disabled={answered} onClick={()=>setChoice(index)} className={answered&&index===answer?'correct':answered&&index===choice?'wrong':''}><i>{String.fromCharCode(65+index)}</i><MathFormula expression={item}/>{answered&&index===answer&&<Check size={18}/>}</button>)}</div>{answered&&<p className={choice===answer?'correct':'wrong'}><b>{choice===answer?'その通り！':'角度をどこから測ったか確認しよう。'}</b>角度 <MathFormula expression="θ"/> は水平方向から測っています。水平方向は角度に隣り合う成分なので、<MathFormula expression="v_x=v_0 cosθ"/> です。</p>}</section>;
}

export default function TrigonometryGuide(){
 return <article className="trig-guide">
  <a className="trig-back" href="#/learn/part-1-chapter-1-section-1/part-1-chapter-1-section-1-lesson-1-B"><ArrowLeft size={17}/>速度の説明に戻る</a>
  <header className="trig-hero"><div><span>物理のための数学準備</span><h1>sinθ・cosθは、<br/><em>斜めの矢印から成分を取り出す道具。</em></h1><p>三角関数を、公式の暗記ではなく「縦と横のどちらを取り出すか」で理解しよう。</p></div></header>

  <TrigDefinition/>
  <section className="trig-conversation"><Dialogue speaker="ryota">急に <MathFormula expression="sin"/> とか <MathFormula expression="cos"/> が出てきたけど、物理でどうして必要なの？</Dialogue><Dialogue speaker="owl">平面の運動や斜めの力は、そのままだと計算しづらい。物理では一つの斜めの矢印を、<MathFormula expression="x"/> 軸方向と <MathFormula expression="y"/> 軸方向の二つに分けて考えることが多いんだ。</Dialogue><Dialogue speaker="ryota">縦と横に分ければ、それぞれ一直線上の運動として計算できるからか。</Dialogue><Dialogue speaker="owl">そうだ。そして、分けた縦と横が元の矢印の何倍になるかを教えるのが三角関数だ。水平線から角度 <MathFormula expression="θ"/> を測るなら、横は元の大きさの <MathFormula expression="cosθ"/> 倍、縦は <MathFormula expression="sinθ"/> 倍になる。</Dialogue><Dialogue speaker="ryota">でも、速度が <MathFormula expression="5［m/s］"/>、力が <MathFormula expression="10［N］"/> みたいに、最初から数字を入れればよくない？</Dialogue><Dialogue speaker="owl">一つの問題だけならな。だが物理では、速度を <MathFormula expression="v"/>、力を <MathFormula expression="F"/> のように置き、まず変数のまま式を作ることが多い。最後に具体的な数字を入れれば、速さや力が変わっても同じ式を使える。毎回一から計算方法を作り直さなくていいんだ。</Dialogue><Dialogue speaker="ryota">角度も最初から <MathFormula expression="60°"/> と決めず、<MathFormula expression="θ"/> と置いておけばいいのか。</Dialogue><Dialogue speaker="owl">その通り。任意の角度 <MathFormula expression="θ"/> に対して、角度に隣り合う成分を <MathFormula expression="cosθ"/>、角度の向かい側の成分を <MathFormula expression="sinθ"/> で取り出せる。角度が変わっても、式の形は変わらない。だから三角関数が便利なんだ。</Dialogue><Dialogue speaker="ryota">変数のまま使える式を作って、数字は最後に入れるんだね。実際に数を入れるとどうなるの？</Dialogue><Dialogue speaker="owl">では、大きさ <MathFormula expression="10［N］"/> の力を水平から <MathFormula expression="60°"/> 上向きに加えよう。横は <MathFormula expression="F_x=10 cos 60°=5［N］"/>、縦は <MathFormula expression="F_y=10 sin 60°=5√{3}［N］"/> だ。</Dialogue><Dialogue speaker="ryota">斜めの <MathFormula expression="10［N］"/> が、横の <MathFormula expression="5［N］"/> と縦の約 <MathFormula expression="8.7［N］"/> に分かれた。三角関数は、斜めの矢印を計算できる二本の矢印に変える道具なんだね。</Dialogue></section>

  <section className="trig-main-visual"><header><span>力で見る三角関数</span><h2>斜めの力 <MathFormula expression="F⃗"/> を、縦と横に分ける</h2></header><div className="trig-main-layout"><ForceComponentsFigure/><ForceFormulaPanel/></div></section>


  <section className="trig-values-intro trig-conversation"><Dialogue speaker="owl">特に <MathFormula expression="30°"/>、<MathFormula expression="45°"/>、<MathFormula expression="60°"/> はよく使う。図の括弧内は <MathFormula expression="F,F_x,F_y"/> の辺の比、その下は実際に成分を求める式だ。図と式を一枚ずつ見比べよう。</Dialogue></section>
  <SpecialAngleRectangles/>
  <section className="trig-values-dialogue trig-conversation"><Dialogue speaker="ryota">でも、この３つの角度くらいなら三角形の辺の比で分かるよね、 <MathFormula expression="2:√{3}:1"/> とか。　別に <MathFormula expression="sin"/> も <MathFormula expression="cos"/> も使わなくてもいけるよ？</Dialogue><Dialogue speaker="owl">その三つだけならな。だが、辺の比をきれいな根号で求められる具体的な角度は、これくらいしかない。現実の物体がいつも <MathFormula expression="30°"/>、<MathFormula expression="45°"/>、<MathFormula expression="60°"/> で動いてくれると思うか？</Dialogue><Dialogue speaker="ryota">坂が <MathFormula expression="37°"/> だったり、投げる角度が途中で変わったりするもんね。</Dialogue><Dialogue speaker="owl">だから、これからの物理では任意の角度を <MathFormula expression="θ"/> と置き、横を <MathFormula expression="F cosθ"/>、縦を <MathFormula expression="F sinθ"/> と表すことが多い。三角関数なら、角度がどんな値でも同じ形の式で扱える。</Dialogue><Dialogue speaker="ryota">特別な三角形の暗記ではなく、どんな斜めの矢印でも二つの成分に分けられる共通の表現なんだ。</Dialogue></section>

  <section className="trig-angle-rule"><Lightbulb size={25}/><div><h2>大切なのは、角度をどこから測ったか。</h2><p>ここでは <MathFormula expression="θ"/> を水平線から測っています。だから、角に隣り合う水平成分が <MathFormula expression="F cosθ"/>、向かい側の鉛直成分が <MathFormula expression="F sinθ"/> です。角度を鉛直線から測れば、sinとcosの役割は入れ替わります。</p></div></section>

  <MiniCheck/>
  <a className="trig-return" href="#/learn/part-1-chapter-1-section-1/part-1-chapter-1-section-1-lesson-1-B">平面上の速度へ戻る <ArrowRight size={17}/></a>
 </article>;
}
