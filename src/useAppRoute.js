import {useEffect,useState} from 'react';

function readRoute(){
 const [requestedView='map',sectionId,termId]=window.location.hash.replace(/^#\/?/,'').split('/');
 const view=requestedView==='quiz'?'learn':requestedView;
 return {view:['map','notes','review','glossary','learn','formulas','laws','trigonometry'].includes(view)?view:'map',sectionId,termId,quizOnly:requestedView==='quiz'};
}

export default function useAppRoute(){
 const [route,setRoute]=useState(readRoute);
 useEffect(()=>{const update=()=>setRoute(readRoute());window.addEventListener('hashchange',update);return()=>window.removeEventListener('hashchange',update)},[]);
 useEffect(()=>{window.scrollTo(0,0)},[route.view,route.sectionId,route.termId,route.quizOnly]);
 return [route,view=>{window.location.hash=`#/${view}`}];
}
