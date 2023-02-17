import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';

function BackgroundLight(props) {
  const [state, setState] = useState({
    
  });

  const callbacks = {
    mouseMove: (e)=>{
      moveEffect(e.clientX, e.clientY);
    },
  }

  useEffect(()=>{
    document.addEventListener("mousemove", callbacks.mouseMove);
  }, [])

  const effect = useRef(null);

  const moveEffect = (x, y)=> {
    const positionX = (x-(effect.current.clientWidth/2));
    const positionY = (y-(effect.current.clientHeight/2));
    effect.current.style.transform = `translateX(${positionX}px) translateY(${positionY}px`;
  }

  return <div className={styles.effect} ref={effect}></div>;
}

BackgroundLight.defaultProps = {
    props: {},
};

export default BackgroundLight;
