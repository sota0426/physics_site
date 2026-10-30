const STORAGE_KEY='physics-atelier-completed-concepts';

export function completedConcepts(){
 try{return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]'))}catch{return new Set()}
}

export function completeConcept(id){
 const completed=completedConcepts();
 completed.add(id);
 localStorage.setItem(STORAGE_KEY,JSON.stringify([...completed]));
}
