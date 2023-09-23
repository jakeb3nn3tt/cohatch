import _ from 'lodash';

export const getSearchString = (str: string) => _.deburr(str).toLowerCase();
