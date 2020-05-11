import '../index.css';
import React, { useState, useEffect, useRef }  from 'react';

import { ReactComponent as BellIcon } from '../icons/bell.svg';
import { ReactComponent as MessengerIcon } from '../icons/messenger.svg';
import { ReactComponent as CaretIcon } from '../icons/caret.svg';
import { ReactComponent as PlusIcon } from '../icons/plus.svg';
import { ReactComponent as CogIcon } from '../icons/cog.svg';
import { ReactComponent as ChevronIcon } from '../icons/chevron.svg';
import { ReactComponent as ArrowIcon } from '../icons/arrow.svg';
import { ReactComponent as BoltIcon } from '../icons/bolt.svg';

import { CSSTransition } from 'react-transition-group'

function DropdownMenu() {

  const [activeMenu, setActiveMenu] = useState('main'); //settings, animals
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a href={props.href ? props.href : "#"} className='menu-item' onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className='icon-button'>{props.leftIcon}</span>

        {props.children}

        <span className='icon-right'>{props.rightIcon}</span>
      </a>
    )
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>

      <CSSTransition
        in={activeMenu === 'main'}
        unmountOnExit
        timeout={500}
        classNames='menu-primary'
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem
            leftIcon={<CogIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu="language_settings">
              Choose Language
          </DropdownItem>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === 'language_settings'}
        unmountOnExit
        timeout={500}
        classNames='menu-secondary'
        onEnter={calcHeight}
        >
        <div className="menu">
        <DropdownItem
          leftIcon={<ArrowIcon  />}
          goToMenu="main">
            Main Menu
        </DropdownItem>
        <DropdownItem
          href='chinese'
          leftIcon='🇨🇳'>
            Mandarin
        </DropdownItem>
        <DropdownItem
          href='russian'
          leftIcon='🇷🇺'>
            Russian
        </DropdownItem>
        <DropdownItem
          href='italian'
          leftIcon='🇮🇹'>
            Italian
        </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  )
}

export default DropdownMenu;