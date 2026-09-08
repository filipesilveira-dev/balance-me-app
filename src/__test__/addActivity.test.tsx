import { render, screen, waitFor, fireEvent } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import App from '../App';
import { useBalanceMeStore } from '../store/useBalanceMeStore';

describe('Adição de atividades ao estado global (useBalanceMeStore)', () => {
  beforeEach(() => {
    // Limpa o estado global e o localStorage antes de cada teste
    useBalanceMeStore.setState({ items: [] });
    localStorage.clear();
  });

  it('deve verificar se cada botão de adicionar atividade de cada formulário (obrigações e lazer) está de fato adicionando uma atividade ao estado global', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Garante que o estado global inicial está vazio
    expect(useBalanceMeStore.getState().items).toHaveLength(0);

    // --- 1. Formulário de Obrigações ---
    const obligationInput = screen.getByPlaceholderText(/nome da obrigação/i);
    const obligationButton = screen.getByRole('button', {
      name: /adicionar obrigação/i,
    });

    await user.type(obligationInput, 'Relatório mensal');
    await user.click(obligationButton);

    // Verifica se a obrigação foi de fato adicionada ao estado global 'items'
    await waitFor(() => {
      const items = useBalanceMeStore.getState().items;
      expect(items).toHaveLength(1);
      expect(items[0]).toEqual(
        expect.objectContaining({
          name: 'Relatório mensal',
          type: 'obligation',
          intensity: 5,
        })
      );
    });

    // --- 2. Formulário de Lazer ---
    const leisureInput = screen.getByPlaceholderText(/nome da atividade/i);
    const leisureButton = screen.getByRole('button', {
      name: /adicionar atividade/i,
    });

    await user.type(leisureInput, 'Passeio no parque');
    await user.click(leisureButton);

    // Verifica se a atividade de lazer também foi de fato adicionada ao estado global 'items'
    await waitFor(() => {
      const items = useBalanceMeStore.getState().items;
      expect(items).toHaveLength(2);
      expect(items).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: 'Relatório mensal',
            type: 'obligation',
            intensity: 5,
          }),
          expect.objectContaining({
            name: 'Passeio no parque',
            type: 'leisure',
            intensity: 5,
          }),
        ])
      );
    });
  });

  it('deve adicionar obrigação com intensidade customizada ao estado global', async () => {
    const user = userEvent.setup();
    render(<App />);

    const obligationInput = screen.getByPlaceholderText(/nome da obrigação/i);
    const obligationButton = screen.getByRole('button', {
      name: /adicionar obrigação/i,
    });
    const sliders = screen.getAllByRole('slider');
    const obligationSlider = sliders[0];

    await user.type(obligationInput, 'Estudar para prova');
    fireEvent.change(obligationSlider, { target: { value: '8' } });
    await user.click(obligationButton);

    await waitFor(() => {
      const items = useBalanceMeStore.getState().items;
      expect(items).toContainEqual(
        expect.objectContaining({
          name: 'Estudar para prova',
          type: 'obligation',
          intensity: 8,
        })
      );
    });
  });

  it('deve adicionar atividade de lazer com intensidade customizada ao estado global', async () => {
    const user = userEvent.setup();
    render(<App />);

    const leisureInput = screen.getByPlaceholderText(/nome da atividade/i);
    const leisureButton = screen.getByRole('button', {
      name: /adicionar atividade/i,
    });
    const sliders = screen.getAllByRole('slider');
    const leisureSlider = sliders[1];

    await user.type(leisureInput, 'Assistir filme');
    fireEvent.change(leisureSlider, { target: { value: '9' } });
    await user.click(leisureButton);

    await waitFor(() => {
      const items = useBalanceMeStore.getState().items;
      expect(items).toContainEqual(
        expect.objectContaining({
          name: 'Assistir filme',
          type: 'leisure',
          intensity: 9,
        })
      );
    });
  });
});
