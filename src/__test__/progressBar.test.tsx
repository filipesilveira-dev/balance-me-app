import { act } from 'react';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from '../components/Progress Bar/ProgressBar';
import { useBalanceMeStore } from '../store/useBalanceMeStore';
import type { Item } from '../types/Item';

describe('ProgressBar - Renderização dos valores obtidos do estado global "items"', () => {
  beforeEach(() => {
    useBalanceMeStore.setState({ items: [] });
    localStorage.clear();
  });

  it('deve renderizar adequadamente os valores de pontuação e porcentagem obtidos do estado global "items"', () => {
    // Cenário de teste:
    // Obrigações: 6 + 2 = 8 pontos (80%)
    // Lazer: 2 pontos (20%)
    // Total: 10 pontos
    const mockItems: Item[] = [
      { id: '1', type: 'obligation', name: 'Trabalho', intensity: 6 },
      { id: '2', type: 'obligation', name: 'Estudo', intensity: 2 },
      { id: '3', type: 'leisure', name: 'Descanso', intensity: 2 },
    ];

    // Define os itens no estado global antes de renderizar o componente
    useBalanceMeStore.setState({ items: mockItems });

    render(<ProgressBar />);

    // 1. Verifica pontuação total de obrigações (8) e lazer (2)
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();

    // 2. Verifica as porcentagens calculadas (80% e 20%)
    expect(screen.getByText('80%')).toBeInTheDocument();
    expect(screen.getByText('20%')).toBeInTheDocument();

    // 3. Verifica o elemento com role "meter" e seus atributos
    const meter = screen.getByRole('meter');
    expect(meter).toBeInTheDocument();
    expect(meter).toHaveAttribute('aria-valuenow', '8');
    expect(meter).toHaveAttribute('aria-valuemin', '0');
    expect(meter).toHaveAttribute('aria-valuemax', '10');
    expect(meter).toHaveAttribute('aria-label', 'Obrigações: 8 de 10 pontos');
  });

  it('deve exibir o componente EmptyState quando o estado global "items" estiver vazio', () => {
    useBalanceMeStore.setState({ items: [] });

    render(<ProgressBar />);

    // Quando vazio, a barra de progresso não deve ser exibida e sim a mensagem do estado vazio
    expect(screen.queryByRole('meter')).not.toBeInTheDocument();
    expect(
      screen.getByText(/nenhum momento de lazer registrado/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/adicione atividades que te trazem lazer e bem-estar/i)
    ).toBeInTheDocument();
  });

  it('deve atualizar reativamente a barra de progresso quando o estado global "items" for modificado', () => {
    // Inicia com distribuição de 6 pontos de obrigação (60%) e 4 pontos de lazer (40%)
    useBalanceMeStore.setState({
      items: [
        { id: '1', type: 'obligation', name: 'Trabalho', intensity: 6 },
        { id: '2', type: 'leisure', name: 'Jogo', intensity: 4 },
      ],
    });

    render(<ProgressBar />);

    expect(screen.getByText('60%')).toBeInTheDocument();
    expect(screen.getByText('40%')).toBeInTheDocument();
    const meter = screen.getByRole('meter');
    expect(meter).toHaveAttribute('aria-valuenow', '6');
    expect(meter).toHaveAttribute('aria-valuemax', '10');

    // Adiciona uma nova obrigação diretamente no estado global
    act(() => {
      useBalanceMeStore.getState().addItem({
        type: 'obligation',
        name: 'Hora Extra',
        intensity: 6,
      });
    });

    // Novo total: obrigações = 12 (75%), lazer = 4 (25%), total = 16
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();
    expect(screen.getByText('25%')).toBeInTheDocument();
    expect(meter).toHaveAttribute('aria-valuenow', '12');
    expect(meter).toHaveAttribute('aria-valuemax', '16');
    expect(meter).toHaveAttribute('aria-label', 'Obrigações: 12 de 16 pontos');
  });
});
