<template>
  <div class="container-fluid pt-4">
    <div class="row justify-content-center">
      <div class="col-sm-8">
        <h5 class="text-center">¿Que es bullseye?</h5>
        <p class="text jutify">
          Bullseye es una aplicacióon web colaborativa para crear estimaciones rápidas de costo y
          tiempo para proyectos de desarrollo de software. Ofrece tres métodos de estimaciones.
          Puntos de función, Puntos historia y Puntos casos de uso para que pueda escoger el que más
          se ajuste a su proyecto.
        </p>
        <h6>Registro</h6>
        <p class="text-justify">
          Para comenzar es muy sencillo. Se necesita una dirección de correo electronico válida, al
          cual se enviara notificaciones solo en caso de ser necesario. Una vez el registro se
          complete satisfactoriamente podra acceder atodas las funcionalidades de la aplicación a
          través de su cuenta. El siguiente video muestra un ejemplo de registro.
          <a @click="showVideo('v-signup.mp4', 'Registro')" href="#">Ver</a>
        </p>
        <h6>Crear Proyecto</h6>
        <p class="text-justify">
          Para crear un proyecto nuevo debe asignarle un nombre o título, una categoría y una
          descripción que ayude a comprender mejor de que trata el proyecto en caso de que sea
          compartido con otros usuarios
        </p>
        <p class="text-justify">
          En caso de que olvide la llave de acceso al proyecto para compartir el proyecto con su
          equipo, puede generar un nuevo en el menú de opciones del proyecto. El siguiente video
          muestra un ejemplo.
          <a @click="showVideo('v-project.mp4', 'Crear Proyecto')" href="#">Ver</a>
        </p>
        <h6>Crear Estimación</h6>
        <p class="text-justify">
          Para crear una estimación es necesario un nombre o título para diferenciarlo de otra
          estimaciones existente del mismo proyecto, definir el método de estimación y por ultimo
          asignar un responsable de la estimación que puede ser cualquier miembro que se ha unido al
          proyecto. El video de ejemplo muestra como crear una estimación por puntos de función que
          tiene como responsable de la estimación al propietario del proyecto.
          <a @click="showVideo('v-estimate.mp4', 'Crear Estimación')" href="#">Ver</a>
        </p>
        <h6>Unirse a Proyecto</h6>
        <p class="text-justify">
          En la mayoria de los casos, los proyectos de desarrollo son compuestos por varias
          personas. Puede compartir la llave de acceso al proyecto con los miembros de su equipo
          para que puedan ser participes de las estimaciones que se realicen. Si tiene la llave de
          acceso puede seguir el video de ejemplo para acceder al proyecto.
          <a @click="showVideo('v-join.mp4', 'Unirse')" href="#">Ver</a>
        </p>
      </div>
    </div>
    <!-- modal video -->
    <div id="modalVideo" class="modal fade">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title text-center">{{ title_video }}</h6>
            <button class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="d-flex justify-content-center">
              <video class="w-100" :src="`/video/${name_video}`" controls></video>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'appdoc',
  data() {
    return {
      name_video: null,
      title_video: null
    }
  },
  methods: {
    showVideo: function(nameVideo, titleVideo) {
      this.title_video = titleVideo
      this.name_video = nameVideo
      $('#modalVideo').modal('show')
    }
  }
}
</script>
