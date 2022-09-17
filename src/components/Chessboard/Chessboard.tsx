import './Chessboard.css';
import Tile from '../Tile/Tile';
import { Color, Piece, PieceType } from '../../models/piece';
import React, { useRef } from 'react';

const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxis = [1, 2, 3, 4, 5, 6, 7, 8];

const pieces: Piece[] = [];

let activePiece: HTMLElement | null = null;

for (let c = 0; c < 2; c++) {
    let ypos = c === 0 ? 0 : 7;
    let yposPawn = c === 0 ? 1 : 6;
    let color = c === 0 ? Color.White : Color.Black;
    pieces.push(new Piece(ypos, 0, PieceType.Rook, color));
    pieces.push(new Piece(ypos, 1, PieceType.Knight, color));
    pieces.push(new Piece(ypos, 2, PieceType.Bishop, color));
    pieces.push(new Piece(ypos, 3, PieceType.King, color));
    pieces.push(new Piece(ypos, 4, PieceType.Queen, color));
    pieces.push(new Piece(ypos, 5, PieceType.Bishop, color));
    pieces.push(new Piece(ypos, 6, PieceType.Knight, color));
    pieces.push(new Piece(ypos, 7, PieceType.Rook, color));

    for (let i = 0; i < 8; i++) {
        pieces.push(new Piece(yposPawn, i, PieceType.Pawn, color));
    }
}

export default function Chessboard() {
    const chessboardRef = useRef<HTMLDivElement>(null);
    let board = [];
    let white = true;

    function grabPiece(e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
        const element = e.target as HTMLElement;
        if (element.classList.contains("piece")) {
            element.style.position = "absolute";
            element.style.left = e.clientX - 50 + "px";
            element.style.top = e.clientY - 50 + "px";

            activePiece = element;
        }
    }

    function movePiece(e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
        const chessboard = chessboardRef.current;
        if (activePiece && chessboard) {
            activePiece.style.position = "absolute";

            const x = e.clientX - 50;
            const y = e.clientY - 50;

            const minX = chessboard.offsetLeft - 25;
            const minY = chessboard.offsetTop - 25;
            const maxX = chessboard.offsetLeft + chessboard.offsetWidth - 75;
            const maxY = chessboard.offsetTop + chessboard.offsetHeight - 75;

            activePiece.style.left = x < minX ? minX + "px" : x > maxX ? maxX + "px" : x + "px";
            activePiece.style.top = y < minY ? minY + "px" : y > maxY ? maxY + "px" : y + "px";

        }
    }

    function dropPiece(e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
        if (activePiece) {
            activePiece = null;
        }
    }


    for (let i = 7; i >= 0; i--) {
        for (let j = 0; j < horizontalAxis.length; j++) {
            let imageUri = undefined;
            pieces.forEach(p => {
                if (p.x === i && p.y === j) {
                    imageUri = p.imageURI;
                }
            })

            board.push(
                <Tile isWhite={white}
                    identifier={horizontalAxis[j] + verticalAxis[i]}
                    imageUri={imageUri}
                    key={`${i},${j}`} />
            );
            white = !white;
        }
        white = !white;
    }

    return (
        <div
            className="chessboard"
            onMouseDown={e => grabPiece(e)}
            onMouseMove={e => movePiece(e)}
            onMouseUp={e => dropPiece(e)}
            ref={chessboardRef}>
            {board}
        </div>);
}