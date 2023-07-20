import React, {useCallback, useState} from "react";
import Input from "../input/input";
import Button from "../button/button";
import { Svg } from "../../../svg/index";
import styles from "./modal-login.module.scss";

export default function ModalLogin(props) {
  const { onClick, onClose, isModalOpen } = props;
  const [checked, setChecked] = useState(true);
  const [inputLogin, setInputLogin] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const handleChangeLogin = (event) => {
    setInputLogin(event.target.value);
  };

  const handleChangePassword = (event) => {
    setInputPassword(event.target.value);
  };

  const onSubmit = useCallback(() => {
    const request = {
      login: inputLogin,
      password: inputPassword,
      checked: checked
    }
    console.log(request)
  },[inputLogin, inputPassword, checked])

  const itemModalClasses = `${styles.modal} ${isModalOpen ? styles['modal-open'] : '' }`;

  return (
        <article className={itemModalClasses} onClick={onClick}>
          <div className={styles['modal_block']}>
            <div onClick={onClose} className={styles['modal_close']}>
              <Svg.Icon.Close/>
            </div>
            <h1 className={styles['modal_title']}>Authorization</h1>
            <div className={styles['modal_content']}>
              <Input type={'text'} value={inputLogin} onChange={handleChangeLogin} text={'Login'}/>
              <Input type={'password'} value={inputPassword} onChange={handleChangePassword} text={'Password'}/>
              <div className={styles['modal_checkbox']}>
                <input id="login" className={styles['custom-checkbox']} type="checkbox" defaultChecked={checked} onChange={() => setChecked(!checked)} />
                <label htmlFor="login">Remember me on next login</label>
              </div>
            </div>
            <div className={styles['modal_btn']}>
              <Button onClick={onSubmit} text={'Sign In'}/>
            </div>
          </div>
        </article>
  );
}
