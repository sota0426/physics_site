import React from 'react';
import MathFormula from './MathFormula';
import SotaCharacter from './SotaCharacter';
import './boyle-charles.css';
import './absolute-temperature.css';

const sections=[
 {
  id:'boyle',number:'01',eyebrow:'ROBERT BOYLE / 1662',title:'①ロバート・ボイル：空気を抜いて、空気を調べた',lead:'見えない空気を「何もない」で済ませず、装置をつくって確かめた。',image:'/assets/boyle-air-pump-ai.png',alt:'17世紀の実験室で、ボイルとフックがガラス容器につないだ空気ポンプを動かしている場面',
  turns:[
   ['ryota','ボイルって、結局どんな人？　法則に名前が残った偉い人、だけだと覚えにくいんだけど。'],
   ['owl','一言でいえば、「見えない空気を、実験できる相手にした人」だ。ロバート・フックと空気ポンプを改良し、容器から空気を抜いて何が起こるかを次々に試した。'],
   ['ryota','何を入れて試したの？'],
   ['owl','ろうそく、音を出すもの、それに鳥やネズミなどだ。当時は容器の空気を抜き、生き物の呼吸が苦しくなり、死ぬ場合もあることを観察した。現代の感覚ではかなり乱暴な実験だな。'],
   ['ryota','うわ……。「空気がないと困る」を、本当に空気を抜いて確かめたのか。'],
   ['owl','そうだ。空気は目に見えなくても、呼吸や燃焼に必要で、圧力をもつ。ボイルは思いつきを言うだけでなく、測って確かめる実験を重視した。'],
   ['ryota','それが圧力と体積の研究につながった？'],
   ['owl','温度を変えず、一定量の気体を押し縮めると、体積が小さくなるほど圧力は大きくなる。体積を半分にすれば、圧力は二倍だ。'],
   ['ryota','圧力と体積は反対向きに変化するんだね。'],
   ['owl','だから積は一定になる。これがボイルの法則だ。大切なのは「温度一定」という条件を落とさないことだぞ。']
  ]
 },
 {
  id:'charles',number:'02',eyebrow:'JACQUES CHARLES / 1780s',title:'②ジャック・シャルル：空を飛ぶため、気体の変化を追った',lead:'水素気球へ挑んだ飛行家の好奇心が、温度と体積の関係へつながる。',image:'/assets/charles-balloon-ai.png',alt:'1783年のパリで、シャルルたちが球形の水素気球を飛ばそうとしている場面',
  turns:[
   ['ryota','シャルルも、ずっと研究室で気体を測っていた人？'],
   ['owl','それだけじゃない。物理学者であり発明家、そして自分でも空へ上がった飛行家だ。1783年、シャルルたちは世界初期の水素気球を飛ばした。'],
   ['ryota','えっ、すごい！ でも、水素って火がつくと爆発するよね？ そんなもので空を飛んで大丈夫だったの？'],
   ['owl','そもちろん危険だった。水素は空気よりずっと軽いから気球を浮かせることができる。でも、非常に燃えやすい。実際、その後には水素を使った気球の火災で亡くなった人もいるんだ。'],
   ['ryota','命がけだったんだね……。でも、気球の話がどうして「温度と体積の法則」につながるの？'],
   ['owl','いい質問だ。水素気球は軽い気体を利用するけれど、空気を温めて浮かぶ「熱気球」もあるだろう？　実は、気体には温めると膨張し、冷やすと収縮するという性質がある。シャルルは、気体の温度と体積の関係についても研究していたんだ。'],
   ['ryota','じゃあ、セルシウス温度が二倍なら体積も二倍？　20 ℃から40 ℃なら二倍？'],
   ['owl','そこが落とし穴だ。比例に使うのはセルシウス温度ではなく、絶対温度だ。20 ℃は293 K、40 ℃は313 Kだから、二倍ではない。'],
   ['ryota','絶対温度って、急にどこから出てきたの？'],
   ['owl','気体の体積とセルシウス温度の直線を低温側へ延ばすと、約−273 ℃で体積が0になるように見える。その温度を0 Kとする目盛りが絶対温度だ。実際の気体はその前に液体になるから、これは理想化した外挿だぞ。'],
   ['ryota','つまり、絶対温度に直してからなら、温度と体積をまっすぐ比例で扱えるんだ。'],
   ['owl','その通り。これがシャルルの法則だ。条件は「圧力一定」、温度は必ずケルビンで扱う。']
  ]
 },
 {
  id:'combined',number:'03',eyebrow:'BOYLE–CHARLES LAW',title:'二人の発見を、一つの式にまとめる',lead:'圧力・体積・絶対温度の三つを同時に見れば、気体の状態変化を追える。'
 }
];

function RichText({children}){
 const parts=String(children).split(/(\[\[[^\]]+\]\])/g);
 return parts.map((part,index)=>part.startsWith('[[')&&part.endsWith(']]')?<MathFormula key={index} expression={part.slice(2,-2)}/>:part);
}

function Dialogue({turns}){
 return <div className="concept-dialogue-list boyle-charles-dialogue">{turns.map(([speaker,text],index)=><div className={`concept-dialogue-turn ${speaker} ${speaker==='owl'?'strong':''}`} key={index}>{speaker==='owl'?<img src="/assets/vector-owl.png" alt="案内役のフクロウ"/>:<SotaCharacter/>}<div><p><RichText>{text}</RichText></p></div></div>)}</div>;
}

function BoyleDiagram(){
 return <div className="gas-law-board boyle-board"><div className="gas-law-state"><span>押す前</span><div className="piston-box wide"><i/><i/><i/><i/><i/><i/></div><MathFormula expression="p_1,\ V_1"/></div><b className="law-change">押し縮める<br/><em>温度は一定</em></b><div className="gas-law-state"><span>押した後</span><div className="piston-box narrow"><i/><i/><i/><i/><i/><i/></div><MathFormula expression="p_2,\ V_2"/></div><div className="law-formula-card"><small>ボイルの法則</small><MathFormula expression="pV=一定" display/><MathFormula expression="p_1V_1=p_2V_2" display/><p>体積が小さくなるほど、圧力は大きくなる。</p></div></div>;
}

function CharlesDiagram(){
 return <div className="charles-law-board"><div className="kelvin-card"><small>セルシウス温度から絶対温度へ</small><MathFormula expression="T［K］=t［℃］+273" display/><MathFormula expression="0［K］=-273［℃］"/><p>1度ぶんの幅は同じまま、温度の原点を移す。</p></div><div className="law-formula-card"><small>シャルルの法則</small><MathFormula expression="V/T=一定" display/><MathFormula expression="V_1/T_1=V_2/T_2" display/><p>圧力一定なら、体積は絶対温度に比例する。</p></div></div>;
}

function CharlesObservation(){
 return <div className="charles-observation"><div className="balloon-state cold"><span>冷やす</span><i/><MathFormula expression="t_1,\ V_1"/></div><b>圧力は一定</b><div className="balloon-state hot"><span>温める</span><i/><MathFormula expression="t_2,\ V_2"/></div><div className="observation-note"><small>シャルルが捉えた関係</small><strong>温度が高いほど<br/>気体の体積は大きい</strong><p>では、「温度に比例する」と正しく表すには、どの温度を使えばよい？</p></div></div>;
}

function TemperatureOriginGraph(){
 return <figure className="temperature-origin-graph" aria-labelledby="temperature-origin-title"><figcaption><small>OBSERVATION → NEW ORIGIN</small><h4 id="temperature-origin-title">同じ直線を、二つの温度目盛りで見る</h4><p>圧力一定・一定量の気体。0 ℃での体積を <MathFormula expression="V_0"/> とする。</p></figcaption><div className="temperature-graph-panels"><div className="temperature-graph-panel celsius-panel"><strong>まず、セルシウス温度で測る</strong><svg viewBox="0 0 720 380" role="img" aria-label="セルシウス温度と気体の体積の関係。直線は0度でV0を通り、マイナス273度で横軸と交わる"><defs><marker id="axis-arrow-c" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#617b6d"/></marker></defs><path className="temperature-axis" d="M68 310H665" markerEnd="url(#axis-arrow-c)"/><path className="temperature-axis" d="M425 330V45" markerEnd="url(#axis-arrow-c)"/><path className="temperature-law-line extension" d="M105 310L425 185"/><path className="temperature-law-line measured" d="M425 185L625 107"/><path className="temperature-guide" d="M425 185H105"/><circle className="temperature-point" cx="425" cy="185" r="8"/><circle className="temperature-point small" cx="540" cy="140" r="6"/><text x="25" y="50">体積 V</text><text x="625" y="355">t［℃］</text><text x="75" y="343">−273</text><text x="414" y="345">0</text><text x="365" y="175">V₀</text><text x="455" y="95" className="graph-note">1 ℃ごとに V₀/273 増加</text><text x="120" y="285" className="graph-note muted">測定直線を延長</text></svg><div className="graph-equation"><MathFormula expression="V=V_0(1+t/273)" display/><p>直線ではあるが、セルシウス温度の原点 <b>0 ℃</b> では体積が <MathFormula expression="V_0"/>。したがって <MathFormula expression="V"/> と <MathFormula expression="t"/> は比例しない。</p></div></div><div className="origin-shift" aria-hidden="true"><span>原点を<br/>−273 ℃へ移す</span><b>→</b><small>1目盛りの幅は同じ</small></div><div className="temperature-graph-panel kelvin-panel"><strong>新しい原点を0 Kとする</strong><svg viewBox="0 0 720 380" role="img" aria-label="絶対温度と気体の体積の関係。直線は原点を通る"><defs><marker id="axis-arrow-k" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#617b6d"/></marker></defs><path className="temperature-axis" d="M92 310H665" markerEnd="url(#axis-arrow-k)"/><path className="temperature-axis" d="M92 330V45" markerEnd="url(#axis-arrow-k)"/><path className="temperature-law-line measured" d="M92 310L625 95"/><path className="temperature-guide" d="M415 180H92"/><circle className="temperature-point" cx="415" cy="180" r="8"/><text x="25" y="50">体積 V</text><text x="625" y="355">T［K］</text><text x="80" y="345">0</text><text x="390" y="345">273</text><text x="42" y="300" className="graph-note">0 K</text><text x="330" y="170">V₀</text><text x="425" y="210" className="graph-note">0 ℃ = 273 K</text></svg><div className="graph-equation"><MathFormula expression="T［K］=t［℃］+273" display/><p>原点を移すと直線は <b>原点を通る</b>。これで体積 <MathFormula expression="V"/> は絶対温度 <MathFormula expression="T"/> に比例する。</p></div></div></div></figure>;
}

function AbsoluteTemperaturePicture(){
 return <figure className="absolute-temperature-picture" aria-labelledby="absolute-picture-title"><figcaption><small>PICTURE GUIDE</small><h4 id="absolute-picture-title">同じ圧力なら、温度が高いほど体積が大きくなる</h4><p>三つの容器には同じ個数の気体分子が入っている。温めるほどピストンが押し上げられ、気体の体積が大きくなる。</p></figcaption><div className="absolute-picture-frame piston-only"><img src="/assets/absolute-temperature-origin-ai.png" alt="同じ量の気体を入れた三つのピストン。温度を上げるほど、一定圧力のもとで気体の体積が大きくなる"/><div className="gas-state-caption state-cold"><strong>低温</strong><span>体積が小さい</span></div><div className="gas-state-caption state-zero"><strong>基準</strong><MathFormula expression="0［℃］"/></div><div className="gas-state-caption state-warm"><strong>高温</strong><span>体積が大きい</span></div></div></figure>;
}

function TemperatureVolumeGraphPicture(){
 return <figure className="temperature-volume-picture" aria-labelledby="temperature-volume-title"><figcaption><small>CELSIUS → KELVIN</small><h4 id="temperature-volume-title">なぜ絶対温度を使うと、比例になるのか</h4><p>ポイントは、セルシウス温度の式に現れた <MathFormula expression="t+273"/> を、一つの温度として扱うこと。</p></figcaption><div className="temperature-volume-art"><img src="/assets/temperature-volume-graphs-ai.png" alt="気体の体積と温度の関係を表す二つのグラフ。セルシウス温度では直線が原点を通らず、絶対温度では原点を通る"/><div className="graph-panel-title graph-title-c">セルシウス温度 <MathFormula expression="t［℃］"/></div><div className="graph-panel-title graph-title-k">絶対温度 <MathFormula expression="T［K］"/></div><div className="graph-label graph-c-volume"><MathFormula expression="V"/></div><div className="graph-label graph-c-zero"><MathFormula expression="0［℃］, V_0"/></div><div className="graph-label graph-c-limit"><MathFormula expression="-273［℃］"/></div><div className="graph-label graph-k-volume"><MathFormula expression="V"/></div><div className="graph-label graph-k-origin"><MathFormula expression="0［K］"/></div><div className="graph-label graph-k-zero"><MathFormula expression="273［K］, V_0"/></div></div><div className="absolute-proof-flow"><header><small>式で確かめよう</small><strong>複雑な式から、比例の式へ</strong></header><section><b>1</b><div><small>測定結果をセルシウス温度で表す</small><MathFormula expression="V=V_0(1+\frac{t}{273})" display/><p><MathFormula expression="V_0"/> は0 ℃での体積。</p></div></section><section><b>2</b><div><small><MathFormula expression="t+273"/> のまとまりをつくる</small><MathFormula expression="V=\frac{V_0}{273}(t+273)" display/><p>この <MathFormula expression="t+273"/> を一つの温度として扱えば、式がすっきりしそうだ。</p></div></section><section><b>3</b><div><small>そこで、絶対温度を定義する</small><MathFormula expression="T［K］=t［℃］+273" display/><MathFormula expression="V=\frac{V_0}{273}T" display/><p><MathFormula expression="V_0/273"/> は０℃の温度および体積であり、変化しない値。ここで両辺を <MathFormula expression="T"/> で割ると</p><MathFormula expression="\frac{V}{T}=\frac{V_0}{273}=一定" display/><strong>体積 <MathFormula expression="V"/> は、絶対温度 <MathFormula expression="T"/> に比例する。</strong></div></section></div></figure>;
}

function AbsoluteTemperatureSection(){
 const turns=[
  ['ryota','温度を上げると体積が直線的に増えているね。セルシウス温度 [[t]] と体積 [[V]] の関係は、どんな式になるの？'],
  ['owl','0 ℃での体積を [[V_0]] とする。測定すると、1 ℃上がるごとに体積は約 [[V_0/273]] ずつ増えた。だから数式で表すなら [[V=V_0(1+\\frac{t}{273})=V_0×\\frac{273+t}{273}]] となる。'],
  ['ryota','むずっ！　ここで急に [[273]] が出てくるんだ。毎回これを書くの、気持ち悪いな。273を消してしまいたい。'],
  ['owl','その違和感は悪くない。だが勝手に消すな！　その273は、測定した直線を低温側へ延ばすと、約−273 ℃で体積が0になることから現れる。'],
  ['ryota','じゃあ、その−273 ℃を温度の新しい0にすれば、式がすっきりするんじゃない？'],
  ['owl','そうだ。セルシウス温度の0は、水が凍る温度を基準にした便利な区切りにすぎない。そこで測定直線を低温側へ延長し、横軸と交わる約−273 ℃を新しい原点にした。'],
  ['ryota','温度の原点だけを−273 ℃へ移して、1度ぶんの目盛りの幅はセルシウス温度と同じにしたんだ。'],
  ['owl','その新しい温度が絶対温度だ。単位はケルビンで、[[T［K］=t［℃］+273]]。0 ℃は273 K、27 ℃は300 Kになる。'],
  ['ryota','ちょっと待って。最初の式にも [[273+t]] が出ていたよね。これって、今つくった絶対温度 [[T=t+273]] と同じものじゃない？'],
  ['owl','やっと気づいたか。[[273+t=T]] だから、[[V=V_0×\\frac{273+t}{273}]] は [[V=\\frac{V_0}{273}T]] と書き直せる。'],
  ['ryota','かなりすっきりした！　でも、分母の [[273]] はまだ残っているよ。'],
  ['owl','[[V_0]] も [[273]] も、温度を変える途中では変わらない。だから [[\\frac{V_0}{273}]] は一つの「一定の値」としてまとめてよい。両辺を [[T]] で割れば、[[\\frac{V}{T}=一定]] だ。'],
  ['ryota','なるほど。変化する [[V]] と [[T]] だけを左側に残せたんだ。二つの状態なら [[\\frac{V_1}{T_1}=\\frac{V_2}{T_2}]] と書けて、もう273を毎回使わなくていい！'],
  ['owl','そういうことだ。これで「圧力が一定なら、体積は絶対温度に比例する」と式から読める。これがシャルルの法則だ。'],
  ['ryota','絶対温度は急に出てきた記号じゃなくて、気体の変化を原点から素直な比例で表すための温度なんだね。'],
  ['owl','その通り。これで、圧力一定なら [[V/T=一定]] と正確に書ける。これがシャルルの法則だ。']
 ];
 return <section className="boyle-charles-step absolute-step"><header><span>FROM CELSIUS TO KELVIN</span><small>STEP 03</small><h3>③絶対温度：気体が教えた、新しいゼロ点</h3><p>温度と体積のグラフを低温側へ延ばし、比例に適した温度の目盛りをつくる。</p></header><AbsoluteTemperaturePicture/><TemperatureVolumeGraphPicture/><Dialogue turns={turns}/><aside className="absolute-zero-note"><b>※ 絶対零度とは</b><p><MathFormula expression="0［K］"/> は温度の理論上の下限なので、絶対零度と呼ばれる。ただし、実際の気体は <MathFormula expression="0［K］"/> になる前に液体や固体になる。</p></aside><CharlesDiagram/></section>;
}

function CombinedSection(){
 const section=sections[2];
 return <section className="boyle-charles-step combined-step"><header><span>{section.eyebrow}</span><small>STEP 04</small><h3>④二人の発見を、一つの式にまとめる</h3><p>{section.lead}</p></header><Dialogue turns={[
  ['ryota','ボイルは温度を一定にして圧力と体積、シャルルは圧力を一定にして温度と体積を見た。別々に覚えるしかない？'],
  ['owl','一定量の気体なら、二つを一つにできる。圧力と体積の積を絶対温度で割った値が一定だ。これがボイル・シャルルの法則だ。'],
  ['ryota','状態1から状態2へ変わる前後で、同じ式を立てればいいんだね。'],
  ['owl','そうだ。ただし温度は必ずケルビン、そして気体の量は変わらないという条件を確認しろ。式を暗記する前に、何を一定とした法則かを言えるようになれ。']
 ]}/><div className="combined-law-panel"><div><small>一定量の気体</small><MathFormula expression="pV/T=一定" display/></div><span>状態1</span><i>→</i><span>状態2</span><div className="combined-main-formula"><MathFormula expression="p_1V_1/T_1=p_2V_2/T_2" display/></div><ul><li><b>ボイル</b>：<MathFormula expression="T"/> 一定なら <MathFormula expression="pV"/> 一定</li><li><b>シャルル</b>：<MathFormula expression="p"/> 一定なら <MathFormula expression="V/T"/> 一定</li></ul></div></section>;
}

export default function BoyleCharlesLesson(){
 const transitionTurns=[...sections[1].turns.slice(0,6),['ryota','温度が高いほど体積が大きい。気球が気体の法則につながるの、ちょっと面白いね。'],['owl','ただし「温度に比例する」と言うには、普段のセルシウス温度では都合が悪い。測定した値をグラフにして、その理由を追うぞ。']];
 return <section className="boyle-charles-lesson"><header className="boyle-charles-intro"><span>GAS LAWS</span><h2>空気を押し、温め、空へ飛んだ人たち。</h2><p>二人の実験の物語から、圧力・体積・絶対温度の関係をつかむ。</p></header>{sections.slice(0,2).map((section,index)=><section className={`boyle-charles-step ${section.id}`} key={section.id}><header><span>{section.eyebrow}</span><small>STEP {section.number}</small><h3>{section.title}</h3><p>{section.lead}</p></header><Dialogue turns={index===1?transitionTurns:section.turns}/><figure className="boyle-charles-art"><img src={section.image} alt={section.alt}/></figure>{index===0?<BoyleDiagram/>:<CharlesObservation/>}</section>)}<AbsoluteTemperatureSection/><CombinedSection/><div className="dialogue-takeaway boyle-charles-takeaway"><small>二人がつかんだこと</small><strong>一定量の気体では、<MathFormula expression="pV/T=一定"/>。二つの状態を比べると <MathFormula expression="p_1V_1/T_1=p_2V_2/T_2"/>。温度には絶対温度 <MathFormula expression="T［K］=t［℃］+273"/> を使う。</strong></div></section>;
}
