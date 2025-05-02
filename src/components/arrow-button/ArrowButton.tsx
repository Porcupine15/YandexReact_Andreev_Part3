import { useState } from 'react';
import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import { clsx } from 'clsx';

export type OnClick = () => void;

type ArrowButtonProps = {
  isActive?: boolean;
  onClick?: OnClick;
};

export const ArrowButton = ({
  isActive = false,
  onClick,
}: ArrowButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    if (onClick) onClick();
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === 'Enter' && onClick) {
      onClick();
    }
  };

  return (
    <div
      role="button"
      aria-label="Открыть/Закрыть форму параметров статьи"
      aria-pressed={isActive}
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      className={clsx(
        styles.container,
        isActive && styles.container_open,
        isHovered && !isPressed && styles.container_hover,
        isPressed && styles.container_pressed
      )}
    >
      <img
        src={arrow}
        alt="иконка стрелочки"
        className={clsx(styles.arrow, isActive && styles.arrow_open)}
      />
    </div>
  );
};