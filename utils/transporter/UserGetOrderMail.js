var nodemailer = require("nodemailer");
var fs = require("fs");

// Chuyển đổi sang định dạng VND
const formatCurrency = (amount) => {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formatter.format(amount);
};

const orderConfirmForm = (order) => {
  return `
  <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
            <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: Arial, Helvetica, sans-serif;
            }

            .confirm-order-user-form {
                padding: 20px 0px;
                width: 80%;
                margin: 0 auto;
            }

            .header {
            }
            .header-logo {
                width: 100%;
                max-height: 300px;
                display: flex;
                align-items: center;
                justify-content: center;
                align-items: center;
                justify-content: center;
            }

            .header-logo img {
                width: 100%;
                object-fit: contain;
            }

            .header-content {
                width: 100%;
                position: relative;
                padding: 4px 0px;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }

            .header-content .typho {
                position: relative;
                z-index: 10;
                background-color: #ddd;
                padding: 18px 10px;
                width: 100%;
                margin-bottom: 20px;
            }
            .header-content h2 {
                text-transform: uppercase;
                color: rgba(77, 75, 75, 0.855);
                font-weight: bold;
            }

            .typho-1 {
                font-size: 24px;
                text-align: center;
            }

            .typho-2 {
                font-size: 12px;
                text-transform: capitalize;
                text-align: center;
            }

            .header-content p {
                font-size: 14px;
            }

            .content {
                width: 100%;
                height: 100%;
                background-color: rgb(255, 255, 255);
            }

            .content-header {
                font-size: 14px;
                padding: 40px 0px;
            }

            .content-header p {
                line-height: normal;
            }

            .content-order {
                width: 100%;
                padding: 40px 12%;
                height: fit-content;
                padding-bottom: 40px;
                margin-bottom: 40px;
                border-top: 1px dashed #ddd;
                border-bottom: 1px dashed #ddd;
            }

            .content-info {
                width: 100%;
                margin-bottom: 20px;
            }

            .content-info h2 {
                text-transform: uppercase;
            }

            .content-product {
                width: 100%;

            }

            .content-product h2 {
                text-transform: uppercase;
            }

            .field {
                font-size: 14px;
            }

            .field .value {
                font-weight: bold;
                margin-left: 10px;
                color: black;
            }

            .title {
                margin-bottom: 6px;
            }

            .content-image {
                width: 50%;
                overflow: hidden;
            }

            .content-main {
                margin-top: 30px;
            }

            .content-main img {
                width: 100%;
                object-fit: cover;
            }

            a {
                text-decoration: none;
                color: black!important;
            }

            .total-price {
                margin-top: 20px;
                padding: 16px 0px;
                border-top: 1px solid #ddd;
            }

            .total-price .price-value {
                color:#D52B1E;
                font-size: 26px;
                font-weight: bold;
            }
            </style>
        </head>
        <body>
            <div class="confirm-order-user-form">
                <div class="header">
                    <div class="header-logo">
                    <img
                        src="https://static.vecteezy.com/system/resources/previews/007/688/753/original/guitar-logo-free-vector.jpg"
                        alt=""
                    />
                    </div>
                    <div class="header-content">
                    <div class="typho">
                        <h2 class="typho-1">Đồng Guitar</h2>
                        <h2 class="typho-2">Premium sound</h2>
                    </div>
                    </div>
                </div>
                <div class="content">
                    <div class="content-header">
                        <p style="margin-bottom: 4px">Xin chào <b>nguyễn văn A</b></p>
                        <p>
                            Đồng Guitar xin thông báo đã nhận được đơn đặt hàng mang mã số
                            <b style="color: #D52B1E">${order.Code}</b> của bạn.
                        </p>
                        <p>
                            Đơn hàng của bạn đang được tiếp nhận và trong quá trình xử lí. Chúng
                            tôi sẽ liên hệ lại cho bạn trong thời gian sớm nhất để xác nhận đơn
                            hàng và các thắc mắc của bạn đối với sản phẩm và dịch vụ của chúng
                            tôi.
                        </p>
                    </div>

                <div class="content-main">
                    <div class="content-order">
                        <div class="content-info">
                            <h2 class="title">Thông tin người mua</h2>
                            <div class="field">
                                <span>Họ tên: </span>
                                <span class="value">${order.Fullname}</span>
                            </div>
                            <div class="field">
                                <span>Điện thoại: </span>
                                <span class="value">${order.Phone} </span>
                            </div>
                            <div class="field">
                                <span>Email: </span>
                                <span class="value">${order.Email}</span>
                            </div>
                        </div>
                        <div class="content-product">
                            <h2 class="title">Thông tin sản phẩm</h2>
                            <div class="field">
                                <span>Sản phẩm: </span>
                                <span class="value">${order.Product.Name}</span>
                            </div>
                            <div class="field">
                                <span>Danh mục: </span>
                                <span class="value">${order.Product.Category}</span>
                            </div>
                            <div class="field">
                                <span>Nhãn hàng: </span>
                                <span class="value">${order.Product.Brand}</span>
                            </div>
                            <div class="field total-price">
                                <span>Thanh toán: </span>
                                <span class="price-value">${formatCurrency(order.PaymentCost)}</span>
                            </div>
                        </div>
                    </div>
                    <div class="content-image">
                        <img src="https://i.pinimg.com/564x/5d/7a/3f/5d7a3ff974634449128dccae670bc206.jpg"/>
                    </div>
                    </div>
                </div>

                <div class="footer">
                
                </div>
            </div>
        </body>
        </html>
  
    `;
};

const UserGetOrderMail = (order) => {
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
    to: order.Email,
    subject: "Đồng Guitar - Đặt hàng thành công !",
    html: orderConfirmForm(order),
    priority: "high",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email has been sent: " + info.response);
    }
  }); 
};

module.exports = UserGetOrderMail;
