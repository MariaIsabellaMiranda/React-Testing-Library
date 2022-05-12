import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import data from '../data';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ data[0] } isFavorite={ false } />);
    const { name, type, image, averageWeight: { measurementUnit, value } } = data[0];

    const namePokemon = screen.getByText(name);
    const typePokemon = screen.getByText(type);
    const pesoPokemon = screen.getByTestId('pokemon-weight');
    const imgPokemon = screen.getByRole('img', { name: /pikachu sprite/i });

    expect(namePokemon).toBeInTheDocument();
    expect(typePokemon).toBeInTheDocument();
    expect(pesoPokemon).toHaveTextContent(measurementUnit, value);
    expect(imgPokemon).toHaveAttribute('src', image);
  });

  it('Teste se o card do pokémon indicado na Pokédex contém um link de navegação', () => {
    renderWithRouter(<Pokemon pokemon={ data[0] } isFavorite={ false } />);
    const { id } = data[0];
    const moreDetails = screen.getByRole('link', { name: /More details/i });

    expect(moreDetails).toBeInTheDocument();
    expect(moreDetails).toHaveAttribute('href', `/pokemons/${id}`);
  });

  it('Teste clicar no link de navegação do pokémon, é feito o redirecionamento', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ data[0] }
      isFavorite={ false }
    />);
    const { id } = data[0];

    const moreDetails = screen.getByRole('link', { name: /More details/i });
    expect(moreDetails).toBeInTheDocument();

    userEvent.click(moreDetails);

    const { pathname } = history.location;

    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ data[0] } isFavorite />);
    const iconStar = screen.getByRole('img', { name: /Pikachu is marked as favorite/i });

    expect(iconStar).toHaveAttribute('src', '/star-icon.svg');
    expect(iconStar).toBeInTheDocument();
  });
});
