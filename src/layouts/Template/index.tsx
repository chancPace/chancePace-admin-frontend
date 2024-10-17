import { ReactNode } from 'react';

import Content from '../Content';

import { TemplateStyled } from './style';

import clsx from 'clsx';
import Sidebar from '../Sidebar';

export interface TemplateProps {
  className?: string;
  children: ReactNode;
}

const Template = ({ className, children }: TemplateProps) => {
  return (
    <TemplateStyled className={clsx('Template', className)}>
      <Sidebar />
      <Content>{children}</Content>
    </TemplateStyled>
  );
};

export default Template;
