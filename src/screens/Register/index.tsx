import React, { useState } from 'react';
import { Modal } from 'react-native';
import Button from '../../components/Form/Button';
import Input from '../../components/Form/Input';
import TransactionTypeButton from '../../components/Form/TransactionTypeButton';
import CategorySelect from '../../components/Form/CategorySelect';
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from './styles';
import Categories from '../Categories';

const Register: React.FC = () => {
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const handleTransactionsTypeSelect = (type: string) => {
    setTransactionType(type);
  };

  const handleOpenCategoryModal = () => {
    setCategoryModalOpen(true);
  };

  const handleCloseCategoryModal = () => {
    setCategoryModalOpen(false);
  };

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
          <TransactionsTypes>
            <TransactionTypeButton
              title="Income"
              type="up"
              onPress={() => handleTransactionsTypeSelect('up')}
              isActive={transactionType === 'up'}
            />
            <TransactionTypeButton
              title="Outcome"
              type="down"
              onPress={() => handleTransactionsTypeSelect('down')}
              isActive={transactionType === 'down'}
            />
          </TransactionsTypes>
          <CategorySelect
            title={category.name}
            onPress={() => handleOpenCategoryModal()}
          />
        </Fields>

        <Button title="Enviar" />
      </Form>

      <Modal visible={categoryModalOpen}>
        <Categories
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseCategoryModal}
        />
      </Modal>
    </Container>
  );
};

export default Register;
