import React from 'react';
import styles from './Feature.css';
import Search from './Search';
import Contact from './Contact';

function Feature({ contactList, handChat, currentChat, chatMessage, unRead }) {
  const props = { contactList, handChat, currentChat, chatMessage, unRead };
  return (
    <div className="feature">
      <div className="searchdiv">
        <Search />
      </div>
      <div className="contactdiv">
        <Contact {...props} />
      </div>
    </div>
  );
};


export default Feature;
