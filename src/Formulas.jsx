import React,{useState} from 'react';
import {ArrowLeft,ArrowRight,BookOpen,Search,CheckCircle2,TriangleAlert} from 'lucide-react';
import {formulas,formulaHref,formulasForSection,formulasForTerm} from './formula-data';
import {glossaryTerms,termHref} from './glossary-data';
import curriculum from './curriculum.json';
import './formulas.css';

const contexts=curriculum.parts.flatMap(p=>p.chapters.flatMap(c=>c.sections.map(s=>({part:p,chapter:c,section:s}))));
export function FormulaLinks({termId,sectionId}){
 const related=termId?formulasForTerm(termId):formulasForSection(sectionId);
 if(!related.length)return null;
 return <section className="related-formulas"><h3>つながる公式 <span>{related.length}件</span></h3><div>{related.map(f=><a href={formulaHref(f)} key={f.id}><strong>{f.name}</strong><span>{f.expression}</span><ArrowRight size={14}/></a>)}</div></section>;
}
export default function Formulas({identifier}){
 const [query,setQuery]=useState(''),[category,setCategory]=useState('all');
 const formula=formulas.find(f=>f.id===identifier);
 const sectionContext=contexts.find(c=>c.section.id===identifier);
 if(identifier&&!formula&&!sectionContext)return <section className="workspace-panel"><h1>公式が見つかりません。</h1><a className="secondary" href="#/formulas">公式一覧へ</a></section>;
 if(formula){
  const terms=glossaryTerms.filter(t=>formula.termIds.includes(t.id));
  const notations=[['π','円周率（約3.14）。角度は、特に断らない限りラジアンです。'],['sin','sin・cosは三角関数です。角度や位相に応じた成分・振動を表します。'],['cos','sin・cosは三角関数です。角度や位相に応じた成分・振動を表します。'],['Δ','Δは「後の値−前の値」という変化量を表します。'],['Σ','Σは、対象となる量を足し合わせる記号です。'],['⟨','⟨ ⟩は、多数の粒子などについての平均を表します。'],['∮','∮は、ここでは閉じた面全体にわたって、電場の垂直成分を面積とともに足し合わせる記号です。'],['′','′は、衝突後・観測した値などの区別です。この式の表で定義を確認してください。']].filter(([symbol])=>formula.expression.includes(symbol));
  const notationTexts=[...new Set(notations.map(([,text])=>text))];
  return <article className="term-page formula-page" key={formula.id}>
   <a className="back-link" href="#/formulas"><ArrowLeft size={15}/>公式一覧へ</a>
   <header className="formula-title"><span className="eyebrow">FORMULA / {formula.category}</span><h1>{formula.name}</h1><div className="formula-expression" aria-label={`式：${formula.expression}`}>{formula.expression}</div><p>{formula.meaning}</p></header>
   <section className="formula-symbols"><h2>それぞれの文字の意味</h2><div className="symbol-table-scroll"><table><thead><tr><th scope="col">記号</th><th scope="col">意味・符号の約束</th><th scope="col">単位</th></tr></thead><tbody>{formula.symbols.map((s,i)=><tr key={i}><th scope="row">{s.symbol}</th><td>{s.description}</td><td>{s.unit}</td></tr>)}</tbody></table></div><p className="symbol-note">記号の意味は、この公式での定義です。同じ文字でも別の公式では違う量を表すことがあります。</p>{notationTexts.map(text=><p className="symbol-note" key={text}>{text}</p>)}</section>
   <section className="formula-situation"><span className="formula-section-icon"><BookOpen size={19}/></span><div><h2>どんなときに使う？</h2><p>{formula.example}</p><p>{formula.meaning}</p></div></section>
   <section className="formula-condition"><CheckCircle2 size={21}/><div><h2>使う前に確認する条件</h2><p>{formula.conditions}</p></div></section>
   <section className="formula-caution"><TriangleAlert size={21}/><div><h2>使えない場合・間違えやすいところ</h2><p>{formula.caution}</p></div></section>
   <section className="formula-related-terms"><h2>意味を確かめる用語</h2><p>用語の説明からも、この公式へ戻れます。</p><div className="section-term-links"><div>{terms.map(t=><a href={termHref(t)} key={t.id}>{t.name}<ArrowRight size={13}/></a>)}</div></div></section>
   <section className="formula-contexts"><h2>この公式につながるセクション</h2>{contexts.filter(c=>formula.sectionIds.includes(c.section.id)).map(c=><a href={`#/formulas/${c.section.id}`} key={c.section.id}><span>{c.part.title} ／ {c.chapter.title}</span><strong>セクション{c.section.number}　{c.section.title}</strong><ArrowRight size={15}/></a>)}</section>
   <footer className="formula-source"><p>参照：ちむすく（timsc）「物理公式一覧」{formula.sourcePage}ページ。記号・条件の説明は本サイトで補足しています。</p>{formula.sourceNote&&<p>{formula.sourceNote}</p>}</footer>
  </article>;
 }
 const normalized=query.normalize('NFKC').trim().toLowerCase();
 const filtered=formulas.filter(f=>(!sectionContext||f.sectionIds.includes(identifier))&&(category==='all'||f.category===category)&&(!normalized||[f.name,f.expression,f.meaning,f.conditions,f.caution,...f.termNames,...f.symbols.map(s=>s.description)].some(v=>v.normalize('NFKC').toLowerCase().includes(normalized))));
 return <section className="glossary-index formula-index">
  {sectionContext&&<a className="back-link" href="#/formulas"><ArrowLeft size={15}/>すべての公式へ</a>}
  <header className="glossary-heading"><span className="eyebrow">FORMULA COLLECTION</span><h1>{sectionContext?`セクション${sectionContext.section.number}　${sectionContext.section.title}の公式`:'公式は、使う条件とセットで。'}</h1><p>{sectionContext?`${sectionContext.part.title} ／ ${sectionContext.chapter.title}`:'94件の公式を、文字の意味・使う場面・適用条件から確かめよう。'}</p><a className="secondary" href="#/glossary"><BookOpen size={16}/>用語集から探す</a></header>
  <div className="glossary-tools"><label className="term-search"><Search size={18}/><input type="search" aria-label="公式や用語を検索" value={query} onChange={e=>setQuery(e.target.value)} placeholder="例：等加速度、ボイル、加速度が一定"/></label><label className="part-filter">分野<select value={category} onChange={e=>setCategory(e.target.value)}><option value="all">すべての分野</option>{['力学','熱力学','波動','電磁気学','原子'].map(c=><option key={c}>{c}</option>)}</select></label></div>
  <p className="glossary-result" role="status">{filtered.length}件の公式</p>
  {!filtered.length&&<div className="empty-state"><Search size={32}/><h2>一致する公式はありません。</h2><p>別の用語や短いキーワードで探してください。</p><button className="secondary" onClick={()=>{setQuery('');setCategory('all')}}>検索をリセット</button></div>}
  <div className="formula-cards">{filtered.map(f=><a className="formula-card" key={f.id} href={formulaHref(f)}><span className="formula-card-category">{f.category}</span><h2>{f.name}</h2><div className="formula-card-expression">{f.expression}</div><p><CheckCircle2 size={13}/>{f.conditions}</p><span className="formula-card-bottom">文字の意味・使い方・注意点を見る<ArrowRight size={15}/></span></a>)}</div>
 </section>;
}
