import { create } from "zustand";
const useFormStore = create((set, get) => ({
  schema: null,
  values: {},
  errors: {},
 setFieldValue: (fieldId, value) =>
    set((state) => ({
      values: { ...state.values, [fieldId]: value }
    })),
validateField: (fieldId) => {
    const schema = get().schema;
    const field = schema?.fields.find((f) => f.id === fieldId);
    const value = get().values[fieldId];
if (field?.required && !value) {
      set((state) => ({
        errors: { ...state.errors, [fieldId]: `${field.label} is required` }
      }));
    } else {
      set((state) => {
        const { [fieldId]: _, ...rest } = state.errors;
        return { errors: rest };
      });
    }
  },
loadSchema: (schema) => set({ schema, values: {}, errors: {} }),

  resetForm: () => set({ values: {}, errors: {} })
}));

export default useFormStore;
