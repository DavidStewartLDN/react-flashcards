import React, { useContext } from 'react';
import { LanguageContext } from '../LanguageContext';

function CurrentLanguageDisplay() {
  const {language} = useContext(LanguageContext)

  var value = {italian: {lang:"Italian", icon: '🇮🇹'}, mandarin:{lang:"Mandarin", icon: '🇨🇳'}, russian:{lang:"Russian", icon: '🇷🇺'}};

  return(
    <div>
      <p style={{color: 'white'}}>Current language: {value[language].lang} {value[language].icon}</p>
    </div>
  )
}

export default CurrentLanguageDisplay