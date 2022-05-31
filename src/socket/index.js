module.exports = function (socketIo) {
    socketIo.on("connection", function (socket) {//첫 파라미터 - 이벤트 타입, 두번째 - 콜백함수 이벤트 핸들러
      // 클라이언트와 연결이 되면 연결된 사실을 출력합니다.
        console.log("socket connection succeeded.");//소켓 서버 터미널에 출력
    
        socket.on("disconnect", reason => {
        // 클라이언트와 연결이 끊어지면 이유를 출력해줍니다.
            console.log(`disconnect: ${reason}`);//연결 끊긴 이유 파라미터로 받을 수 있음
        });

        // 구현 편의상, 모든 클라이언트의 방 번호는 모두 "room 1"으로 배정해줍니다.
        const roomName = "room 1";

        // JOIN 이벤트 기능 추가
        socket.on("JOIN_ROOM", requestData => {
            // 콜백함수의 파라미터는 클라이언트에서 보내주는 데이터입니다.
            socket.join(roomName); // user를 "room 1" 방에 참가시킵니다.
            const responseData = {
            ...requestData,
            type: "JOIN_ROOM",
            time: new Date(),
            };
            // "room 1"에는 이벤트타입과 서버에서 받은 시각을 덧붙여 데이터를 그대로 전송해줍니다.
            socketIo.to(roomName).emit("RECEIVE_MESSAGE", responseData);//클라이언트에 이벤트 전달!
            console.log(`JOIN_ROOM is fired with data: ${JSON.stringify(responseData)}`);
        });

        socket.on("UPDATE_NICKNAME", requestData => {//유저가 닉네임 변경했을 때
            const responseData = {
                ...requestData,
                type: "UPDATE_NICKNAME",
                time: new Date(),
            };
            socketIo.to(roomName).emit("RECEIVE_MESSAGE", responseData);
            console.log(`UPDATE_NICKNAME is fired with data: ${JSON.stringify(responseData)}`);
        });

        socket.on("SEND_MESSAGE", requestData => {
            const responseData = {
                ...requestData,
                type: "SEND_MESSAGE",
                time: new Date(),
            };
            socketIo.to(roomName).emit("RECEIVE_MESSAGE", responseData);
            console.log(`SEND_MESSAGE is fired with data: ${JSON.stringify(responseData)}`);
        });


    });
  }