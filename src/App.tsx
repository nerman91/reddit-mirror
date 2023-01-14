import React from 'react';
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import './main.global.css';
import { hot } from 'react-hot-loader/root';
import { Layout } from './shared/Layout';
import { Header } from './shared/Header';
import { Content } from './shared/Content';
import { CardList } from './shared/CardList';
import { IRootState } from './store/reducers/root';
import { saveToken } from './store/actions/token';
import { meRequestData } from './store/actions/me';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Post } from './shared/Post';
import { NotFoundPage } from './shared/NotFoundPage';

export type TDispatch<T> = ThunkDispatch<T, unknown, AnyAction>;

function AppComponent() {
  const dispatch = useDispatch<TDispatch<IRootState>>();
  React.useEffect(() => {
    dispatch(saveToken());
    dispatch(meRequestData());
  }, []);

  return (
    <Layout>
      <Header />
      <Content>
        <Routes>
          <Route path="/posts" element={<CardList />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/auth" element={<Navigate to={'/posts'} />} />
          <Route path="/" element={<Navigate to={'/posts'} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export const App = hot(() => <AppComponent />);
