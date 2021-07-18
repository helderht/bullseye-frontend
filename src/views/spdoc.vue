<template>
  <div class="container-fluid pt-4">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h5 class="text-center">Puntos Historia</h5>
        <p class="text-justify">
          Tradicionalmente se acostumbra proporcionar estimaciones en función a tablas, listas y
          números predefinidos. Sin embargo, no es la única forma de realizar estimaciones, un
          enfoque diferente son los puntos de historia.
        </p>
        <p class="text-justify">
          El método de estimación de puntos de historia propone usar una unidad de medida basada en
          esfuerzo relativo o también conocido como complejidad. Si bien se ha abierto el debate y
          la controversia acerca del término que define mejor a la unidad de medida, es más
          frecuente encontrar el término esfuerzo relativo o esfuerzo ideal y es el que utilizaremos
          en adelante.
        </p>
        <p class="text-justify">
          Esta unidad de medida se establece para representar el tamaño de una determinada
          actividad, de esta manera desglosar el trabajo de forma más eficaz en partes más pequeñas.
          Con el tiempo esto ayuda a los equipos a conocer la cantidad de tareas que se puede
          alcanzar en un periodo de tiempo concreto.
        </p>
        <p class="text-justify">
          El proceso de estimación involucra a todos los miembros del equipo, se nutre de la
          perspectiva de cada uno de sus integrantes (diseñadores, desarrolladores, encargados de
          las pruebas, etc.). Por ejemplo, puede que algunas tareas parezcan simples para
          diseñadores, pero sean complejas para el equipo de pruebas. Su opinión y experiencia
          pueden alertar de posibles desastres. A sí mismo el incluir a los protagonistas de cada
          fase del proceso crea estimaciones con un margen de incertidumbre menor y aumenta la
          moral.
        </p>
        <h6>Historias de Usuario</h6>
        <p class="text-justify">
          “Una historia de usuario es una explicación general e informal de una función de software
          escrita desde la perspectiva del usuario final. Su propósito es articular cómo
          proporcionará una función de software valor al cliente” (Rehkopf, s.f.).
        </p>
        <p class="text-justify">
          Las historias de usuario son frecuentemente utilizadas en marcos de desarrollo ágil como
          Scrum y Kanban como la unidad de trabajo más pequeña.
        </p>
        <h6>Cálculo de Puntos Historia</h6>
        <p class="text-justify">
          A diferencia de puntos de función y otros métodos de estimación no existe una fórmula. Lo
          que se hace es asignar un valor relativo comparando una historia frente a otra. Por
          ejemplo, la historia de usuario “x” requiere el doble de esfuerzo que la historia de
          usuario “y”.
        </p>
        <p class="text-justify">
          Bajo esta lógica es que se determina el pivote. El pivote es la historia de usuario que se
          usa como referencia, la que sirve de apoyo para realizar la comparación. Es establecida
          por todo el equipo para entender lo que la historia incluye (desarrollo, pruebas, etc.) y
          lo que no (documentación). Como consecuencia se le asigna una cantidad de puntos de
          historia.
        </p>
        <h6>Rango de Puntos Historia</h6>
        <p class="text-justify">
          Al asignar puntos de historia cada equipo puede usar la escala que mejor se ajuste.
          Existen diferentes rangos de puntuación, sin embargo, el más frecuente es Fibonacci
          modificado y es el que se utilizará como referencia.
        </p>
        <p class="text-justify">
          La secuencia de números es (0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100) normalmente
          relacionada con la serie Fibonacci. El método usa una secuencia no lineal para evitar una
          falsa sensación de precisión.
        </p>
        <p class="text-justify">
          Al momento de estimar no todos son números existen también símbolos.
        </p>
        <ul>
          <li>
            Signo de interrogación (?): Se usa para representar que no se tiene suficiente
            información acerca de la historia como para realizar una estimación
          </li>
          <li>
            Símbolo de infinito (∞): Se usa para representar que la historia de usuario es demasiado
            grande y necesita ser dividida.
          </li>
          <li>
            Taza de café: Se usa para representar cansancio
          </li>
        </ul>
        <p class="text-justify">
          Según (Cohn, 2005; Haugen, 2006) El planing poker o póker de planeación es una técnica que
          se utiliza para asignar los puntos historia a las historias de usuario. El póker de
          planeación involucra un mazo de cartas con el rango de puntos de historia, es decir la
          serie de Fibonacci modificada.
        </p>
        <p class="text-justify">
          Para una sesión de estimación ágil se requiere que cada participante tenga un mazo de
          cartas con el rango de puntos de historia, incluyendo los símbolos anteriormente
          mencionados. También es necesario las historias de usuario definidas y ordenadas por
          prioridad.
        </p>
        <p class="text-justify">
          Como primera actividad en caso de no estar definido aún, se establece el pivote y asigna
          los puntos historia que se vea conveniente, consensuado por todo el equipo.
        </p>
        <p class="text-justify">
          Se da inicio a la estimación leyendo la primera historia de usuario (mayor prioridad), se
          discute acerca de su complejidad riesgos y se aclaran las posibles dudas que surjan.
          Cuando haya quedado claro, cada participante elige una carta de su baraja, una vez que
          todos hayan elegido su carta, se ponen boca arriba a la vez para evitar que la carta de un
          participante tenga influencia sobre la de otro.
        </p>
        <p class="text-justify">
          Se considera que hay consenso cuando todas las cartas son iguales. Lo que significa que
          todos los integrantes estiman de igual tamaño a la historia respectiva. Siendo este caso
          la situación ideal.
        </p>
        <p class="text-justify">
          Por el contrario, es más común la siguiente situación. Si no hay consenso se abre una
          discusión, donde los integrantes con las cartas alta y baja, exponen los detalles de su
          elección. Puede que haya visto algo que el resto de sus compañeros no.
        </p>
        <p class="text-justify">
          Se repite la estimación nuevamente en busca de consenso. Si no se consigue en una segunda
          vuelta se vuelve a debatir. A la tercera si no existe un acuerdo se escoge la media o bien
          el máximo. En estos casos se recomienda escoger el máximo.
        </p>
        <p class="text-justify">
          Cuando sale la carta “0” implica que la tarea tiene un valor despreciable, es común que
          pueda salir y no tiene más importancia. Si sale la carta con el símbolo de infinito
          significa que la historia no se puede abordar por el momento es demasiado grande para ser
          estimada y necesita ser reescrita en historias más pequeñas.
        </p>
        <p class="text-justify">
          Al final de la sesión el resultado es una estimación consensuada y validada por todo el
          equipo. Lo habitual es fijar una cantidad de puntos de historia con los cuales el equipo
          se compromete a entregar al final del sprint en función de su productividad.
        </p>
        <h6>Esfuerzo</h6>
        <p class="text-justify">
          Para calcular el esfuerzo requerido se necesita determinar el factor de productividad
          llamado también velocidad. Es la suma del número de puntos de historia que se estimaron
          para cada historia de usuario que fue terminada. El factor representa la cantidad de
          trabajo estimado que ha sido completado en un sprint.
        </p>
        <div class="d-flex justify-content-between align-items-center py-4">
          <div v-katex="'Esfuerzo=Puntos Historia*Productividad'"></div>
          <span>Ec. (1)</span>
        </div>
      </div>
    </div>
  </div>
</template>
