import { CurrentDate } from "./components/CurrentDate/CurrentDate";
import { Form } from "./components/Form/Form";
import { Header } from "./components/Header/Header";
import { useBalanceMeStore } from "./store/useBalanceMeStore";

function App() {
  const addItem = useBalanceMeStore((state) => state.addItem);
  return (
    <>
      <Header />
      <CurrentDate />
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
    </>
  );
}

export default App;
