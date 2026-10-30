import React, {useState,useEffect,useRef} from 'react';
import {ArrowLeft,ArrowRight,Check,BookOpen,CheckCircle2,XCircle,RotateCcw,Sparkles,HelpCircle,Target} from 'lucide-react';
import curriculum from './curriculum.json';
import syllabus from './subunits.json';
import {lessonQuizzes} from './lesson-quizzes';
import {lessonGuides} from './lesson-guides';
import MissionStory from './MissionStory';
import MathFormula from './MathFormula';
import {completeConcept} from './learning-progress';
import SectionTerms from './SectionTerms';
import './subunits.css';

export const subunitsFor=id=>syllabus.sections[id]||[];
const unitHref=(sectionId,unit)=>`#/learn/${sectionId}/${unit.id}`;
const levels=['わかる','使える','説明できる'];

function QuizText({children}){
 const parts=String(children).split(/(\[\[[^\]]+\]\])/g);
 return parts.map((part,i)=>part.startsWith('[[')&&part.endsWith(']]')?<MathFormula key={i} expression={part.slice(2,-2)}/>:part);
}

function QuizJourney({unit}){
 const questions=lessonQuizzes[unit.id]||[];
 const guides=lessonGuides[unit.id]||[];
 const quizRef=useRef(null);
 const shouldScrollRef=useRef(false);
 const [step,setStep]=useState(0),[choice,setChoice]=useState(null),[answered,setAnswered]=useState(false),[score,setScore]=useState(0);
 useEffect(()=>{setStep(0);setChoice(null);setAnswered(false);setScore(0)},[unit.id]);
 useEffect(()=>{if(step>=questions.length&&questions.length)completeConcept(unit.id);if(shouldScrollRef.current){shouldScrollRef.current=false;requestAnimationFrame(()=>quizRef.current?.scrollIntoView({behavior:'smooth',block:'start'}))}},[step,questions.length,unit.id]);
 if(!questions.length)return null;
 const complete=step>=questions.length,question=questions[Math.min(step,questions.length-1)],correct=choice===question.answer;
 function choose(i){if(answered)return;setChoice(i);setAnswered(true);if(i===question.answer)setScore(v=>v+1)}
 function next(){shouldScrollRef.current=true;setStep(v=>v+1);setChoice(null);setAnswered(false)}
 function reset(){shouldScrollRef.current=true;setStep(0);setChoice(null);setAnswered(false);setScore(0)}
 const guide=guides[Math.min(step,guides.length-1)];
 return <section className="quiz-journey" aria-labelledby="quiz-title" ref={quizRef}>
  <header className="quiz-header"><div><span className="eyebrow">VECTOR'S DISCOVERY QUEST</span><h2 id="quiz-title">ベクトルと、ひとつずつ発見しよう。</h2><p>選ぶたびに、次の問題を解くための新しい道具が増えていきます。</p></div><img src="/assets/vector-owl.png" alt="物理の案内役、フクロウのベクトル"/></header>
  <div className="quiz-progress" aria-label={`${questions.length}問中${Math.min(step+1,questions.length)}問目`}><span>STEP {Math.min(step+1,questions.length)} / {questions.length}</span><div>{questions.map((_,i)=><i key={i} className={i<step?'done':i===step?'current':''}/>)}</div></div>
  {!complete?<div className="quiz-card">
   <p className="quiz-kicker">{question.eyebrow}</p><h3>{question.prompt}</h3>
   {guide&&<><div className="question-purpose"><Target size={17}/><div><small>この問題で確かめたいこと</small><strong>{guide.goal}</strong></div></div><details className="question-hint" key={`${unit.id}-${step}`}><summary><HelpCircle size={16}/>ヒントを見る <span>必要なときだけ開こう</span></summary><p>{guide.hint}</p></details></>}
   <div className="quiz-choices" role="radiogroup" aria-label="答えを選ぶ">{question.choices.map((item,i)=><button key={item} role="radio" aria-checked={choice===i} className={`${choice===i?'selected ':''}${answered&&i===question.answer?'correct ':''}${answered&&choice===i&&i!==question.answer?'wrong':''}`} disabled={answered} onClick={()=>choose(i)}><span>{String.fromCharCode(65+i)}</span>{item}{answered&&i===question.answer&&<Check size={17}/>}</button>)}</div>
   {answered&&<div className={`quiz-feedback ${correct?'is-correct':'is-wrong'}`} role="status"><div className="feedback-heading">{correct?<CheckCircle2/>:<XCircle/>}<strong>{correct?'その調子！':'ここが発見ポイント！'}</strong></div><p><QuizText>{question.feedback}</QuizText></p><div className="discovery-card"><img src="/assets/vector-owl.png" alt=""/><div><small>ベクトルのひとこと</small><b>{question.discovery}</b></div></div><button className="primary" onClick={next}>次の一歩へ <ArrowRight size={16}/></button></div>}
  </div>:<div className="quiz-complete"><img src="/assets/vector-owl.png" alt="喜ぶ案内役のベクトル"/><span><Sparkles size={17}/> DISCOVERY COMPLETE</span><h3>{questions.length}つの発見が、つながったね。</h3><p>{questions.length}問中{score}問正解。間違いは、考え方を更新できたしるしです。下の振り返りで、いちばん大切だと思ったことを自分の言葉にしてみよう。</p><button className="secondary" onClick={reset}><RotateCcw size={15}/>もう一度たどる</button></div>}
 </section>;
}

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
  <header className="term-title lesson-title"><span className="eyebrow">VECTOR'S FIELD NOTE / {index+1} of {units.length}</span><h1><span className="subunit-letter">{unit.label}</span>{unit.title}</h1><p>物理アトリエ調査記録</p></header>
  <MissionStory unit={unit}/>
  <QuizJourney key={unit.id} unit={unit}/>
  <div className="lesson-toolkit"><section className="subunit-goals"><h2>この冒険で手に入る力</h2><ul>{unit.goals.map(g=><li key={g}>{g}</li>)}</ul><small>{unit.origin==='review'?'サイトで補った既習事項の復習です。':`授業資料の小単元 ${unit.label} に対応（PDF ${unit.sourcePage}ページ）。`}</small></section><section className="subunit-prerequisite"><h2>前の発見とのつながり</h2><p>{previous?`ひとつ前の「${previous.label} ${previous.title}」で手に入れた考え方が、今回どこで役立ったか振り返ってみよう。`:'知っていたことと、今回初めて気づいたことを一つずつ見つけてみよう。'}</p></section></div>
  <SectionTerms sectionId={sectionId}/>
  <section className="subunit-reflection"><h2>３つの深さで振り返る</h2><p>用語解説を参考に考え、授業で確かめたことを記録しよう。</p><div className="level-choice">{levels.map((name,i)=><button key={name} className={level===i+1?'chosen':''} onClick={()=>{setLevel(i+1);setReflection('');setSaved(false)}}>LEVEL {i+1}<b>{name}</b>{notes.some(n=>n.unitId===unit.id&&n.level===i+1)&&<span className="reflection-check"><Check size={12}/>記録あり</span>}</button>)}</div><p className="reflection-prompt">{prompts[level-1]}</p><label>自分の考え・気づき<textarea value={reflection} onChange={e=>{setReflection(e.target.value);setSaved(false)}} placeholder="分かったことと、まだ分からないことの両方を残せます。"/></label><button className="primary" disabled={!reflection.trim()} onClick={()=>{if(onSave({kind:'subunit',unitId:unit.id,title:unit.title,unitLabel:unit.label,sectionTitle:context.section.title,level,reflection:reflection.trim(),date:new Date().toLocaleDateString('ja-JP')}))setSaved(true)}}><BookOpen size={16}/>この小単元のノートに保存</button><p className="subunit-save-status" role="status">{saved?'保存しました。学びのノートから読み返せます。':'振り返りの記録です。正答や習得を自動判定するものではありません。'}</p></section>
  <nav className="term-pager" aria-label="前後の小単元">{previous?<a href={unitHref(sectionId,previous)}><ArrowLeft size={15}/>{previous.label} {previous.title}</a>:<span/>}{next&&<a href={unitHref(sectionId,next)}>{next.label} {next.title}<ArrowRight size={15}/></a>}</nav><SubunitList sectionId={sectionId} notes={notes}/>
 </article>;
}
