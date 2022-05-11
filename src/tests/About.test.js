import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <About.js />', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);

    const about = screen.getByRole('link', { name: 'About' });
    userEvent.click(about);

    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const title = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(title).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const paragraphs = [/application simulates/i, /One can filter Pokémons/i];

    paragraphs.forEach((p) => {
      const paragraph = screen.getByText(p);
      expect(paragraph).toBeInTheDocument();
    });
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const imgPokedex = screen.getByRole('img', { name: /Pokédex/i });
    expect(imgPokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
