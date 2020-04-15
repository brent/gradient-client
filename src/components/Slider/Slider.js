import React, { useRef } from 'react';
import styles from './styles.module.css';

export const Slider = () => {
  const sliderThumb = useRef(null);
  const sliderTrack = useRef(null);

  let active = false;
  let initialX;
  let currentX;
  let xOffset = 0;

  const log = () => {
    console.log('initialX', initialX);
    console.log('currentX', currentX);
    console.log('xOffset', xOffset);
  }

  const handleDragStart = (e) => {
    e.preventDefault();
    if (e.type === 'touchstart') {
      initialX = e.touches[0].clientX - xOffset;
    } else {
      initialX = e.clientX - xOffset;
    }

    if (e.target === sliderThumb.current) {
      active = true;
    }
  }

  const handleDrag = (e) => {
    if (active) {

      const floor = 0;
      const max = (() => {
        const track = sliderTrack.current;
        const thumb = sliderThumb.current;
        return track.offsetWidth - thumb.offsetWidth;
      })();

      if (e.type === 'touchmove') {
        currentX = e.touches[0].clientX - initialX;
      } else {
        currentX = e.clientX - initialX;
      }

      if (currentX < 0) {
        currentX = xOffset = floor;
      } else if (currentX > max) {
        currentX = xOffset = max;
      } else {
        xOffset = currentX;
      }

      log();
      console.log(`${Math.floor((currentX/max) * 100)}%`);

      setTranslateX(currentX, sliderThumb.current);
    }
  }

  const handleDragEnd = (e) => {
    initialX = currentX;
    active = false;
  }

  const setTranslateX = (xPos, el) => {
    el.style.transform = `translate3d(${xPos}px, 0, 0)`;
  }

  return (
    <div className={ styles.sliderWrapper }
      onTouchStart={ (e) => handleDragStart(e) }
      onTouchMove={ (e) => handleDrag(e) }
      onTouchEnd={ (e) => handleDragEnd(e) }
      onMouseDown={ (e) => handleDragStart(e) }
      onMouseMove={ (e) => handleDrag(e) }
      onMouseUp={ (e) => handleDragEnd(e) }
      ref={ sliderTrack }
    >
      <div className={ styles.sliderThumb } 
        ref={ sliderThumb }>
      </div>
    </div>
  );
}
