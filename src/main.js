// import GraphicsLib from "../lib/graphicsLib.js";
//
// // Board object
// let board;
// let boardWidth = 360;
// let boardHeight = 576;
// let context;
//
// // Doodler obj
// let doodlerWidth = 46;
// let doodlerHeight = 46;
// let doodlerX = boardWidth/2 - doodlerWidth/2;
// let doodlerY = boardHeight*7/8 - doodlerHeight;
// let doodlerRightImg;
// let doodlerLeftImg;
//
// let doodler = {
//     img: null,
//     x: doodlerX,
//     y: doodlerY,
//     width: doodlerWidth,
//     height: doodlerHeight,
// }
//
// window.onload = () => {
//     // Game initialization
//     board = document.getElementById('board');
//     board.width = boardWidth;
//     board.height = boardHeight;
//     context = board.getContext("2d");
//
//     // Load libraries
//     const lib = new GraphicsLib(board);
//
//     // Background
//     let bg = new Image();
//     bg.onload = () => {
//         context.drawImage(bg, 0, 0);
//     }
//     bg.src = './assets/doodlejumpbg.png';
//
//     // Draw doodler
//     lib.square()
//
//     lib.render();
// }