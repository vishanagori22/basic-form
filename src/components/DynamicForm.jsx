import React from "react";
import axios from "axios";
import useFormStore from "../store/Formstore";

const DynamicForm = () => {
  const { schema, values, errors, setFieldValue, validateField } = useFormStore();

  if (!schema) return <p className="text-center mt-4">Loading form...</p>;

  const validateAllFields = () => {
    schema.fields.forEach((field) => validateField(field.id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateAllFields();

    if (Object.keys(errors).length > 0) {
      alert("Please fix errors !");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/submitForm", values);
      console.log("Server Response:", response.data);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error submitting form");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form
        onSubmit={handleSubmit}
        className="w-100 p-4 border rounded shadow-sm bg-white"
        style={{ maxWidth: "500px" }}
      >
        <h2 className="text-center mb-4">{schema.title}</h2>

        {schema.fields.map((field) => {
          const isVisible =
            !field.visibilityCondition ||
            values[field.visibilityCondition.field] === field.visibilityCondition.value;

          if (!isVisible) return null;

          return (
            <div key={field.id} className="mb-3">
              <label className="form-label">{field.label}</label>

              {field.type === "text" && (
                <input
                  type="text"
                  placeholder={field.placeholder}
                  value={values[field.id] || ""}
                  onChange={(e) => setFieldValue(field.id, e.target.value)}
                  onBlur={() => validateField(field.id)}
                  className="form-control"
                />
              )}

              {field.type === "dropdown" && (
                <select
                  value={values[field.id] || ""}
                  onChange={(e) => setFieldValue(field.id, e.target.value)}
                  onBlur={() => validateField(field.id)}
                  className="form-select"
                >
                  <option value="">Select...</option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}

              {field.type === "date" && (
                <input
                  type="date"
                  value={values[field.id] || ""}
                  onChange={(e) => setFieldValue(field.id, e.target.value)}
                  onBlur={() => validateField(field.id)}
                  className="form-control"
                />
              )}
              {field.type === "radio" && (
  <div className="d-flex justify-content-center flex-wrap">
    {field.options?.map((opt) => (
      <div className="form-check me-3" key={opt}>
        <input
          type="radio"
          name={field.id}
          value={opt}
          checked={values[field.id] === opt}
          onChange={(e) => setFieldValue(field.id, e.target.value)}
          onBlur={() => validateField(field.id)}
          className="form-check-input"
          id={`${field.id}_${opt}`}
        />
        <label
          htmlFor={`${field.id}_${opt}`}
          className="form-check-label"
        >
          {opt}
        </label>
      </div>
    ))}
  </div>
)}

{field.type === "textarea" && (
  <textarea
    placeholder={field.placeholder}
    value={values[field.id] || ""}
    onChange={(e) => setFieldValue(field.id, e.target.value)}
    onBlur={() => validateField(field.id)}
    className="form-control text-center"
    rows="3"
  />
)}


              {errors[field.id] && (
                <div className="text-danger small mt-1">{errors[field.id]}</div>
              )}
            </div>
          );
        })}

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
        <button
  type="button"
  className="btn btn-secondary w-100 mt-2"
  onClick={() => {
    schema.fields.forEach((field) => setFieldValue(field.id, ""));
    resetForm(); 
  }}
>
  Reset
</button>
      </form>
    </div>
  );
};

export default DynamicForm;
