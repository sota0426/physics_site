import React,{useState} from 'react';
import {MapPin,Route,X} from 'lucide-react';
import MathFormula from './MathFormula';
import SotaCharacter from './SotaCharacter';

function GroundScene(){
 return <figure className="displacement-scene" aria-label="少年が東へ3メートル、北へ3メートル歩いた経路と、始点から落とし物までの変位を比較する図">
  <div className="displacement-scene-art">
   <img src="/assets/displacement-ground-ai.png" alt="学校のグラウンドで、左下の少年が右上の落とし物を見つけている"/>
   <svg viewBox="0 0 1672 941" role="img" aria-hidden="true">
    <defs><marker id="displacement-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 10 5 0 10Z" fill="currentColor"/></marker></defs>
    <path d="M292 783H1315V282" className="walked-route"/><path d="M292 783L1315 282" className="displacement-arrow"/><circle cx="292" cy="783" r="18" className="start-point"/>
    <g className="scene-tag"><rect x="220" y="820" width="190" height="58" rx="24"/><text x="315" y="858">スタート</text></g>
    <g className="scene-tag goal"><rect x="1270" y="187" width="205" height="58" rx="24"/><text x="1372" y="225">落とし物</text></g>
    <g className="scene-tag route-east"><rect x="675" y="790" width="250" height="60" rx="25"/><text x="800" y="830">東へ 3［m］</text></g>
    <g className="scene-tag route-north"><rect x="1325" y="490" width="250" height="60" rx="25"/><text x="1450" y="530">北へ 3［m］</text></g>
    <foreignObject x="620" y="430" width="460" height="48"><div xmlns="http://www.w3.org/1999/xhtml" className="svg-equation ai-scene-equation"><span>変位：北東へ</span><MathFormula expression="3√{2}［m］"/></div></foreignObject>
    <foreignObject x="560" y="842" width="570" height="74"><div xmlns="http://www.w3.org/1999/xhtml" className="ai-scene-distance">移動距離：<MathFormula expression="3［m］+3［m］=6［m］"/></div></foreignObject>
   </svg>
  </div>
 </figure>;
}

function Speech({role,children,strong=false}){
 return <div className={`lesson-speech ${role}${strong?' strong':''}`}>{role==='owl'?<img src="/assets/vector-owl.png" alt="案内役のフクロウ"/>:<SotaCharacter/>}<div><p>{children}</p></div></div>;
}

function NotationHint({onClose}){
 return <div className="notation-hint-backdrop" onClick={onClose} role="presentation"><section className="notation-hint-modal" role="dialog" aria-modal="true" aria-labelledby="displacement-notation-title" onClick={event=>event.stopPropagation()}><button className="notation-hint-close" onClick={onClose} aria-label="ヒントを閉じる"><X size={18}/></button><span>※ 記号のヒント</span><h3 id="displacement-notation-title">変位ベクトルの式を一つずつ読む</h3><div><article><MathFormula expression="Δr⃗ = r⃗₂ − r⃗₁"/><p><b>変位ベクトル</b>　Δ（デルタ）は変化量を表し、ここでは「最初の位置から最後の位置への変化」という意味です。矢印は、向きも含むベクトルであることを表します。</p></article><article><MathFormula expression="|Δr⃗|"/><p><b>変位の大きさ</b>　両側の縦線は絶対値を表します。ここでは変位ベクトルの向きを除き、矢印の長さだけを表します。</p></article><article><MathFormula expression="√{3² + 3²}［m］ = 3√{2}［m］"/><p><b>数値を求める</b>　直角三角形として長さを計算します。単位は数値の後ろに［ ］で示します。</p></article></div></section></div>;
}

export default function DisplacementDialogue(){
 const [showHint,setShowHint]=useState(false);
 return <section className="displacement-dialogue">
  <div className="displacement-conversation"><span className="eyebrow">GROUND CONVERSATION</span><h2>落とし物は、どこ？</h2><Speech role="boy">スタートから東へ3［m］行って、それから北へ3［m］進んだところ！</Speech><Speech role="owl" strong>道順を最初から実況するな！　知りたいのは、スタートから見て落とし物が「どちらに、どれだけ離れているか」だ。</Speech><Speech role="boy">じゃあ、「北東の方向へ、まっすぐ<MathFormula expression="3√{2}［m］"/>」って言えばいい？</Speech><Speech role="owl">そう。それが変位だ。歩いた長さの6［m］は移動距離。変位は、始点から終点へ引いた一本の矢印だ。</Speech></div>
  <GroundScene/>
  <section className="displacement-use"><div className="displacement-definition-row"><MapPin size={21}/><span><small>変位の定義</small><strong>変位とは、物体の最初の位置から最後の位置までの「位置の変化」を表すベクトルです。</strong><p>向きは最初の位置から最後の位置へ、大きさは二つの位置を結ぶ直線の長さです。</p></span></div><div className="displacement-example"><small>使うときの例</small><p>待ち合わせ場所や落とし物の場所を、出発点から見て「どちらに、どれだけ離れているか」と表すとき。</p></div></section>
  <div className="distance-comparison"><article><Route/><span><small>移動距離</small><strong><MathFormula expression="3［m］ + 3［m］ = 6［m］"/></strong><p>実際に通った道の長さ。向きをもちません。</p></span></article><article><MapPin/><span><small>変位の大きさ</small><strong><MathFormula expression="|Δr⃗| = 3√{2}［m］"/></strong><p>始点から終点までを、一直線で測った長さです。</p><button className="notation-hint-trigger" onClick={()=>setShowHint(true)}>※ 記号のヒントを見る</button></span></article></div>
  {showHint&&<NotationHint onClose={()=>setShowHint(false)}/>} 
 </section>;
}
