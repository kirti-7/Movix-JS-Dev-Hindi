import { useState } from 'react';
import './switchTabs.scss';

function SwitchTabs({ data, onTabChange }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTab = (tab, index) => {
    setLeft(index * 100);
    setTimeout(() => {
      setSelectedTab(index);
    }, 300);
    onTabChange(tab, index);
  }


  return (
    <div className='switchTabs'>
      <div className="tabItems">
        {data.map((tab, index) => (
          <span key={index} className={`tabItem ${selectedTab===index ? "active": ""}`} onClick={()=>activeTab(tab, index)} >
            {tab}
          </span>
        ))}
        <span className="movingBg" style={{ left: `${left}px` }}/>
      </div>
    </div>
  );
}

export default SwitchTabs;