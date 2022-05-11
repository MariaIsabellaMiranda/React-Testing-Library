import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se a página contém um heading h2 com o texto...', () => {
    renderWithRouter(<NotFound />);
    const notFoundTitle = screen.getByRole('heading', { name: /Page requested not/i });
    expect(notFoundTitle).toBeInTheDocument();
  });

  it('Teste se a página mostra a imagem...', () => {
    renderWithRouter(<NotFound />);

    const imgNotFound = screen.getByRole('img', { name: /Pikachu crying because/i });
    expect(imgNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
