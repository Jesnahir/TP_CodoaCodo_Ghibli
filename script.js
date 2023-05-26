document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault(); 

  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  var formData = {
      name: name,
      email: email,
      message: message
  };

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://api.sendgrid.com/v3/mail/send", true); 
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", "Bearer YOUR_SENDGRID_API_KEY");
  xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
          if (xhr.status === 202) {
              alert("¡El correo ha sido enviado correctamente!");
          } else {
              alert("Hubo un error al enviar el correo. Por favor, inténtalo nuevamente.");
          }
      }
  };
  xhr.send(JSON.stringify(buildEmailData(formData)));
});

function buildEmailData(formData) {
  var emailData = {
      personalizations: [{
          to: [{ email: "tpjessicadoormann@gmail.com" }],
          subject: "Nuevo mensaje de contacto"
      }],
      from: { email: formData.email },
      content: [{
          type: "text/plain",
          value: "Nombre: " + formData.name + "\nCorreo electrónico: " + formData.email + "\nMensaje: " + formData.message
      }]
  };

  return emailData;
}