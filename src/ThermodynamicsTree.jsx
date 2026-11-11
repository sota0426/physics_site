import React from 'react';
import {Check, Flame, Play, Star} from 'lucide-react';
import {subunitsFor} from './Subunits';
import {completedConcepts} from './learning-progress';

const chapterMaps={
 'part-2-chapter-1':{
  route:'PHYSICS BASICS',subtitle:'物理基礎の熱を、物理の熱力学へつなぐ',goal:'熱とエネルギーの移動を\n説明できる',height:780,
  nodes:[
   {key:'temperature',unit:0,x:500,y:650,title:'熱と温度',caption:'温度と熱を区別する'},
   {key:'conservation',unit:1,x:500,y:505,title:'熱量の保存',caption:'受け取る熱と失う熱を結ぶ',prereqs:['temperature']},
   {key:'phase',unit:2,x:500,y:360,title:'物質の状態変化',caption:'潜熱と温度変化を考える',prereqs:['conservation']},
   {key:'use',unit:3,x:500,y:215,title:'熱の利用',caption:'熱・仕事・内部エネルギー',prereqs:['phase']},
  ],edges:[['temperature','conservation'],['conservation','phase'],['phase','use'],['use','goal']],goalPrereqs:['use']
 },
 'part-2-chapter-2':{
  route:'MACROSCOPIC VIEW',subtitle:'目に見える圧力・体積・温度を一つの式へ',goal:'気体の状態を\np・V・Tで表せる',height:660,
  nodes:[
   {key:'pressure',unit:0,x:500,y:530,title:'気体の圧力',caption:'気体が面を押すはたらき'},
   {key:'boyle',unit:1,x:500,y:360,title:'ボイル・シャルルの法則',caption:'p・V・Tの変化を比べる',prereqs:['pressure']},
   {key:'ideal',unit:2,x:500,y:200,title:'理想気体の状態方程式',caption:'pV=nRTで状態を結ぶ',prereqs:['boyle']},
  ],edges:[['pressure','boyle'],['boyle','ideal'],['ideal','goal']],goalPrereqs:['ideal']
 },
 'part-2-chapter-3':{
  route:'MICROSCOPIC VIEW',subtitle:'見えない分子の運動から、温度とエネルギーへ',goal:'温度と内部エネルギーを\n分子運動から説明できる',height:820,
  nodes:[
   {key:'dawn',unit:0,x:500,y:690,title:'分子運動論の夜明け',caption:'見えない分子から熱を考える'},
   {key:'pressure',unit:1,x:500,y:520,title:'圧力の導出',caption:'壁との衝突から圧力を導く',prereqs:['dawn']},
   {key:'temperature',unit:2,x:500,y:350,title:'分子運動と絶対温度',caption:'温度を運動エネルギーで見る',prereqs:['pressure']},
   {key:'internal',unit:3,x:500,y:190,title:'気体の内部エネルギー',caption:'分子全体のエネルギーへ',prereqs:['temperature']},
  ],edges:[['dawn','pressure'],['pressure','temperature'],['temperature','internal'],['internal','goal']],goalPrereqs:['internal']
 },
 'part-2-chapter-4':{
  route:'ENERGY & HEAT ENGINE',subtitle:'エネルギー保存から、熱機関の限界まで',goal:'状態変化と熱機関を\nエネルギーから説明できる',height:1020,
  nodes:[
   {key:'first-law',unit:0,x:390,y:870,title:'熱力学第一法則と熱機関',caption:'熱・仕事・内部エネルギー'},
   {key:'state',unit:1,x:500,y:680,title:'四つの状態変化',caption:'定積・定圧・等温・断熱',prereqs:['first-law']},
   {key:'capacity',unit:2,x:300,y:500,title:'気体のモル熱容量',caption:'温め方による違いを比べる',prereqs:['state']},
   {key:'summary',unit:3,x:300,y:320,title:'状態変化のまとめ',caption:'式とp–V図を使い分ける',prereqs:['capacity']},
   {key:'second-law',unit:4,x:700,y:500,title:'第二法則と熱効率',caption:'熱を仕事へ変える限界',prereqs:['state']},
   {key:'reversible',unit:5,x:700,y:320,title:'可逆・不可逆変化',caption:'自然な変化の向きを考える',prereqs:['second-law']},
   {key:'carnot',unit:6,x:500,y:180,title:'カルノーサイクル',caption:'理想的な熱機関の限界',prereqs:['summary','reversible']},
  ],edges:[['first-law','state'],['state','capacity'],['capacity','summary'],['state','second-law'],['second-law','reversible'],['summary','carnot'],['reversible','carnot'],['carnot','goal']],goalPrereqs:['carnot']
 }
};

export default function ThermodynamicsTree({chapter,notes=[]}){
 const map=chapterMaps[chapter.id];
 if(!map)return null;
 const units=subunitsFor(chapter.sections[0].id);
 const completed=completedConcepts();
 notes.forEach(note=>note.unitId&&completed.add(note.unitId));
 const ids=Object.fromEntries(map.nodes.map(node=>[node.key,units[node.unit]?.id]));
 const acquired=new Set(map.nodes.filter(node=>completed.has(ids[node.key])).map(node=>node.key));
 const reached=key=>key==='goal'?map.goalPrereqs.every(item=>acquired.has(item)):acquired.has(key);
 const points={...Object.fromEntries(map.nodes.map(node=>[node.key,node])),goal:{x:500,y:65}};
 const card=node=>{
  const unit=units[node.unit];
  if(!unit)return null;
  const done=acquired.has(node.key),recommended=!done&&(node.prereqs||[]).every(reached);
  const state=done?'acquired':recommended?'recommended':'future',stateLabel=done?'習得済み':recommended?'次におすすめ':'まだ先のステージ';
  return <a key={node.key} href={`#/learn/${chapter.sections[0].id}/${unit.id}`} aria-label={`${node.title}、${stateLabel}`} className={`tree-concept thermo-concept ${state}`} style={{left:`${node.x/10}%`,top:`${node.y/map.height*100}%`}}><span className="tree-node-icon">{done?<Check size={18}/>:<Play size={16}/>}</span><span className="tree-node-copy"><small>{stateLabel}</small><strong>{node.title}</strong><em>{node.caption}</em></span></a>;
 };
 const path=(from,to)=>{const a=points[from],b=points[to],mid=(a.y+b.y)/2;return `M${a.x} ${a.y-38} C${a.x} ${mid},${b.x} ${mid},${b.x} ${b.y+38}`};
 const goalReached=reached('goal');
 return <section className="knowledge-tree-section thermo-tree" aria-label={`${chapter.title}の知識ツリー`}><div className="tree-route-label thermo-route-label"><Flame size={15}/><span>{map.route}</span><b>{map.subtitle}</b></div><div className="knowledge-tree-scroll"><div className="knowledge-tree-canvas thermo-tree-canvas" style={{'--thermo-ratio':`1000 / ${map.height}`}}><div className="tree-level thermo-level thermo-level-goal">GOAL</div><div className="tree-level thermo-level-middle">理解をつなぐ</div><div className="tree-level thermo-level-foundation">START</div><svg className="tree-connections thermo-connections" viewBox={`0 0 1000 ${map.height}`} aria-hidden="true"><defs><marker id={`thermo-arrow-${chapter.number}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z"/></marker></defs>{map.edges.map(([from,to])=><path key={`${from}-${to}`} style={{markerEnd:`url(#thermo-arrow-${chapter.number})`}} className={reached(from)?'active':''} d={path(from,to)}/>)}</svg><div className={`tree-goal thermo-goal ${goalReached?'reached':''}`} style={{left:'50%',top:`${points.goal.y/map.height*100}%`}}><Star size={24}/><span>CHAPTER GOAL</span><strong>{map.goal.split('\n').map((line,index)=><React.Fragment key={line}>{index>0&&<br/>}{line}</React.Fragment>)}</strong><small>{goalReached?'この章の主ルートを習得しました':'下から順に理解をつなごう'}</small></div>{map.nodes.map(card)}</div></div></section>;
}
