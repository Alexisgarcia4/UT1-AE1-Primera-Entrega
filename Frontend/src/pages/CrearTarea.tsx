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

  // Estados para los campos del formulario
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [prioridad, setPrioridad] = useState("media");
  const [hecha, setHecha] = useState(false);

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
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/tareas",
        nuevaTarea
      );
      console.log("Tarea creada:", response.data);

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
        <IonItem>
          <IonLabel position="floating">Nombre de la Tarea</IonLabel>
          <IonInput
            style={{ marginTop: "1.5rem" }}
            value={nombre}
            onIonChange={(e) => setNombre(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Mensaje (Opcional)</IonLabel>
          <IonInput
            style={{ marginTop: "1.5rem" }}
            value={mensaje}
            onIonChange={(e) => setMensaje(e.detail.value!)}
          />
        </IonItem>

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

        <IonItem>
          <IonLabel>Hecha</IonLabel>
          <IonToggle
            checked={hecha}
            onIonChange={(e) => setHecha(e.detail.checked)}
          />
        </IonItem>

        <IonButton expand="block" onClick={guardarTarea}>
          Guardar Tarea
        </IonButton>

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
