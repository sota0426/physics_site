import React,{useState} from 'react';
import {ArrowLeft,ArrowRight,BookOpen,CheckCircle2,Compass,Goal,Search,Sparkles} from 'lucide-react';
import {laws,lawHref,lawsForSection} from './laws-data';
import {formulas} from './formula-data';
import {glossaryTerms,termHref} from './glossary-data';
import curriculum from './curriculum.json';
import MathFormula from './MathFormula';
import './laws.css';

const contexts=curriculum.parts.flatMap(part=>part.chapters.flatMap(chapter=>chapter.sections.map(section=>({part,chapter,section}))));

export function LawLinks({sectionId}){
 const related=lawsForSection(sectionId);
 if(!related.length)return null;
 return <section className="related-laws"><h3>この単元のゴール <span>{related.length}件</span></h3><div>{related.map(item=><a href={lawHref(item)} key={item.id}><Goal size={16}/><span><strong>{item.title}</strong><small>{item.summary}</small></span><ArrowRight size={14}/></a>)}</div></section>;
}

export default function Laws({identifier}){
 const [query,setQuery]=useState(''),[category,setCategory]=useState('all');
 const item=laws.find(law=>law.id===identifier);
 if(identifier&&!item)return <section className="workspace-panel"><h1>法則が見つかりません。</h1><a className="secondary" href="#/laws">法則集へ</a></section>;
 if(item){
  const relatedFormulas=item.formulaIds.map(id=>formulas.find(formula=>formula.id===id)).filter(Boolean);
  const relatedTerms=glossaryTerms.filter(term=>item.termNames.includes(term.name));
  const sections=contexts.filter(context=>item.sectionIds.includes(context.section.id));
  return <article className="term-page law-page">
   <a className="back-link" href="#/laws"><ArrowLeft size={15}/>法則集へ</a>
   <header className="law-hero"><span className="eyebrow">CORE LAW / {item.category}</span><div className="law-hero-title"><span><Goal/></span><h1>{item.title}</h1></div><p>{item.summary}</p><blockquote><Sparkles size={18}/><span><small>この法則が答える問い</small>{item.question}</span></blockquote></header>
   <section className="law-flow"><h2>用語から、法則へ</h2><p>先に言葉の意味をつかむと、式は暗号ではなくなります。</p><div className="law-term-row">{relatedTerms.map(term=><a href={termHref(term)} key={term.id}><BookOpen size={14}/>{term.name}</a>)}</div><ArrowRight className="law-flow-arrow"/><div className="law-formula-stack">{relatedFormulas.map(formula=><a href={`#/formulas/${formula.id}`} key={formula.id}><span>{formula.name}</span><MathFormula expression={formula.expression}/><ArrowRight size={14}/></a>)}</div></section>
   <section className="law-mastery"><div><span className="eyebrow">UNDERSTANDING CHECK</span><h2>ここまで説明できれば、この単元の核を理解できた</h2></div><ol>{item.mastery.map((text,index)=><li key={text}><span>{String(index+1).padStart(2,'0')}</span><p>{text}</p><CheckCircle2 size={18}/></li>)}</ol></section>
   <section className="law-contexts"><h2>この法則につながる単元</h2>{sections.map(({part,chapter,section})=><a href={`#/formulas/${section.id}`} key={section.id}><span>{part.title} ／ {chapter.title}</span><strong>セクション{section.number}　{section.title}</strong><ArrowRight size={15}/></a>)}</section>
  </article>;
 }
 const normalized=query.normalize('NFKC').trim().toLowerCase();
 const filtered=laws.filter(entry=>(category==='all'||entry.category===category)&&(!normalized||[entry.title,entry.summary,entry.question,...entry.termNames,...entry.mastery].some(value=>value.normalize('NFKC').toLowerCase().includes(normalized))));
 return <section className="glossary-index laws-index">
  <header className="laws-heading"><div><span className="eyebrow">LAWS & MILESTONES</span><h1>この法則を説明できたら、<br/>単元の景色がつながる。</h1><p>用語と公式を、物理の中心となる考え方へ結び直す「単元のゴール集」です。</p></div><div className="laws-heading-mark" aria-hidden="true"><Compass/><span>GOAL</span></div></header>
  <div className="glossary-tools"><label className="term-search"><Search size={18}/><input type="search" aria-label="法則を検索" value={query} onChange={event=>setQuery(event.target.value)} placeholder="例：保存則、円運動、熱、電場"/></label><label className="part-filter">分野<select value={category} onChange={event=>setCategory(event.target.value)}><option value="all">すべての分野</option>{['力学','熱力学','波動','電磁気学','原子'].map(name=><option key={name}>{name}</option>)}</select></label></div>
  <p className="glossary-result" role="status">{filtered.length}件の法則・到達点</p>
  <div className="law-cards">{filtered.map((entry,index)=><a className="law-card" href={lawHref(entry)} key={entry.id}><div className="law-card-top"><span>{entry.category}</span><small>{String(index+1).padStart(2,'0')}</small></div><Goal className="law-card-icon"/><h2>{entry.title}</h2><p>{entry.summary}</p><div className="law-card-terms">{entry.termNames.slice(0,3).map(term=><span key={term}>{term}</span>)}</div><footer><span>単元のゴールを見る</span><ArrowRight size={16}/></footer></a>)}</div>
 </section>;
}
