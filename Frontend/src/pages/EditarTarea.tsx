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
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const EditarTarea: React.FC = () => {
  const historial = useHistory();
  const { idTarea } = useParams<{ idTarea: string }>(); // Obtiene el idTarea de la URL

  // Estados para los campos del formulario
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [prioridad, setPrioridad] = useState("media"); // Valor predeterminado
  const [hecha, setHecha] = useState(false); // Valor predeterminado

  // Función para obtener los datos de la tarea desde el backend
  const obtenerTarea = async (idTarea: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/tareas/${idTarea}`
      );

      // Actualizar los campos con los valores de la tarea
      setNombre(response.data.nombre);
      setMensaje(response.data.mensaje);
      setPrioridad(response.data.prioridad);
      setHecha(response.data.hecha);
    } catch (error) {
      console.error("Error al obtener la tarea", error);
    }
  };

  // Cargar los datos de la tarea cuando el componente se monta
  useEffect(() => {
    if (idTarea) {
      obtenerTarea(idTarea); // Llama a la función para obtener la tarea
    }
  }, []); // Dependencia en el idTarea

  // Función para manejar el guardado de la tarea editada
  const guardarTarea = async () => {
    try {
      const tareaEditada = {
        nombre,
        mensaje,
        prioridad,
        hecha,
      };

      await axios.put(
        `http://localhost:8080/api/tareas/${idTarea}`,
        tareaEditada
      );
     historial.replace("/listadotareas")
    } catch (error) {
      console.error("Error al guardar la tarea editada", error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Editar Tarea</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Formulario de edición */}
        <IonItem >
          <IonLabel position="floating">Nombre de la Tarea</IonLabel>
          <IonInput
          style={{marginTop:"1.5rem"}}
            value={nombre}
            onIonChange={(e) => setNombre(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Mensaje (Opcional)</IonLabel>
          <IonInput
          style={{marginTop:"1.5rem"}}
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
          Guardar Cambios
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

export default EditarTarea;
