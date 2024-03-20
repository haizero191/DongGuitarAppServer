var nodemailer = require("nodemailer");
var fs = require("fs");

const orderConfirmForm = (order) => {
  console.log(order)
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
          .confirm-order-form .content{
            padding: 40px 20px;
            background: #eee;
          }
          .user-info {
            width: 100%;
            margin-bottom: 20px;
          }

          .product-info {
            width: 100%;
          }

          .field {
            padding: 4px 0px;
          }
          .label {
            display: inline-block;
            width: 200px;
            margin-right: 10px;
          }

          .value {
            font-weight: bold;
          }
          
          
        </style>
    </head>
    <body>
        <div class="confirm-order-form">
            <h1>XÁC NHẬN ĐƠN HÀNG</h1>
            <div class="content">
                <div class="user-info">
                    <div class="field">
                        <span class="label">Khách hàng:</span>
                        <span class="value">${order.Fullname}</span>
                    </div>
                    <div class="field">
                        <span class="label">Số điện thoại:</span>
                        <span class="value">${order.Phone}</span>
                    </div>
                    <div class="field">
                        <span class="label">Email:</span>
                        <span class="value">${order.Email}</span>
                    </div>
                </div>    
                <div class="product-info">
                    <div class="field">
                        <span class="label">Sản phẩm:</span>
                        <span class="value">${order.Product.Name}</span>
                    </div>
                    <div class="field">
                        <span class="label">Nhãn hàng:</span>
                        <span class="value">${order.Product.Brand}</span>
                    </div>
                    <div class="field">
                        <span class="label">Danh mục:</span>
                        <span class="value">${order.Product.Category}</span>
                    </div>
                    <div class="field">
                        <span class="label">Số lượng:</span>
                        <span>1</span>
                    </div>       
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
};

const adminGetOrderMail = (order) => {
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "donghuuduc0101@gmail.com",
      pass: "pvav ciyr zzkk jnhm",
    },
    tls: { rejectUnauthorized: false },
  });
  let mailOptions = {
    from: "donghuuduc0101@gmail.com",
    to: "donghuuduc0101@gmail.com",
    subject: "Đồng Guitar Website - Xác nhận đơn hàng mới",
    html: orderConfirmForm(order),
    priority: 'high'
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email has been sent: " + info.response);
      console.log("Email order: ", order)
    }
  });
};

module.exports = adminGetOrderMail;
