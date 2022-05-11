import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const navigation = ['Home', 'About', 'Favorite Pokémons'];

    navigation.forEach((name) => {
      const link = screen.getByRole('link', { name });
      expect(link).toBeInTheDocument();
    });
  });

  it('Teste se a aplicação é redirecionada para a página inicial', () => {
    const { history } = renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: 'Home' });
    userEvent.click(home);

    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  it('Teste se a aplicação é redirecionada para a página de About', () => {
    const { history } = renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: 'About' });
    userEvent.click(home);

    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  it('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(home);

    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

  it('Teste se a aplicação é redirecionada para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pagina-nao-existe');

    const notFoundTitle = screen.getByRole('heading',
      { level: 2, name: /Page requested not found/i });

    expect(notFoundTitle).toBeInTheDocument();
  });
});
