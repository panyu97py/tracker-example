import {View} from '@tarojs/components'
import {ProductInfo, ProductItem} from "./product-item";
import './index.less'
import {incrementId} from "@/utils";
import {useState} from "react";
import Taro from "@tarojs/taro";

const generateShortId = incrementId()


const ProductListPage = () => {

  const [productList] = useState<ProductInfo[]>(() => {
    return new Array(10).fill(null).map(() => {
      const id = generateShortId()
      return {id, name: `商品名称${id}`}
    })
  })

  const handleProductItemClick = (id:string) => {
    return Taro.navigateTo({url:`/pages/product-detail/index?id=${id}`})
  }

  return (
    <View className='index-page-view'>
      {productList.map(item => (
        <ProductItem
          key={item.id}
          productInfo={item}
          onClick={()=>handleProductItemClick(item.id)}
          eventClickName="productClick"
          eventExposureName="productExposure"
          extendData={item}
        />
      ))}
    </View>
  )
}

export default ProductListPage
