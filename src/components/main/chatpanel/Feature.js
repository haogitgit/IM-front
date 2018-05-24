import React from 'react';
import styles from './Feature.css';
import Search from './Search';
import Contact from './Contact';

function Feature({contactList, handChat }) {
  const props = {contactList, handChat };
  return (
    <div className="feature">
      <Search />
      <Contact {...props}/>
    </div>
  );
};


export default Feature;
