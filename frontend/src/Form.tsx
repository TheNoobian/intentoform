// src/Form.tsx
import React, { useState } from 'react';

const Form = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('Formulario enviado correctamente');
        // Aquí puedes redirigir a una página de "formulario enviado" o mostrar un mensaje de éxito
      } else {
        console.error('Error al enviar el formulario1');
      }
    } catch (error) {
      console.error('Error al enviar el formulario2', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Nombre
        </label>
        <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="message" className="form-label">
          Mensaje
        </label>
        <textarea className="form-control" id="message" name="message" rows={3} value={formData.message} onChange={handleChange}></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        Enviar
      </button>
    </form>
  );
};

export default Form;
