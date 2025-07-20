import React, { useEffect, useState } from "react";
import socket from "../socket.js";
import useSocketHandler from "../../hooks/useSocketHandler";
import "./GameRoom.css";

function GameRoom() {
  const [roomId, setRoomId] = useState("");
  const [nameId, setNameId] = useState("");
  const [joined, setJoined] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [myMove, setMyMove] = useState(null);
  const [roundResult, setRoundResult] = useState(null);

  const moves = ["agua", "fuego", "planta"];

  useSocketHandler({ setGameStarted, setRoundResult, setMyMove });

  const joinRoom = () => {
    if (roomId && nameId) {
      socket.emit("joinRoom", { roomId, nameId });
      setPlayerName(nameId);
      setJoined(true);
    }
  };

  const handleMove = (move) => {
    setMyMove(move);
    socket.emit("playerMove", { roomId, move });
  };

  const handleSetName = () => {
    if (nameId.trim() !== "") {
      setPlayerName(nameId);
    }
  };

  const handleRestart = () => {
    setRoundResult(null);
    setMyMove(null);
    socket.emit("restartGame", { roomId });
  };

  const handleGoToStart =()=>{
    if(roomId){
      socket.emit("leaveRoom", {roomId});
    }
    setJoined(false);
    setGameStarted(false);
    setRoundResult(null);
    setMyMove(null);
    setRoomId("");
  }

  return (
    <div className="game-room">
      {!joined && (
        <>
          <h1>PIEDRA, PAPEL O TIJERA</h1>
          {playerName && <h2>¡Bienvenido, {playerName}!</h2>}

          <input
            className="input_game"
            type="text"
            value={nameId}
            onChange={(e) => setNameId(e.target.value)}
            placeholder="Nombre del entrenador"
          />
          <button className="botones_inputs" onClick={handleSetName}>GUARDAR</button>

          <input
            className="input_game"
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="ID de la sala"
          />
          <button className="botones_inputs" onClick={joinRoom}>UNIRSE</button>
        </>
      )}

      {joined && !gameStarted && (
        <div><h3 className="jump">Esperando a tu compañero...</h3></div>
      )}

      {gameStarted && (
        <div className="btn_container">
          <h2>{playerName ? `${playerName}, vas a atacar con...` : 'VAS A ATACAR CON...'}</h2>
          <div className="alinear-btn">
          {moves.map((m) => (
            <button
              key={m}
              className={`boton_ataque ${m.toLowerCase()}`}
              onClick={() => handleMove(m)}
              disabled={myMove !== null}
            >
              <img
                src={`/buttonsPlay/${m.toLowerCase()}.png`}
                alt={m}
                className="img_ataque"
              />
            </button>
          ))}
          </div>
        </div>
      )}

      {roundResult && (
        <div className="resultado">
          <h3>Resultado del combate:</h3>
          {Object.entries(roundResult.moves).map(([player, move]) => (
            <p key={player}><strong>{player}</strong> usó {move.toUpperCase()}</p>
          ))}
          <p>
            {roundResult.result.includes("empate")
              ? <strong>¡Empate!</strong>
              : <strong>{roundResult.result.toUpperCase()}</strong>}
          </p>
          <button className="botones_inputs" onClick={handleRestart}>REVANCHA</button>
          <button className="botones_inputs" onClick={handleGoToStart}>INICIO</button>

        </div>
      )}
    </div>
  );
}

export default GameRoom;
