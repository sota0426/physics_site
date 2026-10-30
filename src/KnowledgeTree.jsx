import React from 'react';
import {Check,Link2,LockKeyhole,Play,Star} from 'lucide-react';
import {subunitsFor} from './Subunits';
import {completedConcepts} from './learning-progress';

const nodeSpecs=[
 {key:'A',section:0,unit:0,x:100,y:825,title:'変位',caption:'位置の変化を矢印で表す',prereqs:[]},
 {key:'D',section:0,unit:3,x:520,y:825,title:'ベクトル成分',caption:'斜めの矢印を横と縦に分ける',prereqs:[]},
 {key:'B',section:0,unit:1,x:155,y:700,title:'速度',caption:'変位を時間と結びつける',prereqs:['A']},
 {key:'C',section:0,unit:2,x:145,y:560,title:'加速度',caption:'速度の変化を捉える',prereqs:['B']},
 {key:'uniform',x:395,y:560,title:'等速直線運動',caption:'速度が変わらない横の運動',prereqs:['B'],bridge:true,reviewKey:'B'},
 {key:'accelerated',x:195,y:415,title:'等加速度直線運動',caption:'加速度が一定の縦の運動',prereqs:['C'],bridge:true,reviewKey:'C'},
 {key:'E',section:0,unit:4,x:570,y:635,title:'合成速度・相対速度',caption:'二つの速度を合わせて見る',prereqs:['B','D']},
 {key:'F',section:0,unit:5,x:815,y:560,title:'平面の運動方程式',caption:'合力から加速度を予測する',prereqs:['C']},
 {key:'2A',section:1,unit:0,x:385,y:290,title:'水平投射',caption:'横の等速運動と縦の落下を合体',prereqs:['uniform','accelerated']},
 {key:'2B',section:1,unit:1,x:500,y:190,title:'斜方投射',caption:'斜めの初速度でも考える',prereqs:['2A']},
 {key:'2C',section:1,unit:2,x:790,y:380,title:'空気抵抗',caption:'現実の落下へ近づける',prereqs:['F']},
];

const edges=[['A','B'],['B','C'],['B','uniform'],['C','accelerated'],['B','E'],['D','E'],['C','F'],['uniform','2A'],['accelerated','2A'],['2A','2B'],['F','2C'],['E','goal'],['2B','goal'],['2C','goal']];
const points={...Object.fromEntries(nodeSpecs.map(n=>[n.key,n])),goal:{x:500,y:65}};

export default function KnowledgeTree({chapter,notes=[]}){
 const sectionUnits=chapter.sections.map(s=>subunitsFor(s.id));
 const persisted=completedConcepts();
 notes.forEach(n=>persisted.add(n.unitId));
 const realNodes=nodeSpecs.filter(n=>!n.bridge);
 const idByKey=Object.fromEntries(realNodes.map(n=>[n.key,sectionUnits[n.section]?.[n.unit]?.id]));
 const acquired=new Set(realNodes.filter(n=>persisted.has(idByKey[n.key])).map(n=>n.key));
 const nodeByKey=Object.fromEntries(nodeSpecs.map(n=>[n.key,n]));
 const prerequisiteNames=node=>node.prereqs.map(key=>nodeByKey[key]?.title||key).join(' ＋ ');
 const reached=key=>{
  const node=nodeByKey[key];
  return node?.bridge ? node.prereqs.every(reached) : acquired.has(key);
 };
 const goalReached=['E','2B','2C'].every(key=>acquired.has(key));
 return <section className="knowledge-tree-section" aria-label="平面内の運動の知識ツリー">
  <div className="tree-intro"><div><span>KNOWLEDGE TREE</span><h4>二つの運動を合体させて、頂上へ。</h4><p>速度から「等速直線運動」、加速度から「等加速度直線運動」へ。二本の枝が水平投射で合流します。</p></div><div className="tree-key"><span><i className="acquired"/>獲得済み</span><span><i className="bridge"/>つながる概念</span><span><i className="available"/>挑戦できる</span><span><i/>まだ先</span></div></div>
  <div className="knowledge-tree-scroll"><div className="knowledge-tree-canvas">
   <svg className="tree-connections" viewBox="0 0 1000 900" aria-hidden="true"><defs><marker id="tree-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z"/></marker></defs>{edges.map(([from,to])=>{const a=points[from],b=points[to],active=reached(from);const mid=(a.y+b.y)/2;return <path key={`${from}-${to}`} className={active?'active':''} d={`M${a.x} ${a.y-38} C${a.x} ${mid},${b.x} ${mid},${b.x} ${b.y+38}`}/>})}</svg>
   <div className={`tree-goal ${goalReached?'reached':''}`} style={{left:'50%',top:`${points.goal.y/9}%`}}><Star size={24}/><span>CHAPTER GOAL</span><strong>平面内の運動を<br/>予測できる</strong><small>{goalReached?'すべての枝がつながりました':'応用概念を集めて頂上へ'}</small></div>
   {nodeSpecs.map(node=>{const source=node.bridge?nodeByKey[node.reviewKey]:node;const unit=sectionUnits[source.section]?.[source.unit];if(!unit)return null;const done=node.bridge?reached(node.key):acquired.has(node.key),available=node.prereqs.every(reached);const href=`#/learn/${chapter.sections[source.section].id}/${unit.id}`;return <a key={node.key} href={available||done?href:undefined} aria-disabled={!available&&!done} className={`tree-concept ${node.bridge?'bridge':''} ${done?'acquired':available?'available':'locked'}`} style={{left:`${node.x/10}%`,top:`${node.y/9}%`}}><span className="tree-node-icon">{node.bridge&&done?<Link2 size={18}/>:done?<Check size={18}/>:available?<Play size={16}/>:<LockKeyhole size={15}/>}</span><span className="tree-node-copy"><small>{node.bridge&&done?'CONCEPTS CONNECTED':done?'CONCEPT ACQUIRED':available?'READY TO LEARN':`NEEDS ${prerequisiteNames(node)}`}</small><strong>{node.title}</strong><em>{node.caption}</em></span></a>})}
   <div className="tree-ground"><span>START</span><b>基礎から登ろう</b></div>
  </div></div>
  <p className="tree-footnote">獲得条件：各概念のクイズを最後まで完了すること。いつでも前の概念へ戻れます。</p>
 </section>;
}
