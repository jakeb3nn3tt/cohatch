import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Button, View } from 'react-native';
import LoadingScreen from '../../components/loading-screen';
import Screen from '../../components/screen';
import Text from '../../components/text';
import { SellerSalesStackParamList } from '../../navigation/routes';
import { saveSale } from '../../services/firebase/sales';
import { getUser } from '../../services/firebase/users';
import { loadSellerSales } from '../../services/loaders/seller';
import { SALE_STATUS } from '../../types/sale';
import { User } from '../../types/user';
import { useStyles } from './styles';

type Props = NativeStackScreenProps<
  SellerSalesStackParamList,
  'SELLER_SALE_DETAILS'
>;

const SellerSaleDetails = ({ route }: Props) => {
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState<User>();
  const sale = route.params.sale;
  const styles = useStyles();

  useEffect(() => {
    const loadUser = async () => {
      const loadedCustomer = await getUser(sale.customerId);
      setCustomer(loadedCustomer);
      setLoading(false);
    };
    loadUser();
  }, [sale]);

  if (loading) {
    return <LoadingScreen />;
  }

  const onDeliverProduct = async () => {
    const newSale = {
      ...sale,
      status: SALE_STATUS.DELIVERED,
    };
    await saveSale(newSale);
    await loadSellerSales();
  };

  return (
    <Screen>
      <Text style={styles.sectionHeader}>Sale Details #{sale.id}</Text>
      <Text>Customer: {customer?.name}</Text>
      <Text>Address: {customer?.address?.address}</Text>
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
      {sale.status === SALE_STATUS.PAID && (
        <Button title="Deliver Product(s)" onPress={onDeliverProduct} />
      )}
    </Screen>
  );
};

export default React.memo(SellerSaleDetails);
