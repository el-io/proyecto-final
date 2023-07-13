var apiHost = "https://leito77.pythonanywhere.com/productos";

Vue.createApp({
  data() {
    return {
      productos: []
    };
  },
  mounted() {
    fetch(apiHost, {
      method: "GET"
    })
      .then(response => response.json())
      .then(data => {
        this.productos = data;
      })
      .catch(error => {
        console.log("Error al obtener los datos de la API:", error);
      });
  }
}).mount("#productos-lista");