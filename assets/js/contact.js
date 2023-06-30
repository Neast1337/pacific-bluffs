function sendMessage(event) {
  event.preventDefault();
  
  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
  
  var request = new XMLHttpRequest();
  request.open("POST", "https://discord.com/api/webhooks/1124360787490766909/Rxh4QrPz-kARmIMDlGK-2Lg_eNas4cYHir51UhTxBMAgvFk2kWoqlL2bBDK3BHk8_dtl");
  request.setRequestHeader('Content-type', 'application/json');
  
  // Récupérer la valeur du champ de texte du message
  var message = document.getElementById('message').value;
  
  // Vérifier si le message est vide
  if (!message) {
    alert("Il manque votre message que vous voulez envoyer !");
    return;
  }

  // Vérifier si le message contient @everyone ou @here
  if (message.includes("@everyone") || message.includes("@here")) {
    alert("Le message contient un mot interdit ! Modifiez-le pour pouvoir l'envoyer.");
    return;
  }

  // Vérifier si le message est un lien YouTube ou Spotify
  var youtubeRegex = /^(https?:\/\/)?(www\.)?youtube.com\/watch\?v=[\w-]{11}(&\S*)?$/;
  var spotifyRegex = /^(https?:\/\/)?(www\.)?open.spotify.com\/track\/[a-zA-Z0-9]+(\?si=\S*)?$/;
  if (!youtubeRegex.test(message) && !spotifyRegex.test(message)) {
    alert("Le message doit être un lien YouTube ou Spotify !");
    return;
  }
  
  var params = {
    username: "Pacific Bluffs",
    avatar_url: "https://cdn.discordapp.com/attachments/1123748645943119944/1124167651191685250/Logo_Pacific_Bluffs_blanc.png",
    embeds: [{
      color: 0x0099ff,
      title: 'Pacific Bluffs',
      
      footer: {
        text: "Pacific Bluffs",
        icon_url: "https://cdn.discordapp.com/attachments/1123748645943119944/1124167651191685250/Logo_Pacific_Bluffs_blanc.png"
      },
      thumbnail: {
        url: "https://cdn.discordapp.com/attachments/1123748645943119944/1124167651191685250/Logo_Pacific_Bluffs_blanc.png"
      },
      description: ("**Lien: **" + message),
    }]
  }
  
  request.send(JSON.stringify(params));
  
  // Afficher une alerte lorsque la requête se termine avec succès
  request.addEventListener("load", function () {
    alert("Le message a été envoyé avec succès !");
  });
  
  sleep(400);

  // Effacer le champ de texte du message
  document.getElementById('message').value = '';
}
