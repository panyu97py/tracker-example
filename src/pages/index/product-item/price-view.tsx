import React from "react";
import {splitNum} from "@/utils";
import {View,Text} from "@tarojs/components";
import './price-view.less'

interface PriceViewProps {
  priceNum?: number;
  crossPriceNum?: number;
}


export const PriceView: React.FC<PriceViewProps> = (props) => {
  const { priceNum,crossPriceNum } = props;

  const priceSplitRes = splitNum(priceNum);

  return (
    <View className="price-view">
      <Text className="price-num-symbol">¥</Text>
      <Text className="price-num-integer">{priceSplitRes.integer}</Text>
      {Boolean(priceSplitRes.decimal) && (
        <>
          <Text className="price-num-decimal-point">.</Text>
          <Text className="price-num-decimal">{priceSplitRes.decimal}</Text>
        </>
      )}
      <Text className="price-text">起</Text>
      {Boolean(crossPriceNum)&&<Text className="cross-price">¥{crossPriceNum}</Text>}
    </View>
  );
};
