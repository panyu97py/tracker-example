import {Image, View, Text} from "@tarojs/components";
import './index.less'
import Taro, {useRouter} from "@tarojs/taro";
import {DisplayTag} from "./display-tag";
import React from "react";
import {PriceView} from "./price-view";

const ProductDetailPage: React.FC = () => {
  const {params} = useRouter()
  const {id} = params
  const handleAdd = () => Taro.navigateBack();
  return (
    <View className="product-detail-page">
      <View className="product-image-wrap">
        <Image className="product-image" src={require('@/assets/images/logo.png')}/>
      </View>
      <View className="product-detail-content">
        <View className="product-name">商品{id}</View>
        <View className="product-tag-list">
          <DisplayTag className="product-tag-item" content="商品标签" color="#97793E"/>
          <DisplayTag className="product-tag-item" content="商品标签" color="#97793E"/>
          <DisplayTag className="product-tag-item" content="商品标签" color="#97793E"/>
        </View>
        <View className="product-desc">商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述</View>
      </View>
      <View className="product-detail-footer">
        <PriceView priceNum={9.9} crossPriceNum={99.99}/>
        <View className="add-btn" onClick={handleAdd} eventClickName="productAdd" extendData={{id}}>
          <Text>加购</Text>
        </View>
      </View>
    </View>
  )
}

export default ProductDetailPage;
