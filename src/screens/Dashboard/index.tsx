import React, { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  Container,
  Header,
  HighlightCards,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  Transactions,
  Title,
  TransactionList,
  LogoutButton,
} from './styles';
import HighlightCard from '../../components/HighlightCard';
import TransactionCard, {
  TransactionCardProps,
} from '../../components/TransactionCard';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const dataKey = '@gofinances:transactions';

  useEffect(() => {
    async function removeAll() {
      await AsyncStorage.removeItem(dataKey);
    }

    // removeAll();
  }, []);

  const loadTransactions = async () => {
    try {
      const response = await AsyncStorage.getItem(dataKey);
      const registers = response ? JSON.parse(response) : [];

      const transactionsFormatted: DataListProps[] = registers.map(
        (item: DataListProps) => {
          const { category, id, name, type } = item;

          const amount = Number(item.amount).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          });

          const date = Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
          }).format(new Date(item.date));

          const reg = {
            id,
            name,
            amount,
            category,
            date,
            type,
          };

          return reg;
        },
      );

      setTransactions(transactionsFormatted);
    } catch (error) {
      Alert.alert('Falha ao carregar as transações');
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, []),
  );

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: 'https://omnitos.com/wp-content/uploads/2017/03/maxresdefault-1.jpg',
              }}
            />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Goku</UserName>
            </User>
          </UserInfo>

          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          title="Entrada"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 28 de agosto"
          type="up"
        />

        <HighlightCard
          title="Saída"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 01 de agosto"
          type="down"
        />

        <HighlightCard
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 28 de agosto"
          type="total"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
};

export default Dashboard;
