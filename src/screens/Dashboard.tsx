import React, {useEffect, useState} from 'react';
import {Layout, List, Text} from '@ui-kitten/components';
import {I18nManager, RefreshControl, StyleSheet} from 'react-native';
import {dashboardData} from '../data/dashboard';
import moment from 'moment';

function DashboardScreen() {
  const [refreshing, setRefreshing] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setData(dashboardData);
      setRefreshing(false);
    }, 750);
  }, []);

  const resetData = () => {
    setRefreshing(true);
    setTimeout(() => {
      setData(dashboardData);
      setRefreshing(false);
    }, 750);
  };

  const renderItem = ({item: buyers, index: i}) => {
    return (
      <Layout
        style={{
          ...styles.item,
          ...(i === 0 ? styles.firstItem : {}),
        }}>
        <Text style={styles.date} category="s1">
          {moment(buyers[0].date, 'YYYY-MM-DD').fromNow()}
        </Text>
        {buyers.map((buyer, j) => (
          <Text style={styles.name} key={j}>
            {buyer.name} transferred {buyer.amount}$
          </Text>
        ))}
      </Layout>
    );
  };

  const emptyList = () => {
    return (
      <Text style={styles.container} category="h6">
        No data available
      </Text>
    );
  };

  return (
    <Layout style={styles.container}>
      <List
        style={styles.list}
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={emptyList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={resetData} />
        }
      />
    </Layout>
  );
}

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  list: {
    width: '100%',
    marginBottom: 60,
  },
  item: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    gap: 8,
    alignItems: I18nManager.isRTL ? 'flex-end' : 'flex-start',
    marginTop: 20,
  },
  firstItem: {
    marginTop: 0,
  },
  date: {
    color: '#fff',
    backgroundColor: '#1a1a1a',
    textAlign: I18nManager.isRTL ? 'left' : 'right',
    width: '100%',
    padding: 4,
  },
  name: {
    paddingHorizontal: 8,
  },
});
