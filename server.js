const express = require("express");//require로 모듈 불러와 express()로 실행해서
const app = express();
const server = require("http").createServer(app);//서버 만듬
const cors = require("cors");
const socketIo = require("socket.io")(server, {//서버에 socket 열어줌
    cors: {//해당 url로만 통신 허용함
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  const socket = require("./src/socket"); // 이 다음으로 바로 만들 파일!

const port = 4000;//포트 할당

// express의 미들웨어 사용 방식!
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // cors 미들웨어 사용
socket(socketIo); // 이제 곧 만들 파일에서 정의할 모듈에 socketIo 객체를 전달해줄 것입니다

server.listen(port, () => {//포트번호, 서버 열린 후 실행될 콜백 함수
  console.log(
    `##### server is running on http://localhost:4000. ${new Date().toLocaleString()} ######`
  );
});