import React, {useEffect, useState} from 'react';
import {Input, Layout, List, Text} from '@ui-kitten/components';
import {I18nManager, RefreshControl, StyleSheet} from 'react-native';
import {dashboardData} from '../data/dashboard';
import moment from 'moment';
import 'moment/locale/ar';
import {t} from 'i18next';
import i18n from '../i18n';

function DashboardScreen() {
  const [refreshing, setRefreshing] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  moment.locale(i18n.language);

  useEffect(() => {
    setTimeout(() => {
      setData(dashboardData);
      setRefreshing(false);
    }, 750);
  }, []);

  useEffect(() => {
    if (search && !refreshing) {
      const filteredData = dashboardData.reduce(function (filtered, buyers) {
        const foundBuyers: any = buyers.filter(buyer =>
          buyer.name.toLowerCase().includes(search.toLowerCase()),
        );
        if (foundBuyers.length > 0) {
          filtered.push(foundBuyers);
        }
        return filtered;
      }, []);

      setData(filteredData);
    } else if (!refreshing) {
      setData(dashboardData);
    }
  }, [search, refreshing]);

  const resetData = () => {
    setRefreshing(true);
    setSearch('');
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
        {buyers.map(buyer => (
          <Layout key={buyer.name} style={styles.transfer}>
            <Text category="s1">{buyer.name}</Text>
            <Text category="s1">{t('transferred')}</Text>
            <Text category="s1">{buyer.amount}</Text>
          </Layout>
        ))}
      </Layout>
    );
  };

  const emptyList = () => {
    if (refreshing) {
      return null;
    }

    return (
      <Text style={styles.noData} category="h6">
        No data available
      </Text>
    );
  };

  return (
    <Layout style={styles.container}>
      <Input
        style={styles.search}
        textStyle={styles.searchText}
        placeholder={t('search')}
        value={search}
        onChangeText={setSearch}
      />
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
    paddingBottom: 60,
  },
  noData: {
    textAlign: 'center',
    padding: 20,
  },
  list: {
    width: '100%',
    backgroundColor: '#fff',
  },
  item: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    gap: 8,
    alignItems: I18nManager.isRTL ? 'flex-start' : 'flex-end',
    marginTop: 20,
  },
  firstItem: {
    marginTop: 0,
  },
  date: {
    color: '#fff',
    backgroundColor: '#1a1a1a',
    textAlign: I18nManager.isRTL ? 'right' : 'right',
    width: '100%',
    padding: 4,
  },
  transfer: {
    paddingHorizontal: 8,
    flexDirection: 'row',
    gap: 8,
    width: '100%',
  },
  search: {
    color: '#1a1a1a',
    borderBottoMWidth: 1,
    borderRadius: 0,
    borderBottomColor: '#1a1a1a',
  },
  searchText: {
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  bold: {
    fontWeight: 'bold',
  },
});
