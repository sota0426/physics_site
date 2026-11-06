import React, {useState,useEffect,useRef} from 'react';
import {ArrowLeft,ArrowRight,Check,BookOpen,RotateCcw,HelpCircle,Target} from 'lucide-react';
import curriculum from './curriculum.json';
import syllabus from './subunits.json';
import {lessonQuizzes} from './lesson-quizzes';
import {lessonGuides} from './lesson-guides';
import MissionStory from './MissionStory';
import DisplacementDialogue from './DisplacementDialogue';
import VectorBasicsLesson from './VectorBasicsLesson';
import GasPressureLesson from './GasPressureLesson';
import BoyleCharlesLesson from './BoyleCharlesLesson';
import IdealGasLesson from './IdealGasLesson';
import MathFormula from './MathFormula';
import SotaCharacter from './SotaCharacter';
import {completeConcept} from './learning-progress';
import SectionTerms from './SectionTerms';
import './subunits.css';

export const subunitsFor=id=>syllabus.sections[id]||[];
const unitHref=(sectionId,unit)=>`#/learn/${sectionId}/${unit.id}`;
const quizHref=(sectionId,unit)=>`#/quiz/${sectionId}/${unit.id}`;
const levels=['わかる','使える','説明できる'];

function QuizText({children}){
 const parts=String(children).split(/(\[\[[^\]]+\]\])/g);
 return parts.map((part,i)=>part.startsWith('[[')&&part.endsWith(']]')?<MathFormula key={i} expression={part.slice(2,-2)}/>:part);
}

function QuizReview({questions,answers}){
 return <section className="quiz-review" aria-labelledby="quiz-review-title"><h3 id="quiz-review-title">すべての問題を振り返ろう</h3><div className="quiz-review-list">{questions.map((question,qIndex)=><article className="quiz-review-question" key={question.prompt}><small>問題 {qIndex+1}</small><h4><QuizText>{question.prompt}</QuizText></h4><div className="quiz-review-choices">{question.choices.map((item,i)=>{const chosen=answers[qIndex]===i,correct=i===question.answer;return <div className={`${correct?'review-correct ':''}${chosen&&!correct?'review-wrong ':''}`} key={item}><span>{String.fromCharCode(65+i)}</span><b><QuizText>{item}</QuizText></b>{chosen&&correct?<em>あなたの回答・正解</em>:chosen?<em>あなたの回答・不正解</em>:correct?<em>正解</em>:null}{correct&&<p><QuizText>{question.feedback}</QuizText></p>}</div>})}</div></article>)}</div></section>;
}

function QuizJourney({unit,nextUnit,sectionId,onSaveReflection}){
 const questions=lessonQuizzes[unit.id]||[];
 const guides=lessonGuides[unit.id]||[];
 const quizRef=useRef(null);
 const shouldScrollRef=useRef(false);
 const [step,setStep]=useState(0),[choice,setChoice]=useState(null),[answered,setAnswered]=useState(false),[score,setScore]=useState(0),[answers,setAnswers]=useState([]),[explanation,setExplanation]=useState(''),[saved,setSaved]=useState(false);
 useEffect(()=>{setStep(0);setChoice(null);setAnswered(false);setScore(0);setAnswers([]);setExplanation('');setSaved(false)},[unit.id]);
 useEffect(()=>{if(step>=questions.length&&questions.length)completeConcept(unit.id);if(shouldScrollRef.current){shouldScrollRef.current=false;requestAnimationFrame(()=>quizRef.current?.scrollIntoView({behavior:'smooth',block:'start'}))}},[step,questions.length,unit.id]);
 if(!questions.length)return null;
 const complete=step>=questions.length,question=questions[Math.min(step,questions.length-1)],correct=choice===question.answer;
 function choose(i){if(answered)return;setChoice(i);setAnswered(true);setAnswers(previous=>{const updated=[...previous];updated[step]=i;return updated});if(i===question.answer)setScore(v=>v+1)}
 function next(){shouldScrollRef.current=true;setStep(v=>v+1);setChoice(null);setAnswered(false)}
 function reset(){shouldScrollRef.current=true;setStep(0);setChoice(null);setAnswered(false);setScore(0);setAnswers([]);setExplanation('');setSaved(false)}
 function saveExplanation(){if(onSaveReflection?.(explanation.trim()))setSaved(true)}
 const guide=guides[Math.min(step,guides.length-1)];
 return <section className="quiz-journey" aria-labelledby="quiz-title" ref={quizRef}>
  <header className="quiz-header"><div><span className="eyebrow">CHECK YOUR UNDERSTANDING</span><h2 id="quiz-title">二人と確認してみよう。</h2><p>説明でつかんだ考え方を、一問ずつ使って確かめます。</p></div><div className="quiz-cast"><SotaCharacter className="quiz-sota"/><img src="/assets/vector-owl.png" alt="物理の案内役のフクロウ"/></div></header>
  <div className="quiz-progress" aria-label={`${questions.length}問中${Math.min(step+1,questions.length)}問目`}><span>STEP {Math.min(step+1,questions.length)} / {questions.length}</span><div>{questions.map((_,i)=><i key={i} className={i<step?'done':i===step?'current':''}/>)}</div></div>
  {!complete?<div className="quiz-card">
   <p className="quiz-kicker">{question.eyebrow}</p><h3><QuizText>{question.prompt}</QuizText></h3>
   {guide&&<><div className="question-purpose"><Target size={17}/><div><small>この問題で確かめたいこと</small><strong>{guide.goal}</strong></div></div><details className="question-hint" key={`${unit.id}-${step}`}><summary><HelpCircle size={16}/>ヒントを見る <span>必要なときだけ開こう</span></summary><p>{guide.hint}</p></details></>}
   <div className="quiz-choices" role="radiogroup" aria-label="答えを選ぶ">{question.choices.map((item,i)=>{const isChosen=choice===i,isAnswer=i===question.answer;return <button key={item} role="radio" aria-checked={isChosen} className={`${isChosen?'selected ':''}${answered&&isAnswer?'correct ':''}${answered&&isChosen&&!isAnswer?'wrong':''}`} disabled={answered} onClick={()=>choose(i)}><span className="choice-main"><span className="choice-letter">{String.fromCharCode(65+i)}</span><b><QuizText>{item}</QuizText></b>{answered&&(isChosen||isAnswer)&&<small className="answer-label">{isChosen&&isAnswer?'あなたの回答・正解':isChosen?'あなたの回答・不正解':'正解'}</small>}{answered&&isAnswer&&<Check size={17}/>}</span>{answered&&isAnswer&&<span className="choice-explanation is-correct"><strong>{correct?'その通り！':'この選択肢が正解'}</strong><span><QuizText>{question.feedback}</QuizText></span><span className="choice-owl-note"><img src="/assets/vector-owl.png" alt=""/><span><small>ここがポイント</small><b>{question.discovery}</b></span></span></span>}</button>})}</div>
   {answered&&<div className="quiz-next-panel" role="status"><span>{correct?'正解です。解説を確認したら次へ進もう。':'赤があなたの回答、緑が正解です。'}</span><button className="primary" onClick={next}>{step===questions.length-1?'最後のまとめへ':'次の問題へ'} <ArrowRight size={16}/></button></div>}
  </div>:<div className="quiz-complete"><section className="quiz-result-summary"><span>クイズ結果</span><h3>{questions.length}問中{score}問正解</h3><p>自分が選んだ答えと正解を、もう一度見比べてみよう。</p></section><QuizReview questions={questions} answers={answers}/><section className="quiz-final-writing"><span>最後のまとめ</span><h3>理解できたことや、自分が間違えたところ、次に見返したいことをメモしておこう。</h3><label>学びのメモ<textarea value={explanation} onChange={e=>{setExplanation(e.target.value);setSaved(false)}} placeholder="理解できたこと、間違えた理由、あとで見返したい点を書いておこう。"/></label><div className="quiz-complete-save"><button className="primary" disabled={!explanation.trim()} onClick={saveExplanation}><BookOpen size={16}/>メモを保存する</button><p role="status">{saved?'保存しました。学びのノートから読み返せます。':'書いたメモは、学びのノートに保存できます。'}</p></div><div className="quiz-complete-actions">{nextUnit&&<a className="primary" href={unitHref(sectionId,nextUnit)}>次の「{nextUnit.title}」に進む <ArrowRight size={16}/></a>}<button className="secondary" onClick={reset}><RotateCcw size={15}/>もう一度問題を解いてみる</button></div></section></div>}
 </section>;
}

export function SubunitList({sectionId,notes=[]}){
 const units=subunitsFor(sectionId);
 return <div className="subunit-list"><p className="subunit-list-label">小単元ごとに学ぶ <span>{units.length}ステップ</span></p>{units.map((unit,i)=>{
  const done=new Set(notes.filter(n=>n.unitId===unit.id).map(n=>n.level)).size;
  return <React.Fragment key={unit.id}>{(i===0||units[i-1].sourceLesson!==unit.sourceLesson)&&<p className="subunit-source-group">{unit.sourceLesson}</p>}<a href={unitHref(sectionId,unit)} className="subunit-link"><span className="subunit-letter">{unit.label}</span><strong>{unit.title}</strong><small>{done?`${done}/3 振り返り済み`:'学習目標を見る'}</small><ArrowRight size={13}/></a></React.Fragment>;
 })}</div>;
}

export default function SubunitLesson({sectionId,unitId,notes,onSave,onMap,quizOnly=false}){
 const context=curriculum.parts.flatMap(part=>part.chapters.flatMap(chapter=>chapter.sections.map(section=>({part,chapter,section})))).find(c=>c.section.id===sectionId);
 const units=subunitsFor(sectionId),unit=units.find(u=>u.id===unitId);
 const [level,setLevel]=useState(1),[reflection,setReflection]=useState(''),[saved,setSaved]=useState(false);
 useEffect(()=>{setLevel(1);setReflection('');setSaved(false)},[unitId]);
 if(!unit||!context)return <section className="workspace-panel"><h1>小単元が見つかりません。</h1><a className="secondary" href="#/map">冒険マップへ戻る</a></section>;
 const index=units.findIndex(u=>u.id===unitId),previous=units[index-1],next=units[index+1],isVectorBasics=unit.id==='part-1-chapter-1-section-1-lesson-1-vector',isDisplacement=unit.id==='part-1-chapter-1-section-1-lesson-1-A',isGasPressure=unit.id==='part-2-chapter-2-section-1-lesson-14-A',isBoyleCharles=unit.id==='part-2-chapter-2-section-1-lesson-14-B',isIdealGas=unit.id==='part-2-chapter-2-section-1-lesson-14-C';
 const prompts=[`「${unit.title}」で、何が変わり、何が変わらないか。具体的な場面を一つ挙げて考えよう。`,`「${unit.title}」に関係する量・式・単位を挙げよう。式を使える条件と、量を変えたときの結果も確かめよう。`,`「${unit.title}」を初めて学ぶ人へ、理由と具体例をつなげて説明しよう。既習事項のどれを使ったかも添えよう。`];
 const isQuizPage=quizOnly||window.location.hash.startsWith('#/quiz/');
 if(isQuizPage)return <article className="term-page subunit-lesson quiz-page" key={`${unit.id}-quiz`}>
  <a className="back-link" href={unitHref(sectionId,unit)}><ArrowLeft size={15}/>{unit.title}の説明に戻る</a>
  <header className="term-title lesson-title"><span className="eyebrow">確認問題 / {unit.label}</span><h1>{unit.title}を確認しよう</h1><p>説明ページとは別の画面です。落ち着いて、一問ずつ考えてみよう。</p></header>
  <QuizJourney key={unit.id} unit={unit} nextUnit={next} sectionId={sectionId} onSaveReflection={text=>onSave({kind:'subunit',unitId:unit.id,title:unit.title,unitLabel:unit.label,sectionTitle:context.section.title,level:1,reflection:text,date:new Date().toLocaleDateString('ja-JP')})}/>
 </article>;
 return <article className="term-page subunit-lesson" key={unit.id}>
  <button className="back-link back-button" onClick={()=>onMap(context.part.id)}> <ArrowLeft size={15}/>この分野のマップへ</button>
  <p className="term-breadcrumb">{context.part.title} ／ {context.chapter.title} ／ セクション{context.section.number} {context.section.title}</p>
  <header className="term-title lesson-title"><h1><span className="subunit-letter">{unit.label}</span>{unit.title}</h1><p>{isVectorBasics?'変位を学ぶ前に、矢印の意味と計算の考え方をつかむ。':isDisplacement?'変位と移動距離を、落とし物の場所から考える。':'二人の会話から、考え方を見つける。'}</p></header>
  {isVectorBasics?<VectorBasicsLesson/>:isDisplacement?<DisplacementDialogue/>:isGasPressure?<GasPressureLesson/>:isBoyleCharles?<BoyleCharlesLesson/>:isIdealGas?<IdealGasLesson/>:<MissionStory unit={unit}/>}
  <a className="quiz-launch" href={quizHref(sectionId,unit)}><span><small>説明を読み終えたら</small><strong>確認問題に進む</strong></span><ArrowRight size={22}/></a>
  <SectionTerms sectionId={sectionId}/>
  <section className="subunit-reflection"><h2>３つの深さで振り返る</h2><p>用語解説を参考に考え、授業で確かめたことを記録しよう。</p><div className="level-choice">{levels.map((name,i)=><button key={name} className={level===i+1?'chosen':''} onClick={()=>{setLevel(i+1);setReflection('');setSaved(false)}}>LEVEL {i+1}<b>{name}</b>{notes.some(n=>n.unitId===unit.id&&n.level===i+1)&&<span className="reflection-check"><Check size={12}/>記録あり</span>}</button>)}</div><p className="reflection-prompt">{prompts[level-1]}</p><label>自分の考え・気づき<textarea value={reflection} onChange={e=>{setReflection(e.target.value);setSaved(false)}} placeholder="分かったことと、まだ分からないことの両方を残せます。"/></label><button className="primary" disabled={!reflection.trim()} onClick={()=>{if(onSave({kind:'subunit',unitId:unit.id,title:unit.title,unitLabel:unit.label,sectionTitle:context.section.title,level,reflection:reflection.trim(),date:new Date().toLocaleDateString('ja-JP')}))setSaved(true)}}><BookOpen size={16}/>この小単元のノートに保存</button><p className="subunit-save-status" role="status">{saved?'保存しました。学びのノートから読み返せます。':'振り返りの記録です。正答や習得を自動判定するものではありません。'}</p></section>
  <nav className="term-pager" aria-label="前後の小単元">{previous?<a href={unitHref(sectionId,previous)}><ArrowLeft size={15}/>{previous.label} {previous.title}</a>:<span/>}{next&&<a href={unitHref(sectionId,next)}>{next.label} {next.title}<ArrowRight size={15}/></a>}</nav><SubunitList sectionId={sectionId} notes={notes}/>
 </article>;
}
