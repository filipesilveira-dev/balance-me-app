import style from "./Dashboard.module.css";

export function Dashboard(){
    return(
        <section className={style.dashboard_container}>
            <div className={style.dashboard}>
                <h3>Equilíbrio do dia</h3>
                <div>Barra de progresso</div>
            </div>
        </section>
    )
}