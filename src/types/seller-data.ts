export enum SellerActions {
  LIST_ITEM_TO_SELL = 'LIST_ITEM_TO_SELL',
  REMOVE_ITEM_LISTED = 'REMOVE_ITEM_LISTED',
}

export type NotificationType = {
  id: string;
  date: number;
  title: string;
  message?: string;
  link?: string;
  redirectTo?: string;
  redirectData?: any;
};

export type ActivityType = {
  id: string;
  date: number;
  action: SellerActions;
  actionData?: any;
  description?: string;
};
