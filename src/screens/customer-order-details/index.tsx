import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import LoadingScreen from '../../components/loading-screen';
import Screen from '../../components/screen';
import Text from '../../components/text';
import { CustomerOrdersStackParamList } from '../../navigation/routes';
import { getUser } from '../../services/firebase/users';
import { User } from '../../types/user';
import { useStyles } from './styles';

type Props = NativeStackScreenProps<
  CustomerOrdersStackParamList,
  'CUSTOMER_ORDER_DETAILS'
>;

const CustomerOrderDetails = ({ route }: Props) => {
  const [loading, setLoading] = useState(true);
  const [seller, setSeller] = useState<User>();
  const sale = route.params.sale;
  const styles = useStyles();

  useEffect(() => {
    const loadUser = async () => {
      const loadedCustomer = await getUser(sale.sellerId);
      setSeller(loadedCustomer);
      setLoading(false);
    };
    loadUser();
  }, [sale]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Screen>
      <Text style={styles.sectionHeader}>Order Details #{sale.id}</Text>
      <Text>Seller: {seller?.name}</Text>
      <Text style={styles.sectionHeader}>Products</Text>
      {sale.products.map(p => (
        <View style={styles.productContainer}>
          <Text>{p.title}</Text>
          <Text>${p.value}</Text>
          <Text>Qnt.: {p.quantity}</Text>
        </View>
      ))}
      <Text>Status: {sale.status}</Text>
      <Text>Total: ${sale.total}</Text>
    </Screen>
  );
};

export default React.memo(CustomerOrderDetails);
