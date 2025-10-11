import { DIGITS, ROTATIONS } from "./digits";
import "./style.scss";


const GRIDS = 6;
const CLOCKS = 24; //24 clocks per grid (6x4)
const container = document.querySelector<HTMLDivElement>("div#container")!;

function initGrids(container:HTMLDivElement, grids: number, clocks: number) {
    const clock = document.createElement("div");
    clock.classList.add("clock");

    const hand = document.createElement("div");
    hand.classList.add("hand");
    clock.append(hand, hand.cloneNode(true));

    const gridElms: HTMLDivElement[] = [];

    for(let gridIdx=0; gridIdx < grids; gridIdx++) {
        const grid = document.createElement("div");
        grid.classList.add("grid");

        const nodes: Node[] = [];
        for(let i=0; i < clocks; i++) {
            nodes.push(clock.cloneNode(true));
        }

        grid.append(...nodes);
        container.appendChild(grid);
        gridElms.push(grid);
    }

    return gridElms;
}


function changeGridToDigit(grid:HTMLDivElement, digit:string) {
    const digitGrid = DIGITS[digit];

    const clocks = [...grid.querySelectorAll<HTMLDivElement>("div.clock")!];
    console.log(clocks.length)

    for(let idx=0; idx < CLOCKS; idx++) {
        const [hand1, hand2] = [...clocks[idx].querySelectorAll<HTMLDivElement>("div.hand")];
        const [rot1, rot2] = ROTATIONS[digitGrid[idx]];

        hand1.style.transform = `rotate(${rot1 - 90}deg)`;
        hand2.style.transform = `rotate(${rot2 - 90}deg)`;
    }

}

function main(){
    const [gridH1, gridH2, gridM1, gridM2, gridS1, gridS2] = initGrids(container, GRIDS, CLOCKS);

    setInterval(() => {
        const [h1, h2, m1, m2, s1, s2] = (
            new Date()
        ).toLocaleString("en-US", {"hour": "2-digit", "minute": "2-digit", "second":"2-digit"})
        .slice(0, 8)
        .replaceAll(":", "")
        .split("");

        changeGridToDigit(gridH1, h1);
        changeGridToDigit(gridH2, h2);
        changeGridToDigit(gridM1, m1);
        changeGridToDigit(gridM2, m2);
        changeGridToDigit(gridS1, s1);
        changeGridToDigit(gridS2, s2);


    },1000)

}


main();
