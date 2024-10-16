import { ComponentPropsWithoutRef, FC } from 'react';

import classNames from 'classnames/bind';
import styles from './Icon.module.scss';
import { useSelectContext } from '../../SelectContext';

export interface IconProps extends ComponentPropsWithoutRef<'div'> {}

const cx = classNames.bind(styles);

const Icon: FC<IconProps> = (props) => {
  const { className, children, ...rest } = props;

  const { isOpen } = useSelectContext();

  const styleNames = cx('icon', { 'icon--active': isOpen }, className);

  return (
    <div className={styleNames} {...rest}>
      {children}
    </div>
  );
};

export default Icon;