import {useEffect,useState} from 'react';

function readRoute(){
 const [requestedView='map',requestedSectionId,requestedTermId]=window.location.hash.replace(/^#\/?/,'').split('/');
 let sectionId=requestedSectionId,termId=requestedTermId;
 if((requestedView==='learn'||requestedView==='quiz')&&termId){
  const migration=termId.includes('lesson-14')?['part-2-chapter-1-section-1','part-2-chapter-2-section-1','part-2-chapter-1-section-1-','part-2-chapter-2-section-1-']:termId.includes('lesson-15')?['part-2-chapter-1-section-2','part-2-chapter-3-section-1','part-2-chapter-1-section-2-','part-2-chapter-3-section-1-']:termId.includes('lesson-16')||termId.includes('lesson-17')?['part-2-chapter-1-section-3','part-2-chapter-4-section-1','part-2-chapter-1-section-3-','part-2-chapter-4-section-1-']:null;
  if(migration&&sectionId===migration[0]){sectionId=migration[1];termId=termId.replace(migration[2],migration[3])}
 }
 const view=requestedView==='quiz'?'learn':requestedView;
 return {view:['map','notes','review','glossary','learn','formulas','laws','trigonometry'].includes(view)?view:'map',sectionId,termId,quizOnly:requestedView==='quiz'};
}

export default function useAppRoute(){
 const [route,setRoute]=useState(readRoute);
 useEffect(()=>{const update=()=>setRoute(readRoute());window.addEventListener('hashchange',update);return()=>window.removeEventListener('hashchange',update)},[]);
 useEffect(()=>{window.scrollTo(0,0)},[route.view,route.sectionId,route.termId,route.quizOnly]);
 return [route,view=>{window.location.hash=`#/${view}`}];
}
