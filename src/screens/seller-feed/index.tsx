import React, { useEffect, useMemo, useState } from 'react';
import { Button } from 'react-native';
import { useDispatch } from 'react-redux';
import Screen from '../../components/screen';
import Text from '../../components/text';
import { clearUser } from '../../redux/reducers/user';
import { loadSellerNotificationAndActivity } from '../../services/loaders/seller';

const SellerFeed = () => {
  // const { activityData, notificationData } = useSelector(state => state.sellerData?);
  const [activityData, setActivityData] = useState();
  const [notificationData, setNotificationData] = useState();
  const [loading, setLoading] = useState(false);
  const data = useMemo(() => {}, []);
  const dispatch = useDispatch();

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

  const onLogout = () => {
    dispatch(clearUser(null));
  };

  return (
    <Screen>
      <Text>Seller Feed with notifications and perhaps user activities</Text>
      <Button title="Logout" onPress={onLogout} />
    </Screen>
  );
};

export default React.memo(SellerFeed);
