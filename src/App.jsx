import React, { useEffect } from "react";
import DynamicForm from "./components/DynamicForm";
import useFormStore from "./store/Formstore.js"
import schema from "./schema/schema.json";

function App() {
  const { loadSchema } = useFormStore();

  useEffect(() => {
    loadSchema(schema);
  }, [loadSchema]);

  return (
    <div >
      <h1 className="text-center
      ">Dynamic Form with Zustand</h1>
      <DynamicForm />
    </div>
  );
}

export default App;
