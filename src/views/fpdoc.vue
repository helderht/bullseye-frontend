<template>
  <div class="container-fluid pt-4">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h5 class="text-center">Puntos de Función</h5>
        <p class="text-justify">
          En 1979 Allan Albrecht de IBM hace público el concepto de “análisis de puntos de función”
          (FPA, del inglés Function Points Analisys) una medida para el dimensionamiento de la
          funcionalidad de un sistema de software. Cuantifica las funciones contenidas en el
          software en términos que sean significativos para el usuario final. La medida se relaciona
          directamente con los requisitos del negocio que el software está destinado a hacer frente.
          Su objetivo es medir la funcionalidad entregada al usuario independientemente de la
          tecnología utilizada y del ciclo de vida del producto
        </p>
        <p class="text-justify">
          La organización IFPUG (International Function Point Users Group) continuó el trabajo
          original de Albrecht estandarizando el método en IFPUG-FPA en el documento Counting
          Practices Manual donde se describe el método de conteo de puntos de función. La última
          versión es 4.3.1 de 2010. Como requisito para el análisis de puntos de función se necesita
          tener elaborado la lista de requerimientos funcionales del sistema, que son los requisitos
          específicos de una tarea o servicio del usuario, especifican lo que el software debe hacer
        </p>
        <h6 class="">El Proceso</h6>
        <p class="text-justify">
          El método se basa en dividir los requerimientos funcionales en dos categorías: funciones
          de transacción y funciones de almacenamiento, a su vez las funciones de transacción se
          subdividen en entrada externa, salida externa, consulta externa. Las funciones de
          almacenamiento se subdividen en archivo lógico interno y archivo de interfaz externo.
        </p>
        <p class="text-justify">
          Una vez que todos los requerimientos funcionales son clasificados en una de las cinco
          categorías mencionadas, son sometidos a una evaluación de complejidad basada en tablas
          elaboradas por el estándar IFPUG-FPA donde se le asigna puntos de función a cada
          requerimiento.
        </p>
        <p class="text-justify">
          Se obtiene los puntos de función sin ajustar de la sumatoria de los puntos de función de
          cada requerimiento. Se aplica un factor de ajuste basado en características generales de
          los sistemas definido por IFPUG-FPA. Como resultado se obtiene los puntos de función
          ajustados, un número con el cual se puede calcular el esfuerzo, el tiempo y el costo
          estimados.
        </p>
        <p class="text-justify">
          A continuación, se detalla el cálculo del método de estimación Puntos de función.
        </p>
        <h6>Cálculo de Puntos de Función</h6>
        <p class="text-justify">
          Las funciones de transacción son aquellas tareas que permiten la interacción del usuario
          con el sistema. Existen tres tipos de interacción.
        </p>
        <ul>
          <li>
            Entrada externa (EI) del inglés external input, cuyo objetivo es salvar los datos en el
            sistema
          </li>
          <li>
            Salida externa (EO) del inglés external output, su función es presentar datos que
            involucra manipulación previa
          </li>
          <li>
            Consulta externa (EQ) del inglés external query, cuya meta es recuperar datos del
            sistema
          </li>
        </ul>
        <p class="text-justify">
          IFPUG-FPA define la complejidad de cada tipo de función a través de.
        </p>
        <ul>
          <li>
            Número de tipos de elementos de datos incluidos (DET), del inglés DataElement Type
          </li>
          <li>
            Número de archivos lógicos referenciados (FTR), del inglés File Type Referenced
          </li>
          <li>
            Número de archivos lógicos internos referenciados (RET), del inglés Record Element Type
          </li>
        </ul>
        <p class="justify-content">
          Cuando se determina el DET, RET, FRT se asigna el nivel de complejidad de acuerdo a las
          Tablas 1 y 2.
        </p>
        <p class="text-center"><strong>Tabla 1</strong> Complejidad para Entrada Externa (EI)</p>
        <div class="w-75 m-auto table-responsive">
          <table class="table table-sm">
            <thead class="text-center">
              <tr>
                <th scope="col">FTR</th>
                <th scope="col" colspan="3" class="text-center">DET</th>
              </tr>
              <tr>
                <th></th>
                <th>1-4</th>
                <th>5-15</th>
                <th>>15</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr>
                <th>0-1</th>
                <td>Baja</td>
                <td>Baja</td>
                <td>Media</td>
              </tr>
              <tr>
                <th>2-3</th>
                <td>Baja</td>
                <td>Media</td>
                <td>Alta</td>
              </tr>
              <tr>
                <th>>3</th>
                <td>Media</td>
                <td>Alta</td>
                <td>Alta</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-center">
          <strong>Tabla 2</strong> Complejidad para Salida Externa (EO) y Consulta Externa (EQ)
        </p>
        <div class="w-75 m-auto table-responsive">
          <table class="table table-sm">
            <thead class="text-center">
              <tr>
                <th scope="col">FTR</th>
                <th scope="col" colspan="3" class="text-center">DET</th>
              </tr>
              <tr>
                <th></th>
                <th>1-5</th>
                <th>6-19</th>
                <th>>19</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr>
                <th>0-1</th>
                <td>Baja</td>
                <td>Baja</td>
                <td>Media</td>
              </tr>
              <tr>
                <th>2-3</th>
                <td>Baja</td>
                <td>Media</td>
                <td>Alta</td>
              </tr>
              <tr>
                <th>>3</th>
                <td>Media</td>
                <td>Alta</td>
                <td>Alta</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-justify">
          Las funciones de almacenamiento son archivos responsables de guardar los datos. Se dividen
          en dos tipos.
        </p>
        <ul>
          <li>
            Archivo lógico interno (ILF), del ingés intermal logical file, representan los archivos
            guardados en el sistema
          </li>
          <li>
            Archivo de interfaz externo (EIF), del inglés external interface file, son archivos
            referenciados de otro sistema.
          </li>
        </ul>
        <p class="text-justify">
          Se determina el DET, RET, FRT. Luego se asigna el nivel de complejidad con la Tabla 3
        </p>
        <p class="text-center">
          <strong>Tabla 3</strong> Complejidad para archivo lógico interno (ILF) y archivo de
          interfaz externo (EIF)
        </p>
        <div class="w-75 m-auto table-responsive">
          <table class="table table-sm">
            <thead class="text-center">
              <tr>
                <th scope="col">FTR</th>
                <th scope="col" colspan="3" class="text-center">DET</th>
              </tr>
              <tr>
                <th></th>
                <th>1-19</th>
                <th>20-50</th>
                <th>>50</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr>
                <th>0-1</th>
                <td>Baja</td>
                <td>Baja</td>
                <td>Media</td>
              </tr>
              <tr>
                <th>2-5</th>
                <td>Baja</td>
                <td>Media</td>
                <td>Alta</td>
              </tr>
              <tr>
                <th>>5</th>
                <td>Media</td>
                <td>Alta</td>
                <td>Alta</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-justify">
          Luego se aplica el peso en puntos de función (FP) en relación a la complejidad de acuerdo
          con la Tabla 4.
        </p>
        <p class="text-center"><strong>Tabla 4</strong> Contribución de funciones</p>
        <div class="w-75 m-auto table-responsive">
          <table class="table table-sm">
            <thead class="text-center">
              <tr>
                <th class="text-left" scope="col">Tipo de función</th>
                <th scope="col" colspan="3" class="text-center">Peso (FP)</th>
              </tr>
              <tr>
                <th></th>
                <th>Baja</th>
                <th>Media</th>
                <th>Alta</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr>
                <th class="text-left">Entrada Externa (EI)</th>
                <td>3</td>
                <td>4</td>
                <td>6</td>
              </tr>
              <tr>
                <th class="text-left">Salida Externa (EO)</th>
                <td>4</td>
                <td>5</td>
                <td>7</td>
              </tr>
              <tr>
                <th class="text-left">Consulta Externa (EQ)</th>
                <td>3</td>
                <td>4</td>
                <td>6</td>
              </tr>
              <tr>
                <th class="text-left">Archivo Lógico Interno (ILF)</th>
                <td>7</td>
                <td>10</td>
                <td>15</td>
              </tr>
              <tr>
                <th class="text-left">Archivo de Interfaz Externa (EIF)</th>
                <td>5</td>
                <td>7</td>
                <td>10</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-justify">
          Los puntos de función sin ajustar (UFP) se calculan con la ecuación 1.
        </p>
        <div class="d-flex justify-content-between align-items-center py-4">
          <div v-katex="'UFP=\\displaystyle\\sum^{i=n}_{i=1}R_i'"></div>
          <span>Ec. (1)</span>
        </div>
        <h6>Factor de Ajuste</h6>
        <p class="text-justify">
          El factor de ajuste (AF) son 14 características generales en los que se valora el grado de
          influencia que tiene en el sistema. Cada factor se describe en la Tabla 6 y es evaluado de
          0 a 5 puntos. El factor de ajuste se calcula con la ecuación 2.
        </p>
        <ol>
          <li>
            Comunicación de datos
          </li>
          <li>
            Procesamiento distribuido
          </li>
          <li>
            Objetivos de rendimiento
          </li>
          <li>
            Configuración del equipamiento
          </li>
          <li>
            Tasa de transacciones
          </li>
          <li>
            Entrada de datos en línea
          </li>
          <li>
            Interfaz con el usuario
          </li>
          <li>
            Actualizaciones en línea
          </li>
          <li>
            Procesamiento complejo
          </li>
          <li>
            Reusabilidad de código
          </li>
          <li>
            Facilidad de implementación
          </li>
          <li>
            Facilidad de operación
          </li>
          <li>
            Instalaciones múltiples
          </li>
          <li>
            Facilidad de cambio
          </li>
        </ol>
        <div class="d-flex justify-content-between align-items-center py-4">
          <div v-katex="'AF=\\displaystyle\\sum^{i=14}_{i=1}F_i'"></div>
          <span>Ec. (2)</span>
        </div>
        <h6>Puntos de Función Ajustados</h6>
        <p class="text-justify">
          Puntos de función (FP) o puntos de función ajustado se obtiene con la ecuación 3. El
          número obtenido representa el tamaño del proyecto expresado en puntos de función.
        </p>
        <div class="d-flex justify-content-between align-items-center py-4">
          <div v-katex="'FP=UFP[0,65+(0,01*AF)]'"></div>
          <span>Ec. (3)</span>
        </div>
        <h6>Estimación de Esfuerzo</h6>
        <p class="text-justify">
          El esfuerzo estimado se obtiene multiplicando el tamaño del proyecto expresado en puntos
          de función por el factor de productividad del equipo como muestra la ecuación 4. Esta
          métrica revela el número de horas por cada punto de función entregado, esta medida es
          diferente para cada equipo y proyecto. Sin embargo, si el equipo carece de esta
          información, se usa el factor de productividad que ofrece IFPUG-FPA que es 8 (Horas/FP).
        </p>
        <div class="d-flex justify-content-between align-items-center py-4">
          <div v-katex="'Esfuerzo=FP*Productividad'"></div>
          <span>Ec. (4)</span>
        </div>
      </div>
    </div>
  </div>
</template>
