import { CurrentDate } from "./components/CurrentDate/CurrentDate";
import { Form } from "./components/Form/Form";
import { Header } from "./components/Header/Header";
import { useBalanceMeStore } from "./store/useBalanceMeStore";
import style from "./App.module.css";

function App() {
  const addItem = useBalanceMeStore((state) => state.addItem);
  return (
    <>
      <Header />
      <CurrentDate />
      <div className={style.app_form_container}>
        <Form
          title="Obrigações"
          subTitle="Quanto essa atividade exige de você?"
          sliderTitle="Peso"
          buttonText="Adicionar obrigação"
          listTitle="Suas obrigações"
          variant="obligation"
          placeHolderText="Nome da obrigação"
          onAddItem={addItem}
        />
        <Form
          title="Lazer"
          subTitle="Quanto prazer essa atividade proporciona?"
          sliderTitle="Prazer"
          buttonText="Adicionar atividade"
          listTitle="Suas atividades"
          variant="leisure"
          placeHolderText="Nome da atividade"
          onAddItem={addItem}
        />
      </div>
    </>
  );
}

export default App;
