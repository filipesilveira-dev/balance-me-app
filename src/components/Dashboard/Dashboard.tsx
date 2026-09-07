import type { Item } from "../../types/Item";
import { EmptySytate } from "../Empty State/EmptyState";
import style from "./Dashboard.module.css";

interface DashboardProps {
  items: Item[];
}
export function Dashboard({ items }: DashboardProps) {
  return (
    <>
      {items.length === 0 ? (
        <EmptySytate items={items} />
      ) : (
        <section className={style.dashboard_container}>
          <div className={style.dashboard}>
            <h3>Equilíbrio do dia</h3>
            <div>Barra de progresso</div>
          </div>
        </section>
      )}
    </>
  );
}
