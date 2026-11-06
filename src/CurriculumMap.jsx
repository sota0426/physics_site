import React,{useState} from 'react';
import {ArrowDown, ChevronDown, ChevronRight, Compass, Crown, Sparkles} from 'lucide-react';
import SectionTerms from './SectionTerms';
import {SubunitList,subunitsFor} from './Subunits';
import KnowledgeTree from './KnowledgeTree';
import ThermodynamicsTree from './ThermodynamicsTree';
import {completedConcepts} from './learning-progress';

const numerals=['','一','二','三','四','五'];
const OPEN_CHAPTERS_KEY='physics-map-open-chapters';
const readOpenChapters=()=>{try{return JSON.parse(localStorage.getItem(OPEN_CHAPTERS_KEY)||'{}')}catch{return {}}};
export const chapterLabel=chapter=>`第${numerals[chapter.number]}章　${chapter.title}`;

export default function CurriculumMap({part,color,onSelect,extension,notes=[]}) {
  const [openChapters,setOpenChapters]=useState(readOpenChapters);
  const toggleChapter=chapterId=>setOpenChapters(current=>{const next={...current,[chapterId]:!current[chapterId]};try{localStorage.setItem(OPEN_CHAPTERS_KEY,JSON.stringify(next))}catch{/* 保存できない環境では現在の画面内だけで切り替える */}return next});
  const completed=completedConcepts();
  notes.forEach(note=>note.unitId&&completed.add(note.unitId));
  return <section className="map-panel curriculum-map" style={{'--field':color}} aria-label={`${part.title}の学習マップ`}>
    {part.chapters.map((chapter,chapterIndex)=>{const isOpen=Boolean(openChapters[chapter.id]);const chapterUnits=chapter.sections.flatMap(section=>subunitsFor(section.id));const doneCount=chapterUnits.filter(unit=>completed.has(unit.id)).length;const progress=chapterUnits.length?Math.round(doneCount/chapterUnits.length*100):0;const isComplete=progress===100;return <section className={`chapter-block ${isOpen?'open':'closed'} ${isComplete?'complete':''}`} key={chapter.id} aria-labelledby={chapter.id}>
      <button className="chapter-banner" aria-expanded={isOpen} aria-controls={`${chapter.id}-content`} aria-label={`${chapterLabel(chapter)}、進捗${progress}パーセント`} onClick={()=>toggleChapter(chapter.id)}><span className="chapter-number">{isComplete?<Crown size={22}/>:String(chapter.number).padStart(2,'0')}</span><span className="chapter-heading"><h3 id={chapter.id}>{chapterLabel(chapter)}</h3><span className={`chapter-progress ${isComplete?'complete':''}`}><span className="chapter-progress-label">{isComplete?<><Crown size={13}/>完了</>:`${progress}%`}</span><span className="chapter-progress-track"><i style={{width:`${progress}%`}}/></span></span></span><ChevronDown className="chapter-chevron" size={20}/></button>
      {isOpen&&<div className="chapter-content" id={`${chapter.id}-content`}>{chapter.id==='part-1-chapter-1'?<KnowledgeTree chapter={chapter} part={part} notes={notes}/>:chapter.id.startsWith('part-2-chapter-')?<ThermodynamicsTree chapter={chapter} notes={notes}/>:<div className="section-path">{chapter.sections.map((section,index)=><React.Fragment key={section.id}>
        {index>0&&<div className="section-connector" aria-hidden="true"><ArrowDown size={15}/></div>}
        <button className={`section-stop ${chapterIndex===0&&index===0?'first-section':''}`} onClick={()=>onSelect({chapter,section,part})}>
          <span className="section-node">{chapterIndex===0&&index===0?<Compass size={23}/>:String(section.number).padStart(2,'0')}</span>
          <span className="section-copy"><span className="section-kicker">セクション{section.number}</span><strong>{section.number}.{section.title}</strong>
            </span>
          <ChevronRight className="section-arrow" size={18}/>
        </button>
        <SubunitList sectionId={section.id} notes={notes}/>
        <SectionTerms sectionId={section.id}/>
      </React.Fragment>)}</div>}</div>}
    </section>})}
    {extension&&<section className="curriculum-extension"><Sparkles size={19}/><div><h3>{extension.title}</h3><p>{extension.objectives}</p></div></section>}
  </section>;
}
