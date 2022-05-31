const express = require("express");//require로 모듈 불러와 express()로 실행해서 서버 만든다.
const app = express();
const server = require("http").createServer(app);

const port = 4000;//포트 할당

server.listen(port, () => {//포트번호, 서버 열린 후 실행될 콜백 함수
  console.log(
    `##### server is running on http://localhost:4000. ${new Date().toLocaleString()} ######`
  );
});