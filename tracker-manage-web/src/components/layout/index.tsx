import React, {useContext, useEffect, useState} from "react";
import {PageContainer} from "@ant-design/pro-components";
import {BrowserRouter, Route, useLocation} from "react-router-dom";
import {LayoutCtx, LayoutCtxVal} from "./context";
import {RouteConfig} from "./types";
import {useToRef} from "@/hooks/useToRef";
import {noop} from "@/utils";

interface InternalLayoutContentProps {
    children: React.ReactElement | React.ReactNode[]
}

const InternalLayoutContent: React.FC<InternalLayoutContentProps> = (props) => {

  const {children} = props

  const location = useLocation();

  const [routeConfigs, setRouteConfigs] = useState<RouteConfig[]>([]);

  const registerRoute = (routeConfig: RouteConfig) => {
    setRouteConfigs(val => Array.from(new Set([...val, routeConfig])));
  }

  const ctxVal: LayoutCtxVal = {registerRoute}

  console.log({routeConfigs, location});

  return (
    <LayoutCtx.Provider value={ctxVal}>
      <div style={{background: '#F5F7FA'}}>
        <PageContainer>
          {children}
        </PageContainer>
      </div>
    </LayoutCtx.Provider>
  )
}

interface LayoutProps {
    children: React.ReactElement | React.ReactNode[]
}

const InternalLayout: React.FC<LayoutProps> = (props) => {
  const {children} = props
  return (
    <BrowserRouter>
      <InternalLayoutContent>
        {children}
      </InternalLayoutContent>
    </BrowserRouter>
  )
}

const InternalRoute: React.FC<RouteConfig> = (props) => {
  const {registerRoute = noop} = useContext(LayoutCtx)

  const registerRouteRef = useToRef(registerRoute)

  useEffect(() => {
    registerRouteRef.current(props)
  }, [props, registerRouteRef])

  return <Route {...props} />
}
export const Layout = Object.assign(InternalLayout, {Route: InternalRoute})