import React from "react";
import {PageContainer} from "@ant-design/pro-components";

interface LayoutProps {
    children: React.ReactNode | React.ReactNode[]
}

export const Layout: React.FC<LayoutProps> = (props) => {
  const {children} = props
  return (
    <div style={{background: '#F5F7FA'}}>
      <PageContainer>{children}</PageContainer>
    </div>
  )
}