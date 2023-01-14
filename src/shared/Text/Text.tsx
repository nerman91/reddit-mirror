import React from 'react';
import styles from './text.css';
import classNames from 'classnames';

type TSizes = 28 | 20 | 16 | 14 | 12 | 10;

export enum EColors {
  black = 'black',
  orange = 'orange',
  green = 'green',
  white = 'white',
  grayF4 = 'grayF4',
  greyF3 = 'greyF3',
  greyEC = 'greyEC',
  greyD9 = 'greyD9',
  greyC4 = 'greyC4',
  grey99 = 'grey99',
  grey66 = 'grey66'
}

interface ItextProps {
  As?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div';
  children?: React.ReactNode;
  size: TSizes;
  mobileSize?: TSizes;
  tabletSize?: TSizes;
  desktopSize?: TSizes;
  color?: EColors;
}

export function Text(props: ItextProps) {
  const {
    As = 'span',
    color = EColors.black,
    children,
    size,
    mobileSize,
    desktopSize,
    tabletSize
  } = props;
  const classes = classNames(
    styles[`s${size}`],
    { [styles[`m${mobileSize}`]]: mobileSize },
    { [styles[`t${tabletSize}`]]: tabletSize },
    { [styles[`d${desktopSize}`]]: desktopSize },
    styles[color]
  );
  return <As className={classes}>{children}</As>;
}
