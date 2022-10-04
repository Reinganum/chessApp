const boardContainer = document.getElementById('boardContainer');
chessPieces=[]
var obstruction = []
let pgnArr=[]
let attackedSqrArr=[]
let check=[]
let checkbox=document.getElementById('attackSqrs')
let notation=document.getElementById("notation")

checkbox.addEventListener('click', ()=>{
    if (checkbox.checked===true){
        attackedSqrArr.forEach((sqr)=>{
            let attackedSquare=document.getElementById(sqr.position)
            attackedSquare.classList.add('attacked')
        })
    } else { 
        resetAttackRender()
    }
})

class Board {
    constructor(){
        this.coordenadas=["a","b","c","d","e","f","g","h"];
        this.boardSquares=[];
        this.turn="w";
    }
    createBoard(squares){
        for (let i=squares;i>=1;i--){
            if (i % 2===0){
            this.coordenadas.forEach((coordenada)=>{
                    if (this.coordenadas.indexOf(coordenada) % 2 === 0){
                    let color = "white";
                    let coordinate=coordenada;
                    let index=i;
                    let square = new Square;
                    square.createSqr(color,coordinate,index);
                    square.setSquareColor(color)
                    square.setSquareIndex(index)
                    square.setSquareCoordinate(coordinate)
                    square.setSquarePosition(`${coordinate+index}`)
                    this.boardSquares.push(square)
                    } else {
                    let index=i;
                    let coordinate = coordenada;  
                    let color = "black";
                    let square = new Square;
                    square.createSqr(color,coordinate,index);
                    square.setSquareColor(color)
                    square.setSquareIndex(index)
                    square.setSquareCoordinate(coordinate)
                    square.setSquarePosition(`${coordinate+index}`)
                    this.boardSquares.push(square)
                }
            })} else {
                this.coordenadas.forEach((coordenada)=>{
                    if (this.coordenadas.indexOf(coordenada) % 2 === 0){
                        let index=i;
                        let coordinate = coordenada;  
                        let color = "black";
                        let square = new Square;
                        square.createSqr(color,coordinate,index);
                        square.setSquareColor(color)
                        square.setSquareIndex(index)
                        square.setSquareCoordinate(coordinate)
                        square.setSquarePosition(`${coordinate+index}`)
                        this.boardSquares.push(square)
                    } else {
                        let color = "white";
                        let coordinate=coordenada;
                        let index=i;
                        let square = new Square;
                        square.createSqr(color,coordinate,index);
                        square.setSquareColor(color)
                        square.setSquareIndex(index)
                        square.setSquareCoordinate(coordinate)
                        square.setSquarePosition(`${coordinate+index}`)
                        this.boardSquares.push(square)
                    }
                }
                
            )}
        }
    }
    setPassTurn(){
        resetAttackRender()
        attackedSqrArr=[]
        attackedSquares(this.turn)
        if (checkbox.checked===true){
        attackedSqrArr.forEach((sqr)=>{
            let attackedSquare=document.getElementById(sqr.position)
            attackedSquare.classList.add('attacked')
        })
    } else { 
        resetAttackRender()
    }
        this.turn=(this.turn==="w"?"b":"w");
        let displayTurn=document.getElementById("displayTurn")
        displayTurn.innerText=`${(this.turn==="w" ? "It's White's turn" : "It's Black's turn")}`
    }
}

class Square{
    constructor(){
        this.position=""
        this.color=null
        this.occupied=false
        this.attacked=null
        this.index=null
        this.coordinate=""
    }
        createSqr(color,coordinate,index){
            let square=document.createElement('div');
            square.setAttribute('class',`${color} square`);
            square.setAttribute('id',`${(coordinate+index)}`)
            boardContainer.appendChild(square);
            square.addEventListener('click', (e)=>{
                if(pieces.selectedPiece.length===1){
                    pieces.setSelectPiece(e.target.id)
                } else if (e.target.parentNode!==document.getElementById('boardContainer')){ 
                pieces.setSelectPiece(e.target.id)} 
            })
    }
        setSquareColor(color){
            return this.color=color; 
    }
        setSquareOccupied(occupied){
        return this.occupied=occupied; 
    }
        setSquareCoordinate(coordinate){
        return this.coordinate = coordinate; 
    }
        setSquareIndex(index){
        return this.index = index; 
    }
        setSquarePosition(position){
        return this.position=position;
    }
        setSquareAttacked(attacked){
        return this.attacked=attacked;
    }
}

class Piece{
    constructor(piece, worth, position, color){
        this.type=piece;
        this.worth=worth;
        this.color=color;
        this.position=position;
        this.id=position+piece;
        this.moved=false;
        this.selectedPiece=[];
    }
    /* comienza el movimiento seleccionando o derivando a validacion de movimiento */ 
    setSelectPiece(e){
        if (pieces.selectedPiece.length===0){
            let pieceColour=(document.getElementById(e)).className.charAt(0);
            if(pieceColour===chessBoard.turn)
            pieces.selectedPiece.push(e)
        } else if (pieces.selectedPiece.length===1){
            validMoves.setPieceTypeMoved(e)
        }
    }
    putPiece(piece,square,child,container,worth){
        child.setAttribute('class',`${(square.index > 2 ? "b": "w" )} fas fa-chess-${piece}`)
        child.setAttribute('id',`${square.position+piece}`)
        container.appendChild(child)
        square.setSquareOccupied(true);
        square.setSquarePosition(square.position)
        let color = (square.index > 2 ? "black": "white" )
        let chessPiece = new Piece(piece, worth, square.position, color)
        chessPieces.push(chessPiece)
        chessBoard.boardSquares.forEach((element)=>{
            if (chessPiece.position===element.position){
                
            }
        })
    }
    setInitialPosition(){
        chessBoard.boardSquares.forEach((square)=>{
            let container = document.getElementById(`${square.position}`)
            let child = document.createElement('div')
            if(square.index===2 || square.index===7){
                let piece = "pawn";
                let worth = 1;
                this.putPiece(piece,square,child,container,worth)
                square.contains=(square.coordinate+square.index+piece)
            }
            else if(square.position==="a1" || square.position==="a8"|| square.position==="h1"|| square.position==="h8"){
                let piece = "rook";
                let worth = 5;
                this.putPiece(piece,square,child,container,worth)
            }
            else if(square.position==="b1" || square.position==="b8"|| square.position==="g1"|| square.position==="g8"){
                let piece = "knight";
                let worth = 3;
                this.putPiece(piece,square,child,container,worth)
            }
            else if(square.position==="c1" || square.position==="c8"|| square.position==="f1"|| square.position==="f8"){
                let piece = "bishop";
                let worth = 3;
                this.putPiece(piece,square,child,container,worth)
            }
            else if(square.position==="d1" || square.position==="d8"){
                let piece = "queen";
                let worth = 11;
                this.putPiece(piece,square,child,container,worth)
            }
            else if(square.position==="e1" || square.position==="e8"){
                let piece = "king";
                let worth = "invaluable"
                this.putPiece(piece,square,child,container,worth)
            }
        })
        attackedSquares("w")
    }
}

class ValidMove{
    constructor(){
        this.pieceTypeMoved=null
    }
    setPieceTypeMoved(e){
        if(e!== pieces.selectedPiece[0]){
            if (pieces.selectedPiece[0].slice(2, pieces.selectedPiece[0].length)==="pawn"){
                this.validatePawnMove(e)
            } else if (pieces.selectedPiece[0].slice(2, pieces.selectedPiece[0].length)==="king"){
                this.validateKingMove(e)
            }
              else if (pieces.selectedPiece[0].slice(2, pieces.selectedPiece[0].length)==="knight"){
    
                this.validateKnightMove(e)
            }
            else if (pieces.selectedPiece[0].slice(2, pieces.selectedPiece[0].length)==="rook"){
                this.validateRookMove(e)
            }
            else if (pieces.selectedPiece[0].slice(2, pieces.selectedPiece[0].length)==="bishop"){
                this.validateBishopMove(e)
            }
            else if (pieces.selectedPiece[0].slice(2, pieces.selectedPiece[0].length)==="queen"){
                this.validateQueenMove(e)
            }}
        pieces.selectedPiece=[];
    }
    validatePawnMove(e){
        /* si es cierto move */ 
        let piece = document.getElementById(`${pieces.selectedPiece[0]}`)
        let pieceContainerId = piece.parentNode.id
        let containerCoord = pieceContainerId.charAt(0)
        let containerIndex = pieceContainerId.charAt(1)
        let targetCoord = e.charAt(0)
        let targetIndex = e.charAt(1)
        // indice pieza seleccionada en array de piezas 
        let index = chessPieces.findIndex(object => {
            return object.id === pieces.selectedPiece[0];
          });
        if (e.length===2){
            if(piece.className.charAt(0)==="w"){
                if (((targetIndex-containerIndex)<=2) && targetCoord===containerCoord&&chessPieces[index].moved===false&&containerIndex<targetIndex){
                    move(e)
                } else if (((targetIndex-containerIndex)<2) && targetCoord===containerCoord&&chessPieces[index].moved===true&&containerIndex<targetIndex){
                    move(e)
                } 
            } else if (piece.className.charAt(0)==="b"){
                if (((containerIndex-targetIndex)<=2) && targetCoord===containerCoord&&chessPieces[index].moved===false&&containerIndex>targetIndex){
                    move(e)
                } else if (((containerIndex-targetIndex)<2) && targetCoord===containerCoord&&chessPieces[index].moved===true&&containerIndex>targetIndex){
                    move(e)
                }
            }
        }  else if (e!== pieces.selectedPiece[0]&&e.length>2&&(Math.abs(pieces.selectedPiece[0].charAt(1)-e.charAt(1))>1)){
            let pieceContainer=document.getElementById(e).parentNode.id
            let numTargetCoord = chessBoard.coordenadas.indexOf(pieceContainer.charAt(0))
            let numContainerCoord = chessBoard.coordenadas.indexOf(pieceContainerId.charAt(0))
            let targetInd=pieceContainer.charAt(1)
            if(piece.className.charAt(0)==="w"){
                if ((targetInd-containerIndex)===1&&(Math.abs(numTargetCoord-numContainerCoord)===1)){
                    capture(e)
                }
            } else if (piece.className.charAt(0)==="b"){
                if (((containerIndex-targetInd)<=2)&&containerIndex>targetInd){
                    capture(e)
                }
            }
        }
    }
    validateKingMove(e){
        /* si es cierto move */ 
        let piece = document.getElementById(`${pieces.selectedPiece[0]}`)
        let pieceContainerId = piece.parentNode.id
        let containerCoord = chessBoard.coordenadas.indexOf(pieceContainerId.charAt(0))
        let containerIndex = pieceContainerId.charAt(1)
        let targetCoord = chessBoard.coordenadas.indexOf(e.charAt(0))
        let targetIndex = e.charAt(1)
        // indice pieza seleccionada en array de piezas
        let index = chessPieces.findIndex(object => {
            return object.id === pieces.selectedPiece[0];
          });
        // datos necesarios para validar enroque
        let kingMoved=chessPieces[index].moved;
        let shortClear=(e)=>{
            if (e.charAt(1)==1){
                (!document.getElementById('g1').hasChildNodes()&&!document.getElementById('f1').hasChildNodes())?true:false;
            } else if (e.charAt(1)==8){
                (!document.getElementById('g8').hasChildNodes()&&!document.getElementById('f8').hasChildNodes())?true:false;
            }
        }
        let longClear=(e)=>{
            if (e.charAt(1)==1){
                (!document.getElementById('b1').hasChildNodes()&&!document.getElementById('c1').hasChildNodes()&&!document.getElementById('d1').hasChildNodes())? true: false;
            } else if (e.charAt(1)==8){
                (!document.getElementById('b8').hasChildNodes()&&!document.getElementById('c8').hasChildNodes()&&!document.getElementById('d8').hasChildNodes())?true:false;
            }
        }
        let shortRookInPlace=(piece,e)=>{
            if ((piece.id==="e1king")&&((e==="g1")||(e==="h1rook"))){
                let rook=chessPieces.filter((piece)=>{return piece.id=="h1rook"&&piece.moved===false})
                rook.length===1?console.log(true):console.log(false)
                return rook.length===1?true:false
            } else if ((piece.id==="e8king")&&(e==="g8")||(e==="h8rook")){
                let rook=chessPieces.filter((piece)=>{return piece.id=="h8rook"&&piece.moved===false})
                return rook.length===1?true:false
            }
        }
        let longRookInPlace=(piece,e)=>{
            if ((piece.id==="e1king")&&(e==="a1rook")||(e==="c1")){
                let rook=chessPieces.filter((piece)=>{return piece.id=="h1rook"&&piece.moved===false})
                return(rook.length===1?true:false)
            } else if ((piece.id==="e8king")&&(e==="a8rook")||(e==="c8")){
                let rook=chessPieces.filter((piece)=>{return piece.id=="h8rook"&&piece.moved===false})
                return(rook.length===1?true:false)
            }
        }
        if (!kingMoved&&shortClear&&(e=="h1"||e=="h8"||e=="g1"||e=="g8")){
        shortRookInPlace(piece,e)===true?shortCastle(e):console.log("conditions not met")
        }else if (!kingMoved&&longClear&&(e=="a1"||e=="a8"||e=="c1"||e=="c8")){ 
        longRookInPlace(piece,e)===true?longCastle(e):console.log("conditions not met for long castle")
        }else if (e.length===2){
            if ((((Math.abs(targetIndex-containerIndex))===1)&&(Math.abs(targetCoord-containerCoord))<=1)|| 
            ((Math.abs(targetCoord-containerCoord))===1&&(Math.abs(targetIndex-containerIndex))<=1)){
                move(e, "castle")
            }
        } else if (e!== pieces.selectedPiece[0]&&e.length>2&&(Math.abs(pieces.selectedPiece[0].charAt(1)-e.charAt(1))>1)){
            if (((Math.abs(targetIndex-containerIndex))===1)|| (Math.abs(targetCoord-containerCoord))===1){
                capture(e)
                
            }
        }
        chessBoard.setPassTurn();
    }


    validateKnightMove(e){
        let piece = document.getElementById(`${pieces.selectedPiece[0]}`)
        console.log(piece.className.charAt(0))
        let pieceContainerId = piece.parentNode.id
        let containerCoord = chessBoard.coordenadas.indexOf(pieceContainerId.charAt(0))
        let containerIndex = pieceContainerId.charAt(1)
        let targetCoord = chessBoard.coordenadas.indexOf(e.charAt(0))
        let targetIndex = e.charAt(1)
        // indice pieza seleccionada en array de piezas 
        let index = chessPieces.findIndex(object => {
            return object.id === pieces.selectedPiece[0];
          });
        if (e.length===2){
            if ((((Math.abs(targetIndex-containerIndex))===2)&&((Math.abs(targetCoord-containerCoord))===1))||(((Math.abs(targetIndex-containerIndex))===1)&&((Math.abs(targetCoord-containerCoord))===2))){
                move(e)
            }
        } else if (e!== pieces.selectedPiece[0]&&e.length>2&&(Math.abs(pieces.selectedPiece[0].charAt(1)-e.charAt(1))>1)){
            capture(e)
        }
    }
    validateBishopMove(e){
        let piece = document.getElementById(`${pieces.selectedPiece[0]}`)
        let pieceContainerId = piece.parentNode.id
        let containerCoord = chessBoard.coordenadas.indexOf(pieceContainerId.charAt(0))
        let containerIndex = pieceContainerId.charAt(1)
        let targetCoord = chessBoard.coordenadas.indexOf(e.charAt(0))
        let targetIndex = e.charAt(1)
        // indice pieza seleccionada en array de piezas 
        let index = chessPieces.findIndex(object => {
            return object.id === pieces.selectedPiece[0];
          });
        if (e.length===2){
            if ((Math.abs(targetIndex-containerIndex))===(Math.abs(targetCoord-containerCoord))){
                let starterCoordinate=containerCoord > targetCoord ? targetCoord : containerCoord
                let starterIndex=containerCoord > targetCoord ? targetIndex : containerIndex
                let target = containerCoord < targetCoord ? targetCoord : containerCoord
                let endingIndex = containerCoord < targetCoord ? targetIndex : containerIndex 
                for (let i=starterCoordinate;i<=target;i++){
                    let checkSquare = document.getElementById(`${chessBoard.coordenadas[i]}${(endingIndex-starterIndex)>0? (parseInt(starterIndex)+(i-parseInt(starterCoordinate))):(parseInt(starterIndex)-(i-parseInt(starterCoordinate)))}`)
                    checkSquare.hasChildNodes() ? obstruction.push(checkSquare) : console.log(`${checkSquare} occupied`)
                }
                if (obstruction.length===1){
                    move(e)
                } else {
                    obstruction=[];
                    pieces.selectedPiece=[];
                }
            }
        } else if (e!== pieces.selectedPiece[0]&&e.length>2&&(Math.abs(pieces.selectedPiece[0].charAt(1)-e.charAt(1))>1)){
            capture(e)
        }
    }
    validateRookMove(e){
        let piece = document.getElementById(pieces.selectedPiece[0])
        let pieceContainerId = piece.parentNode.id
        let containerCoord = chessBoard.coordenadas.indexOf(pieceContainerId.charAt(0))
        let containerIndex = pieceContainerId.charAt(1)
        let targetCoord = chessBoard.coordenadas.indexOf(e.charAt(0))
        let targetIndex = e.charAt(1)
        // indice pieza seleccionada en array de piezas 
        let index = chessPieces.findIndex(object => {
            return object.id === pieces.selectedPiece[0];
          });
        if (e.length===2){
            if ((targetCoord!==containerCoord)&&(targetIndex===containerIndex)){
                let starter = targetCoord<containerCoord ? targetCoord : containerCoord
                let target = targetCoord>containerCoord ? targetCoord : containerCoord
                for (let i=starter;i<=target;i++){
                    let checkSquare = document.getElementById(`${chessBoard.coordenadas[i]}${pieceContainerId.charAt(1)}`)
                    checkSquare.hasChildNodes() ? obstruction.push(checkSquare) : console.log(`${checkSquare} occupied`)
                }
                if (obstruction.length===1){
                    move(e)
                } else {
                    obstruction=[];
                    pieces.selectedPiece=[];
                }
            } else if ((targetCoord===containerCoord)&&(targetIndex!==containerIndex)){
                let starter = targetIndex<containerIndex ? targetIndex : containerIndex
                let target = targetIndex>containerIndex ? targetIndex : containerIndex
                for (let i=starter;i<=target;i++){
                    let checkSquare = document.getElementById(`${pieceContainerId.charAt(0)}${i}`)
                    checkSquare.hasChildNodes() ? obstruction.push(checkSquare) : console.log("all clear")
                }
                if (obstruction.length===1){
                    move(e)
                } else {
                    obstruction=[];
                    pieces.selectedPiece=[];
                }
            }
        } else if (e!== pieces.selectedPiece[0]&&e.length>2&&(Math.abs(pieces.selectedPiece[0].charAt(1)-e.charAt(1))>1)){
            if ((targetCoord!==containerCoord)&&(targetIndex===containerIndex)||(targetCoord===containerCoord)&&(targetIndex!==containerIndex)){
                capture(e)
            } 
        }
    }
    validateQueenMove(e){
        let piece = document.getElementById(`${pieces.selectedPiece[0]}`)
        let pieceContainerId = piece.parentNode.id
        let containerCoord = chessBoard.coordenadas.indexOf(pieceContainerId.charAt(0))
        let containerIndex = pieceContainerId.charAt(1)
        let targetCoord = chessBoard.coordenadas.indexOf(e.charAt(0))
        let targetIndex = e.charAt(1)
        // indice pieza seleccionada en array de piezas 
        let index = chessPieces.findIndex(object => {
            return object.id === pieces.selectedPiece[0];
          });
        if (e.length===2){
            if ((targetCoord!==containerCoord)&&(targetIndex===containerIndex)){
                let starter = targetCoord<containerCoord ? targetCoord : containerCoord
                let target = targetCoord>containerCoord ? targetCoord : containerCoord
                for (let i=starter;i<=target;i++){
                    let checkSquare = document.getElementById(`${chessBoard.coordenadas[i]}${pieceContainerId.charAt(1)}`)
                    checkSquare.hasChildNodes() ? obstruction.push(checkSquare) : console.log(`${checkSquare} occupied`)
                }
                if (obstruction.length===1){
                    move(e)
                } else {
                    obstruction=[];
                    pieces.selectedPiece=[];
                }
            } else if ((targetCoord===containerCoord)&&(targetIndex!==containerIndex)){
                let starter = targetIndex<containerIndex ? targetIndex : containerIndex
                let target = targetIndex>containerIndex ? targetIndex : containerIndex
                for (let i=starter;i<=target;i++){
                    let checkSquare = document.getElementById(`${pieceContainerId.charAt(0)}${i}`)
                    checkSquare.hasChildNodes() ? obstruction.push(checkSquare) : console.log("all clear")
                }
                if (obstruction.length===1){
                    move(e)
                } else {
                    obstruction=[];
                    pieces.selectedPiece=[];
                }
            } else if ((Math.abs(targetIndex-containerIndex))===(Math.abs(targetCoord-containerCoord))){
                let starterCoordinate=containerCoord > targetCoord ? targetCoord : containerCoord
                let starterIndex=containerCoord > targetCoord ? targetIndex : containerIndex
                let target = containerCoord < targetCoord ? targetCoord : containerCoord
                let endingIndex = containerCoord < targetCoord ? targetIndex : containerIndex 
                for (let i=starterCoordinate;i<=target;i++){
                    let checkSquare = document.getElementById(`${chessBoard.coordenadas[i]}${(endingIndex-starterIndex)>0? (parseInt(starterIndex)+(i-parseInt(starterCoordinate))):(parseInt(starterIndex)-(i-parseInt(starterCoordinate)))}`)
                    checkSquare.hasChildNodes() ? obstruction.push(checkSquare) : console.log(`${checkSquare} occupied`)
                }
                if (obstruction.length===1){
                    move(e)
                } else {
                    obstruction=[];
                    pieces.selectedPiece=[];
                }
            }
        } else if (e!== pieces.selectedPiece[0]&&e.length>2&&(Math.abs(pieces.selectedPiece[0].charAt(1)-e.charAt(1))>1)){
            capture(e)
        }
    }
    }
const move=(e,castle)=>{
    // borrar renderizado de pieza del cuadrado en el que estaba */ 
        let child = document.getElementById(pieces.selectedPiece[0])
        child.parentNode.removeChild(child)
    // encontrar indice del cuadrado inicial que debe ser actualizado */ 
        for (let i=0;i<chessBoard.boardSquares.length;i++){
            if (chessBoard.boardSquares[i].contains===pieces.selectedPiece[0]){
                chessBoard.boardSquares[i].occupied=false;
                chessBoard.boardSquares[i].contains='';
            }
        }
    // encontrar indice del cuadrado de destino y modificar informacion 
        for (let i=0;i<chessBoard.boardSquares.length;i++){
            if (chessBoard.boardSquares[i].position===e){
                chessBoard.boardSquares[i].occupied=true;
                chessBoard.boardSquares[i].contains=pieces.selectedPiece[0];
            }
        }
    // cambiar situacion de pieza a mover 
        let index = chessPieces.findIndex(object => {
            return object.id === pieces.selectedPiece[0];
          });
        chessPieces[index].moved=true;
        chessPieces[index].position=e;
    /* cuadrado nuevo renderice pieza */
        let parent = document.getElementById(e)
        parent.appendChild(child)
    // anotar jugada
    /* volver a vaciar array */ 
    chessBoard.setPassTurn();
    pgn(e,castle)
    pieces.selectedPiece=[];
}
const capture=(e)=>{
    // borrar renderizado de pieza del cuadrado en el que estaba */ 
    let child = document.getElementById(pieces.selectedPiece[0])
    let prev=''
    child.parentNode.removeChild(child)
    // encontrar indice del cuadrado inicial que debe ser actualizado */ 
    for (let i=0;i<chessBoard.boardSquares.length;i++){
        if (chessBoard.boardSquares[i].contains===pieces.selectedPiece[0]){
            chessBoard.boardSquares[i].occupied=false;
            chessBoard.boardSquares[i].contains='';
            prev=chessBoard.boardSquares[i];
        }
    }
    // encontrar indice del cuadrado de destino y modificar informacion 
    let iSquare = chessPieces.findIndex(object => {
        return object.id === e;
      });
    let posArray = [];
    for (let i=0;i<chessBoard.boardSquares.length;i++){
        if (chessBoard.boardSquares[i].position==chessPieces[iSquare].position){
            chessBoard.boardSquares[i].occupied=true;
            chessBoard.boardSquares[i].contains=`${pieces.selectedPiece[0]}`;
            posArray.push(chessBoard.boardSquares[i].position)
        }
    }
    /* cuadrado nuevo renderice pieza */
    let parent = document.getElementById(e)
    let grandparent = parent.parentNode.id
    parent.parentNode.removeChild(parent)
    targetSquare=document.getElementById(grandparent)
    targetSquare.appendChild(child)
    // cambiar situacion de pieza a moved 
    let index = chessPieces.findIndex(object => {
        return object.id === pieces.selectedPiece[0];
      });
    chessPieces[index].moved=true;
    chessBoard.setPassTurn();
    pgn(e, prev)
    pieces.selectedPiece=[];
}

const shortCastle=(e)=>{
    let child = document.getElementById(pieces.selectedPiece[0])
    let castleIndex=e.charAt(1);
    let rookChild=(castleIndex==1)?document.getElementById('h1rook'):document.getElementById('h8rook')
    let rookContainer=(castleIndex==1)?document.getElementById('h1'):document.getElementById('h8')
    let rookParent=(castleIndex==1)?document.getElementById('f1'):document.getElementById('f8')
    child.parentNode.removeChild(child)
    castleIndex==1?document.getElementById('g1').appendChild(child):document.getElementById('g8').appendChild(child)
    rookContainer.removeChild(rookChild)
    rookParent.appendChild(rookChild)
    pgn(e,"sCastle")
}

const longCastle=(e)=>{
    let child = document.getElementById(pieces.selectedPiece[0])
    let castleIndex=e.charAt(1);
    let rookChild=(castleIndex==1)?document.getElementById('a1rook'):document.getElementById('a8rook')
    let rookContainer=(castleIndex==1)?document.getElementById('a1'):document.getElementById('a8')
    let rookParent=(castleIndex==1)?document.getElementById('d1'):document.getElementById('d8')
    child.parentNode.removeChild(child)
    castleIndex==1?document.getElementById('c1').appendChild(child):document.getElementById('c8').appendChild(child)
    rookContainer.removeChild(rookChild)
    rookParent.appendChild(rookChild)
    pgn(e,"lCastle")
}

//reset de los cuadrados que se visualizan como atacados 
function resetAttackRender(){
    let attackedCollection = boardContainer.getElementsByClassName('attacked')
    let attackedSquaresArr = [...attackedCollection]
    attackedSquaresArr.forEach((sqr)=>{
        sqr.classList.remove('attacked')
    })}

//despues se puede tomar color como parametro y que el parametro cambie con el turno

function getPiecePosByType(pieceType,colorP){
    let pieces=chessPieces.filter((piece)=>{return (piece.type===`${pieceType}`&&piece.color===colorP)})
    let piecePositions=pieces.map((piece)=>{return piece.position})
    return piecePositions
}

function getNewSquares(sqrs){
    sqrs.forEach((sqr)=>{
        chessBoard.boardSquares.forEach((bsquare)=>{
            if(bsquare.position===sqr&&attackedSqrArr.indexOf(sqr)===-1){
                attackedSqrArr.push(bsquare)
            }
        })
    })
}

//                                                REFACTORIZAR!!!!!!!!!!                                          //
function attackedSquares(color){
    console.log("actualizando cuadrados")
    colorPieza=(color==="w" ? "white" : "black")
    let pawnPositions=getPiecePosByType("pawn",colorPieza)
    let bishopPositions=getPiecePosByType("bishop",colorPieza)
    let knightPositions=getPiecePosByType("knight",colorPieza)
    let rookPositions=getPiecePosByType("rook",colorPieza)
    let kingPositions=getPiecePosByType("king",colorPieza)
    let queenPositions=getPiecePosByType("queen",colorPieza)
    pawnPositions.forEach((pawn)=>{
        let coordNum=chessBoard.coordenadas.indexOf(pawn.charAt(0))
        let index=parseInt(pawn.charAt(1))
        if(colorPieza==="white"){
            let newSqrPos=`${chessBoard.coordenadas[coordNum+1]}${index+1}`
            let newSqrNeg=`${chessBoard.coordenadas[coordNum-1]}${index+1}`
            chessBoard.boardSquares.forEach((sqr)=>{
                //cambiarlo a formulacion con numero absoluto seguramente es mejor 
                if(sqr.position===newSqrPos||sqr.position===newSqrNeg){
                    if(attackedSqrArr.indexOf(sqr)===-1)
                    attackedSqrArr.push(sqr)
                }
            })
        } else if(colorPieza==="black") {
            let newSqrPos=`${chessBoard.coordenadas[coordNum+1]}${index-1}`
            let newSqrNeg=`${chessBoard.coordenadas[coordNum-1]}${index-1}`
            chessBoard.boardSquares.forEach((sqr)=>{
                //cambiarlo a formulacion con numero absoluto seguramente es mejor 
                if(sqr.position===newSqrPos||sqr.position===newSqrNeg){
                    if(attackedSqrArr.indexOf(sqr)===-1)
                    attackedSqrArr.push(sqr)
                }
            })
        }
    })
    knightPositions.forEach((knight)=>{
        let coordNum=chessBoard.coordenadas.indexOf(knight.charAt(0))
        let index=parseInt(knight.charAt(1))
        chessBoard.boardSquares.forEach((kSqr)=>{
            let targetCoord=chessBoard.coordenadas.indexOf(kSqr.position.charAt(0))
            let targetIndex=parseInt(kSqr.position.charAt(1))
            if((Math.abs(coordNum-targetCoord)===2)&&(Math.abs(index-targetIndex)===1)||
            (Math.abs(coordNum-targetCoord)===1)&&(Math.abs(index-targetIndex)===2)){
                attackedSqrArr.push(kSqr)
            }
        })
    })
    rookPositions.forEach((rook)=>{
        let newSqrs=linear(rook)
        getNewSquares(newSqrs)
    })
    bishopPositions.forEach((bishop)=>{
        let newSqrs=diagonal(bishop)
        getNewSquares(newSqrs)
    })
    queenPositions.forEach((queen)=>{
        let sqrs=linear(queen)
        let newSqrs=diagonal(queen)
        getNewSquares(sqrs)
        getNewSquares(newSqrs)
    })
    kingPositions.forEach((king)=>{
        let coordNum=chessBoard.coordenadas.indexOf(king.charAt(0))
        let index=parseInt(king.charAt(1))
        let xPosYpos=`${chessBoard.coordenadas[coordNum+1]}${index+1}`
        let xPosYneg=`${chessBoard.coordenadas[coordNum+1]}${index-1}`
        let xNegYpos=`${chessBoard.coordenadas[coordNum-1]}${index+1}`
        let xNegYneg=`${chessBoard.coordenadas[coordNum-1]}${index-1}`
        let xPos=`${chessBoard.coordenadas[coordNum+1]}${index}`
        let yPos=`${chessBoard.coordenadas[coordNum]}${index+1}`
        let xNeg=`${chessBoard.coordenadas[coordNum-1]}${index}`
        let yNeg=`${chessBoard.coordenadas[coordNum]}${index-1}`
        chessBoard.boardSquares.forEach((sqr)=>{
            if (xPosYpos===sqr.position||xPosYneg===sqr.position||xNegYpos===sqr.position||xNegYneg===sqr.position||xPos===sqr.position||
                yPos===sqr.position||xNeg===sqr.position||yNeg===sqr.position){
                attackedSqrArr.push(sqr)
            }
        })
    })
    attackedSqrArr.forEach((aSqr)=>{
        let iSquare=chessBoard.boardSquares.indexOf(aSqr)
        chessBoard.boardSquares[iSquare].attacked="attacked"
    })
    return attackedSqrArr
}

function pgn(e, prev){
    let pCode=""
    colorPieza=(chessBoard.turn==="w" ? "white" : "black")
    let kingPos=getPiecePosByType("king",colorPieza)
    let checkForCheck=attackedSqrArr.filter((sqr)=>{
        return sqr.position===kingPos[0]
    })
    if(checkForCheck.length>0){
        check.push(checkForCheck)
    }
    if (e.length===2&&!prev){
        if (pieces.selectedPiece[0].includes("pawn")){
        pCode=""
        } else if (!pieces.selectedPiece[0].includes("pawn")){
            pCode=pieces.selectedPiece[0].includes("knight")?"N":pieces.selectedPiece[0].charAt(2).toUpperCase()
        }
        let moveNotation=document.createElement('h2')
        pgnArr.push(`${chessBoard.turn==="b"?(pgnArr.length===0?pgnArr.length+1:pgnArr.length):""} ${pCode}${e}`)
        moveNotation.innerText=((`${chessBoard.turn==="b"?(pgnArr.length===1?pgnArr.length:(pgnArr.length+1)/2):""} ${pCode}${e}${check.length>0?"+":""}`))
        notation.setAttribute('class','moveCode')
        notation.appendChild(moveNotation)
    } else if (typeof prev==="string"){
        if (prev.includes("Castle")){
            let moveNotation=document.createElement('h2')
            pgnArr.push(`${chessBoard.turn==="b"?(pgnArr.length):""} ${prev.charAt(0)==="s"?"O-O":"O-O-O"}`)
            moveNotation.innerText=(`${chessBoard.turn==="b"?((pgnArr.length+1)/2):""} ${prev.charAt(0)==="s"?"O-O":"O-O-O"}${check.length>0?"+":""}`)
            notation.setAttribute('class','moveCode')
            notation.appendChild(moveNotation)
        }
    } else if (e.length>2){
        if(pieces.selectedPiece[0].includes("pawn")){
            let starterCont=prev.position.charAt(0)
            let targetCont=chessBoard.boardSquares.filter((sqr)=>{return sqr.contains===pieces.selectedPiece[0]})
            let moveNotation=document.createElement('h2')
            moveNotation.innerText=(`${chessBoard.turn==="b"?(pgnArr.length===0?pgnArr.length+1:pgnArr.length):""} ${starterCont}x${targetCont[0].position}${check.length>0?"+":""}`)
            pgnArr.push(`${chessBoard.turn==="b"?(pgnArr.length===0?pgnArr.length+1:pgnArr.length):""} ${starterCont}x${targetCont[0].position}`)
            notation.setAttribute('class','moveCode')
            notation.appendChild(moveNotation)
        } else {
            pCode=pieces.selectedPiece[0].includes("knight")?"N":pieces.selectedPiece[0].charAt(2).toUpperCase()
            let targetCont=chessBoard.boardSquares.filter((sqr)=>{return sqr.contains===pieces.selectedPiece[0]})
            let moveNotation=document.createElement('h2')
            moveNotation.innerText=(`${chessBoard.turn==="b"?(pgnArr.length===0?pgnArr.length+1:pgnArr.length):""} ${pCode}x${targetCont[0].position}${check.length>0?"+":""}`)
            pgnArr.push(`${chessBoard.turn==="b"?(pgnArr.length===0?pgnArr.length+1:pgnArr.length):""} ${pCode}x${targetCont[0].position}`)
            notation.setAttribute('class','moveCode')
            notation.appendChild(moveNotation)
        }
    }
    check=[]
}


function linear(pos){
    let coordNum=((chessBoard.coordenadas).indexOf(pos.charAt(0)))
    let index=parseInt(pos.charAt(1))
    let undPosY=[]
    let attPosY=[]
    let undPosX=[]
    let attPosX=[]
    let undNegY=[]
    let attNegY=[]
    let undNegX=[]
    let attNegX=[]
    for(let i=1;undPosY.length<1&&(index+i<8);i++){
        let element = document.getElementById(pos.charAt(0)+(index+i))
        if(element.hasChildNodes()){
            undPosY.push(element.id)
        } else if(!element.hasChildNodes()){
            attPosY.push(element.id)
        }
    }
    for(let i=-1;undNegY.length<1&&(index+i)>0;i--){
        let element = document.getElementById(pos.charAt(0)+(index+i))
        if(element.hasChildNodes()){
            undNegY.push(element.id)
        } else if(!element.hasChildNodes()){
            attNegY.push(element.id)
        }
    }
    for(let i=1;(undPosX.length<1)&&(coordNum+i)<8;i++){
        let element = document.getElementById(chessBoard.coordenadas[coordNum+i]+(index))
        if(element.hasChildNodes()){
            undPosX.push(element.id)
        } else if(!element.hasChildNodes()){
            attPosX.push(element.id)
        }
    }
    for(let i=-1;(undNegX.length<1)&&(coordNum+i)>=0;i--){
        let element = document.getElementById(chessBoard.coordenadas[coordNum+i]+(index))
        if(element.hasChildNodes()){
            undNegX.push(element.id)
        } else if(!element.hasChildNodes()){
            attNegX.push(element.id)
        }
    }
    let attackedSqrs=attNegX.concat(undNegX,undPosX,attPosX,attNegY,undNegY,undPosY,attPosY)
    return attackedSqrs;
}
// function diagonal("d4")
function diagonal(pos){
    let coordNum=((chessBoard.coordenadas).indexOf(pos.charAt(0)))
    let index=parseInt(pos.charAt(1))
    let undPosY=[]
    let attPosY=[]
    let undPosX=[]
    let attPosX=[]
    let undNegY=[]
    let attNegY=[]
    let undNegX=[]
    let attNegX=[]
    for(let i=1;undPosY.length<1&&index+i<9&&(coordNum+i)<8;i++){
        let element = document.getElementById(chessBoard.coordenadas[coordNum+i]+(index+i))
        if(element.hasChildNodes()){
            undPosY.push(element.id)
        } else if(!element.hasChildNodes()){
            attPosY.push(element.id)
        }
    }
    for(let i=-1;undNegY.length<1&&(index+i)>0&&(coordNum+i)>=0;i--){
        let element = document.getElementById(chessBoard.coordenadas[coordNum+i]+(index+i))
        if(element.hasChildNodes()){
            undNegY.push(element.id)
        } else if(!element.hasChildNodes()){
            attNegY.push(element.id)
        }
    }
    for(let i=1;undPosX.length<1&&(index-i)>0&&(coordNum+i)<8;i++){
        let element = document.getElementById(chessBoard.coordenadas[coordNum+i]+(index-i))
        if(element.hasChildNodes()){
            undPosX.push(element.id)
        } else if(!element.hasChildNodes()){
            attPosX.push(element.id)
        }
    }
    for(let i=1;(undNegX.length<1)&&(coordNum-i)>=0&&(index+i)<8;i++){
        let element = document.getElementById(chessBoard.coordenadas[coordNum-i]+(index+i))
        if(element.hasChildNodes()){
            undNegX.push(element.id)
        } else if(!element.hasChildNodes()){
            attNegX.push(element.id)
        }
    }
    let attackedSqrs=attNegX.concat(undNegX,undPosX,attPosX,attNegY,undNegY,undPosY,attPosY)
    return (attackedSqrs)
}

const chessBoard = new Board;
const pieces = new Piece;
const validMoves = new ValidMove;
chessBoard.createBoard(8);
pieces.setInitialPosition();
