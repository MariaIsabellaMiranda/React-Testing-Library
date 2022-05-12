import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import data from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const subtitle = screen.getByRole(
      'heading', { name: /Encountered pokémons/i, level: 2 },
    );
    expect(subtitle).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo pokémon da lista quando clica no botao', () => {
    renderWithRouter(<App />);
    const pokemonsName = data.filter((pokemon, index) => index !== 0);
    const btn = screen.getByRole('button', { name: /Próximo pokémon/i });

    pokemonsName.forEach((poke) => {
      userEvent.click(btn);
      const pokemon = screen.getByText(poke.name);
      expect(pokemon).toBeInTheDocument();
    });
    userEvent.click(btn);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);
    const paragraphName = screen.getAllByTestId(/pokemon-name/i);
    expect(paragraphName.length).toBe(1);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const btn = screen.getAllByTestId('pokemon-type-button');

    types.forEach((tp, index) => {
      userEvent.click(btn[index]);
      const typeCard = screen.getByTestId('pokemon-type');
      const btnAll = screen.getByRole('button', { name: /All/i });

      expect(btn[index]).toBeInTheDocument();
      expect(btn[index]).toHaveTextContent(tp);
      expect(btnAll).toBeInTheDocument();
      expect(typeCard).toBeInTheDocument();
      expect(typeCard).toHaveTextContent(tp);
    });
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const pokemonsName = data.filter((pokemon, index) => index !== 0);
    const btn = screen.getByRole('button', { name: /Próximo pokémon/i });
    const btnAll = screen.getByRole('button', { name: /All/i });
    expect(btnAll).toBeInTheDocument();

    userEvent.click(btnAll);

    pokemonsName.forEach((pk) => {
      userEvent.click(btn);
      const pokemon = screen.getByText(pk.name);
      expect(pokemon).toBeInTheDocument();
    });
  });
});
