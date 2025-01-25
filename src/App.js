import React, { useState, useEffect} from 'react';
import {Drawer} from 'antd';
import './i18n';
import i18next from './i18n'
import './App.css';






function App() {
  // Content of the app
  const contentApp = [
    {
      id: 1,
      headline: i18next.t("dataWeCollect"),
      content: i18next.t("dataWeCollectContent"),
    },
    {
      id: 2,
      headline: i18next.t("internetUse"),
      content: i18next.t("internetUseContent"),
    },
    {
      id: 3,
      headline: i18next.t("notificationsPrivacy"),
      content: i18next.t("notificationsPrivacyContent"), 
    },
    {
      id: 4,
      headline: i18next.t("permissionsWeRequest"),
      content: i18next.t("permissionsWeRequestContent"),  
    },
    {
      id: 5,
      headline: i18next.t("howWeUseYourData"),
      content: i18next.t("howWeUseYourDataContent"),
    },
    {
      id: 6,
      headline: i18next.t("feedbackSubmission"),
      content: i18next.t("feedbackSubmissionContent"),
    },
    {
      id: 7,
      headline: i18next.t("appUsageAndDataStorage"),
      content: i18next.t("appUsageAndDataStorageContent"),
    },
  ];
// Language List
  const languageList = [
    { id: 1, language: i18next.t('english') , code : 'en' }, 
    { id: 2, language: i18next.t('spanish')  , code : 'es' }, 
    { id: 3, language: i18next.t('arabic')  , code : 'ar' },  
    { id: 4, language: i18next.t('german')  , code : 'de' },  
  ];


  const [isVisible , setVisiable] = useState(false); // menu button 
  const [sideVisible, setSideVisible] = useState(false); // menu side bar
  const [languageVisible, setLanguageVisible] = useState(false); // language side bar

// Screen size 
useEffect(() => {
  const checkScreenWidthSize  = () => {
    // If size less than 800
    if(window.innerWidth < 900){
      setVisiable(true);
    } else {
      setVisiable(false);
    }
  }

    // Set the initial state
    checkScreenWidthSize();

    // Add the event listener for dynamic updates
    window.addEventListener('resize', checkScreenWidthSize);
  
    // Cleanup the event listener
    return () => {
      window.removeEventListener('resize', checkScreenWidthSize);
    };
} , [])

// onClick items in menu
const onClickItem = (contentId) => {
  setSideVisible(false);
  <a href={`#${contentId}`}></a>
}

// Headline list 
  const listHeadline = contentApp.map((element) => (
    <li key={element.id}
    onClick={() => onClickItem(element.id)}>
      <a href={`#${element.id}`}>{element.headline}</a>
    </li>
  ));

// Content Lsit
  const listContent = contentApp.map((element) => (
    <section key={element.id} id={element.id}>
    <h2>{element.headline}</h2>
    <p>{element.content}</p>
    </section>
  ))

  // on click change language
const changeLanguage = (languageCode) => {
  i18next.changeLanguage(languageCode);
  setLanguageVisible(false);
}

// Language List
const listLanguage = languageList.map((element) => (
  <li key={element.id} 
  onClick={() => changeLanguage(element.code)}>
    <a style={{color : i18next.language === element.code ? "#4D00FF" : "white"}}>{element.language}</a>
  </li>
));

// on Click Menu Button
  const onClickMenu = (value) => {
    setSideVisible(value);
  }


  return (
    <div className="App">
    {/* SideBar */}
    <Drawer
      className="side-bar"
      placement="left"
      style={{ background: '#1E1E1E' }}
      open={sideVisible}
      onClose={() => setSideVisible(false)}
    >
      {/* Menu */}
      <div className="side-bar-content">
        <ul className="side-list">{listHeadline}</ul>
      </div>
    </Drawer>


    {/* Language Sidebar */}
    <Drawer
      className="language-bar"
      placement="right"
      style={{ background: '#1E1E1E' }}
      open={languageVisible}
      onClose={() => setLanguageVisible(false)}
    >
      {/* Language list */}
      <div className="side-bar-content">
        <ul className="side-list">{listLanguage}</ul>
      </div>
    </Drawer>


    {/* Header */}
    <header>
      <div>
        {isVisible && (
          <button className="menu">
            <span className="material-icons" onClick={() => setSideVisible(true)}>
              menu
            </span>
          </button>
        )}
      </div>


      <div>
        <h1>
          <span className="app-name">Questify</span>
          <span>Privacy Policy</span>
        </h1>
      </div>


      {/* Language */}
      <div>
        <button className="language">
          <span className="material-icons" onClick={() => setLanguageVisible(true)}>
            language
          </span>
        </button>
      </div>
    </header>


    <div className="main">
      {/* Side Content */}
      {isVisible === false && (
        <div className="side-content">
          <ul className="side-list">{listHeadline}</ul>
        </div>
      )}

      {/* Content area */}
      <div className="content-area">
        <ul>{listContent}</ul>
        <div className='contentUs'>
        <h4>{i18next.t("contentUS")}</h4>
        <a href="mailto:questify.help@gmail.com" className='email'>questify.help@gmail.com</a>
        </div>
      </div>
    </div>
  </div>
  );
}

export default App;
