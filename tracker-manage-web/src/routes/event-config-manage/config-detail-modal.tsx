import React from "react";
import {Modal} from "antd";

interface ConfigDetailModalProps{
    visible?:boolean
    onClose?:()=>void
}
export const ConfigDetailModal:React.FC<ConfigDetailModalProps> = (props)=>{
  const {visible} = props;
  return <Modal open={visible}/>
}