import { Component, Host, State, h } from "@stencil/core"
import * as THREE from "three"

interface CursorPosition {
    x: number,
    y: number,
}
@Component({
    tag: "three-d",
    styleUrl: "three-d.scss",
    shadow: false
})
export class ThreeD {

    // SETTING OUR CORE VARIABLES AS STATE
    /** SCENE: the main scene, where the objects are represented */
    @State() scene: any;
    /** meshes: it holds our objects (cubes, shapes etc.) */
    @State() meshes: any = {};
    /** group: a group of our objects to make collective scaling and movigns */
    @State() group: any;
    /** RENDERER: the class that is responsible to make and update the final render */
    @State() renderer: any;
    /** CAMERA: the viewpoint from which the scene is observed */
    @State() camera: any;

    private sizes = {
        width: 800,
        height: 500
    }

    cursorPosition: CursorPosition = { x: 0, y: 0 }

    /** visual representation of the axis for dev mode */
    axesHelper: any;

    private updateCursorPosition = (e) => {
        this.cursorPosition.x = e.clientX / this.sizes.width - 0.5
        this.cursorPosition.y = e.clientY / this.sizes.height - 0.5
    }

    connectedCallback() {
        window.addEventListener("mouseover", this.updateCursorPosition)
    }

    disconnectedCallback() {
        window.removeEventListener("mouseover", this.updateCursorPosition)
    }

    componentWillLoad() {
        this.axesHelper = new THREE.AxesHelper(4)

        /** set the scene */
        this.scene = new THREE.Scene()

        /** create the group */
        this.group = new THREE.Group()

        /** create our cube objects and adding them to our meshes state */
        const cube1 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({ color: "#999" })
        )
        const cube2 = new THREE.Mesh(
            new THREE.BoxGeometry(1.3, 1.3, 1.5),
            new THREE.MeshBasicMaterial({ color: "#888" })
        )
        this.meshes = {...this.meshes, cube1, cube2 }

        /** adding our cubes to the group */
        this.group.add(this.meshes.cube1)
        this.group.add(this.meshes.cube2)
        

        /** create the camera and set the initial position */
        this.camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height)
        this.camera.position.z = 6

        /** add the group, objects, the camera and the axesHelper to the scene */
        this.scene.add(this.group)
        this.scene.add(this.camera)
        this.scene.add(this.axesHelper)
    }

    componentDidLoad() {
        const canvas = document.querySelector("canvas")

        /** creating the renderer, setting it sizes and rendering the content */
        this.renderer = new THREE.WebGLRenderer({ canvas: canvas })
        this.renderer.setSize(this.sizes.width, this.sizes.height)
        this.renderer.render(this.scene, this.camera)
    }

    private changeCubePosition = () => {
        this.meshes.cube1.position.set(1, 0.7, -2)
        this.meshes.cube1.scale.set(2, 0.3, 2)
        this.meshes.cube1.rotation.reorder("YXZ")
        this.meshes.cube1.rotation.y = 1.4
        this.camera.position.set(1, 2, 1)
        this.renderer.render(this.scene, this.camera)
    }

    private cameraLookAt = () => {
        this.camera.lookAt(0, 0, 0)
        this.group.position.y = -2
        this.renderer.render(this.scene, this.camera)
    }

    private animateGroup = () => {
        // dom something
    }

    render() {
        return (
            <Host>
                <p onClick={this.cameraLookAt}>Camera look at </p>
                <h1 onClick={this.changeCubePosition}>Hello from the component</h1>
                <canvas class="canvas"></canvas>
            </Host>
        )
    }
}