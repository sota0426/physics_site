import React, {useState,useEffect} from 'react';
import {ArrowLeft,ArrowRight,Check,BookOpen} from 'lucide-react';
import curriculum from './curriculum.json';
import syllabus from './subunits.json';
import SectionTerms from './SectionTerms';
import './subunits.css';

export const subunitsFor=id=>syllabus.sections[id]||[];
const unitHref=(sectionId,unit)=>`#/learn/${sectionId}/${unit.id}`;
const levels=['わかる','使える','説明できる'];

export function SubunitList({sectionId,notes=[]}){
 const units=subunitsFor(sectionId);
 return <div className="subunit-list"><p className="subunit-list-label">小単元ごとに学ぶ <span>{units.length}ステップ</span></p>{units.map((unit,i)=>{
  const done=new Set(notes.filter(n=>n.unitId===unit.id).map(n=>n.level)).size;
  return <React.Fragment key={unit.id}>{(i===0||units[i-1].sourceLesson!==unit.sourceLesson)&&<p className="subunit-source-group">{unit.sourceLesson}</p>}<a href={unitHref(sectionId,unit)} className="subunit-link"><span className="subunit-letter">{unit.label}</span><strong>{unit.title}</strong><small>{done?`${done}/3 振り返り済み`:'学習目標を見る'}</small><ArrowRight size={13}/></a></React.Fragment>;
 })}</div>;
}

export default function SubunitLesson({sectionId,unitId,notes,onSave,onMap}){
 const context=curriculum.parts.flatMap(part=>part.chapters.flatMap(chapter=>chapter.sections.map(section=>({part,chapter,section})))).find(c=>c.section.id===sectionId);
 const units=subunitsFor(sectionId),unit=units.find(u=>u.id===unitId);
 const [level,setLevel]=useState(1),[reflection,setReflection]=useState(''),[saved,setSaved]=useState(false);
 useEffect(()=>{setLevel(1);setReflection('');setSaved(false)},[unitId]);
 if(!unit||!context)return <section className="workspace-panel"><h1>小単元が見つかりません。</h1><a className="secondary" href="#/map">冒険マップへ戻る</a></section>;
 const index=units.findIndex(u=>u.id===unitId),previous=units[index-1],next=units[index+1];
 const prompts=[`「${unit.title}」で、何が変わり、何が変わらないか。具体的な場面を一つ挙げて考えよう。`,`「${unit.title}」に関係する量・式・単位を挙げよう。式を使える条件と、量を変えたときの結果も確かめよう。`,`「${unit.title}」を初めて学ぶ人へ、理由と具体例をつなげて説明しよう。既習事項のどれを使ったかも添えよう。`];
 return <article className="term-page subunit-lesson" key={unit.id}>
  <button className="back-link back-button" onClick={()=>onMap(context.part.id)}> <ArrowLeft size={15}/>この分野のマップへ</button>
  <p className="term-breadcrumb">{context.part.title} ／ {context.chapter.title} ／ セクション{context.section.number} {context.section.title}</p>
  <header className="term-title"><span className="eyebrow">今回の小単元 / {unit.sourceLesson}</span><h1><span className="subunit-letter">{unit.label}</span>{unit.title}</h1><p>{index+1} / {units.length} ステップ</p></header>
  <section className="subunit-goals"><h2>今回、できるようになりたいこと</h2><ul>{unit.goals.map(g=><li key={g}>{g}</li>)}</ul><small>{unit.origin==='review'?'サイトで補った既習事項の復習です。':`シラバスの小単元 ${unit.label} に対応（PDF ${unit.sourcePage}ページ）。`}</small></section>
  <section className="subunit-prerequisite"><h2>つながりを確かめる</h2><p>{previous?`ひとつ前は「${previous.label} ${previous.title}」。その考え方を今回どこで使えそうか、確認してから進もう。`:'このセクションに関係する、すでに知っていることを一つ思い出そう。分からない用語は下の解説から確認できます。'}</p></section>
  <SectionTerms sectionId={sectionId}/>
  <section className="subunit-reflection"><h2>３つの深さで振り返る</h2><p>用語解説を参考に考え、授業で確かめたことを記録しよう。</p><div className="level-choice">{levels.map((name,i)=><button key={name} className={level===i+1?'chosen':''} onClick={()=>{setLevel(i+1);setReflection('');setSaved(false)}}>LEVEL {i+1}<b>{name}</b>{notes.some(n=>n.unitId===unit.id&&n.level===i+1)&&<span className="reflection-check"><Check size={12}/>記録あり</span>}</button>)}</div><p className="reflection-prompt">{prompts[level-1]}</p><label>自分の考え・気づき<textarea value={reflection} onChange={e=>{setReflection(e.target.value);setSaved(false)}} placeholder="分かったことと、まだ分からないことの両方を残せます。"/></label><button className="primary" disabled={!reflection.trim()} onClick={()=>{if(onSave({kind:'subunit',unitId:unit.id,title:unit.title,unitLabel:unit.label,sectionTitle:context.section.title,level,reflection:reflection.trim(),date:new Date().toLocaleDateString('ja-JP')}))setSaved(true)}}><BookOpen size={16}/>この小単元のノートに保存</button><p className="subunit-save-status" role="status">{saved?'保存しました。学びのノートから読み返せます。':'振り返りの記録です。正答や習得を自動判定するものではありません。'}</p></section>
  <nav className="term-pager" aria-label="前後の小単元">{previous?<a href={unitHref(sectionId,previous)}><ArrowLeft size={15}/>{previous.label} {previous.title}</a>:<span/>}{next&&<a href={unitHref(sectionId,next)}>{next.label} {next.title}<ArrowRight size={15}/></a>}</nav><SubunitList sectionId={sectionId} notes={notes}/>
 </article>;
}
