import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import data from '../data';

describe('Teste o componente <PokemonDetails.js />', () => {
  it('Teste se as informações detalhadas são mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);
    const { name, id } = data[0];

    history.push(`/pokemons/${id}`);

    const subTitulo = screen.getByRole('heading', { level: 2, name: `${name} Details` });
    const moreDetails = screen.queryByRole('link', { name: /More details/i });
    const sumary = screen.getByRole('heading', { level: 2, name: /Summary/i });
    const resum = screen.getByText(/This intelligent Pokémon roasts/i);

    expect(subTitulo).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    expect(sumary).toBeInTheDocument();
    expect(resum).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os mapas', () => {
    const { history } = renderWithRouter(<App />);
    const { id, name, foundAt } = data[0];

    history.push(`/pokemons/${id}`);

    const map = screen.getByRole(
      'heading', { level: 2, name: `Game Locations of ${name}` },
    );
    expect(map).toBeInTheDocument();

    const imgLocation = screen.getAllByRole('img', { name: `${name} location` });

    foundAt.forEach((loc, index) => {
      const nameLocation = screen.getByText(loc.location);

      expect(nameLocation).toBeInTheDocument();
      expect(imgLocation[index]).toBeInTheDocument();
      expect(imgLocation[index]).toHaveAttribute('src', loc.map);
    });
  });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const { name, id } = data[0];

    history.push(`/pokemons/${id}`);

    const favoritar = screen.getByLabelText(/Pokémon favoritado/i);

    userEvent.click(favoritar);

    const favoriteTrue = screen.getByRole(
      'img', { name: `${name} is marked as favorite` },
    );
    expect(favoriteTrue).toBeInTheDocument();

    userEvent.click(favoritar);

    const favoriteFalse = screen.queryByRole(
      'img', { name: `${name} is marked as favorite` },
    );
    expect(favoriteFalse).not.toBeInTheDocument();

    expect(favoritar).toBeInTheDocument();
  });
});
