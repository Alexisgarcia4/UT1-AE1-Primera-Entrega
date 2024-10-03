import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonToggle,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const CrearTarea: React.FC = () => {
  const historial = useHistory();
  const idUsuario = parseInt(localStorage.getItem("idUsuario")!); // Obtener idUsuario desde localStorage

  // Estados para los campos del formulario
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [prioridad, setPrioridad] = useState("media"); // Por defecto "media"
  const [hecha, setHecha] = useState(false); // Por defecto "pendiente"

  // Función para manejar el guardado de la tarea
  const guardarTarea = async () => {
    if (!nombre) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    const nuevaTarea = {
      nombre,
      mensaje,
      prioridad,
      hecha,
      usuarioId: idUsuario, // Asignar el ID del usuario
    };

    try {
      // Hacer la solicitud POST a la API
      const response = await axios.post(
        "http://localhost:8080/api/tareas",
        nuevaTarea
      );
      console.log("Tarea creada:", response.data);

      // Redirigir al listado de tareas
      historial.replace("/listadotareas");
    } catch (error) {
      console.error("Error al crear la tarea:", error);
      alert("Hubo un error al crear la tarea. Inténtalo de nuevo.");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Crear Nueva Tarea</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Campo para el nombre de la tarea */}
        <IonItem>
          <IonLabel position="floating">Nombre de la Tarea</IonLabel>
          <IonInput
          style={{marginTop:"1.5rem"}}
            value={nombre}
            onIonChange={(e) => setNombre(e.detail.value!)}
          />
        </IonItem>

        {/* Campo para el mensaje opcional */}
        <IonItem>
          <IonLabel position="floating">Mensaje (Opcional)</IonLabel>
          <IonInput
          style={{marginTop:"1.5rem"}}
            value={mensaje}
            onIonChange={(e) => setMensaje(e.detail.value!)}
          />
        </IonItem>

        {/* Campo para seleccionar la prioridad */}
        <IonItem>
          <IonLabel>Prioridad</IonLabel>
          <IonSelect
            value={prioridad}
            onIonChange={(e) => setPrioridad(e.detail.value)}
          >
            <IonSelectOption value="alta">Alta</IonSelectOption>
            <IonSelectOption value="media">Media</IonSelectOption>
            <IonSelectOption value="baja">Baja</IonSelectOption>
          </IonSelect>
        </IonItem>

        {/* Campo para seleccionar si la tarea está hecha */}
        <IonItem>
          <IonLabel>Hecha</IonLabel>
          <IonToggle
            checked={hecha}
            onIonChange={(e) => setHecha(e.detail.checked)}
          />
        </IonItem>

        {/* Botón para guardar la tarea */}
        <IonButton expand="block" onClick={guardarTarea}>
          Guardar Tarea
        </IonButton>

        {/* Botón para cancelar y volver al listado de tareas */}
        <IonButton
          expand="block"
          color="medium"
          onClick={() => historial.push("/listadotareas")}
        >
          Cancelar
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default CrearTarea;
