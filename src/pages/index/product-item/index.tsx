import React from "react";
import {Image, View} from "@tarojs/components";
import {noop} from "@/utils";
import {DisplayTag} from "./display-tag";
import {PriceView} from "./price-view";
import './index.less'

export interface ProductInfo {
  id: string;
  name: string;
}

interface ProductItemProps {
  productInfo?: Partial<ProductInfo>
  onClick?: () => void;
}

export const ProductItem: React.FC<ProductItemProps> = (props) => {
  const {productInfo, onClick = noop} = props;
  return (
    <View className="product-item-view" onClick={onClick}>
      <Image className="product-main-picture" src={require('@/assets/images/logo.png')}/>
      <View className="product-info-view">
        <View className="product-name">{productInfo?.name}</View>
        <View className="product-tag-list">
          <DisplayTag className="product-tag-item" content="商品标签" color="#97793E"/>
          <DisplayTag className="product-tag-item" content="商品标签" color="#97793E"/>
          <DisplayTag className="product-tag-item" content="商品标签" color="#97793E"/>
        </View>
        <View className="product-sketch">商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述</View>
        <View className="price-and-status-view">
          <PriceView priceNum={9.9} crossPriceNum={99.99}/>
          <View className="operate-btn">
            立即购买
          </View>
        </View>
      </View>
    </View>
  )
}
