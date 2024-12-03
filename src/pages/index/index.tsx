import {View} from '@tarojs/components'
import {ProductInfo, ProductItem} from "./product-item";
import './index.less'
import {incrementId} from "@/utils";
import {useState} from "react";

const generateShortId = incrementId()


const IndexPage = () => {

  const [productList] = useState<ProductInfo[]>(() => {
    return new Array(10).fill(null).map(() => {
      const id = generateShortId()
      return {id, name: `商品名称${id}`}
    })
  })

  const handleProductItemClick = () => {
    console.log('product click')
  }

  return (
    <View className='index-page-view'>
      {productList.map(item => (
        <ProductItem key={item.id} productInfo={item} eventClickName="productClick" extendData={item} onClick={handleProductItemClick}/>
      ))}
    </View>
  )
}

export default IndexPage
