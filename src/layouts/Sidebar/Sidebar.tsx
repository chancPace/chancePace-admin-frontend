import React, { memo, ReactNode, useState } from 'react';

import { SidebarStyled } from './style';

import { Layout } from 'antd';
import clsx from 'clsx';
import SideBar from '@/utill/createSideMenu';

export interface SidebarProps {
  className?: string;
  children?: ReactNode;
}

const Sidebar = ({ className, children }: SidebarProps) => {
  return (
    <SidebarStyled className={clsx('Sidebar', className)}>
      <div>
        <Layout>
          <Layout.Sider width={200}>
            <SideBar />
          </Layout.Sider>

          <Layout style={{ marginLeft: 200 }}>
            <Layout.Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <div style={{ padding: '24px' }}>{children}</div>
            </Layout.Content>
          </Layout>
        </Layout>
      </div>
    </SidebarStyled>
  );
};

export default memo(Sidebar);
