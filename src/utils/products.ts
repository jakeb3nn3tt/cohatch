export const removeUndefined = (obj: object) => {
  const newObj: any = { ...obj };
  const keys = Object.keys(newObj);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = newObj[key];
    if (value === undefined) {
      delete newObj[key];
    }
  }
  return newObj;
};
