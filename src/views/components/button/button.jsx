import React from "react";
import styles from "./button.module.scss";

export default function Button(props) {
  const { text, onClick } = props;

  return (
      <button onClick={onClick} className={styles['wrapper_button']}>
        {text}
      </button>
  );
}
