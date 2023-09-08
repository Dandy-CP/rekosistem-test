import React, { useEffect, useState, useCallback } from "react";
import { Text, View, StyleSheet, RefreshControl, Button } from "react-native";
import ContentView from "@/components/elements/ContentView";
import useGetFirebase from "@/hooks/useGetFirebase";
import useAuth from "@/hooks/useAuth";
import LoadingOverlay from "@/components/elements/LoadingOverlay";
import type {
  ITransaction,
  IProduct,
  ITypes,
  IPrices,
  IFilteredTransaction,
} from "types/transaction.types";

const Transaksi = () => {
  const [transaction, setTransaction] = useState<ITransaction[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [prices, setPrices] = useState<IPrices[]>([]);
  const [types, setTypes] = useState<ITypes[]>([]);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [logedOut, setLogedOut] = useState<boolean>(false);
  const { signOut } = useAuth();

  const getData = async () => {
    const res = await Promise.all([
      useGetFirebase({
        collectionName: "transactions",
        documentName: "transaction",
      }),
      useGetFirebase({
        collectionName: "transactions",
        documentName: "Products",
      }),
      useGetFirebase({
        collectionName: "transactions",
        documentName: "Prices",
      }),
      useGetFirebase({
        collectionName: "transactions",
        documentName: "Types",
      }),
    ]);

    setTransaction(res[0]?.transaction);
    setProducts(res[1]?.Products);
    setPrices(res[2]?.Prices);
    setTypes(res[3]?.Types);
    setIsFetched(true);
  };

  const filteredTransactions = transaction.map((transaction) => {
    const matchingProduct = products.find(
      (product) => product.id === transaction.productid
    );

    if (matchingProduct) {
      const matchingType = types.find(
        (type) => type.id === matchingProduct.typeid
      );

      const matchingPoints = prices.find(
        (price) => price.productid === matchingProduct.id
      );

      if (matchingType) {
        return {
          ...transaction,
          productName: matchingProduct.name,
          typeName: matchingType.name,
          typeColor: matchingType.color,
          point: matchingPoints!.points * transaction.total,
        } as unknown as IFilteredTransaction;
      }
    }
  });

  const handleSignOut = () => {
    setLogedOut(true);
    setTimeout(() => {
      signOut();
      setLogedOut(false);
    }, 2000);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setIsFetched(false);
    setTransaction([]);
    setPrices([]);
    setTypes([]);
    setProducts([]);

    setTimeout(() => {
      getData();
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <React.Fragment>
      <ContentView
        style={{ height: "100%" }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={{ textAlign: "center", fontWeight: "700", fontSize: 20 }}>
          Transaksi
        </Text>

        <View style={{ height: "100%" }}>
          {filteredTransactions.map((value, index) => (
            <View key={index} style={style.card}>
              <Text style={style.textProduct}>{value?.productName}</Text>
              <Text>Total: {value?.total}x</Text>
              <Text style={style.textPrice}>Point: {value?.point}</Text>

              <View style={style.wrapBadge}>
                <Text style={[style.textBadge, { color: value?.typeColor }]}>
                  {value?.typeName}
                </Text>
              </View>
            </View>
          ))}

          {!isFetched && (
            <Text
              style={{
                textAlign: "center",
                fontWeight: "700",
                fontSize: 20,
                marginTop: 50,
              }}
            >
              Fetching data...
            </Text>
          )}

          <View style={{ marginTop: 50 }}>
            <Button
              title="LogOut"
              onPress={() => {
                handleSignOut();
              }}
            />
          </View>
        </View>
      </ContentView>

      <LoadingOverlay isShown={logedOut} />
    </React.Fragment>
  );
};

export default Transaksi;

const style = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "gray",
    borderStyle: "solid",
    borderRadius: 16,
    padding: 10,
    marginTop: 20,
  },
  textProduct: {
    fontWeight: "600",
    fontSize: 16,
  },
  textPrice: {
    fontWeight: "500",
    fontSize: 13,
    marginTop: 10,
  },
  wrapBadge: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  textBadge: {
    fontWeight: "700",
    fontSize: 15,
  },
  textTotal: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "right",
    marginTop: 50,
  },
  buttonWrap: {
    position: "absolute",
    bottom: 30,
    width: "100%",
  },
});
