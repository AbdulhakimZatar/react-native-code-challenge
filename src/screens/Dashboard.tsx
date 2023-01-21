import React from 'react';
import {Layout, List, Text} from '@ui-kitten/components';
import {I18nManager, StyleSheet} from 'react-native';
import {dashboardData} from '../data/dashboard';
import moment from 'moment';

function DashboardScreen() {
  const renderItem = ({item: buyers, index}) => {
    return (
      <Layout
        style={{
          ...styles.item,
          ...(index === 0 ? styles.firstItem : {}),
        }}>
        <Text style={styles.date} category="s1">
          {moment(buyers[0].date, 'YYYY-MM-DD').fromNow()}
        </Text>
        {buyers.map((buyer, index) => (
          <Text style={styles.name} key={index}>
            {buyer.name} transferred {buyer.paid}$
          </Text>
        ))}
      </Layout>
    );
  };

  return (
    <Layout style={styles.container}>
      <List style={styles.list} data={dashboardData} renderItem={renderItem} />
    </Layout>
  );
}

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
