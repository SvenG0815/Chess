export enum PieceType{
    Pawn = "pawn",
    Rook = "rook",
    Knight = "knight",
    Bishop = "bishop",
    Queen = "queen",
    King = "king"
}

export enum Color{
    White = "white",
    Black = "black"
}

export class Piece{
    public x: number;
    public y: number;
    public pieceType: PieceType;
    public imageURI: string;
    public color : Color;

    constructor(x: number, y: number, pieceType: PieceType, color: Color){
        this.x = x;
        this.y = y;
        this.pieceType = pieceType;
        this.color = color;
        this.imageURI = `./assets/images/${pieceType}_${color}.png`
    }
}