import React from 'react';

export default function SotaCharacter({className='',label='少年'}){
 return <span className={`sota-character ${className}`} role="img" aria-label={label}><i className="sota-hair"/><i className="sota-eye left"/><i className="sota-eye right"/><i className="sota-mouth"/></span>;
}
