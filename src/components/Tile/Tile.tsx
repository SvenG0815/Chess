import './Tile.css';

export default function Tile(props: { isWhite: boolean; identifier: string, imageUri?: string}){
    let colorClass = "tile black-tile";
    if(props.isWhite){
        colorClass = "tile white-tile";
    }
    return <div className={colorClass}>
        {props.imageUri && <div className="piece" style={{backgroundImage: `url(${props.imageUri}`}}></div>}
    </div>;
}