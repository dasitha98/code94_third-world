import nodemailer from 'nodemailer';


export function sendmail(to_email, user_password){

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'dasithasample@gmail.com',
          pass: 'tstyrujkbrdoghoo'
        }
      });
      
      var mailOptions = {
        from: 'dasithasample@gmail.com',
        to: to_email,
        subject: 'Code94 Labs login credentials',
        html:`
            <ul>
                <li>Email: ${to_email}</li>
                <li>password: ${user_password}</li>
            </ul>
        `
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          res.send(error);
        } else {
          res.send('Email sent: ' + info.response);
        }
      });

}