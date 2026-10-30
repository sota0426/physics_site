import React from 'react';
import {ArrowDown, ChevronRight, Compass, Sparkles} from 'lucide-react';
import SectionTerms from './SectionTerms';
import {SubunitList} from './Subunits';
import KnowledgeTree from './KnowledgeTree';

const numerals=['','一','二','三','四','五'];
export const chapterLabel=chapter=>`第${numerals[chapter.number]}章　${chapter.title}`;

export default function CurriculumMap({part,color,onSelect,extension,notes=[]}) {
  const count=part.chapters.reduce((sum,chapter)=>sum+chapter.sections.length,0);
  return <section className="map-panel curriculum-map" style={{'--field':color}} aria-label={`${part.title}の学習マップ`}>
    <div className="map-heading"><div><span className="chapter">第{numerals[part.number]}編 / {part.title}</span><h2>概念をつないで、理解の頂上へ。</h2></div><span className="unit-count">{part.chapters.length}章・{count}セクション</span></div>
    <div className="curriculum-legend"><Compass size={15}/><span>基礎から始め、枝の条件をそろえながら上の概念を開いていこう。</span></div>
    {part.chapters.map((chapter,chapterIndex)=><section className="chapter-block" key={chapter.id} aria-labelledby={chapter.id}>
      <header className="chapter-banner"><span className="chapter-number">{String(chapter.number).padStart(2,'0')}</span><div><h3 id={chapter.id}>{chapterLabel(chapter)}</h3><p>{chapter.sections.length}セクション <span>／</span> 理解の深さ：わかる・使える・説明できる</p></div></header>
      {chapter.id==='part-1-chapter-1'?<KnowledgeTree chapter={chapter} part={part} notes={notes}/>:<div className="section-path">{chapter.sections.map((section,index)=><React.Fragment key={section.id}>
        {index>0&&<div className="section-connector" aria-hidden="true"><ArrowDown size={15}/></div>}
        <button className={`section-stop ${chapterIndex===0&&index===0?'first-section':''}`} onClick={()=>onSelect({chapter,section,part})}>
          <span className="section-node">{chapterIndex===0&&index===0?<Compass size={23}/>:String(section.number).padStart(2,'0')}</span>
          <span className="section-copy"><span className="section-kicker">セクション{section.number}</span><strong>{section.number}.{section.title}</strong><span className="section-depths"><span>1 わかる</span><span>2 使える</span><span>3 説明できる</span></span></span>
          <ChevronRight className="section-arrow" size={18}/>
        </button>
        <SubunitList sectionId={section.id} notes={notes}/>
        <SectionTerms sectionId={section.id}/>
      </React.Fragment>)}</div>}
    </section>)}
    {extension&&<section className="curriculum-extension"><Sparkles size={19}/><div><h3>{extension.title}</h3><p>{extension.objectives}</p></div></section>}
    <div className="curriculum-source">学習指導計画に沿ったマップです。各セクションの教材は順次追加します。</div>
  </section>;
}
