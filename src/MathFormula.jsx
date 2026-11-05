import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const subscript={'₀':'0','₁':'1','₂':'2','₃':'3','₄':'4','₅':'5','₆':'6','₇':'7','₈':'8','₉':'9','ₐ':'a','ₑ':'e','ₕ':'h','ᵢ':'i','ⱼ':'j','ₖ':'k','ₗ':'l','ₘ':'m','ₙ':'n','ₒ':'o','ₚ':'p','ᵣ':'r','ₛ':'s','ₜ':'t','ᵤ':'u','ᵥ':'v','ₓ':'x'};
const superscript={'⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9','⁻':'-','⁺':'+','ⁿ':'n','ᴸ':'L'};
const commands={'Δ':'\\Delta ','μ':'\\mu ','ρ':'\\rho ','π':'\\pi ','ω':'\\omega ','θ':'\\theta ','φ':'\\varphi ','η':'\\eta ','λ':'\\lambda ','ν':'\\nu ','ε':'\\varepsilon ','Φ':'\\Phi ','ℓ':'\\ell ','ℰ':'\\mathcal{E}','Σ':'\\sum ','−':'-','·':'\\cdot ','→':'\\to ','≈':'\\approx ','⊥':'\\perp ','≤':'\\le ','≥':'\\ge ','∞':'\\infty ','∮':'\\oint ','⟨':'\\langle ','⟩':'\\rangle ','′':"'",'½':'\\frac{1}{2}'};

function appendScript(output,type,value){
 const tail=output.pop()||'';
 const marker=type==='sub'?'_':'^';
 const grouped=tail.match(new RegExp(`^(.*)\\${marker}\\{([^{}]*)\\}$`));
 output.push(grouped?`${grouped[1]}${marker}{${grouped[2]}\\,${value}}`:`${tail}${marker}{${value}}`);
}

function fractionsToLatex(value){
 let result=value,index=0;
 const findFractionSlash=(start)=>{
  let braceDepth=0;
  for(let position=start;position<result.length;position++){
   if(result[position]==='{')braceDepth++;
   else if(result[position]==='}')braceDepth--;
   else if(result[position]==='/'&&braceDepth===0)return position;
  }
  return -1;
 };
 while((index=findFractionSlash(index))!==-1){
  let left=index-1;
  while(left>=0&&/\s/.test(result[left]))left--;
  let braceDepth=0,parenDepth=0;
  for(;left>=0;left--){
   const char=result[left];
   if(char==='}')braceDepth++; else if(char==='{')braceDepth--;
   else if(char===')')parenDepth++; else if(char==='(')parenDepth--;
   if(braceDepth===0&&parenDepth===0&&/[=+\-,]/.test(char))break;
  }
  const numeratorStart=left+1;
  const numerator=result.slice(numeratorStart,index).trim();
  let right=index+1;
  while(right<result.length&&/\s/.test(result[right]))right++;
  let denominatorEnd=right,denominator='';
  if(result[right]==='('){
   let depth=1;denominatorEnd=right+1;
   while(denominatorEnd<result.length&&depth){
    if(result[denominatorEnd]==='(')depth++;
    if(result[denominatorEnd]===')')depth--;
    denominatorEnd++;
   }
   denominator=result.slice(right+1,denominatorEnd-1).trim();
  }else{
   braceDepth=0;parenDepth=0;
   while(denominatorEnd<result.length){
    const char=result[denominatorEnd];
    if(char==='{')braceDepth++; else if(char==='}')braceDepth--;
    else if(char==='(')parenDepth++; else if(char===')')parenDepth--;
    if(braceDepth===0&&parenDepth===0&&/[=+\-,]/.test(char))break;
    denominatorEnd++;
   }
   denominator=result.slice(right,denominatorEnd).trim();
  }
  if(!numerator||!denominator){index++;continue;}
  const fraction=`\\frac{${numerator}}{${denominator}}`;
  result=result.slice(0,numeratorStart)+fraction+result.slice(denominatorEnd);
  index=numeratorStart+fraction.length;
 }
 return result;
}

export function expressionToLatex(expression){
 // 数式内の単位は「［m］」「［m/s］」のように全角の角括弧で明示する。
 const source=expression
  .replace(/［([^］]+)］/g,'\\mathrm{［$1］}')
  .replace(/√\{([^{}]+)\}/g,'\\sqrt{$1}')
  .replace(/([A-Za-z])⃗([A-Z])→([A-Z])/g,'\\vec{$1}_{$2\\to $3}')
  .replace(/([A-Za-z])⃗([A-Z])/g,'\\vec{$1}_{$2}')
  .replace(/([A-Za-z])⃗([぀-ヿ㐀-鿿]+)/g,'\\vec{$1}_{\\mathrm{$2}}')
  .replace(/([A-Za-z])⃗/g,'\\vec{$1}')
  .replace(/\bsin\b/g,'\\sin ')
  .replace(/\bcos\b/g,'\\cos ')
  .replace(/\btan\b/g,'\\tan ');
 const output=[];
 for(let i=0;i<source.length;){
  if(source[i]==='\\'){
   const match=source.slice(i).match(/^\\(?:vec|mathrm)\{[^}]+\}(?:_\{[^}]+\})?|^\\(?:sin|cos|tan)\s?/);
   if(match){output.push(match[0]);i+=match[0].length;continue;}
  }
  if(subscript[source[i]]){
   let value='';
   while(i<source.length&&subscript[source[i]])value+=subscript[source[i++]];
   appendScript(output,'sub',value);continue;
  }
  if(superscript[source[i]]){
   let value='';
   while(i<source.length&&superscript[source[i]])value+=superscript[source[i++]];
   appendScript(output,'sup',value);continue;
  }
  const japanese=source.slice(i).match(/^[぀-ヿ㐀-鿿]+/);
  if(japanese){
   const text=`\\mathrm{${japanese[0]}}`;
   const previous=output.at(-1)||'';
   if(previous&&!/\s$|[=+\-(),、]$/.test(previous))appendScript(output,'sub',text); else output.push(text);
   i+=japanese[0].length;continue;
  }
  output.push(commands[source[i]]??source[i]);i++;
 }
 return fractionsToLatex(output.join('').replace(/\^\(([^)]+)\)/g,'^{$1}'));
}

const inlineEquation=/([A-Za-z0-9ΔΣΦμρπωθφηλνεℓℰ⃗₀-₉ₐ-ₜᵥₓ⁰-⁹⁻⁺ⁿ′½⟨⟩|()\[\]{}·×÷+\-−/.,\s]+[=≤≥≈][A-Za-z0-9ΔΣΦμρπωθφηλνεℓℰ⃗₀-₉ₐ-ₜᵥₓ⁰-⁹⁻⁺ⁿ′½⟨⟩|()\[\]{}·×÷+\-−/.,\s]+)/g;

export function MathText({children}){
 const text=String(children??'');
 return text.split(inlineEquation).filter(Boolean).map((part,index)=>/[=≤≥≈]/.test(part)?<MathFormula key={index} expression={part.trim()}/>:part);
}

export default function MathFormula({expression,className='',display=false}){
 let html;
 try{html=katex.renderToString(expressionToLatex(expression),{displayMode:display,throwOnError:true,strict:'warn',output:'htmlAndMathml'});}
 catch{return <span className={className}>{expression}</span>;}
 return <span className={`math-formula ${className}`.trim()} aria-label={`式：${expression}`} dangerouslySetInnerHTML={{__html:html}}/>;
}
