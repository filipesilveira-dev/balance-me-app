import { create } from "zustand";
import type { Item, NewItem } from "../types/Item";

// Contrato de dados
interface BalanceMeStore {
  items: Item[];

  // Ações
  addItem: (item: NewItem) => void;
  deleteItem: (id:string)=> void;
}

// Criação do Store
export const useBalanceMeStore = create<BalanceMeStore>()((set) => ({
    // Valor inicial de items: um array vazio
  items: [],

  // Pega o dado recebido e acrescenta um id aleatório
  addItem: (item: NewItem) => {
    const newItem: Item = {
      id: crypto.randomUUID(),
      ...item,
    };

    // Setter de items: pega o que já está em items e acrescenta o novo item ao final
    set((state) => ({
      items: [...state.items, newItem],
    }));
  },

  // Retorna um array apenas com item com id diferente do passado como argumento
  deleteItem: (id: string) => {
    set((state) => ({
      items: state.items.filter((item: Item) => item.id !== id),
    }));
  },
}));