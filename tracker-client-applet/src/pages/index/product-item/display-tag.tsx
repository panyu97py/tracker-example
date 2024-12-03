import { Text, View } from '@tarojs/components';
import classNames from 'classnames';
import React from 'react';
import { hexToRgb } from '@/utils';
import './display-tag.less';

interface ActivityTagProps {
  color?: string;
  className?: string;
  backgroundColor?: string;
  content?: React.ReactNode;
  suffixText?: React.ReactNode;
}

export const DisplayTag: React.FC<ActivityTagProps> = (props) => {
  const { className, color, backgroundColor, content, suffixText } = props;
  return (
    <View
      className={classNames('product-display-tag', className)}
      style={{ color, backgroundColor: backgroundColor || hexToRgb(color, 0.15) }}
    >
      <Text>{content}</Text>
      {Boolean(suffixText) && (
        <>
          <View className="tag-text-split" />
          <Text>{suffixText}</Text>
        </>
      )}
    </View>
  );
};
