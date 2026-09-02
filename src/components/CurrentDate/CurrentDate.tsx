import style from "./CurrentDate.module.css"
import { useState, useEffect } from "react";

export function CurrentDate() {
    // Estado para armazenar o texto da data formatada
    const [formattedDate, setFormattedDate] = useState<string>('');
    const[formattedDayWeek, setFormattedDayWeek] = useState<string>('');

    useEffect(() => {
        // 1. Configurações de formatação do Intl
        const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });

        const dayWeekFormatter = new Intl.DateTimeFormat('pt-BR', {
            weekday: 'long'
        });

        // 2. Captura a data atual e formata
        const now = new Date(); 
        const dateText = dateFormatter.format(now);
        const dayWeekTextRaw = dayWeekFormatter.format(now);

        const dayWeekText = dayWeekTextRaw.charAt(0).toUpperCase() + dayWeekTextRaw.slice(1);


        // 3. Atualiza o estado com o texto combinado
        setFormattedDate(dateText);
        setFormattedDayWeek(dayWeekText);
        
    }, []);

    return(
        <section className={style.date_section}>
            <div className={style.date_text_container}>
                <h1>Seu equilíbrio de hoje</h1>
                <p>Registre suas obrigações e momentos de lazer para visualizar sei equilíbrio</p>
            </div>
            <div className={style.date_section_container}>
                <span className={style.day}>Hoje</span>
                <div className={style.date_container}>
                    <img className={style.calendarIcon} src="/calendar.svg" alt="Imagem de calendário" />
                    <div className={style.formatted_date_container}>
                        <span className={style.date}>{formattedDate}</span>
                        <span className={style.dayWeek}>{formattedDayWeek}</span>
                    </div>
                </div>
            </div>
        </section>
    )
}