import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonLabel,
  IonAlert,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
const ListadoTareas: React.FC = () => {
  const historial = useHistory();

  const [tareas, setTareas] = useState([]); // Inicialmente vacías
  const [filtroPrioridad, setFiltroPrioridad] = useState(""); // Filtro de prioridad
  const [filtroEstado, setFiltroEstado] = useState(""); // Filtro de estado
  const [ordenFecha, setOrdenFecha] = useState("asc"); // Ordenar por fecha
  const [showAlert, setShowAlert] = useState(false); // Controla la visualización de la alerta
  const [tareaAEliminar, setTareaAEliminar] = useState<number | null>(null); // Almacena la tarea que se va a eliminar
  const [mensajeError, setMensajeError] = useState(""); // Controla los mensajes de error

  // Función para obtener las tareas del usuario desde la API
  const obtenerTareas = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/tareas?prioridad=${filtroPrioridad}&hecha=${filtroEstado}&orden=${ordenFecha}`

      );
      setTareas(response.data); // Guardar las tareas en el estado
      setMensajeError(""); // Limpiar el mensaje de error si se cargan tareas correctamente
    } catch (error) {
      console.error("Error al obtener las tareas", error);
      setMensajeError("Tareas no encontradas con esos filtros"); // Mostrar un mensaje de error
    }
  };

  const colorFondo = (prioridad) => {
    switch (prioridad) {
      case "alta":
        return "red";
      case "media":
        return "blue";
      case "baja":
        return "green";
      default:
        return "";
    }
  };

  // Usar useEffect para obtener las tareas y los datos del usuario cuando el componente se monta
  useEffect(() => {
    obtenerTareas();
  }, []);

  useEffect(() => {
    obtenerTareas(); // Obtener las tareas cada vez que cambian los filtros
  }, [filtroEstado, filtroPrioridad, ordenFecha]);

  const editarTarea = (id: number) => {
    historial.replace(`/editartarea/${id}`);
  };

  const eliminarTarea = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/tareas/${id}`);
      console.log(`Tarea con id ${id} eliminada correctamente.`);
      obtenerTareas(); // Volver a obtener las tareas actualizadas
    } catch (error) {
      console.error("Error al eliminar la tarea", error);
    }
  };

  const confirmarEliminarTarea = (id: number) => {
    setTareaAEliminar(id);
    setShowAlert(true);
  };

  const crearTarea = () => {
    historial.replace("/creartarea");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <IonButton onClick={crearTarea}>Crear Tarea</IonButton>
          </div>
        </IonToolbar>
        <IonToolbar>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* Filtro de Prioridad */}
            <IonItem>
              <IonLabel>Prioridad</IonLabel>
            </IonItem>
            {/* Filtro de Estado */}
            <IonItem>
              <IonLabel>Estado</IonLabel>
            </IonItem>
            {/* Ordenar por Fecha */}
            <IonItem>
              <IonLabel>Fecha</IonLabel>
            </IonItem>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* Filtro de Prioridad */}
            <IonItem>
              <IonSelect
                value={filtroPrioridad}
                onIonChange={(e) => setFiltroPrioridad(e.detail.value)}
              >
                <IonSelectOption value="">Todas</IonSelectOption>
                <IonSelectOption value="alta">Alta</IonSelectOption>
                <IonSelectOption value="media">Media</IonSelectOption>
                <IonSelectOption value="baja">Baja</IonSelectOption>
              </IonSelect>
            </IonItem>
            {/* Filtro de Estado */}
            <IonItem>
              <IonSelect
                value={filtroEstado}
                onIonChange={(e) => setFiltroEstado(e.detail.value)}
              >
                <IonSelectOption value="">Todos</IonSelectOption>
                <IonSelectOption value="true">Hecha</IonSelectOption>
                <IonSelectOption value="false">Pendiente</IonSelectOption>
              </IonSelect>
            </IonItem>
            {/* Ordenar por Fecha */}
            <IonItem>
              <IonSelect
                value={ordenFecha}
                onIonChange={(e) => setOrdenFecha(e.detail.value)}
              >
                <IonSelectOption value="asc">Asc</IonSelectOption>
                <IonSelectOption value="desc">Des</IonSelectOption>
              </IonSelect>
            </IonItem>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {mensajeError ? (
          <p>{mensajeError}</p> // Mostrar mensaje de error si falla la carga
        ) : tareas.length > 0 ? (
          tareas.map((tarea) => (
            <IonCard key={tarea.id}>
              <IonCardHeader>
                <IonCardTitle
                  style={{
                    color: colorFondo(tarea.prioridad),
                    fontWeight: "bold",
                  }}
                >
                  {tarea.nombre}
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>{tarea.mensaje}</p>
                <p>Prioridad: {tarea.prioridad}</p>
                <p>Estado: {tarea.hecha ? "Hecha" : "Pendiente"}</p>
                <IonButton
                  color="primary"
                  onClick={() => editarTarea(tarea.id)}
                >
                  Editar
                </IonButton>
                <IonButton
                  color="danger"
                  onClick={() => confirmarEliminarTarea(tarea.id)}
                >
                  Eliminar
                </IonButton>
              </IonCardContent>
            </IonCard>
          ))
        ) : (
          <p>No se encontraron tareas</p> // Mostrar si no hay tareas
        )}

        {/* Alerta de confirmación */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={"Confirmar eliminación"}
          message={"¿Estás seguro de que quieres eliminar esta tarea?"}
          buttons={[
            {
              text: "Cancelar",
              role: "cancel",
              handler: () => setShowAlert(false),
            },
            {
              text: "Eliminar",
              handler: () => {
                if (tareaAEliminar !== null) {
                  eliminarTarea(tareaAEliminar);
                  setTareaAEliminar(null);
                }
              },
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default ListadoTareas;
