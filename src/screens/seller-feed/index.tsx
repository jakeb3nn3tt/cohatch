import React, { useEffect, useMemo, useState } from 'react';
import Screen from '../../components/screen';
import Text from '../../components/text';
import { loadSellerNotificationAndActivity } from '../../services/loaders/seller';

const SellerFeed = () => {
  // const { activityData, notificationData } = useSelector(state => state.sellerData?);
  const [activityData, setActivityData] = useState();
  const [notificationData, setNotificationData] = useState();
  const [loading, setLoading] = useState(false);
  const data = useMemo(() => {}, []);

  const loadData = async () => {
    setLoading(true);
    try {
      await loadSellerNotificationAndActivity();
    } catch (error) {
      console.log('error', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Screen>
      <Text>Seller Feed with notifications and perhaps user activities</Text>
    </Screen>
  );
};

export default React.memo(SellerFeed);
