import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Button, Switch, View } from 'react-native';
import Input from '../../components/input';
import Screen from '../../components/screen';
import Text from '../../components/text';
import { SellerProductsStackParamList } from '../../navigation/routes';
import { addNewProduct } from '../../services/firebase/products';
import { loadSellerProducts } from '../../services/loaders/seller';
import { Product } from '../../types/product';
import { useStyles } from './styles';

// type Product = {
//   id: string;
//   price: ProductPrice;
//   title: string;
//   description?: string;
//   quantityTotal: number;
//   quantityAvailable: number;
//   quantityUnit: string;
//   image?: string;
//   isListed?: boolean;
// };

type Props = NativeStackScreenProps<
  SellerProductsStackParamList,
  'SELLER_NEW_PRODUCT'
>;

const SellerNewProduct = ({ navigation, route }: Props) => {
  const editingProduct = route.params?.product;
  const [title, setTitle] = useState(editingProduct?.title ?? '');
  const [quantityUnit, setQuantityUnit] = useState(
    editingProduct?.quantityUnit ?? '',
  );
  const [quantity, setQuantity] = useState<number | undefined>(
    editingProduct?.quantityTotal,
  );
  const [price, setPrice] = useState<number | undefined>(
    editingProduct?.price?.sellerValue,
  );
  const [isListed, setIsListed] = useState(editingProduct?.isListed ?? true);
  const [loading, setLoading] = useState(false);
  const styles = useStyles();
  const isEditing = !!editingProduct;

  const onAddNewProduct = async () => {
    setLoading(true);
    if (!title || !price || !quantity) {
      setLoading(false);
      return;
    }
    try {
      const newProduct: Product = {
        title,
        quantityAvailable: quantity,
        quantityTotal: quantity,
        quantityUnit: quantityUnit,
        isListed,
        image: 'test',
        price: {
          sellerValue: price,
          currency: 'cad',
        },
      };
      await addNewProduct(newProduct);
      await loadSellerProducts();
      navigation.goBack();
    } catch (error) {
      console.log('error', error);
    }
    setLoading(false);
  };

  return (
    <Screen>
      <Text>New Product</Text>
      <Input label="Title" value={title} onChangeText={setTitle} />
      <Input
        label="Quantity"
        value={String(quantity ?? '')}
        onChangeText={text => setQuantity(Number(text))}
        keyboardType="numeric"
      />
      <Input
        label="Quantity Unit"
        value={quantityUnit}
        onChangeText={setQuantityUnit}
      />
      <Input
        label="Price"
        value={String(price ?? '')}
        onChangeText={text => setPrice(Number(text))}
        keyboardType="numeric"
      />
      <View style={styles.listedContainer}>
        <Text>Listed</Text>
        <Switch
          value={isListed}
          onChange={evt => setIsListed(evt.nativeEvent.value)}
        />
      </View>
      <Button
        title={`${isEditing ? 'Edit' : 'Add'} Product`}
        onPress={onAddNewProduct}
        disabled={loading}
      />
    </Screen>
  );
};

export default React.memo(SellerNewProduct);
