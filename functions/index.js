const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
 });

 exports.SendEmail2 = functions.firestore
    .document('users/{usersId}')
    .onCreate((change, context) => { //https.onRequest((request, response) => {

        let information = change.data();

        const nodemailer = require("nodemailer");

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'danielacuervo4565@gmail.com', // generated ethereal user
                pass: 'Kdcc96082819972.', // generated ethereal password
            },
        });

        let emailOptions = {
            from: '"Curso Bictia 🤖🏫" <danielacuervo4565@gmail.com>',
            to: information.email,
            subject: 'Registro exitoso',
            text: 'Hello ✔',
            html: '<b>Bienvenido a '+information.name+' nuestro fantabulosa aplicación</b><br>Soy un texto normal, probando nodemailer<br><img src="https://cdn.pixabay.com/photo/2016/03/09/09/22/workplace-1245776_960_720.jpg" alt="Imagen para probar">'
        };
        return transporter.sendMail(emailOptions).then((data) => {
            resolve(data);
            return;
        }).catch((error) => {
            reject(error);
            return;
        });
    });
