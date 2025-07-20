import { useEffect } from "react";
import socket from "../src/socket";

export default function useSocketHandlers({ setGameStarted, setRoundResult, setMyMove }) {
  useEffect(() => {
    const handleStartGame = ({ players }) => {
      setGameStarted(true);
      setRoundResult(null);
      setMyMove(null);
      console.log("Empieza la partida entre:", players);
    };

    const handleRoundResult = (data) => {
      setRoundResult(data);
      console.log("Resultado de la partida:", data);
    };

    const handleRoomFull = () => {
      alert("La sala está llena");
    };

    const handlePlayerDisconnected = () => {
      alert("Jugador desconectado");
      setGameStarted(false);
    };

    socket.on("startGame", handleStartGame);
    socket.on("roundResult", handleRoundResult);
    socket.on("roomFull", handleRoomFull);
    socket.on("playerDisconnected", handlePlayerDisconnected);

    return () => {
      socket.off("startGame", handleStartGame);
      socket.off("roundResult", handleRoundResult);
      socket.off("roomFull", handleRoomFull);
      socket.off("playerDisconnected", handlePlayerDisconnected);
    };
  }, [setGameStarted, setRoundResult, setMyMove]);
}
