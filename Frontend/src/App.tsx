import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import ListadoTareas from "./pages/ListadoTareas"; // Importamos la página de tareas
import CrearTarea from "./pages/CrearTarea"; // Importamos la nueva página
import EditarTarea from "./pages/EditarTarea"; // Importamos la página de tareas
import "./theme/global.css"; // Importar el archivo CSS global

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        {/* Nueva ruta para el listado de tareas */}
        <Route exact path="/listadotareas">
          <ListadoTareas />
        </Route>

        {/* Ruta para crear una tarea */}
        <Route exact path="/creartarea">
          <CrearTarea />
        </Route>

        {/* Ruta de edición de tarea con parámetro de ID */}
        <Route exact path="/editartarea/:idTarea">
          <EditarTarea />
        </Route>

        {/* Redirección a listado de tareas por defecto */}
        <Route exact path="/">
          <Redirect to="/listadotareas" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
