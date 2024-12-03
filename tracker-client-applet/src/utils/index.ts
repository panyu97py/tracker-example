export const hexToRgb = (hex, opactiy = 1) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '';
  const value = {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
  const { r, g, b } = value;
  return `rgba(${r}, ${g}, ${b}, ${opactiy})`;
};

export const noop = () => {};

export const splitNum = (num?: number) => {
  const [integer, decimal] = String(num || '0').split('.');
  return { integer, decimal };
};



export const incrementId = () => {
  const chatCodes: number[] = [];
  // A-Z
  for (let i = 65; i <= 90; i++) {
    chatCodes.push(i);
  }
  // a-z
  for (let i = 97; i <= 122; i++) {
    chatCodes.push(i);
  }
  const chatCodesLen = chatCodes.length - 1;
  const list = [0, 0];
  return () => {
    const target = list.map((item) => chatCodes[item]);
    const res = String.fromCharCode(...target);

    let tailIdx = list.length - 1;

    list[tailIdx]++;

    while (list[tailIdx] > chatCodesLen) {
      list[tailIdx] = 0;
      tailIdx -= 1;
      if (tailIdx < 0) {
        list.push(0);
        break;
      }
      list[tailIdx]++;
    }

    return res;
  };
};
