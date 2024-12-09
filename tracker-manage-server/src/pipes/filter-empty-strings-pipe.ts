import {Injectable, PipeTransform, ArgumentMetadata} from '@nestjs/common';

@Injectable()
export class FilterEmptyStringsPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        // 如果是空字符串，返回 null 或者其他默认值
        if (typeof value === 'string' && value.trim() === '') return null;

        // 如果是对象，递归处理对象中的空字符串
        if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
            return Object.keys(value).reduce((acc, key) => {
                acc[key] = this.transform(value[key], metadata); // 递归处理每个键值
                return acc;
            }, {}); // 返回处理后的新对象
        }

        // 如果是数组，递归处理对象中的空字符串
        if (typeof value === 'object' && Array.isArray(value) && value !== null){
            return value.map((item) => this.transform(item, metadata));
        }

        return value;
    }
}
