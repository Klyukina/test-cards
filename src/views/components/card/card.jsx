import React, { useState } from "react";
import Button from "../button/button";
import waterfall from '../../../assets/img/waterfall.png'
import { Svg } from "../../../svg";
import styles from "./card.module.scss";

export default function Card(props) {
  const { item, rating } = props;
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  }

  const itemCardClasses = `${styles['item-description']} ${isHovered ? styles.expanded : ''}`;

  return (
    <section
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={styles['item-card']}
    >
      <img src={waterfall} alt="" />
      <div className={itemCardClasses}>
          <div className={styles['item-text']}>
            <div className={styles['item-header']}>
              <div className={styles['item-email']}>{item.email.toUpperCase()}</div>
              <div className={styles['item-rating']}>
                <div className={styles['item-number']}>{rating}</div>
                <Svg.Icon.Star/>
              </div>
            </div>
            <p>{item.body}</p>
            {isHovered && <div className={styles['item-btn']}>
              <Button text={'Visit comment'}/>
            </div>}
          </div>
      </div>
    </section>
  );
}
