import React from 'react';
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
} from './styles';
import HighlightCard from '../../components/HighlightCard';
import TransactionCard, {
  TransactionCardProps,
} from '../../components/TransactionCard';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

const Dashboard: React.FC = () => {
  const transactions: DataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: 'Torneio do Poder',
      amount: 'R$ 12.000,00',
      category: { icon: 'dollar-sign', name: 'Torneio' },
      date: '20/08/2021',
    },
    {
      id: '2',
      type: 'negative',
      title: 'Livros Gohan',
      amount: 'R$ 1.000,00',
      category: { icon: 'book', name: 'Estudo' },
      date: '20/08/2021',
    },

    {
      id: '3',
      type: 'negative',
      title: 'Comida Sr Beerus',
      amount: 'R$ 5.000,00',
      category: { icon: 'coffee', name: 'Alimentação' },
      date: '20/08/2021',
    },
  ];

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
          <Icon name="power" />
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
