import React from 'react';

const marker=<defs><marker id="fd-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 10 5 0 10Z"/></marker></defs>;
const ground=<path d="M35 245H515" className="fd-line"/>;
const arrow=(d,label,x,y,warm=false)=><g><path d={d} className={warm?'fd-warm-vector':'fd-vector'}/><text x={x} y={y}>{label}</text></g>;
const cart=(x,y,label)=><g><rect x={x} y={y} width="92" height="52" rx="13" className="fd-object"/><circle cx={x+22} cy={y+58} r="9" className="fd-fill"/><circle cx={x+70} cy={y+58} r="9" className="fd-fill"/><text x={x+39} y={y+32}>{label}</text></g>;

function Circular({id}){
 if(id==='gravity'||id==='gravity-potential')return <><circle cx="195" cy="150" r="68" className="fd-earth"/><circle cx="405" cy="150" r="22" className="fd-object"/><path d="M265 150H380" className="fd-line measure"/><path d="M395 150H280" className="fd-warm-vector"/><text x="180" y="158">M</text><text x="398" y="157">m</text><text x="320" y="138">r</text><text x="325" y="180">F</text>{id==='gravity-potential'&&<>{arrow('M405 112V48','U↑',418,70)}</>}</>;
 if(id==='kepler')return <><ellipse cx="275" cy="150" rx="190" ry="92" className="fd-line"/><circle cx="160" cy="150" r="27" className="fd-sun"/><circle cx="445" cy="110" r="13" className="fd-object"/><path d="M85 270H465" className="fd-line measure"/><text x="266" y="260">2a</text>{arrow('M445 110l-45-35','v',405,61)}<text x="137" y="158">中心天体</text></>;
 return <><circle cx="270" cy="150" r="92" className="fd-line"/><circle cx="270" cy="150" r="6" className="fd-fill"/><circle cx="350" cy="104" r="13" className="fd-object"/><path d="M270 150 350 104" className="fd-line measure"/>{arrow('M350 104V35','v',362,57)}{arrow('M350 104 294 136',id==='circle-acceleration'?'a':'中心',302,103,true)}<text x="305" y="135">r</text>{id==='circle-period'&&<text x="110" y="45">1周 = T</text>}{id==='circle-speed'&&<text x="110" y="45">角速度 ω</text>}</>;
}

function Linear({id}){
 if(id==='relative-velocity')return <>{ground}{cart(78,170,'A')}{cart(360,170,'B')}{arrow('M90 145H220','V_A',137,132)}{arrow('M372 145H500','V_B',420,132)}<path d="M132 165q18-30 36 0" className="fd-eye"/><circle cx="150" cy="155" r="4" className="fd-fill"/><path d="M170 95H345" className="fd-warm-vector"/><text x="205" y="80">Aから見たB　V_AB</text><text x="105" y="278">観測者A</text><text x="387" y="278">物体B</text></>;
 if(id.startsWith('constant-a'))return <>{ground}{[80,215,385].map((x,i)=><g key={x}><circle cx={x} cy="224" r="13" className="fd-object"/><path d={`M${x} 205H${x+45+i*20}`} className="fd-vector"/></g>)}<text x="62" y="190">t=0, v₀</text><text x="195" y="190">t</text><text x="375" y="190">v</text><path d="M80 282H385" className="fd-line measure"/><text x="215" y="274">Δx</text>{arrow('M250 100H390','a',305,85,true)}</>;
 if(id==='work')return <>{ground}<rect x="205" y="170" width="105" height="75" rx="12" className="fd-object"/>{arrow('M258 168 405 75','F',354,91)}{arrow('M258 155H455','Δx',355,143,true)}<path d="M320 155A62 62 0 0 0 307 119" className="fd-line"/><text x="333" y="125">θ</text></>;
 if(id==='mechanical-energy')return <><path d="M40 235Q165 45 300 165T520 230" className="fd-hill"/><circle cx="135" cy="92" r="14" className="fd-object"/><circle cx="430" cy="202" r="14" className="fd-object"/><path d="M72 92V235" className="fd-line measure"/><text x="47" y="170">h</text><text x="105" y="65">mgh</text>{arrow('M430 182H505','v',466,170)}<text x="390" y="255">½mv²</text></>;
 return <>{ground}<rect x="215" y="160" width="115" height="85" rx="14" className="fd-object"/>{arrow('M330 202H480','F',397,188)}{arrow('M215 202H82',id.includes('friction')?'f':'反対向き',95,188,true)}{arrow('M272 158V65','N',286,90)}{arrow('M272 245V292','mg',286,280,true)}{id==='newton'&&<text x="360" y="235">a</text>}</>;
}

function Fluid({id}){
 if(id==='pressure')return <><rect x="180" y="115" width="190" height="105" rx="12" className="fd-object"/><rect x="155" y="220" width="240" height="18" className="fd-surface"/>{arrow('M275 45V108','F',290,75,true)}<path d="M180 255H370" className="fd-line measure"/><text x="268" y="277">面積 S</text><text x="240" y="165">押す物体</text></>;
 if(id==='hydrostatic')return <><path d="M105 45V255H445V45" className="fd-container"/><rect x="108" y="90" width="334" height="162" className="fd-water"/><path d="M90 90H460" className="fd-line"/><path d="M300 90V220" className="fd-line measure"/><text x="315" y="160">深さ h</text><text x="120" y="78">水面 p₀</text>{arrow('M300 220H405','p',355,207,true)}<text x="125" y="235">密度 ρ</text></>;
 return <><path d="M105 45V255H445V45" className="fd-container"/><rect x="108" y="105" width="334" height="147" className="fd-water"/><rect x="220" y="75" width="110" height="120" rx="16" className="fd-object"/>{arrow('M275 135V42','F浮',290,70)}{arrow('M275 135V240','mg',290,220,true)}<text x="130" y="230">ρ流体</text><text x="337" y="180">V排除</text></>;
}

function Spring({id}){
 return <><path d="M45 55H115V150" className="fd-wall"/><path d="M115 150h35l15-30 25 60 25-60 25 60 25-60 25 60 15-30h40" className="fd-line"/><rect x="365" y="105" width="95" height="90" rx="14" className="fd-object"/><path d="M412 215H495" className="fd-line measure"/><text x="450" y="205">x</text>{arrow('M365 150H265',id==='hooke'?'Fₓ':'a',290,137,true)}{id.startsWith('shm-')&&<>{arrow('M412 82H495','v',452,68)}<text x="50" y="265">つりあい位置を中心に往復</text></>}</>;
}

function Rotation(){return <><path d="M75 180H470" className="fd-beam"/><path d="M255 180l-42 70h84Z" className="fd-pivot"/><path d="M410 65V170" className="fd-warm-vector"/><text x="423" y="105">F</text><path d="M255 215H410" className="fd-line measure"/><text x="327" y="207">ℓ</text><text x="235" y="278">支点</text></>}

function Collision({id}){
 if(id==='impulse')return <>{ground}{cart(80,170,'m')}<path d="M285 135V235" className="fd-wall"/>{arrow('M175 145H270','v',210,130)}{arrow('M270 95H180','F平均',195,80,true)}<text x="325" y="150">接触時間 Δt</text></>;
 return <>{ground}{cart(75,170,'1')}{cart(365,170,'2')}{arrow('M175 145H275',id==='restitution'?'v₁':'p₁',210,130)}{arrow('M365 115H285',id==='restitution'?'v₂':'p₂',300,100,true)}<path d="M275 70V235" className="fd-dash"/><text x="240" y="55">衝突前 ／ 衝突後</text></>;
}

function MechanicsScene({formula}){
 const id=formula.id;
 if(['pressure','hydrostatic','buoyancy'].includes(id))return <Fluid id={id}/>;
 if(['hooke','shm-position','shm-velocity','shm-acceleration'].includes(id))return <Spring id={id}/>;
 if(id==='moment')return <Rotation/>;
 if(['momentum','impulse','restitution'].includes(id))return <Collision id={id}/>;
 if(['circle-period','circle-speed','circle-acceleration','kepler','gravity','gravity-potential'].includes(id))return <Circular id={id}/>;
 return <Linear id={id}/>;
}

function GenericScene({category}){
 if(category==='熱力学')return <><rect x="90" y="55" width="370" height="190" rx="18" className="fd-container"/><path d="M90 95H460" className="fd-line"/>{[[145,145],[220,195],[300,140],[390,190]].map(([x,y])=><circle key={x} cx={x} cy={y} r="9" className="fd-particle"/>)}<text x="120" y="80">p, V, T</text></>;
 if(category==='波動')return <><path d="M35 150C75 65 115 65 155 150s80 85 120 0 80-85 120 0 80 85 120 0" className="fd-wave"/><path d="M155 245H275" className="fd-line measure"/><text x="207" y="232">λ</text></>;
 if(category==='電磁気学')return <><circle cx="150" cy="150" r="32" className="fd-object"/><text x="140" y="158">Q</text>{[-55,-25,0,25,55].map(a=><path key={a} d={`M185 150Q290 ${150+a} 455 ${150+a}`} className="fd-vector"/>)}<text x="320" y="90">E, B</text></>;
 return <><circle cx="270" cy="150" r="25" className="fd-nucleus"/><ellipse cx="270" cy="150" rx="120" ry="58" className="fd-line"/><circle cx="380" cy="125" r="11" className="fd-particle"/><path d="M45 75c25-38 50 38 75 0s50 38 75 0" className="fd-wave"/><text x="92" y="45">hν</text></>;
}

export default function FormulaDiagram({formula}){
 return <figure className="formula-visual"><svg viewBox="0 0 550 310" role="img" aria-label={`${formula.name}を表す模式図`}>{marker}{formula.category==='力学'?<MechanicsScene formula={formula}/>:<GenericScene category={formula.category}/>}</svg></figure>;
}
