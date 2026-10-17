// modulo de ejemplo.

module.exports = {


    // logica que valida si un telefono esta correcto...
    is_valid_phone: function (phone) {
      // inicializacion lazy
      var isValid = false;
      // expresion regular copiada de StackOverflow
      var re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/i;
  
      // validacion Regex
      try {
        isValid = re.test(phone);
      } catch (e) {
        console.log(e);
      } finally {
          return isValid;
      }
      // fin del try-catch block
    },
  
    escapeHtml: function (text) {
      return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    },

    // etiquetas, manejadores de eventos y esquemas que no deben llegar al chat
    contains_script_injection: function (value) {
      if (typeof value !== 'string') {
        return false;
      }
      var re = /<\s*\/?\s*script\b|javascript\s*:|data\s*:|on\w+\s*=|<\s*\/?\s*(?:iframe|img|svg|object|embed|link|meta)\b/i;
      return re.test(value);
    },

    is_valid_url_image: function (url) {
  
      // inicializacion lazy
      var isValid = false;
      // solo http(s) y la cadena completa debe terminar en una extension de imagen
      var re = /^https?:\/\/[^\s<>"'`]+\.(?:jpg|jpeg|gif|png|bmp)$/i;
  
      // validacion Regex
      try {
        isValid = typeof url === 'string' && !this.contains_script_injection(url) && re.test(url);
      } catch (e) {
        console.log(e);
      } finally {
          return isValid;
      }
      // fin del try-catch block
    },
  
    is_valid_yt_video: function (url) {
  
      // inicializacion lazy
      var isValid = false;
      // el id de 11 caracteres es obligatorio y la URL debe coincidir completa
      var re = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})$/i;
  
      // validacion Regex
      try {
        isValid = typeof url === 'string' && !this.contains_script_injection(url) && re.test(url);
      } catch (e) {
        console.log(e);
      } finally {
          return isValid;
      }
      // fin del try-catch block
    },
  
    getYTVideoId: function(url){
      if (!this.is_valid_yt_video(url)) {
        return '';
      }
      var match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/i);
      return match ? match[1] : '';
    },
  
    getEmbeddedCode: function (url){
      var id = this.getYTVideoId(url);
      if (!/^[\w-]{11}$/.test(id)) {
        return '';
      }
      var code = '<iframe width="560" height="315" src="https://www.youtube.com/embed/'+id+ '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
      return code;
    },
  
    getImageTag: function(url){
      if (!this.is_valid_url_image(url)) {
        return this.escapeHtml(url);
      }
      var tag = '<img src="'+this.escapeHtml(url)+'" style="max-height: 400px;max-width: 400px;">';
      return tag;
    },
  
    validateMessage: function(msg){
      // Handle invalid input
      if (!msg || typeof msg !== 'string') {
        return JSON.stringify({ mensaje: '' });
      }

      try {
        var obj = JSON.parse(msg);
        var nombre = typeof obj.nombre === 'string' ? obj.nombre : '';
        var mensaje = typeof obj.mensaje === 'string' ? obj.mensaje : '';
        var color = typeof obj.color === 'string' ? obj.color : '';

        obj.nombre = this.escapeHtml(nombre);
        obj.color = /^#[0-9A-Fa-f]{6}$/.test(color) ? color : '#000000';

      if(this.is_valid_url_image(mensaje)){
        console.log("Es una imagen!")
        obj.mensaje = this.getImageTag(mensaje);
      }
      else if(this.is_valid_yt_video(mensaje)){
        console.log("Es un video!")
        obj.mensaje = this.getEmbeddedCode(mensaje);
      }
      else{
        console.log("Es un texto!")
        obj.mensaje = this.escapeHtml(mensaje);
      }
      
      return JSON.stringify(obj);
      } catch (e) {
        console.log('Error processing message:', e);
        return JSON.stringify({ mensaje: this.escapeHtml(msg) });
      }
    }
  
  
  
    
    
  
  // fin del modulo
  };
  