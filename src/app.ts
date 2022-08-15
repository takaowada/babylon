import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import {
    Engine,
    Scene,
    ArcRotateCamera,
    Vector3,
    HemisphericLight,
    Mesh,
    MeshBuilder,
    int,
    Vector4,
    StandardMaterial,
    Texture,
    EventState
} from "@babylonjs/core";
import {
    AdvancedDynamicTexture,
    Button,
    Control,
    Rectangle,
    Vector2WithInfo,
} from "@babylonjs/gui/2D";

import DebugText from "./debugText";

function createRectangle(text: string) {
    var advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");
    var rect1 = new Rectangle();
    rect1.width = 0.2;
    rect1.height = "40px";
    rect1.cornerRadius = 20;
    rect1.color = "Orange";
    rect1.thickness = 4;
    rect1.background = "green";
    advancedTexture.addControl(rect1);
    return rect1;
}

class App {
    // GUI
    private advancedTexture: AdvancedDynamicTexture;
    // GUI
    private debugText: DebugText;
    // 最古rと
    private dice: int = 0;

    // コンストラクタ
    constructor() {
        // canvas の html 要素を作成し、ウェブページに貼り付ける。
        var canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas);

        // エンジンを作成する。
        var engine = new Engine(canvas, true);
        // シーンを作成する。
        var scene = new Scene(engine);
        // GUI用テクスチャを作成する。
        this.advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");
        this.debugText = new DebugText(this.advancedTexture);

        // カメラを作成する。
        var camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 3, Math.PI / 3, 10, Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        // ライト１を作成する。
        var light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
        // シーンに球を追加する。
        //var sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);

        // マテリアルを作成する。
        const mat = new StandardMaterial("mat", scene);
        const texture = new Texture("assets/dice.png", scene);
        mat.diffuseTexture = texture;

        //scene is optional and defaults to the current scene        box.position.x += 3;
        const faceUV = new Array(6);
        var n = 0;
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 3; j++) {
                faceUV[n++] = new Vector4(j / 4, i / 4, (j + 1) / 4, (i + 1) / 4);
            }
        }
        const options = {
            faceUV: faceUV,
            wrap: true
        };
        // ボックスを作成する。
        const box = MeshBuilder.CreateBox("box", options, scene);
        // マテリアルを適用する。
        box.material = mat;

        // ボタンを作成する。
        var button = Button.CreateSimpleButton("but", "Click Me");
        button.width = 0.2;
        button.height = "40px";
        button.color = "white";
        button.background = "green";
        button.cornerRadius = 20;
        button.onPointerUpObservable.add(() => {
            this.rollDice();
            /*
            // 乱数を取得する。
            let dice = this.getRandomInt(6) + 1;
            console.log(`Dice:${dice}`);
            //this.dice = dice;
            */
        });
        this.advancedTexture.addControl(button);
        button.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;

        this.debugText.draw(0, 0, `Dice:${this.dice}`);

        // インスペクタの表示・非表示を切り替える。
        window.addEventListener("keydown", (ev) => {
            // Shift+Ctrl+Alt+I
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.code === "KeyI") {
                if (scene.debugLayer.isVisible()) {
                    scene.debugLayer.hide();
                } else {
                    scene.debugLayer.show();
                }
            }
        });

        // レンダリングループを実行する。
        engine.runRenderLoop(() => {
            scene.render();
        });
    }

    private rollDice(eventData: Vector2WithInfo, eventState: EventState) {
        // 乱数を取得する。
        var dice = this.getRandomInt(6) + 1;
        /*
        this.debugText.draw(0, 0, `Dice:${dice}`);
        */
        alert(dice);
    }
    /**
     * 最大値までの整数乱数を取得する。
     * 
     * @param max 最大値
     * @returns 0〜maxの値の乱数
     */
    getRandomInt(max: int): int {
        return Math.floor(Math.random() * max);
    }
}
new App();