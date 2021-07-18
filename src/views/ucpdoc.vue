<template>
  <div class="container-fluid pt-4">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h5 class="text-center">Puntos Casos de Uso</h5>
        <p class="text-justify">
          El método puntos en casos de uso (UCP) del inglés Use Case Points fue desarrollado en 1993
          por Gustav Kamer bajo la supervisión de Ivar Jacobson creador de los casos de uso y
          promovedor de UML (Unified Model Languaje) y el proceso unificado. Su principal ventaja es
          su rápida adaptación cuando se utiliza UML en el desarrollo de proyectos.
        </p>
        <h6>El Proceso</h6>
        <p class="text-justify">
          Como requisito esta técnica de estimación necesita un modelo de casos de uso que contenga
          la lista de todos los actores (usuario o sistemas externos) y casos de uso del sistema.
          Esta información hace más fácil estimar la dimensión del sistema.
        </p>
        <p class="text-justify">
          Se clasifica cada interacción entre actor y caso de uso según su complejidad y asigna un
          peso, Se determina el número de transacciones de cada caso de uso y se asigna un peso en
          función a su complejidad. La sumatoria de ambos da como resultado los puntos de caso de
          uso no ajustados.
        </p>
        <p class="text-justify">
          Para ajustar el resultado anterior se determina los factores técnicos y los factores
          ambientales o de entorno. Aplicando estos dos factores se obtiene los puntos caso de uso.
          A continuación, se detalla todo el proceso de cálculo.
        </p>
        <h6>Actores</h6>
        <p class="text-justify">
          La complejidad se determina por el número de actores que interaccionan con el caso de uso
          (N), puede corresponder a una de las tres categorías como se ve en la Tabla 1.
        </p>
        <ul>
          <li>
            Simple: Si la interacción es con una interfaz de programación de aplicaciones (API)
          </li>
          <li>
            Media: Interacción a través de un protocolo con otro sistema
          </li>
          <li>
            Compleja: Interacción por medio de interfaz grafica
          </li>
        </ul>
        <p class="text-center">
          <strong>Tabla 1</strong> Peso en función a la complejidad de la interacción de los actores
        </p>
        <div class="w-75 m-auto table-responsive">
          <table class="table table-sm">
            <thead class="text-center">
              <tr>
                <th scope="col">Tipo de interacción</th>
                <th scope="col">Peso (P)</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr>
                <th>Simple</th>
                <td>1</td>
              </tr>
              <tr>
                <th>Medio</th>
                <td>2</td>
              </tr>
              <tr>
                <th>Compejo</th>
                <td>3</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-justify">
          El cálculo de interacción de actores y caso de uso (UAW) se obtiene con la ecuación 1.
        </p>
        <div class="d-flex justify-content-between align-items-center py-4">
          <div v-katex="'UAW = \\displaystyle\\sum^{i=3}_{i=1}(P*N)_i'"></div>
          <span>Ec. (1)</span>
        </div>
        <h6>Casos de uso</h6>
        <p class="text-justify">
          Se determina el número de transacciones, incluyendo los caminos alternativos. En función
          del número de transacciones se clasifica el nivel de complejidad y asigna un peso de
          acuerdo con la Tabla 2. Los niveles de complejidad pueden ser.
        </p>
        <ul>
          <li>Simple: Número de transacciones es menor o igual 3</li>
          <li>
            Media: El número de transacciones es de 4 a 6
          </li>
          <li>
            Compleja: El número de transacciones es mayor o igual que 7
          </li>
        </ul>
        <p class="text-center">
          <strong>Tabla 2</strong> Peso en función a la complejidad de las transacciones de los
          casos de uso
        </p>
        <div class="w-75 m-auto table-responsive">
          <table class="table table-sm">
            <thead class="text-center">
              <tr>
                <th scope="col">Tipo de interacción</th>
                <th scope="col">Peso (P)</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr>
                <th>Simple</th>
                <td>5</td>
              </tr>
              <tr>
                <th>Medio</th>
                <td>10</td>
              </tr>
              <tr>
                <th>Compejo</th>
                <td>15</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-justify">
          El cálculo de interacción de actores y caso de uso (UAW) se obtiene con la ecuación 1.
        </p>
        <div class="d-flex justify-content-between align-items-center py-4">
          <div v-katex="'UUCW=\\displaystyle\\sum^{i=3}_{i=1}(P*N)_i'"></div>
          <span>Ec. (2)</span>
        </div>
        <h6>Factor Técnico</h6>
        <p class="text-justify">
          En el caso del factor técnico (TCF), a cada factor definido en la Tabla 3 se le asigna un
          valor de influencia (I) en el proyecto entre 0 (el factor es irrelevante) y 5 (el factor
          es esencial). Su valor se ajusta con la ecuación 3.
        </p>
        <p class="text-center"><strong>Tabla 3</strong> Peso de factores de complejidad técnica</p>
        <div class="w-75 m-auto table-responsive">
          <table class="table table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Factor</th>
                <th class="text-center" scope="col">Peso (R)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Sistema Distribuido</td>
                <td class="text-center">2.0</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Objetivos de rendimiento</td>
                <td class="text-center">1.0</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Eficiencia respecto al usuario final</td>
                <td class="text-center">1.0</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Procesamiento complejo</td>
                <td class="text-center">1.0</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Código reutilizable</td>
                <td class="text-center">1.0</td>
              </tr>
              <tr>
                <td>6</td>
                <td>Instalación sencilla</td>
                <td class="text-center">0.5</td>
              </tr>
              <tr>
                <td>7</td>
                <td>Fácil uso</td>
                <td class="text-center">0.5</td>
              </tr>
              <tr>
                <td>8</td>
                <td>Portabilida</td>
                <td class="text-center">2.0</td>
              </tr>
              <tr>
                <td>9</td>
                <td>Fácil de cambiar</td>
                <td class="text-center">1.0</td>
              </tr>
              <tr>
                <td>10</td>
                <td>Uso concurrente</td>
                <td class="text-center">1.0</td>
              </tr>
              <tr>
                <td>11</td>
                <td>Características de seguridad</td>
                <td class="text-center">1.0</td>
              </tr>
              <tr>
                <td>12</td>
                <td>Accesible por terceros</td>
                <td class="text-center">1.0</td>
              </tr>
              <tr>
                <td>13</td>
                <td>Se requiere información especial</td>
                <td class="text-center">1.0</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="d-flex justify-content-between align-items-center py-4">
          <div v-katex="'TCF=0,6+(0,01+\\displaystyle\\sum^{i=13}_{i=1}(R*I)_i)'"></div>
          <span>Ec. (3)</span>
        </div>
        <h6>Factor de Entorno</h6>
        <p class="text-justify">
          El factor de entorno (EF) es una lista de ocho elementos a los que se les asigna un valor
          que representa el grado de influencia (I) en el sistema que va de 0 (no tiene influencia
          en el sistema) a 5 (es esencial en el sistema) vea la Tabla 4. Con la ecuación 8 se
          obtiene el factor de entorno.
        </p>
        <p class="text-center">
          <strong>Tabla 4</strong> Peso de los factores de complejidad de entorno
        </p>
        <div class="w-75 m-auto table-responsive">
          <table class="table table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Factor</th>
                <th class="text-center" scope="col">Peso(R)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Familiar con RUP (Rational Unified Process)</td>
                <td class="text-center">1.5</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Experiencia en la aplicación</td>
                <td class="text-center">0.5</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Experiencia con orientación a objetos</td>
                <td class="text-center">1.0</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Capacidad de análisis</td>
                <td class="text-center">0.5</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Motivación</td>
                <td class="text-center">1.0</td>
              </tr>
              <tr>
                <td>6</td>
                <td>Requisitos estables</td>
                <td class="text-center">2.0</td>
              </tr>
              <tr>
                <td>7</td>
                <td>Trabajodores a tiempo parcial</td>
                <td class="text-center">-1</td>
              </tr>
              <tr>
                <td>8</td>
                <td>Lenguaje complejo</td>
                <td class="text-center">-1</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="d-flex justify-content-between align-items-center py-4">
          <div v-katex="'EF=1,4-(0,03*\\displaystyle\\sum^{i=8}_{i=1}(R*I)_i)'"></div>
          <span>Ec. (4)</span>
        </div>
        <h6>Estimación de esfuerzo</h6>
        <p class="text-justify">
          El método original propone usar un factor de productividad similar al que se usa en puntos
          de función clásico. Si bien Kamer propone concretamente 20 horas/persona por cada punto
          caso de uso. Bernerjee sugiere entre 15 a 30 horas, también Bchelder y Winters
          establecieron el siguiente procedimiento.
        </p>
        <p class="text-justify">
          Contar los factores de entorno del 1 al 6 cuya influencia es inferior a 3 y los factores 7
          y 8 cuya influencia sean superiores a 3. Vea la Tabla 10.
        </p>
        <p class="text-justify">
          El factor de productividad será.
        </p>
        <ul>
          <li>20 horas/hombre por UCP si el valor es menor igual 2</li>
          <li>28 horas/hombre por UCP si el valor es menor igual 4</li>
          <li>36 horas/hombre por UCP si el valor es mayor igual 5</li>
        </ul>

        <p class="text-justify">
          Entonces para calcular el esfuerzo para la fase de desarrollo utilizar la ecuación 5.
        </p>
        <div class="d-flex justify-content-between align-items-center py-4">
          <div v-katex="'Esfuerzo = UCP * Productividad'"></div>
          <span>Ec. (5)</span>
        </div>
      </div>
    </div>
  </div>
</template>
