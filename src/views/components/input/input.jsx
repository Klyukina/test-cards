import React from "react";
import styles from "./input.module.scss";

export default function Input(props) {
  const { text, value, onChange, type } = props;

  return (
     <div className={styles['wrapper-input']}>
       {value && <label htmlFor={text} className={styles.label}>{text} </label>}
       <input
         type={type}
         value={value}
         onChange={(event) => onChange(event)}
         id={text} className={styles.input}
         placeholder={text}/>
     </div>
  );
}
