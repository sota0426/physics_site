import React from 'react';
import {Check,Link2,Play,Star} from 'lucide-react';
import {subunitsFor} from './Subunits';
import {completedConcepts} from './learning-progress';

const mainSpecs=[
 {key:'V',section:0,unit:0,x:300,y:840,title:'ベクトルの基礎',caption:'矢印の意味と足し算・引き算',prereqs:[]},
 {key:'T',x:700,y:840,title:'三角関数の基礎',caption:'斜めの量を縦と横に分ける',prereqs:[],href:'#/trigonometry'},
 {key:'A',section:0,unit:1,x:500,y:705,title:'変位',caption:'位置の変化を矢印で表す',prereqs:['V','T']},
 {key:'B',section:0,unit:2,x:500,y:570,title:'速度',caption:'変位を時間と結びつける',prereqs:['A']},
 {key:'C',section:0,unit:4,x:700,y:570,title:'加速度',caption:'速度がどのように変わるか',prereqs:['B']},
 {key:'uniform',section:0,unit:3,x:350,y:420,title:'等速直線運動',caption:'速度が変わらない横の運動',prereqs:['B']},
 {key:'accelerated',x:650,y:420,title:'等加速度直線運動',caption:'加速度が一定の縦の運動',prereqs:['C'],bridge:true,reviewKey:'C'},
 {key:'2A',section:1,unit:0,x:500,y:285,title:'水平投射',caption:'縦と横、二つの運動を合体',prereqs:['uniform','accelerated']},
 {key:'2B',section:1,unit:1,x:500,y:160,title:'斜方投射',caption:'斜めの初速度でも考える',prereqs:['2A']},
];

const relatedSpecs=[
 {key:'E',section:0,unit:6,title:'合成速度・相対速度',caption:'二つの速度を合わせて見る',prereqs:['B','V']},
 {key:'F',section:0,unit:7,title:'平面の運動方程式',caption:'合力から加速度を予測する',prereqs:['C']},
 {key:'2C',section:1,unit:2,title:'空気抵抗',caption:'現実の落下へ近づける',prereqs:['F']},
];

const nodeSpecs=[...mainSpecs,...relatedSpecs];
const edges=[['V','A'],['T','A'],['A','B'],['B','C'],['B','uniform'],['C','accelerated'],['uniform','2A'],['accelerated','2A'],['2A','2B'],['2B','goal']];
const points={...Object.fromEntries(mainSpecs.map(n=>[n.key,n])),goal:{x:500,y:70}};

export default function KnowledgeTree({chapter,notes=[]}){
 const sectionUnits=chapter.sections.map(s=>subunitsFor(s.id));
 const persisted=completedConcepts();
 notes.forEach(n=>persisted.add(n.unitId));
 const realNodes=nodeSpecs.filter(n=>!n.bridge);
 const idByKey=Object.fromEntries(realNodes.map(n=>[n.key,sectionUnits[n.section]?.[n.unit]?.id]));
 const acquired=new Set(realNodes.filter(n=>persisted.has(idByKey[n.key])).map(n=>n.key));
 const nodeByKey=Object.fromEntries(nodeSpecs.map(n=>[n.key,n]));
 const reached=key=>{
  const node=nodeByKey[key];
  return node?.bridge ? node.prereqs.every(reached) : acquired.has(key);
 };
 const nodeLink=node=>{
  if(node.href)return node.href;
  const source=node.bridge?nodeByKey[node.reviewKey]:node;
  const unit=sectionUnits[source.section]?.[source.unit];
  return unit?`#/learn/${chapter.sections[source.section].id}/${unit.id}`:null;
 };
 const nodeCard=(node,related=false)=>{
  const href=nodeLink(node);
  if(!href)return null;
  const done=node.bridge?reached(node.key):acquired.has(node.key);
  const recommended=!done&&node.prereqs.every(reached);
  const state=done?'acquired':recommended?'recommended':'future';
  const stateLabel=done?'習得済み':recommended?'次におすすめ':'まだ先のステージ';
  return <a key={node.key} href={href} aria-label={`${node.title}、${stateLabel}`} className={`tree-concept ${related?'related':''} ${node.bridge?'bridge':''} ${state}`} style={related?undefined:{left:`${node.x/10}%`,top:`${node.y/9.2}%`}}>
   <span className="tree-node-icon">{node.bridge&&done?<Link2 size={18}/>:done?<Check size={18}/>:<Play size={16}/>}</span>
   <span className="tree-node-copy"><small>{node.bridge&&done?'CONCEPTS CONNECTED':stateLabel}</small><strong>{node.title}</strong><em>{node.caption}</em></span>
  </a>;
 };
 const edgePath=(from,to)=>{
  const a=points[from],b=points[to];
  if(a.y===b.y)return `M${a.x+100} ${a.y} L${b.x-100} ${b.y}`;
  const mid=(a.y+b.y)/2;
  return `M${a.x} ${a.y-38} C${a.x} ${mid},${b.x} ${mid},${b.x} ${b.y+38}`;
 };
 const goalReached=acquired.has('2B');
 return <section className="knowledge-tree-section" aria-label="平面内の運動の知識ツリー">
  <div className="tree-route-label"><span>MAIN ROUTE</span><b>水平投射・斜方投射への道</b></div>
  <div className="knowledge-tree-scroll"><div className="knowledge-tree-canvas">
   <div className="tree-level level-goal">GOAL</div><div className="tree-level level-application">応用</div><div className="tree-level level-motion">二つの運動</div><div className="tree-level level-foundation">基礎</div>
   <svg className="tree-connections" viewBox="0 0 1000 920" aria-hidden="true"><defs><marker id="tree-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z"/></marker></defs>{edges.map(([from,to])=><path key={`${from}-${to}`} className={reached(from)?'active':''} d={edgePath(from,to)}/>)}</svg>
   <div className={`tree-goal ${goalReached?'reached':''}`} style={{left:'50%',top:`${points.goal.y/9.2}%`}}><Star size={24}/><span>CHAPTER GOAL</span><strong>平面内の運動を<br/>予測できる</strong><small>{goalReached?'主ルートを登りきりました':'斜方投射まで進もう'}</small></div>
   {mainSpecs.map(node=>nodeCard(node))}
   <div className="tree-ground"><span>START</span><b>ベクトルと三角関数から始めよう</b></div>
  </div></div>
  <div className="tree-related-section"><div className="tree-related-heading"><span>RELATED TOPICS</span><div><b>関連トピック</b></div></div><div className="tree-related-grid">{relatedSpecs.map(node=>nodeCard(node,true))}</div></div>
 </section>;
}
