export default function roomCreation(codeLength){
      let roomCode = '';
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for ( var i = 0; i < codeLength; i++ ) {
            roomCode += characters.charAt(Math.floor(Math.random() * characters.length));
         }

      return roomCode;
}