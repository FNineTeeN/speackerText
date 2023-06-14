import styles from "./index.module.scss";

import Document from 'assets/img/document-green.svg';
import Close from 'assets/img/close-green.svg'
import { useRef, useState } from "react";
import { AppDispatch } from "app/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectorSpeak, setPositionSelected, setText } from "features/Speak/slice";

const InputText = () => {
  const dispatch: AppDispatch = useDispatch()
  const {text} = useSelector(selectorSpeak)
  const [inputText, setInputText] = useState<boolean>(false)
  const textareaRef = useRef<null | HTMLTextAreaElement>(null);

  const changeStateInputText = (state: boolean) => {
    setInputText(state)
  }

  const changeText = (nexText: string) => {
    dispatch(setText(nexText));
  }

  const handleSelectionChange = () => {
    if (textareaRef.current) {
      const selectionStart = textareaRef.current.selectionStart;
      console.log('Posición seleccionada:', selectionStart);
      dispatch(setPositionSelected((selectionStart)))
    }
  };

  return (
    <div className={styles.InputText}>
      <div className={styles.Content}>
        <button onClick={() => changeStateInputText(true)} className={styles.OpenButton} id={inputText ? styles.OpenButtonDisabled : ""}><img src={Document} alt="" /></button>
        <div className={styles.ContentInput} id={inputText ? styles.ContentInputActive : ''}>
          <div className={styles.ContentTitle}>
            <button onClick={() => changeStateInputText(false)}><img src={Close} alt="" /></button>
            <p>INGRESA EL TEXTO</p>
          </div>
          <div className={styles.ContentTextarea}><textarea ref={textareaRef} value={text} onChange={(value) => changeText(value.target.value)} onSelect={handleSelectionChange}></textarea></div>
        </div>
      </div>
    </div>
  );
};

export default InputText;
