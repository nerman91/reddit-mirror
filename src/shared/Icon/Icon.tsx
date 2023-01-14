import React from 'react';
import styles from './icon.css';

import {
  CommentsIcon,
  ComplaintIcon,
  HideIcon,
  IconAnon,
  MenuIcon,
  SaveIcon,
  SaveIconMobile,
  ShareIcon,
  ShareIconMobile,
  CodeIcon,
  PageIcon,
  DocumentIcon,
  DownloadIcon,
  ContactIcon,
  RefreshIcon,
  LinkIcon,
  VoiseIcon,
  DialogIcon,
  PaintIcon,
  SuperscriptIcon,
  PngIcon,
  CloseIcon,
  ArrowUpIcon,
  ComplaintIconMobile,
  PlusIcon,
  SmileIcon
} from '../Icons';
import classNames from 'classnames';

export enum EIcons {
  comments,
  menu,
  hide,
  save,
  shared,
  complaint,
  saveMobile,
  sharedMobile,
  anon,
  code,
  page,
  document,
  download,
  contact,
  refresh,
  link,
  voise,
  dialog,
  paint,
  superscript,
  png,
  close,
  arrowUp,
  complaintMobile,
  plus,
  smile
}

type TSizes = 'default' | 14 | 20 | 16 | 50;

interface IIconProps {
  name: EIcons;
  size?: TSizes;
}

const icons = {
  [EIcons.comments]: <CommentsIcon />,
  [EIcons.menu]: <MenuIcon />,
  [EIcons.hide]: <HideIcon />,
  [EIcons.save]: <SaveIcon />,
  [EIcons.shared]: <ShareIcon />,
  [EIcons.complaint]: <ComplaintIcon />,
  [EIcons.saveMobile]: <SaveIconMobile />,
  [EIcons.sharedMobile]: <ShareIconMobile />,
  [EIcons.anon]: <IconAnon />,
  [EIcons.code]: <CodeIcon />,
  [EIcons.page]: <PageIcon />,
  [EIcons.document]: <DocumentIcon />,
  [EIcons.download]: <DownloadIcon />,
  [EIcons.contact]: <ContactIcon />,
  [EIcons.refresh]: <RefreshIcon />,
  [EIcons.link]: <LinkIcon />,
  [EIcons.voise]: <VoiseIcon />,
  [EIcons.dialog]: <DialogIcon />,
  [EIcons.paint]: <PaintIcon />,
  [EIcons.superscript]: <SuperscriptIcon />,
  [EIcons.png]: <PngIcon />,
  [EIcons.close]: <CloseIcon />,
  [EIcons.arrowUp]: <ArrowUpIcon />,
  [EIcons.complaintMobile]: <ComplaintIconMobile />,
  [EIcons.plus]: <PlusIcon />,
  [EIcons.smile]: <SmileIcon />
};

export function Icon({ name, size = 'default' }: IIconProps) {
  const classes = classNames(styles.iconContainer, styles[`s-${size}`]);
  return <div className={classes}>{icons[name]}</div>;
}
