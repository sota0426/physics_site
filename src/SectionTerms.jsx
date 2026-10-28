import React from 'react';
import {ChevronRight} from 'lucide-react';
import {glossaryBySection,termHref} from './glossary-data';

export default function SectionTerms({sectionId}) {
 const terms=glossaryBySection[sectionId]||[];
 return <div className="section-term-links"><span>このセクションの用語</span><div>{terms.map(term=><a key={term.id} href={termHref(term)}>{term.name}<ChevronRight size={12}/></a>)}</div></div>;
}
