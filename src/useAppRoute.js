import {useEffect,useState} from 'react';

function readRoute(){
 const [view='map',sectionId,termId]=window.location.hash.replace(/^#\/?/,'').split('/');
 return {view:['map','notes','review','glossary','learn','formulas'].includes(view)?view:'map',sectionId,termId};
}

export default function useAppRoute(){
 const [route,setRoute]=useState(readRoute);
 useEffect(()=>{const update=()=>setRoute(readRoute());window.addEventListener('hashchange',update);return()=>window.removeEventListener('hashchange',update)},[]);
 useEffect(()=>{window.scrollTo(0,0)},[route.view,route.sectionId,route.termId]);
 return [route,view=>{window.location.hash=`#/${view}`}];
}
