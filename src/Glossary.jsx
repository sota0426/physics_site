import React, {useState} from 'react';
import {ArrowLeft, ArrowRight, BookOpen, Search, Lightbulb, ChevronRight} from 'lucide-react';
import curriculum from './curriculum.json';
import {chapterLabel} from './CurriculumMap';
import {glossaryBySection, glossaryTerms, termHref} from './glossary-data';
import './glossary.css';
import SectionTerms from './SectionTerms';
export {default as SectionTerms} from './SectionTerms';

export const sectionContexts=curriculum.parts.flatMap(part=>part.chapters.flatMap(chapter=>chapter.sections.map(section=>({part,chapter,section}))));

export default function Glossary({sectionId,termId,onMap}) {
 const [query,setQuery]=useState('');
 const [partId,setPartId]=useState('all');
 const context=sectionContexts.find(item=>item.section.id===sectionId);
 const term=(glossaryBySection[sectionId]||[]).find(item=>item.id===termId);
 if(termId) {
  if(!term||!context)return <section className="workspace-panel"><h2>この用語は見つかりませんでした。</h2><p>セクション別の用語一覧から選び直してください。</p><a className="secondary" href="#/glossary">用語一覧へ</a></section>;
  const terms=glossaryBySection[sectionId];
  const index=terms.findIndex(t=>t.id===termId);
  return <article className="term-page" key={termId}>
   <a className="back-link" href={`#/glossary/${sectionId}`}><ArrowLeft size={15}/>このセクションの用語一覧へ</a>
   <div className="term-breadcrumb"><span>{context.part.title}</span><ChevronRight size={12}/><span>{chapterLabel(context.chapter)}</span><ChevronRight size={12}/><span>セクション{context.section.number}　{context.section.title}</span></div>
   <header className="term-title"><span className="eyebrow">PHYSICS WORDS / 用語解説</span><h1>{term.name}</h1><p>{term.definition}</p></header>
   <div className="term-explanation"><section><span className="term-step">01</span><div><h3>たとえば、こんな場面。</h3><p>{term.example}</p></div></section><section><span className="term-step">02</span><div><h3>式・理解のポイント</h3><p className="term-point">{term.point}</p></div></section></div>
   <aside className="term-recall"><Lightbulb size={20}/><div><h3>自分の言葉にしてみよう</h3><p>「{term.name}」を、具体例を一つ添えて説明すると？ 迷ったら、上の説明に戻って確かめよう。</p></div></aside>
   <section className="term-neighbors"><h3>同じセクションで学ぶ用語</h3><SectionTerms sectionId={sectionId}/></section>
   <nav className="term-pager" aria-label="前後の用語">{index>0?<a href={termHref(terms[index-1])}><ArrowLeft size={15}/>{terms[index-1].name}</a>:<span/>}{index<terms.length-1&&<a href={termHref(terms[index+1])}>{terms[index+1].name}<ArrowRight size={15}/></a>}</nav>
   <button className="secondary" onClick={()=>onMap(context.part.id)}>この分野のマップへ <ArrowRight size={16}/></button>
  </article>;
 }
 const normalized=query.trim().normalize('NFKC').toLowerCase();
 const selected=sectionId?sectionContexts.filter(item=>item.section.id===sectionId):sectionContexts;
 const sections=selected.filter(item=>partId==='all'||item.part.id===partId).map(item=>({...item,terms:(glossaryBySection[item.section.id]||[]).filter(t=>!normalized||[t.name,t.definition,item.section.title,item.chapter.title].some(value=>value.normalize('NFKC').toLowerCase().includes(normalized)))})).filter(item=>item.terms.length);
 return <section className="glossary-index">
  {sectionId&&<a className="back-link" href="#/glossary"><ArrowLeft size={15}/>すべてのセクションへ</a>}
  <header className="glossary-heading"><span className="eyebrow">PHYSICS WORDS</span><h1>{context?`セクション${context.section.number}　${context.section.title}`:'ことばから、物理をほどこう。'}</h1><p>{context?`${context.part.title} ／ ${chapterLabel(context.chapter)}`:`48セクション・${glossaryTerms.length}の用語解説。学ぶ場所からも、気になることばからも。`}</p></header>
  <div className="glossary-tools"><label className="term-search"><Search size={18}/><input type="search" aria-label="用語やセクションを検索" value={query} onChange={e=>setQuery(e.target.value)} placeholder="例：万有引力、反発係数、弾性衝突"/></label>{!sectionId&&<label className="part-filter">分野<select value={partId} onChange={e=>setPartId(e.target.value)}><option value="all">すべての分野</option>{curriculum.parts.map(part=><option key={part.id} value={part.id}>{part.title}</option>)}</select></label>}</div>
  <p className="glossary-result" role="status">{sections.length}セクション・{sections.reduce((n,s)=>n+s.terms.length,0)}用語{query&&`（「${query}」の検索結果）`}</p>
  {!sections.length&&<div className="empty-state"><Search size={35}/><h3>一致する用語が見つかりません。</h3><p>別のことばや、短いキーワードで探してみてください。</p><button className="secondary" onClick={()=>{setQuery('');setPartId('all')}}>検索条件をリセット</button></div>}
  {sections.map(({part,chapter,section,terms})=><section className="glossary-section" key={section.id}>
   <div className="glossary-section-heading"><span>{part.title} ／ {chapterLabel(chapter)}</span><h3>セクション{section.number}　{section.number}.{section.title}</h3></div>
   <div className="term-cards">{terms.map(term=><a className="term-card" href={termHref(term)} key={term.id}><span className="term-card-icon"><BookOpen size={18}/></span><div><h4>{term.name}</h4><p>{term.definition}</p></div><ArrowRight size={16}/></a>)}</div>
  </section>)}
 </section>;
}
