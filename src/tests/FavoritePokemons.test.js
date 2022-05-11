import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibida na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const p = screen.getByText(/No favorite pokemon found/i);
    expect(p).toBeInTheDocument();
  });

  it('Teste se são exibidos todos os cards de pokémons favoritados', () => {
    const props = [{
      id: 25,
      name: 'Pikachu',
      type: 'Electric',
      averageWeight: {
        value: '6.0',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    }];
    renderWithRouter(<FavoritePokemons pokemons={ props } />);
    const pikachu = [/Pikachu/i, /Electric/i, /Average weight: /i];

    pikachu.forEach((p) => {
      const prgs = screen.getByText(p);
      expect(prgs).toBeInTheDocument();
    });
  });
});
