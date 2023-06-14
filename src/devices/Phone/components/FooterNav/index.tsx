import styles from "./index.module.scss";
import Play from "assets/img/play.svg";
import Stop from "assets/img/stop.svg";
import Pause from "assets/img/pause.svg";
import Crosshair from "assets/img/crosshair.svg";
import CrosshairWhite from "assets/img/crosshair-white.svg";
import Document from "assets/img/document-white.svg";
import { useSelector } from "react-redux";
import {
  selectorSpeak,
  setPositionSpeak
} from "features/Speak/slice";
import { AppDispatch } from "app/store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const FooterNav = () => {
  const dispatch: AppDispatch = useDispatch();
  const { positionSpeak, positionSelected, player, text, lang } =
    useSelector(selectorSpeak);
  const [valueIndex, setValueIndex] = useState(0)
  const [valueLength, setValueLenght] = useState(0)
  
  player.onboundary = (event) => {
    const { charIndex, charLength } = event;

    console.log(charIndex, charLength)
    setValueIndex(charIndex)
    setValueLenght(charLength)
  }

  useEffect(() => {
    if(valueIndex === text.length - valueLength || valueIndex >= text.length - valueLength - 1){
      dispatch(setPositionSpeak(0))
    }
  }, [dispatch, text.length, valueIndex, valueLength])

  const play = () => {
    player.text = text.slice(positionSpeak);
    player.lang = lang;
    player.addEventListener("boundary", (event) => {
      const { charIndex } = event;
      if(charIndex === positionSpeak){
        dispatch(setPositionSpeak(0))
      }else{
        dispatch(setPositionSpeak(positionSpeak + charIndex));
      }
    });
    if ("speechSynthesis" in window) {
      window.speechSynthesis.speak(player);
    } else {
      console.log("Este navegador no acepta este servicio");
    }
  };

  const stop = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    } else {
      console.log("Este navegador no acepta este servicio");
    }
    dispatch(setPositionSpeak(0));
  };

  const pause = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    } else {
      console.log("Este navegador no acepta este servicio");
    }
  };

  const playWithPosition = () => {
    player.text = text.slice(positionSelected);
    player.lang = "es-ES";
    player.addEventListener("boundary", (event) => {
      const { charIndex } = event;
      dispatch(setPositionSpeak(positionSelected))
      dispatch(setPositionSpeak(positionSpeak + charIndex));
    });
    if ("speechSynthesis" in window) {
      window.speechSynthesis.speak(player);
    } else {
      console.log("Este navegador no acepta este servicio");
    }
  };

  return (
    <div className={styles["FooterNav"]}>
      <div className={styles["Indicators"]}>
        <div>
          <img src={Document} alt=""/>
          {positionSpeak}
        </div>
        <div>
          <img src={CrosshairWhite} alt="" />
          {positionSelected}
        </div>
      </div>
      <div className={styles["Buttons"]}>
        <button onClick={play}>
          <img src={Play} alt="" />
        </button>
        <button onClick={stop}>
          <img src={Stop} alt="" />
        </button>
        <button onClick={pause}>
          <img src={Pause} alt="" />
        </button>
        <button onClick={playWithPosition}>
          <img className={styles["Crosshair"]} src={Crosshair} alt="" />{" "}
          <img src={Play} alt="" />
        </button>
      </div>
    </div>
  );
};

export default FooterNav;
